---
title: "Learning Mistakes from Doom Masters"
author: wilkie
tags: ["programming", "programming/mistakes", "programming/c"]
date: 2013-01-08
summary: "We all make mistakes regardless of how good people think you are. Speedrunners show us that our mistakes can be fun, and we shouldn't be ashamed of them. We look at the video game Doom and the bugs that allow speedrunners to break the game all in good fun."
---

This article was published in Game Developer Magazine, March 2013; editor Patrick Miller. It goes into a little more detail, so I recommend it! You can download that article [here](/images/learning-mistakes-from-doom-masters/gdm_march_2013_wilkie.pdf). For the entire backlog for this magazine, [go here](http://www.gdcvault.com/gdmag).

So, every year, the Speedrun Demos Archive ([speeddemosarchive.com](http://speeddemosarchive.com)) runs a marathon (I'm not directly involved) where they play video games and exploit glitches 24 hours a day for 7 days. They are promoting a great charity called the [Prevent Cancer Foundation](http://preventcancer.org) which hopes to aid in the research effort for better detection of cancer in hopes of eradicating it forever.

![!Prevent Cancer logo](prevent-cancer.png)

As a hobby speedrunner, programmer and hater of cancer, in my own way to promote their event, I am inspired to talk about how these two concepts (our code and our mistakes) can be used to create art.

Let's be very clear: we all make mistakes. We cannot learn unless we fail, otherwise there is never an incentive to improve. We may look up to many who have more experience than us, but we should never emphasize their achievements over our own. In the end, what we are capable of is never defined by what others can do. Nor are the mistakes we make indicative of our failure or depict our work as flawed.

![Doom, released in 1993, is now open source-- and riddled with interesting programming mistakes.](doom.gif)

As proof of this point, we will look at bugs humbly illustrated by [John Carmack](http://en.wikipedia.org/wiki/John_D._Carmack), a programmer chiefly responsible for the video game [Doom](http://en.wikipedia.org/wiki/Doom_(video_game)). Carmack is very well known for his programming prowess. However, just like the rest of us, he is actually human and makes the very simplest of mistakes.

To show the art of the bug exploit, we will look at **speedrunning**. [Speedrunning](http://en.wikipedia.org/wiki/Speedrun) is a concept where a player attempts to complete a video game challenge as quickly as possible. Speedrunners are typically allowed to break the game in any way. They see code as the rules of the game, and anything the code allows is proper. In Doom, these expert players take advantage of several very basic and simple mistakes in the Doom code.

## Speedrun Strategies
For speedrunning, you are obviously looking for any strategy that allows you to move just a bit faster. There are strategies for speedrunning particular levels of Doom, however there are several general techniques, which prove to be invaluable across the entire game. For Doom, it just so happens that we have the speedrunner's dream: a simple glitch in the movement code allows us to move faster than intended.

![This gap contains the end of the level and normally requires a switch past this yellow door, which in turn requires a blue key. Crossing this gap is possible with a bug that allows you to move more quickly, skipping all keys, and finishing the level in a record 12 seconds.](doom-e1m4-gap.png)

This has broad implications. Moving faster means jumping higher and farther (In Doom's case, you cannot jump, but you can cross wider gaps!) Some levels intend you to go out of your way to find a switch to raise a bridge, for instance. With a trick that lets you move faster, you might be able to cross the gap without the platform, which means skipping much of the level.

Here are the two movement tricks we will look at:

* (Strafe 40) Moving forward while also strafing in either direction will allow you to move 28% faster.
* (Strafe 50) Moving forward while also strafing in either direction while also toggling a feature that interprets turning as strafing allows you to move 41% faster.

Check out how this speedrunner runs:

![Rarely will this runner ever travel in the direction the player is facing.](http://www.youtube.com/watch?v=M6PK9bd_uUs)

## Looking at the code
Let's now investigate why these particular bugs happen. Doom is written in [C](http://en.wikipedia.org/wiki/C\_\(programming_language\)), which is a very low-level programming language, meaning it is designed for speed and not particularly for programmer comfort. This was a very common language to write games in at the time since the language allowed you to write very optimized code so one could push the limits of the technology.

In the [Doom source](https://github.com/osgcc/doom), there are several functions that deal with moving the player. The gist of them is that each frame before it draws the screen, it will decide how to move the player. It looks at which keys are pressed, and if, for instance, the walk forward key is down, it will update the player's position to move them forward. It may then look at collisions and react to running into monster projectiles, but let's just focus on the movement part.

### Strafe 40

Let's start with the first bug: the strafe 40, which is triggered simply by moving forward and strafing at the same time. So, we will investigate the [code](https://github.com/osgcc/DOOM/blob/master/linuxdoom-1.10/p_user.c#L148-171) that moves the player:

```
void P_MovePlayer (player_t* player) {
  ticcmd_t* cmd;
  cmd = &player->cmd;

  // Turn the player
  player->mo->angle += (cmd->angleturn<<16);

  // Do not let the player control movement
  // if not onground.
  onground = (player->mo->z <= player->mo->floorz);

  // Move the player forward, if allowed
  if (cmd->forwardmove && onground)
    P_Thrust (player, player->mo->angle, cmd->forwardmove*2048);

  // Move the player sideways, if allowed
  if (cmd->sidemove && onground)
    P_Thrust (player, player->mo->angle-ANG90, cmd->sidemove*2048);
} 
```

In this function, the `cmd` element holds the distances to move per frame. `cmd->forwardmove` and `cmd->sidemove` contain the distances to travel either ahead of the player or to the side of the player respectively. It will set a `onground` value to true if the player's z position (how high off the ground) matches that of the floor the player is currently over. Therefore, it only wants to move if the player is in contact with the ground.

Given that the player is on the ground, the code checks to see if the player is due to move forward (`cmd->forwardmove` will be non-zero) and then calls another piece of code that simply repositions the player to reflect that movement. It does the same thing for a strafe.

From here, we can see the mistake. We can move forward or strafe independently, and it would work as expected. However, if we move forward **and** strafe, the player will thrust forward, and then afterward, thrust sideways. However, these two movements are done at the same time from the perspective of the game and player because both are done before the screen is drawn and enemies react. Therefore, the actual speed is given by the sum of the vectors; that is, the length of the hypotenuse in the following simple diagram:

![<strong>Strafe 40</strong>: By strafing and moving forward independently, we actually move to the far corner, which covers the distance of the hypotenuse during the same amount of time, thus going faster.](doom-strafe40.svg)

### Fixing strafe 40

There are of course many ways to repair this bug and handle movement more correctly. One way is to, instead of positioning the player twice, determine the angle of the movement, and always use the same distance. That is, instead of moving in the player's direction and then moving again in another direction for the strafe, simply calculate the movement angle (around 50 degrees for walking and strafing), and `P_Thrust` only once in that direction.

Notice that the code does not account for which direction you are strafing. This is because of a naive optimization: the distance (in the code this is the `cmd->forwardmove * 2048`) you give to `P_Thrust` can be negative to move in the opposite direction. For the fix, you will have to account for the direction you are strafing to get the correct angle, but now you always give a positive distance.

### Strafe 50

To understand how to exploit the next vulnerability, we have to look at how it decides `cmd->forwardmove` and `cmd->sidemove`. These values determine how many units the player will travel per frame in those directions. The flaw is that you can artificially affect these values by having the game accidentally count two different keys as movement during a single frame.

Basically, you tell it to move you to the right... twice, and it diligently listens to you. For this, let's look at the [input handling code](https://github.com/osgcc/DOOM/blob/master/linuxdoom-1.10/g_game.c#L237-437):

```
void G_BuildTiccmd (ticcmd_t* cmd) {
  boolean strafe;
  int speed;
  int forward;
  int side;

  // We are strafing if a strafe key is pressed
  strafe = gamekeydown[key_strafe];

  // Is the run key pressed?
  speed  = gamekeydown[key_speed];

  // The distances we are moving are initially zero
  forward = side = 0;

  // Determine distances to move
  if (strafe) {
!1!    // If the strafe toggle is on, interpret moving left and right
!1!    //   as strafing left and right.
!1!    if (gamekeydown[key_right]) // Strafe right</span>
!1!      side += sidemove[speed];
!1!    if (gamekeydown[key_left])  // Strafe left
!1!      side -= sidemove[speed];
  }
  else {
    if (gamekeydown[key_right]) // Move right
      cmd->angleturn -= angleturn[tspeed];
    if (gamekeydown[key_left])  // Move left
      cmd->angleturn += angleturn[tspeed];
  }

  if (gamekeydown[key_up])   // Move forward
    forward += forwardmove[speed];
  if (gamekeydown[key_down]) // Move backward
    forward -= forwardmove[speed];

!2!  // Strafe right
!2!  if (gamekeydown[key_straferight])
!2!    side += sidemove[speed];

  // Strafe left
  if (gamekeydown[key_strafeleft])
    side -= sidemove[speed];

!3!  // Cap speed
!3!  if (side > forwardmove[speed])
!3!    side = forwardmove[speed];
!3!  else if (side < -forwardmove[speed])
!3!    side = -forwardmove[speed]; 

  cmd->forwardmove += forward;
  cmd->sidemove += side;
} 
```

We can see the familiar `cmd->forwardmove` and `cmd->sidemove` at the bottom. Ah! So this is the code that determines those! So, how does it translate the key presses into meaningful values in the game?

Well, in Doom, we can strafe one of two ways:

* A key that toggles strafe so that left and right do not turn you, but rather make you move sideways.
* A dedicated strafe key for each direction, which works the same way as the A or D keys on most modern games.

Now, with that in mind, look at the code. In section `1`, we see that the game looks to see if that strafe toggle is held. Depending on that, it either stores the `cmd->angleturn` which tells the `P_MovePlayer` function above to turn the given degrees before drawing. Or it completely ignores the turning and instead strafes by adding a distance to move (affected by whether or not run is enabled) to the variable `side`, which is initially zero.

So, ok. We know that when we have the strafe toggle on, and we press the right arrow key, it will handle that as a strafe to the right and add some distance to the variable `side`. However, note section `2`, which happens independently of the strafe toggle. If you also press the strafe right key, this code will add more to the current value (`side += sidemove[speed]` is the same as writing `side = side + sidemove[speed]`). Well, that means if we press the dedicated strafe right key **and** we also press right while the strafe toggle is on, then we will effectively strafe twice!

Interestingly, the programmer was not very optimistic about the code and if you look at section `3`, you'll notice that the speed of side movement is capped to the maximum speed you can run forward. However, this caps the sideways strafe speed incorrectly to that of 50 units per second, which is still faster than the maximum strafing speed of 40! Since this does not interfere with the strafing bug we investigated earlier, we just found a way to make it more effective.

The diagram becomes:

![<strong>Strafe 50</strong>: By strafing using both the strafe key and using the strafe toggle, we trick the game into strafing more than once and go just a bit faster.](doom-strafe50.svg)

###Fixing strafe 50

Even though this bug seems more severe and tricky, it's far easier to solve than strafe 40. All you need to do is put the code in section `2` into the else block after section `1` such that the normal strafe is only considered if strafe toggle is off.

Alternatively, to allow for strafe to be pressed by the dedicated strafe key even if strafe toggle is on, just fix the code in section `3`. Instead of capping it to the forward movement speed, use the strafe movement speed:

```
// Cap speed
if (side > sidemove[speed])
  side = sidemove[speed];
else if (side < -sidemove[speed])
  side = -sidemove[speed]; 
```

This will ensure strafe 50 is no longer a problem. You will now not be able to do any better than the original strafe 40.

## Your turn

You can try these tricks as well! [Grab a copy](http://store.steampowered.com/app/2280) of Doom and try running through the levels. Use the cheat code `idclev14` to go to the level the screen cap above illustrates. You can find a guide to other strategies [here](http://doomwiki.org/wiki/E1M4).

On Thursday at around 8:45pm EST, the Speed Demos Archive charity will be live speed demoing the entire Doom game while giving further commentary on the techniques. Please, [go watch](http://marathon.speeddemosarchive.com/) (right now, in fact, for other games!) and consider donating to Prevent Cancer for prizes and general well-being. Here is a [schedule](http://marathon.speeddemosarchive.com/schedule).

## Making mistakes

As you can see, these mistakes were made by otherwise great programmers. These bugs are very simple, although a little hard to spot. All of us are capable of writing code and only considering one case at a time (does moving forward work? good. Does moving sideways work? Awesome,) and never considering somebody will mash all of the keys at once. We're all human.

We must understand one thing: It's not the end of the world. With every bug we make, we learn. In fact, sometimes our bugs make somebody's day! Speedrunning is an artform that proves that our code and our mistakes can be turned into a beautiful spectacle that we should never be ashamed of.

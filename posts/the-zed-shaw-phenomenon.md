---
title: "The Zed Shaw Phenomenon"
subtitle: "A Look at Bullies in Tech"
date: 2013-07-22
author: wilkie
summary: "A look at how Zed Shaw's behavior contains an insight into a wider, darker trend within our communities: the bully. I look at my interactions with Shaw and his aggression and look at how this impacts the lack of a safe space to learn and contribute within the larger open source community."
gittip: ["no"]
tags: ["social", "diversity", "social/harassment", "social/community"]
---

![border|If you email me, please give me your best shot at describing what a crazy ass tweaker is.](zedshaw.png)

Goodness. The tech world must be really unfriendly, or alternatively I must be the absolute scum of the planet. Let's figure out what I did.

## Indirection Is Not Abstraction

Back in December of 2012, [Zed Shaw](http://twitter.com/zedshaw) wrote an essay entitled [Indirection Is Not Abstraction](http://zedshaw.com/essays/indirection_is_not_abstraction.html) (if link is [broken](/shaw_indirection.txt)). In this, Shaw notes that there are a few misconceptions about the definitions of several terms used to describe methods of modular design and code isolation: interfaces, abstractions, and indirection. Basically, he suggests that our fellow coders and engineers mix them up and conflate them with other concepts.

The article is clearly a bit of a work in progress, as noted by Shaw himself in the concluding paragraph. It is not particularly well-written or well-structured. Shaw uses a writing style that conjures this image of the ever irritating shock-jock. If there is something he doesn't like, he emphasizes with expletives. If there is *someone* he doesn't like, he will go out of his way to find the room to take a shot at them. For instance, later on, Zed Shaw manages to inexplicably slip in a link to a search for *"Dave Winer Asshole."*

> It’s even worse
when the implementer realizes that if he implements the most complicated piece
of shit possible then he can go rogue consultant and make tons of mad cash
helping poor unsuspecting companies implement his steaming pile of bullshit.
Harsh words? You bet. But I’m fed up with people imposing their faulty
definitions and ideas on me without any way for me to easily fight back with a
reasonable explanation as to why their crap is steaming.

This writing style is difficult to parse and makes the reader wonder how concise the article could be if such filler was removed. For instance, the paragraph above provides the motivation for the piece. You might believe, only knowing the intent of the article, that the motivation would be to provide a better structure for discussing modular design. However, Zed Shaw's stream of consciousness relays a motivation to provide a better means for him to tell you (male implementors, not women apparently) that your code is similar to excrement wasting away in the sunlight.

> An unbelievable 6 levels of indirection just to add a fucking object to a fucking collection. This is the kind of bullshit that chaps my ass purple and makes me want to eat babies.

...and to prevent him from desiring the consumption of small children in this unbelievably lazy reference found later on. Sigh. People. Look. This isn't hard. Killing a baby is not a valid literary device. It does not invoke peaceful idyllic imagery that helps you make your point through nostalgia. Stop it.

Nevertheless, Zed Shaw hits some good points and gives some decent ideas about how to better describe what an abstraction is. Of course, this is done in a paragraph that was probably supposed to be a bulleted list because it has a bunch of random asterisks between each sentence, but, as I said, the content in that mess is actually very good. (Hint: he doesn't swear or talk about the color of his butt.)

## Commenting on Abstractions

Now let us focus on how I am involved. I research distributed systems and operating design. The whole indirection, interfaces, and abstractions thing? I'll let you in on a secret... That's what an operating system is. Therefore, I saw the gaps in an unfinished article and figured I had something useful to say. I gave the following post of my own in response to his article on [lobste.rs](https://lobste.rs/s/ja5ihv/indirection_is_not_abstraction/comments/nl5sy4):

*"I had no idea the terms were so misused! It’s pretty simple, though. You have interfaces… if the implementations change behind them, that doesn’t mean your interface is flexible. It just means you have essentially a commit history that the interface allows you to ignore. Therefore, interfaces are not abstractions. Java misuses the term ‘abstract,’ because their usage only has meaning at the language parse time where it implies the lack of implementation logic. However, at runtime, an abstract class does not provide an abstraction, but an interface. However, we conflate the term with the notion of usage abstraction.*

*"Zed does a terrible job at illustrating a true abstraction. Abstractions take away things. They simplify. They consolidate, perhaps, but they consolidate power through generalization. A programming language is an abstraction of a machine language. A machine language is an interface to the CPU’s control and arithmetic units. A machine language doesn’t abstract because it doesn’t limit.*

*"I’ll add that abstractions are generally not machine-driven. They are people-driven. We abstract because some interfaces are too complicated. We abstract with natural language. We want things to be easier for the sake of programmers. A programming language is an abstraction because ‘var i = j + 1’ is so much better than the machine equivalent, however we sacrifice something to do this. That’s generally a good test for determining which something is. API’s are interfaces (yes, duh), Frameworks/languages are abstractions (read as: should be)*

*"Zed doesn’t really talk about where the discrepancy comes from (because people are dumb isn’t really good enough.) What really gets people is that interfaces usually have implementations which make use of abstractions. So, this is also a question of scoping. An implementation can make use of an abstraction, however, an interface cannot force the usage of an abstraction (since an interface is just a name and a behavior.) A test for that is whether or not the implementation can eschew the abstraction by reinventing the universe to provide equivalent behavior. But looking at the wrong scope when you design can certainly lead to this problem of term discrepancy."*

## Zed Shaw Responds

Apparently the post was well-received enough to catch Zed Shaw's attention, which I suppose was my first mistake.

![border|!zedshaw](zedshaw_3.png)

Zed Shaw's response was not a very friendly one. He stripped my handle out of the reply to Steve and gives that common criticism of criticism: *"you didn't even read it."* Steve did that thing that your friends do when you are out with them and they run into some Cool People, and he started to distance himself from me like it was coincidence that I was in the same room. That was disappointing, but I agree with Steve's careful implication that it is a bit confusing that I could both repeat what Shaw said and yet in the same small post also suggest that he was wrong.

It felt very odd to see this conversation unfold with me as the topic without either giving me an opportunity to contribute. **I felt a bit restrained as I didn't seem to have the authority to defend myself**. Yet, overall I didn't particularly care. *"Oh well,"* I thought, *"I got my Zed-Shaw-Hates-You-Achievement. 10 Points."* The thing is, the comment I posted is very on point, which is all that matters when you write. You always anger somebody with your research. There is this expression people like to console you with resembling *"if you make people angry, you're doing something right."* But, in reality, some people are just really touchy when you are working on a similar project. I'm not sure if it is fear, or related to what territorial dogs do in the park, but it happens.

The important part is that my post is not wrong and I stand by it. The idea that interfaces should be considered first-class over abstractions because abstractions are always summarizations of a set of interfaces is an important idea. One that I believe Zed Shaw didn't really care about, so I made instead. But what if it wasn't me and it was somebody else? There must be others that are completely suppressed by this behavior.

> Feel free to contact me with comments on this essay. It is still being worked on and is open for review. I’m pretty sure it makes no sense right now, but the major points should be there. I’m especially interested if you have any examples which you find relevant to the discussion, either for or against what I’m saying.

In the end, I have to say; I was scratching my head a bit by his reaction. If he suggests himself that the post makes no sense and that he invites comments including criticism, why was my post so ill-received?

## The Bully Mindset

Zed Shaw insists that I said he is wrong. I did no such thing. I agreed with many of his points. However, if I squint my eyes, I think I can see where that sentiment is coming from: *"Zed does a terrible job at illustrating a true abstraction."*

Why would I use the word *terrible* ? Because it is true. But I'm not calling him wrong, rather I'm suggesting that the writing quality is poor, because it is. It was an incredible eyesore for one. Also, he illustrates many examples of awful, tedious object hierarchies and gives some decent definitions of the terms, yet, he does not give any examples of what in the real-world actually abides by those definitions. Therefore, I did. I felt that this was the weakest part of the work, and I described it as such.

So wait. Could it be, then, that Zed Shaw is offended by the word *terrible* ? Could it be that the same person who desires a means to call your code a pile of feces shrieks at such a negative adjective?

Let's catch up to the present. How did this come back up almost 8 months later? Recently Zed Shaw published an [idea](http://xoratelier.com/) where people would pay him to work on his projects. Kurtis Rainbolt Greene offered reasonable criticism of the structure of the program. In reply, Zed Shaw spouts a stream of expletives about how absurd Kurtis apparently is to him.

In frustration, Kurtis issues a status about how Zed Shaw attacked rather than reasoned, and I felt the need to express solidarity. This is very much my experience from before where criticism was met with immediate aggression. I tagged Zed's handle (something he didn't afford me.) When Zed replied to me, shocked that I would be so brazen, I pointed out the tweet where he had attacked my post while dropping my handle and then... well, head back to the top of this page. He blew up.

![border|For the record, I've indeed secured funding for students to work on my projects. They were paid a monthly stipend and they acquired attribution and references for their work. It is not only possible to pay undergraduate students through grants, it's as common as it is necessary. But that's a different argument for a different day.](zedshaw_5.png)

![border|The Internet is a magical place where pointing out somebody being a jerk toward you is actually you being mean to them.](zedshaw_2.png)

## Open-Source Bullies

> @wilkieii The thing you're leaving out is I'm mean to people like you and KRG who shit on me but think I'm supposed to be nice in reply.

Let's get to the real point, here: **this is the type of personality that you can readily find within the tech community**. One that believes they have authority and dominion of their opinion of you, but not the other way around. A proud individual who believes they are smarter than you, threatened by you if you start to prove otherwise.

These people hurt our communities. They lurk in [IRC channels](http://cdm266901.cdmhost.com/utils/getfile/collection/p266901coll4/id/655/filename/617.pdf) waiting to [harass new programmers](http://code-worrier.com/blog/why-rtfm-is-some-bullshit/). These are the types of people who discourage women from participating in [classrooms](https://www.youtube.com/watch?v=TYwI-qM20x4) and within our [open source communities](http://marc.info/?l=linux-kernel&m=137391401112514&w=2). These high-and-mighty types that only desire to proclaim their superiority and describe to you the exact composition of your inferiority, even if you are merely trying to learn.

They control our [systems](http://www.wired.com/wiredenterprise/2012/06/torvalds-nvidia-linux/) and make decisions that influence everything we do with computers and networks. Linus controls Linux, the basic software that is executed and makes decisions for our applications, and he has racked up [quite](http://archive09.linux.com/articles/114231) a [list](https://lkml.org/lkml/2012/12/23/75) of [offenses](http://marc.info/?l=linux-kernel&m=137391401112514&w=2). Zed Shaw writes web server code, the basic software that many use to respond to requests from people who use our applications. As a queer, operating system and kernel developer, **the thought of these bullish types having control where diversity should reign is a very scary thought**.

*"Read the Fucking Manual,"* they will say. (They like to swear, don't they?) They will use their established influence to scare even the likes of Steve Klabnik into being a bit more passive. I mean, you don't want to hurt your chances of being one of the Cool People, right? You don't want to be seen as the aggressive one. That is, other prominent individuals are not pushing back for the rest of us. *"Grow some thicker skin,"* they will paraphrase in retort to every accusation. These bullies, such as Shaw, will use their environment to their advantage and make it look like you are in the bad, instead of them.

![!zedshaw](zedshaw_4.png)

They are the type of people who like to get the last word.

## The Truth

To conclude, we have to come together and accept the truth: **the tech community is an extremely unfriendly place**. We cannot placate such incidents as they hurt our ability to teach and collaborate and thus hinder our progress. It might be [hard](http://ashedryden.com/blog/the-risk-in-speaking-up), but let's make sure we take a stand. Let's [create](http://ashedryden.com/blog/increasing-diversity-at-your-conference) a safer space for people to learn. Let's claim the last word for ourselves, and say, ***"We can do better without you."***

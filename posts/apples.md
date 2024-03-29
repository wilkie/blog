---
title: "Coding Naturally: How to Achieve Sustainable Software"
author: wilkie
date: 2012-10-06
summary: "We tend to use too many opinions in our comparisons of libraries and frameworks. This is systemic and relates to a problem that we, socially, are not organizing code effectively for objective reuse. We can fix this with a better infrastructure that puts objective metrics first and describes computation rather than human expression. We can find better ways of expression using abstractions on top."
tags: [programming, social]
---

![Corgi wants to be tall. [1]](corgi.png)

Here is a [corgi](https://imgur.com/r/corgi). It's a puppy. And it is the absolute cutest thing. Ever. I'm only slightly pandering.
But seriously, puppies are far superior to kittens. Dogs are more loyal than cats. I'm not sure why the
internet has given cats so much attention. They suck.

## Which is better?

Alright. I may be biased. This happens. Throughout our lives we very often find ourselves in the situation where we are presented two items and
expected to choose between them. So much so, that no matter how much we actually know about something, we
have decided ourselves experts.

![A braeburn and a pippin, which is better?](apples.png)

Don't act all high-and-mighty. Look, we all know at the grocery store in the
produce section, you, like everybody else, are there squeezing all of the fruit. What exactly are you
looking for? What makes one apple better than the other?

We look at the color, the shininess and luster, the size, and the smoothness. Why? Because we believe these
to be all great indicators of the quality of taste. They are all qualities that we see and perhaps feel.
However, are these the qualities of a great apple? It is a matter of perspective.

## What is an apple?

The attributes of an apple which we find pleasing are not indicative of what makes a great apple. These
traits do not concern the apple and its role and its function. The perception of an apple with respect to
these qualities ignores what an apple actually is. We just want to eat them.

![Taking a step back, how different can they be? [2]](apples_full_small.png)

However, an apple, being a fruit and a [pome](http://en.wikipedia.org/wiki/Pome), is a container for seeds. They
are designed to perform one function: *to create new trees*. If you start to look at the bigger picture,
the differences among the apples become meaningless. Shininess does not make one apple a better container than
another.

All of those inconsequential features we tend to look at are very much masking what is truly important, which
is the seed. These seeds are fundamentally the same in all apples and serve the same purpose and do so equally
well regardless of outer shell and presentation.

## Learning from Nature

In the software and engineering world, the concept of discussing irrelevant details that do not pertain to the
function of a system is called *bikeshedding*. That is, nobody argues over the function of the bike shed but
rather insist on its color.

In the software world, such discussion is only avoidable if we separate human opinion from computation, which is based upon fact. In
other words, if it were clear where the computation ended and the abstractions began, we could argue about the
expressive aspects of the code since changing them does not impact the choices on how the behavior is implemented.
In fact, it is the opposite, we argue precisely because we cannot see the line between computation and abstraction.

![Can the number of apples in the wild become overwhelming?](apples_full_smallest.png)

That is, in the case of the apple, there is always some seed that is fundamentally the same in every argument. There
is a level where you cannot argue against the behavior of some functionality. Array sort *must* take some set of data
and arrange it *some well-defined* way. How you sort the array, well.

If we again consider the apple, we would have seeds and skins. To make the metaphor a bit more concrete: *Seeds* would be 
strictly computation. This is code that
is written for performance and behavior. Its interface is unchangeable and well-known. You cannot argue about
the interface without making factual comparisons about performance or correctness. You must
prove you are correct with a metric or test.

Then you have the *skin*, or your abstraction layer. It is simply a language that maps expressions to the interface of the seed.
Since the seeds are well-known, many competing skins can exist. Since the interface is strict, many seeds can exist as well.
Both sides of the interface become interchangeable. And thus, bikeshedding becomes irrelevant to providing computation
since anyone can implement
a new skin without interfering with others.

If competing technologies would standardize to an interface (create a seed), then we could use either or both depending
on our needs without any effort. We could use the abstraction of one with the implementation of the other, in fact. I call
this *sustainable design*.

## Sustainable Design

To promote sustainable design, a software developer must consider the line drawn between expressing behavior and allowing
human expression through abstraction. To transform existing projects, collaboration between competitors (odd concept, eh?)
to define a seed is necessary. For instance, the back-ends for QT and GTK could be consolidated into a new project which implement
the same interface (seed) and then QT and GTK become the abstractions (skins) around it. In this case you could say C and C++ are then the
abstractions we choose. That's fine. In this world, the languages we choose are to better allow us to use existing code and get applications
written. We do not inherit a policy or a set of standard libraries that may or may not work well.

![Behaviors are what we care about in the end.](apples_drawing.svg)

To provide such a design when writing new projects, write them as libraries with functions that are very specifically tied to behavior. This way, alternative
implementations may exist. Use abstractions in a separate layer (create that skin with all the luster you want) that makes using the library cleaner. You benefit
by allowing for better experimentation with new abstractions while isolating core behaviors. You also gain the audience of many languages.
You also benefit from a much easier and more intuitive ability to refactor implementations while isolating them from their abstractions. To do this, simply
reimplement the interface and link in the new code.

If you are writing a library, determine if prior work exists and implement your library using that interface (make use of an existing seed.) You will gain quick
adoption by being able to assert facts about performance gains over existing implementations, while also being able to be
quickly used by existing programs that already make use of the other implementations. If you are writing an abstraction, you can leverage
existing implementations and focus only on refining the language (implement for humans without hindering performance facts.) Existing programs may not easily adopt your new abstraction,
but they do not need to in order to benefit from performance improvements. When you write abstractions, you are worried about new, that is non-existing, programs.

Once we have such modularity in place, we can write an infrastructure that manages the code. It can do objective analysis on whatever
benchmarks are deemed important and throw out code that doesn't perform and replace it with same random implementation that fares well.
This system will push good implementations over the bad and can even collectively rate them among machines. Code can be verified as
working before it is used to ensure bugs are limited. You as a developer may develop with one module, but in the future, without your
awareness, a bug was caught, patched, and automatically retrieved to build your software. Fantastic.

For an introduction to the language we need to describe behaviors, [read on](/posts/infrastructure).

### References

1. Corgi picture adorably used from [here](http://www.coloradocorgi.org).
2. Pictures shamelessly used from [here](http://www.foodsubs.com/Apples.html).

---
title: Kernels Without Abstractions
subtitle: A History and Motivation
author: ["wilkie"]
---

Throughout the last few decades, we have seen a boom in technology both in the
power of the machinery we can produce but also in the socialization and usage
of those machines. We have built extensive networks through both wires and
society that have greatly augmented our lives. Veritably, we have become
dependent on computers.

However, as we continue to grow and push technology to its limits, we must
always be willing to take a moment and look back to the center. All code, and
thus all networks and all protocols, once executed has an origin-- an arbiter--
a piece of hardware and software that is underneath it. It is through this
hardware/software layer that all code must navigate, understand, and in a very
true sense of the word, negotiate in order to run.

This layer has been referred to as the **operating system**, which by a broad
definition is *the software that manages system resources on the behalf of
applications*. Although most of the public may know or acknowledge this program
as being the ultimate authority of a machine, the operating system itself has
its own layers, abstractions and methods of isolation. The most important layer
is also the core component of the operating system: the **kernel**.

![The operating system is the component primarily involved in connecting humans to hardware.](people_and_hardware.png)

By being the core component, any decisions made in the kernel are essentially
*made for the application programmer* and cannot be easily thwarted, changed,
influenced, avoided, or destroyed. Because the decisions made at this layer
will reflect the time in which it was written, to understand the kernel design,
one is obligated to view the software alongside its **history**.

The fact of the matter here, and *alarmingly so*, is that the kernel design we
make use of nearly every day without protest is very outdated. It reflects a
series of decisions that in turn reflect a time long passed, especially
considering the speed technology develops. It is important to ask not only what
types of designs are better, but **why outdated designs persist**.

To answer both of those questions, we have to look back.

## UNIX

The kernels that are most prevalent today can all date their origins to one
system: **UNIX**. Written in 1969 at AT&T's Bell Labs, it quickly became
the most popular system for new machines. The design was motivated due to
a lack of standardization of hardware in that era. That is, there was a need
for an operating system that could be easily ported to new machines and could
easily communicate with heterogeneous machines.

To do this, Bell Labs designed a programming language called **C** that could
take a high level description of a normally low-level concept and could compile
this on a variety of hardware architectures. They then wrote UNIX using C and
published a specification that defines the system's behavior. [1]()

![border|Dennis Ritchie and Ken Thompson were the instrumental designers of UNIX](people_and_ritchie_thompson.png)

UNIX became widely successful through its efforts at standardization that
were necessary at the time. This allowed its use among stricter agencies such
as governments and corporations. Overall, such a process allowed hardware to
compete more freely, albeit crippling the competition of software.
Nevertheless, the managing group for UNIX called it a "critical enabler for
a revolution in information technology." [2]()

Another measure of its success is how it inadvertently ushered the way for the
first open source movement. Although designed and implemented by Bell Labs, the
parent company, AT&T, was restricted by law known as the "1956 Consent Decree"
due to anti-trust violations; they could never sell a product unrelated to
telephony such as software. They were forced to give away the source and the
system itself. [3]() As an aside, this also ensured that AT&T put the transistor, the
electrical component that is essential to all modern computing,
in the public domain as well.

## Linux

UNIX prospered for over two decades without any direct competition. However,
in the early 1990s, Linux was produced, from scratch, as a UNIX replacement.
Linux would over the next decade surge in popularity in many of same contexts
as UNIX. Why would a standardized operating system suddenly see competition
and motivation to replace it with a mostly identical copy?

The motivation was never a technical one. In 1983, the US government broke
up AT&T into regional Bell companies. In return, the prosecutors revoked the 1956 decree.
This allowed the smaller, yet just as organized AT&T to finally turn UNIX into
a product. [4]()

Overnight, an environment that was fueled by open source and free availability
was reduced to commercial enterprise. UNIXes must be licensed. UNIX must be
bought. Thousands of tools designed on UNIX promised to work on a multitude of
hardware could now not be used without licensing the UNIX operating system.

To counter this increasingly antagonistic environment, the second open source
movement spawned simultaneously from multiple, independent groups:
[GNU](http://www.gnu.org/), [BSD](http://bsd.org/) and
[Linux](https://www.kernel.org/). These groups established a set of legal
principles that would be attached to their code to ensure that such a condition
would not arise again.

Thus, **the motivation to produce a new UNIX was societal**. In order to maintain
the open tools already widely used, people had to create a substitute that
would stand the test of time. Linux, although originally just a hobby project
by Linus Torvalds, became the kernel for this new open-system coupled with GNU,
the operating system.

## The UNIX Abstraction

Through this timeline, we can see why UNIX was so successful. This system masked
the difficulties of the time: unstandardized hardware within an emerging
competitive hardware space. The resulting set of tools that only fit one system
design led to Linux's similar success in the modern era as it was essential to
have a replacement system.

However, we should now look at how well the decisions of UNIX, made over 40 years ago,
work today. The UNIX design plays off of a core philosophy: that everything in
the system be modeled by a unified abstraction called the **file**. Every
component of the system with particular behaviors (read, write, seek, etc) would
be reflected as the same type of object including networks, IPC, keyboard
input, program output, process metadata, hardware information, and, most
obviously, files from disk.

The merit of such an abstraction is substantial. Programs could be written to
merely expect and handle such an object. It just reads and writes freely knowing
that certain behaviors will occur predictably regardless of how the operating
system is actually performing the operations behind the scenes. Now, you can
write one small application to hash from a data stream in, say, a variant of
SHA2. This one program can hash from a network, from keyboard input, from a
file-- all without changes in its code. You simply supply it a "*file*."

This reduces program complexity noticeably, yet does not add too much user
complexity. The **shell**, a program that provides *the* human interface
between person and machine, offers to ability to **pipe**, that is direct output,
one program into another with a single character. For instance,
`cat music.mp3 | mplayer` will play the music file as a stream to mplayer. One
could just as easily piped a program to pull that stream from a website or have
a program randomly generate input
without requiring changes to the mplayer application.

**The UNIX philosophy** conveys this idea in a set of tenets:
"Make each program do one thing well" and "Store data in flat text files." [5]()
Essentially, programs should only perform one action-- hashing in our example.
And since one doesn't know what might read them, such streams should be as simple
as possible: text since a human or simple tool may need to read them.

## Monolithic Kernel

However, the benefits aside, there is still the question about *where* such
an abstraction should go. The UNIX model, which Linux emulates, is to place the
abstractions alongside the interfaces and hardware. A unified abstraction means
that the systems that are all tied together are all visible at the point of the
abstraction. This is known as the **monolithic model** and very easily argued
as the most naive type of kernel design. It is also a design used in Microsoft
Windows ([NT Kernel](https://en.wikipedia.org/wiki/Windows_Kernel)) and Apple's
OS X ([Darwin/XNU](https://en.wikipedia.org/wiki/Darwin_kernel)), albeit both
are converted microkernels.

One reason for this design is that this more naive approach to isolation (none)
is simply easier to develop. UNIX was also developed when
such ideas for systems were immature and too risky to implement.
Over the last 40 years, however, many techniques
have emerged that help designers manage system complexity in a way
that would avoid extra development effort.

Another is the misconception that monolithic kernels offer better performance.
I have already co-written [an essay](/posts/kaashoeks-law) about the error of
this assumption. In terms of system design, performance is neither a metric for
comparison nor gained through the combined elimination of isolation and addition
of strict, broad abstraction. It is honestly rather strange why systems
developers and researchers adhere so strongly to such an obviously flawed
understanding.

Some researchers have written essays discussing what can be read as a
frustration with this policy of comparing systems by their
performance. Dawson Engler, co-designer of
[Exokernel](https://en.wikipedia.org/wiki/Exokernel),
examines how the elimination of abstractions in the kernel and pushing them out
to a more diverse and complicated application space is equal in performance.
[6]()
James Larkey-Lahet, co-designer of [XOmB](http://xomb.org), gives an [informal
illustration](http://wolfwood.github.io/2013/06/20/interface-fidelity.html)
that the simplicity of low-level interfaces is a flexibility that can build
higher level components without loss. The existence of such systems also shows
that the monolithic argument is not a proven condition. It is a hypothesis
growing frail-- persisting simply by faith and fueled by an aging pride.

![The elements of a monolithic kernel are controlled by a small group.](people_and_monolithic_kernel.png)

Another, and perhaps most important,
condemnation of the monolithic design is its reflection of societal
structure. Such a broad abstraction places a line of control and influence
between application developers and kernel developers. Application developers
are placated by the abstraction and are dependent on kernel developers to
add special cases to gain the promised performance behind this line. Kernel
developers become maintainers for the arbitration of system resources, and
thus become arbiters themselves on how hardware can be utilized.

When application developers attempt to cross this line themselves, they are
generally met with aggression by a small group of maintainers.
In Windows, such an
inspection is not possible due to the protection and hiding of the source
code. However, Linux does not offer a great alternative regardless of its
open source status. One can see the source code and even discover improvements,
but the ability to have the change impact the greater whole requires
the approval of Linus Torvalds. He represents a societal
single-point-of-failure. He insists on
[verbal harassment](http://marc.info/?l=linux-kernel&m=137391401112514&w=2)
of people sending code he does not like. He berates people who use applications
and tools that he [does not like](http://archive09.linux.com/articles/114231).
He berates his own kernel developers for not reviewing code the exact
[manner he does](https://lkml.org/lkml/2012/12/23/75).

![Linus Torvalds, creator of Linux, holds control over decisions made in the kernel.](people_and_linux.png)

I will not accept any notion that Linus does this to ensure quality, or
discourage bad code, or in any way increases the quality of Linux by
acting this way. That is a fallacy, yes, but also irrelevant. It is pointing
out that we will go out of our way to placate behavior of a single person
because we somehow naively believe that one person can single-handedly
control the quality of a system that has over
[15 million lines of code](http://www.tomshardware.com/news/Linux-Linus-Torvalds-kernel-too-complex-code,14495.html)
and
[growing exponentially](http://ngc891.blogdns.net/?p=92).
Put more generally, monolithic design lends itself to hierarchical authority
where decisions important to most are made by so very few.

## Microkernel

There are a few alternative designs that can alleviate these social and
technical concerns without loss of performance. They are all motivated to
remove elements of control from centralized, monolithic systems. If monolithic
designs are improper because components have too much influence on other,
unrelated parts of the system, then one idea is to separate those concerns.

One such system is the **microkernel** which employs the idea of
**principle of least privilege**, widely considered an
essential principle of secure systems. [7]() Each component of the system
will run in its own, detached environment, but still have full privileges
over whatever hardware or resources it needs to work. For example, network access
would be provided not by some section of a large, rigid monolith, but rather
by a single entity devoted to the task. This program is only responsible for
handling network access on behalf of applications and cannot access or
manipulate any other part of the system.

The central component, the kernel itself, only needed to facilitate very
low-level access. This meant it was very small and more easily shown to be
correct. With a small kernel, the system could be made far more reliable.

In fact, the initial motivation for such a design over a monolithic kernel was for
reliability. If one section of the system failed or was incorrect, it could not
affect certain parts of the system. In fact, it could be restarted without
having to consider the ramifications to other systems components. The principle
of least privilege was eventually considered an essential component for
providing fault tolerance. [8]()

![The microkernel pushes more control to individual developers.](people_and_microkernel.png)

Yet, we must also point out the social effect of the microkernel's approach. It
effectively limited authority and distributed control. And just as the monolithic
design reflected its social surroundings, this design suggests that authority
and influence over a microkernel system would also contained within more limited
authority and benefit from a wider audience of programmers and designers.

However, microkernels have been around for decades, but not completely replaced
monolithic models in all situations. They have seen past success on smaller
devices, such as cellular phones since reliability is a concern there. Yet,
smartphones have skewed the systems usage more toward monolithic designs once
more.

There is no valid argument as to why microkernels have failed to such the
degree that they have. Now that the embedded space is falling to monolithic
designs, we are seeing a world where there are only three major system
designs in use altogether: Windows, iOS, and Linux.

However, if we were to design new systems that will give us both technical
efficiency and social influence and control, we should go even further than
the microkernel. We require more than just reliability. We must ensure
the most elimination of authority and the highest ability for the individual
to control the system.

## Exokernel

Most recently, a new class of system has emerged. The **exokernel** is a range
of designs that attempt to minimize the kernel to simply a security agent.
At its most narrow definition, an exokernel just ensures that any hardware that is
asked for by an application is received as long as it is deemed secure to do so.

Under that definition, the exokernel will never impose any restriction or rule
on how that hardware is used. For instance, a microkernel has system components that, although
isolated from the kernel, still impose a set of rules and arbitrate access.
With an exokernel, an application *could* use such a technique, or it could access
the hardware *directly*. This flexibility allows the exokernel to be the root
of any type of system as defined by application developers.

Therefore, the exokernel should not be seen as a separate design, but the
reduction of all designs and efforts that preceded it. A microkernel is an
exokernel where isolated applications take hardware for their own and force
other applications to communicate with it in order to use it. A monolithic
kernel can be seen as a large system that must have somewhere deep inside it
the pieces of an exokernel.

![The exokernel is the smallest design of the three and provides the most flexibility.](people_and_kernels.png)

In terms of reliablity, the exokernel not only provides the microkernel's
principle of
least privilege, but also the principle of least common mechanism. This states
that
a common, widely shared component of a system is more likely to widely
compromise security. [7]() The exokernel increases its reliability over a microkernel
by allowing
systems components to be diverse since application developers can patch or
even replace system components with their own implementations.

In terms of performance, the exokernel has been shown to be better than stock
monolithic kernels. For instance, the Cheetah exokernel asks the question
"How can you serve files from disk and eliminate ever copying the information?"
Such a task is impossible on conventional monolithic kernels. However, with
the flexibility of the exokernel, an application developer could take the disk
driver library and store the file to disk already separated into packets. These
packets are, of course, not filled in completely. They could then simply read
these packets off of disk into a buffer, set the empty fields in the packets,
and have a network driver library send them off.

This eliminates all copying of memory. It is simply read from disk with a
DMA transfer (fast) and sent. This improvement required no changes in the
underlying kernel and resulted in an increase in performance by 400-800%. [9]()

Of course, monolithic kernels could just add a separate and specialized path
to perform the same optimization. In conversation with Greg Ganger, who worked
on Cheetah, he suggested that a corporation had indeed done this and got the
same performance result. The idea, however, is not that an exokernel allows a
piece of software to do this, but rather it *gives any application developer
the ability to do this*.

![The elements of an exokernel are controlled by any application developer.](people_and_exokernel.png)

That brings us to the most important point, yet again: the exokernel provides a better
social platform for systems. In this design, the kernel has been reduced to
a tiny sliver. Applications can bypass the kernel's rules altogether and
directly access hardware. Application developers can completely rewrite
drivers if they so wish. That is, they have complete influence over the
system and thus have complete control over their own hardware.

## Interface over Abstraction

I posit that **the most important issue for systems design is to reduce the amount
of effort it takes an individual to subvert that system to their own will**. With
that in mind, the traditional monolithic model is the least ideal. It restricts
control and gives most of its authority to the kernel developers who understand
the underlying system the most.

The microkernel and then exokernel show us that the technical merits of the
monolithic approach are illusory. One can design a system where control and
authority can be granted to individuals through their applications and still
provide a very extensible, flexible and efficient system. In fact, exokernel
systems are shown to more easily provide greater efficiency than monolithic
designs.

What we can take away from this discussion toward the creation of new systems
is that it is becoming clearer that minimal interfaces are superior to
unified abstractions. An **interface** being a thin layer that describes
exactly what occurs on the other side, whereas an **abstraction** is a description
of behavior that is guaranteed by the system by any means. Interfaces must exist,
yet abstractions can be rebuilt upon any interface or abandoned completely.

For example, one can always build the UNIX abstraction on an exokernel.
If you prefer files or wish to keep the ecosystem of tools we have going without
changing their source code, then you can. You can always create that
same abstraction with a minimal interface around hardware. Trivially: UNIX itself.
Remember that the exokernel does not impose any rules upon application space.
However, such an abstraction *being* the system could be problematic. By not
having this abstraction known to a kernel, or even the system at large, an
application can choose to ignore it when it is necessary to do so.

This suggests that the individual can ignore system developers whenever they
wish to do so. No longer can one small group decide a scheduling policy, or
how to buffer a network socket to fit file access abstractions, or the manner
in which one speaks to hardware. The power over hardware is directly in the
hands of those that hold it.

## References

1. [Online, pdf](http://www.unix.org/version3/single_unix_v3_wp.pdf). *The Single UNIX Specification, Version 3*. The Open Group. May 2003.
2. [Online](http://www.unix.org/whitepapers/wp-0897.html). *The UNIX Operating System: Mature, Standarized and State-of-the-Art*. The UNIX System Cooperative Promotion Group.
3. *United States v. Western Electric Co.*. 1956 Trade Cas. (CCH) ¶ 68,246 (D.N.J. 1956)
4. *United States v. AT&T*, 552 F. Supp. 131 (D.D.C. 1982), aff'd sub nom. *Maryland v. United States*, 460 U.S. 1001 (1983)
5. *The Unix Philosophy*. Mike Gancarz. ISBN 1555581234. December 1994.
6. [Online, pdf](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.202.6733&rep=rep1&type=pdf). *Exterminate all operating system abstractions*. Dawson R. Engler, M. Frans Kaashoek. 1995.
7. [Online, pdf](http://zoo.cs.yale.edu/classes/cs422/2010/bib/saltzer75protection.pdf). *The Protection of Information in Computer Systems*. Jerome H. Saltzer and Michael D. Schroeder. 1975.
8. [Online, pdf, self-hosted](/images/kernels_without_abstractions_general/ftos.pdf). *Fault Tolerant Operating Systems*. Peter Denning. August 1976.
9. [Online, html](http://pdos.csail.mit.edu/papers/exo-sosp97/exo-sosp97.html). *Application Performance and Flexibility on Exokernel Systems*. M. Frans Kaashoek, Dawson R. Engler, Gregory R. Ganger, Héctor M. Briceño, Russell Hunt, David Mazières, Thomas Pinckney, Robert Grimm, John Jannotti, and Kenneth Mackenzie. 1997.

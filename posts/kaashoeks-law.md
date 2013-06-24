---
title: Stop Benchmarking Your Software Design
author: ["wilkie", "wolfwood"]
gittip: ["wilkie", "wolfwood"]
date: 2013-06-23
tags: ["programming", "programming/design"]
summary: ""
---

In our world, programmers look into producing better designs and software practices
in order to push progress. Researchers have generally accepted that we compare two designs by measuring
their relative performance. The metrics consist not only of the obvious time and space, but also power,
safety, and so on. In such cases, a new approach may come along for which programmers
can use, yet its authors only compare this new approach to priors and suggest it is "faster" by illustrating
some self-selected benchmarks. However, performance testing is not a viable metric to sufficiently show that
one interface or software design is better than another. It fact, it may dangerously dilute
our understanding of "better" by overestimating the absoluteness of any one result and
distracting us from other perhaps more important metrics unrelated to implementation performance.

## How we evaluate operating systems

As a case study, systems researchers should note that operating systems do not optimize for the continuous redesign that all systems must
undergo to adapt to new advancements in hardware, which has to be almost instantaneously
exploited by the software using it. Furthermore, operating systems must also counter weaknesses
in the OS design that impact the software efficiency demanded by application developers.
That is, operating systems must continuously adapt, yet we do not evaluate their adaptability.

When we augment an operating system, we merely compare the result against the prior form by
running a suite of identical benchmarks against each system. We look for typical performance
benchmarks and any indication that bottlenecks, locks, and resources have been minimized.

However, this method of evaluation is meaningless in the grand scheme of the software system.
This process fails to control for the changing nature of systems as a whole. Operating systems
must change, and their ability to change must be higher than that of the rate of change of
hardware and the changing needs of people. An augmentation of a system that hinders this
rate of software change will only build an ineffective system around it.

## How to evaluate operating systems

Because operating systems are in a constant state of flux, traditional performance metrics such as
response time, latency, power, and reliability represent only one particular way to evaluate such
systems. These metrics do not give definitive comparative information about how the design
underlying a particular OS competes against other software architectures. In order to quantify it,
we not only should look at these metrics, but must also acknowledge developer effort as a factor.

Developer effort is a measurement of the number of hours invested to achieve a given level of
runtime performance and the increase of performance of the piece of software. Consider adding
support for a new network card for two different operating systems. The cost to add support for
the hardware is different for each system depending on the OS design. Assuming that the final
performance of the driver, after tuning, will be the same, two options should be considered: a new
network driver, or adapting an existing network driver. If developer effort is too high, then it may
*not be cost effective to adapt a system*. In certain cases, developer effort may be so overwhelming
that it may be **more** cost effective to start from scratch.

## Kaashoek's Law

We propose to evaluate OS design by tuning two systems until they achieve the same level
of performance. In that case, the superior design is the one that required less developer effort.
We posit that level of achievable performance is a constant across system architectures, therefore
human effort is the only meaningful metric of comparison. To substantiate the above claim, we
note that recent work on operating systems has shown that it is futile to use traditional evaluation
approaches to make prescriptive statements about software architecture. For instance, despite
the concerns above, about multicore support in traditional OSes, given sufficient re-engineering
effort, Linux kernel limitations on scalability can be overcome [1]. We propose a generalization
of this finding, which we call **Kaashoek’s Law**\*: the notion that given enough development time,
any piece of software can overcome a performance issue or feature deficit. To answer those who
attempt to differentiate operating systems not by performance but by feature set, we propose
**Ganger’s Corollary**&dagger;: anything you can do they can do; given enough time, they will do it.

To the best of our knowledge, this concept has not been formally stated, however, evidence
abounds:

* In 2000, the SMPng project was launched as it became clear that FreeBSD’s SMP scalability was being hindered by a global kernel lock. As a part of this project, concluded in 2007, the
bottleneck was averted in most cases leading to improved performance through better scalability
[2].
* Microkernel design was much maligned due to the added overhead of context switching
for IPC. However, the L4 microkernel has progressed to the point where Wombat (Linux 2.6 on
L4) outperforms the Linux kernel on ARM due to fast address space switching [3].
* Extensible systems often use HTTPD performance to demonstrate advantages over a monolithic kernel.
However, [4] presents a compelling argument that good design and kernel optimizations in a
monolithic kernel can achieve the same HTTPD performance.

While it makes perfect sense to judge these techniques by their performance improvement,
this evaluation does not infer anything about the quality of the underlying OS design. Instead,
these techniques suggest that all systems are capable of providing the same level of performance.
Therefore, this asserts our position that the job of the OS designer is to **minimize the amount of
developer effort necessary to provide these performance optimization techniques**.

## Modern OS Evaluation

In our network driver case above, a typical research study would build the network driver on Linux
and compare with the prior driver. The study would control for environment by using the same machine
and thus exact hardware, but run two different Linux images where only the driver differs. Then the
researcher would run a benchmark suite that would run a gamut of popular networked applications
on a variety of workloads. The researcher would then highlight wins, losses, and ties and explain each
in the resulting paper.

Yet, if this driver was a result of new hardware, this research would not be able to conclude the
interference of the kernel abstractions. It may become the case that five years later, running the
same experiment using a newer version of Linux will allow the older driver to overcome the newer, or
produce a situation where an older idea can suddenly improve the researcher's driver.

More to the point, a new kernel design for a new operating system can never compare itself to something
established such as Linux. Over time, a new design can always overcome its flaws due to immaturity and
defeat an established work. This is Kaashoek's Law in work. Almost instantly, a researched work comparing
two operating systems will be invalidated. Only an ongoing comparison can ever be valid. Only by looking
at the developer effort (the rate of improvement) can we draw any conclusions about the effectiveness of
system design.

### Footnotes

* \* We, and not Kaashoek himself, call it Kaashoek’s Law, because it was inspired by his talk at CMU during the
ASPLOS 2011 PC meeting.

* &dagger; Similarly, this statement was inpired by a private communication with Greg Ganger.

### References

1. S. Boyd-Wickizer, A. Clements, Y. Mao, A. Pesterev, M. F. Kaashoek, R. Morris, and N. Zeldovich. An analysis of linux scalability to many cores. In *Proceedings of the 9th USENIX
Symposium on Operating Systems Design and Implementation* (OSDI ’10), Vancouver, Canada, October 2010.

2. Freebsd smpng project. http://freebsd.org/smp.

3. NICTA. L4 performance. http://ertos.nicta.com.au/research/l4/performance.pml.

4. P. Druschel, V. Pai, and W. Zwaenepoel. Extensible kernels are leading os research astray.
In *Proceedings of the 6th Workshop on Hot Topics in Operating Systems* (HotOS-VI), pages 38–,
Washington, DC, USA, 1997. IEEE Computer Society.

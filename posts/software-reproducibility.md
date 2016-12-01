---
title: "Software Reproducibility"
subtitle: "Evaluating Sustainability of Archived Software"
---

90% of scientists surveyed will tell you that we are in a time of a reproducibility [crisis](http://www.nature.com/news/1-500-scientists-lift-the-lid-on-reproducibility-1.19970).
The numbers are bleak. Within the field of computer science, where digital science is and has always been prevalent, the answer is the same. Only 32% of recent computer science studies have been
[shown to be repeatable](http://cacm.acm.org/magazines/2016/3/198873-repeatability-in-computer-systems-research/fulltext),
let alone reproducible. The Nature study shows that scientists see various causes for this issue: poor analysis, publishing pressure, and unavailable code.

At the end of the day, peer-review has largely missed or possibly ignored many of the factors listed. Reviewers just don't have the tools to properly account for factors that
contribute to a lack of repeatability. Furthermore, it is becoming more obvious that metrics for evaluating a digital experiment are vastly insufficient. This is allowing poor
experimentation, and the more damning yet prevelant "use-once" style experimentation, seep into the scientific corpora.

Others have proposed metrics of evaluating the strength of a digital experiment. C. Titus Brown makes a quick note on the 
["Ladder of Academic Software Reusability and Sustainability"](http://ivory.idyll.org/blog/ladder-of-academic-software-notsuck.html) where
he describes a path from the most minimal software artifact to one that is truly distributable. Neil Chue Hong expands upon the
same spirit and lists the ["Five Stars of Research Software"](https://www.software.ac.uk/blog/2016-10-07-five-stars-research-software) which
gives 5 levels for a software artifact based on how well-defined and runnable it is. Both articles promise a follow-up, but none ever do, leaving us in a position where it is
clear that metrics are desired but none are devised. I will formally define and fully illustrate such a metric.

## The Scientific Method

To understand what we need from a software-based research artifact, we should first understand what science requires from us. When
أبو علي، الحسن بن الحسن بن الهيث (Referred by the Latinization Alhacen after) wrote his Book of Optics throughout his life in the 10th and 11th centuries,
Alhacen determined that his experimentation should not simply be believed, but rather it should be doubted. He is translated saying "The duty of the man who investigates the writings of scientists,
if learning the truth is his goal, is to make himself an enemy of all that he reads, and ... attack it from every side. He should also suspect himself as he performs his critical
examination of it, so that he may avoid falling into either prejudice or leniency."

![right|border|Ibn al-Haytham, a significant pioneer in the field of mathematics, optics, and astronomy.](Alhazen%2C_the_Persian.gif)

This message of doubt driving understanding along with Alhacen's principled controlled testing is the basis of the modern scientific method. You propose, test, measure, record,
and repeat. This basic set of steps is what all scientists must follow and is what peer-review is meant to evaluate. Yet, at the end of the day, that last step is both cruicial and too often ignored!

Reproduciblity is the ability for the same conclusion to be met independently using new data and potentially new methodology. For instance, statistical p-values, which vaguely corrolate with the
probability of a test being a false-positive or inconclusive, are absolutely meaningless without reproduciblity, because a p-value is a piece of litmus, not data, where it may implicate a conclusion, yet it never confirms in isolation. Repetition should always lower the p-value, and thus lower the probability of finding a result that may validate the null hypothesis, or expose either a fraud or false-positive. Therefore, without reproducing a scientific
result, you can neither trust the original result on its own basis, nor increase the confidence of the conclusion at any point.

And when it comes to digital science, the reliance on computers and software to quickly perform operations and simulations that would be impractical otherwise compounds the problem.
Suddenly, the accountability has to do with the quality of the code. And yet, in Computer Science, only 35% of recent studies made code available. Another 22% gave code when asked but
a separate 36% said "No" to that request. And finally 7% of researchers ignored the question altogether. If Computer Science can't seem to publish their code, then it is fair to assume 
the scientific world at large must be bleak indeed.

## The Reproducibility Cycle

One important aspect to reproducibility is process and the management of data. Unlike typical archives, digital archives provide artifacts that can be copied and reused without any
threat to their destruction. They are an unlimited resource when their sustainability is ensured. Therefore, a good software archival system will not get in the way of the creative nor
scientific process.

Once again, much has been written on the proper means of maintaining research data toward the effort of reproducibility. Recent efforts to describe this process have concerned themselves
with the digital landscape. The [Jisc guide for managing research data](https://www.jisc.ac.uk/guides/how-and-why-you-should-manage-your-research-data) is particularly robust. Here they
describe the Reproducibility Cycle which concisely visualizes the connection between the scientific method, research data methods, and the services built around them. Importantly, this is
indeed a cycle. Science breeds science; the provenance of even the most recent findings have roots in the Einsteinian academies, Newtonian Renaissance, and Islamic Golden Age.

![The research lifecycle provides space for several necessary services. (Based on the Jisc graphic linked above)](reproducibility-cycle-final.svg)

The role of software in the research cycle has not been thoroughly discussed. With research software being such a large part of experimentation, even as far as being the entire research
artifact for a result, it touches every aspect of the scientific lifecycle. Software is designed, it collects, it offers collaboration and exploration of results, it must be stored in a
way that it can be reused, it should certainly be published and reviewed (and there are [processes for this](http://www.acm.org/publications/policies/artifact-review-badging) and [multiple](http://www.journals.elsevier.com/softwarex/) [software](http://openresearchsoftware.metajnl.com/) [journals](http://joss.theoj.org/)), and finally it must be discoverable and citable. We must preserve the
software!

For a software archive, it may seem that all you need is to store the code and some description of the artifact to preserve the software for the entire lifecycle. Yet, this raises some
concerns about what "reusable" and "preserved" mean. There are degrees to which software is preserved. Just having the code may be enough to preserve the intention or meaning of a research
object, but does it improve accountability? Can you have reuse if the code no longer runs without significant effort? And when the effort is applied, as in porting to a newer computer or
operating system, does it change the meaning of the artifact? Can you say such a change doesn't change its correctness?

This is the new set of problems and software philosophy that scientists must grapple if we are to solve this modern reproducibility crisis. To that end, let's look deeply in the various degrees
software is preserved.

## Degrees of Sustainability for Archived Software

![!](reproducibility-ladder.svg)

The bottom two degrees are something for us all to avoid. A **lost** artifact is one that existed at some point but was unfortunately destroyed. It is hard to determine how many pieces of software are unrecoverable. The goal of a good archival system will be to make replication trivial. A **hidden** artifact is only slightly better than a lost artifact. It is one that exists somewhere, but has been hoarded, and might some day come to light. A good archival system will be artifacts highly available.

For the remaining degrees, artifacts will build up a set of qualities that make them more sustainable in the long-term. Although it can be argued that these aren't perfect subsets of one another, the argument presented here is that one degree so heavily demands the previous degrees that lacking them makes the artifact unreasonable to use for the purposes of repeatable and reproducible science and generally have far weaker sustainability.

**Shareable** artifacts are ones that have been packaged to be copied and migrated. Somebody has made some effort to isolate the software such that the code that the author has written is packaged together.
Placing code in a repository or a zip/tar file is to make the software shareable. A failed artifact will simply be incomplete.

**Retrievable** artifacts are *shared* packages that are able to be installed on another machine. If you can obtain a copy of the artifact and unpackage the contents as they are intended, then you have a chance to use that artifact.
A failed artifact that is shareable but not retrievable is one that has been archived on media that cannot be read because no media reader exists, or one archived with a file format that is no longer understood. 
Retrieving an incomplete artifact obviously doesn't contribute to that software's sustainability.

**Deployable** artifacts can be executed when *retrieved* by a different machine. A retrieved artifact that has enough information to acquire dependencies and execute in some capacity is a successful artifact. It might not work as intended or for every input, but it runs and performs as least some of its intended features.
A failed artifact can be retrieved but has issues that prevent it from running such as untrue assumptions about environment, unmet hardware requirements or obsolesence, or unknown software dependencies.
A piece of software that can be executed but not retrieved in any way does not add to that software's overall sustainability.

**Repeatable** artifacts match historical behavior when *executed* with previous input. The artifact must include some basis of comparison, such as a log or set of tests. This is the first milestone for the research lifecycle. A repeatable artifact can provide independent *replication* of a specific scientific result.
A failed artifact has inconsistent behavior, either because there is unintentional non-determinism or an new, untested or deficient environment influences the result.
Repeatable artifacts must obviously execute and imply deployability.

**Modifiable** artifacts have *repeatable* behavior that is reconfigurable by some mechanism. Now that the software reliably runs, people can start to explore the bounds of the artifact. They can try new things and generate completely new results. Being able to change the behavior of software without fundamentally changing the software itself is important because you want to verify the software, a timely and complex process, only once.
A failed artifact cannot reliably handle new input or modification in a reasonable fashion, or requires too much technical expertise to change without hurting confidence in its result.
Furthermore, a program that can be modified, but not run, is like a paperweight that changes color.

**Derivable** artifacts can be *modified* beyond their intended use to create new artifacts. This implies that working software artifacts can be expanded and improved. The scientific process relies on incrementation that converges confidently toward a conclusion. Reinventation slows down the process and requires a great deal of verification. Therefore, an object that can be reused in the creation of newer, bigger things is necessary. Particularly when combining or expanding smaller models in order to reproduce the findings of larger models. The source code of objects must be open, and unrestricted.
A failed artifact either has legal issues surrounding derivation, has source that has been obscured too much, or does not have a working, repeatable build process.
Any software that is derivable can add modifiability. It this way, a derivable object is modifiable in a stronger sense.

**Verifiable** artifacts have had their behavior corroborated (and have themselves corroborated) by independent,
related artifacts. This is the entire point of software sustainability in the scientific space. Software artifacts cannot be trusted in isolation. Only software experimentation verified by independent studies and models is truly known to be reliable and the scientific result it produces accountable. Only artifacts which are shareable, retrievable, deployable, repeatable, modifiable, and derivable can be audited and verified confidently to be part of a sustainable, reproducible experiment.
A failed artifact is one determined illegitimate due to a reproducibilty study or verification process. It is computationally difficult, if not impossible, to know that an artifact is not verifiable, only that it has not yet been verified.
Also, derivability is essential as software that does not have available code would be impractical to verify and thoroughly audit.

## Evaluating Software Archival Systems and Tools

Immediately, we note that people may have an issue with Verifiable requiring an artifact be Derivable. The reason for this, is that an artifact that has not been verified or shown to be incorrect due to modelling or human error is only redeemable if one can use it to derive a better version. It must be open enough to allow that. If it was not, the lack of verifiability would mean it would be useless for anything other than a cautionary
tale as to why artifacts should be open, and it might as well not be sustained at all or have any of the other qualities.

In fact, it is important that a verifiable object be derivable just as much as noting that a retrievable artifact that is incomplete might as well not be considered retrievable. A retrievable object must be shareable. A Deployable artifact must be retrievable (if it can't be retrieved, who cares if it can run?) and so on. The features here are, as C. Titus Brown also illustrated, a ladder. An artifact picks up attributes as it becomes more and more sustainable. Reproducible science must use sustainable software.

Therefore, how systems promote sustainable software is a worthy metric to evaluate that system.
Some software archives are nothing more than traditional digital archives or code repositories.
There has been no formal method of both showing that such a system is insufficient for software and what it lacks.

![border|How do we evaluate the options?](archival-stuff.png)

The current state of scientific archives is in the teething stage of development. Biting off a little here and there but not
quite going to any extreme. These archives are meant to supplement traditional publishing houses to host related code and data
that doesn't fit in our stubborn paper-driven world. Commercial services such as GitHub don't have a reliable interest in preservation and
so have been avoided and then reinvented. For example, archives such as [Zenodo](https://zenodo.org/), [MyExperiment](http://www.myexperiment.org/home),
[RunMyCode](http://www.runmycode.org/) (which does not run code), [ResearchCompendia](http://researchcompendia.org/) (defunct), and
[Dataverse](http://dataverse.org/) vary in size and adoption, but more or less provide the same type of service: data and metadata hosting. They
support code only in that code is a form of data.

Tools for software sustainability are mostly centered around industry interests. For instance, repeatable builds and consistent deployment or staging of software.
The need to test software while preserving or standardizing the environment has pushed the development of mechanisms for software isolation such as
[FreeBSD Jails](https://www.freebsd.org/doc/handbook/jails.html),
[LXC](https://linuxcontainers.org/), and larger tools such as [Docker](https://www.docker.com/),
[Singularity](http://singularity.lbl.gov/index.html) (not to be confused with
[Singularity](http://getsingularity.com/), an extension to Mesos), and CoreOS [Rocket](https://coreos.com/blog/rocket/).
Each tool providing some form of "containerization" which is a form of lightweight virtualization that isolates a program from the other running tasks and from the file system.
Further systems that deploy and run such containers on a cluster have been built such as [Mesosphere](https://mesosphere.com/) and Google's [Kubernetes](http://kubernetes.io/).

We can make some generic claims about how well software runs within the containers as far as sustainability is concerned. Yet, it is difficult to make a claim that the software
is preserved in the long-term. In that sense, evaluating these types of tools is difficult. Since these projects are generally not concerned about preservation or even availability
(though, docker does provide a hosting platform), software preserved using them doesn't get past the "retrievable" stage. Therefore, frustratingly, and seemingly contradictory, the tools don't actually contribute much to this goal themselves.
However, an archival system can leverage the tools to provide higher levels of software sustainability.

For instance, an archive system can use Docker to isolate the environment such that it can make stronger claims about the deployability of a software artifact. The archive system would
need to preserve Docker to some effect (and any base images or containers it uses) in order to make that claim. Essentially, the overall system need not reinvent a complete system
from scratch, but just packaging your software in Docker or a virtual machine is not enough. In other words, virtualization/containerization tools are what they are: tools. Not archival or preservation solutions.

## Concluding Remarks

The scientific and library/archive community has made quite a lot of progress in the last ten years toward the evangelism and evaluation of reproducible digital science.
Toward this end, archives have come (and some have gone!) to bring us closer to this goal. Yet, no evaluation or metric has been
reasonably put forward to guide us.

I propose we measure archives by catagorizing them by how well they fit within a research lifecycle and by how well they preserve running software.
To this end, the degrees of software sustainability above may judge how well an archive of interactive/executable artifacts fits these goals.
Data repositories, such as RunMyCode, merely hold data. They only provide an archive for "retrievable" software.

Executable archives such as ones built around [bwFLA](http://bw-fla.uni-freiburg.de/) and used by [Rhizome](http://rhizome.org/editorial/2015/apr/17/theresa-duncan-cd-roms-are-now-playable-online/),
The [Olive Archive](https://olivearchive.org/), and the javascript based emulation provided by [The Internet Archive](https://archive.org/details/software) offer more practical and robust
forms of interaction. These allow people to run the artifacts, such as older games and scientific tools, through either a web browser or virtual machine client. Therefore, they are an archive
of "repeatable" software.

They don't yet allow much configuration for the artifacts and generally give you an all-or-nothing packaged version. Much of the time, the concern is with proprietary artifacts and not much attention
is placed on even being able to retrieve the artifact outside of the streaming mechanism, let alone the code. This is the next step for software archives. The ability to see and affect the
code itself and to use the tools to generate content that is itself archived. For example, being able to run an old art program and having any art saved to itself be preserved along with provenance that
points back to the art program. Being able to take the code from that old program and create a modern one, which we obviously also archive! Deep inspection of the software allows for verification and gives us all a means of producing work which is part of a
larger cycle of creation and progress.

Can we achieve an archive of derivable software? A library that updates software and keeps track of verified software and can keep track of the provenance that led to that decision? I think we certainly
can. And that this is the goal for the emerging field of interactive software archival.

Let's build better archives.

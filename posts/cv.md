---
title: Curriculum Vitae
author: wilkie
date: 2012-11-11
tags: ["personal"]
---

My name is Dave Wilkinson, better known as ***wilkie***. I have a strong desire to develop technology that can be accessed by anybody and push progress of a public commons without constraint. I specialize and develop low-level distributed systems that reduce barriers of entry and push more control, authority, and rights to those that use the system. My overall goal is to provide a system that guarantees the freedom to compute.

## Education

* **College**: University of Pittsburgh, 2005-2009
* **Degree**: Bachelors with Honors, Computer Science
* **Post-Bachelors**: Graduate study in CS, University of Pittsburgh, 2009-2012

## Speaking

* ***Operating System Fundamentalism*** - *SOSP 2011* - Stressed new concerns and models for modern OS/kernel architectures to an audience of established systems researchers at a top systems conference. [Paper](http://sigops.org/sosp/sosp11/posters/summaries/sosp11-final39.pdf). [Poster](http://sigops.org/sosp/sosp11/posters/posters/sosp11-display-poster39.pdf).

* ***XOmB+Djehuty: Platform for Code Remix*** - *CSA 2013* - Discussed an operating system architecture that promotes better diversity and involvement of non-systems people in its creation and maintenance and how to promote better code reuse. Afterward, my co-speaker and I were invited to help plan and review proposals for the panel for next year. [Slides](https://speakerdeck.com/wilkie/xomb-plus-djehuty-a-remix-os-for-computation-liberation).

* ***Social Computation and the Freedom to Compute*** - *PGHTechFest 2013* - A political view of the open source culture and how it actively discourages participation from the commons and is driven from a centralized, authoritarian development model and new models of systems that would solve these problems. [Slides](https://speakerdeck.com/wilkie/social-computation-the-freedom-to-compute).

## Writing

* ***XOmB: an Exokernel for Modern 64-bit Multicore Hardware*** - WSO - VII Workshop de Sistemas Operacionais - Belo Horizonte, Brasil - July, 2010. Describes the system architecture, technical merit, and novelty of a new kernel built without the legacy of prior abstractions. [Full paper](http://www.inf.pucminas.br/sbc2010/anais/pdf/wso/st02_02.pdf).

* ***Balancing Performance, Accuracy, and Precision for Secure Cloud Transactions*** - IEEE Transactions on Parallel and Distributed Systems - August, 2013. Proposes new database consistency algorithms for emerging distributed data solutions to account for finer-grained privacy control within an eventually consistent environment. [Full paper](/images/cv/TPDS_revision.pdf).

* ***Studying Speedrunners*** - Game Developer Magazine - March, 2013. A look at the bugs in the popular game DOOM that have been discovered over the years by enthusiast players. I examine the released source code to explain why certain tricks work and discuss why having bugs in your games can be part of its appeal, not a drawback or mistake. [Full article](http://gamedeveloper.texterity.com/gamedeveloper/201303?pg=57#article_id=262899).

## Teaching

* ***Introduction to Java*** - Instructor, University of Pittsburgh - 2010-2011 - Taught for 3 consecutive semesters with an above-average student-evaluated teaching rating. Instructs beginner level Java programming for non-computer-science majors. Had full control over curriculum and planning devising homework assignments and exams. My curriculum experimented with interweaving computer art and culture into the discussion. One of my more celebrated/hated classes involved a group discussion of ethics involving free information and hacktivism, types of activities that programming skill may unlock.

* ***Introduction to Systems*** - Lab Instructor, University of Pittsburgh - 2011-2012 - Taught for 2 semesters. Taught C to computer science minors/majors with an emphasis on systems and low-level programming. Included labs on Makefiles, filesystem programming, and adding system calls to Linux.

* ***Open Source Game Coding Competition*** - Event organizer - 2009-present - Yearly competition that attracts around 30 participants per year devoted to beginners to motivate them to form teams with experienced programmers to pair and build video games to be released open source to help jumpstart similar beginners outside of the competition. I won the competition in its 2nd year and have ran the competition since then for the last 4 years. My responsibilities are to fund the event through sponsorship, advertise, organize judging, and make sure everybody is having fun. [Website](http://osgcc.github.io). [Competition Code](https://github.com/osgcc).

## Work Experience

* ***Software Engineer*** - Vocollect - Summer of 2008 - Worked on their flagship product, a hand-held, voice-activated, programmable device typically used for warehouse workers or carriers for hands-free inventory. Embedded C/C++. Rewrote very low-level, core pieces of code to optimize and reduce initialization time by around 60 percent, a significant feat.

* ***Freelance Work*** - Summer of 2009 - Implemented a contract work within the period of two weeks to develop an iPhone application generator for the syndication of RSS/Atom feeds of audio/video podcasts into a custom styled app used to play the various episodes.

* ***Student Researcher*** - University of Pittsburgh - 2009-2012 - Researched operating system designs and distributed systems with an emphasis on building new systems.

* ***Teaching Fellow*** - University of Pittsburgh - 2010-2012 - Responsible for curriculum in introductory programming courses. See [Teaching](#teaching) section.


## Software

### rstat.us (ruby/rails, javascript/coffeescript) - Web Application

* ***Source:*** [github](https://github.com/hotsh/rstat.us)

![right|border|!rstatus screenshot](rstatus.png)

A free and open-source, federated microblogging platform I founded with a team of friends, resembling twitter and status.net, that emphasizes personal use and self-ownership of data. That is, this software is designed to be easily deployed on a hosting service or a personal server. The ownership and authority over the content is primarily in the hands of the individual, instead of a company that runs a centralized service such as twitter. It uses the [ostatus](http://www.w3.org/community/ostatus/) protocol to distribute content within a social graph to nodes and servers maintained by other people.

Considering it is a social system at heart that attempts to liberate data to individuals, rstat.us became very successful. The rate of adoption out-paced app.net with 6,000 unique users in our opening week. We have over 60 [contributors](https://rstat.us/about) from all across the world which further suggests its appeal and need in the global world. I am a core maintainer along with [Carol Nichols](http://carol-nichols.com/), and help organize new feature efforts and review pull requests, although our development model allows for any past contributor to commit and merge at any time.

### lotus (ruby/sinatra, javascript) - Web Framework

* ***Source:*** [github](https://github.com/hotsh/lotus)

![right|border|!lotus screenshot](lotus.png)

Building off of the experience of building rstat.us, I started the Lotus project. While rstat.us was engineered to be a federated microblogging solution, it was not very conducive to building new types of federated, self-hosted websites. Therefore, I ripped out the backend of rstat.us and refined it. Lotus contains several sub-repositories that will allow you to build a federated website using simple building blocks.

This is very much an experiment in modular MVC. The [lotus](https://github.com/hotsh/lotus) base project contains the non-persistent models which define the data and relationships, useful for clients. The [lotus-mongodb](https://github.com/hotsh/lotus-mongodb) project adds persistence using mongodb, a useful key-value store for extensible data (where the schema is unknown.) The [rack-lotus](https://github.com/hotsh/rack-lotus) project contains the controllers and routes that drive the web API. To give you a base to start out from, the [lotus-site](https://github.com/hotsh/lotus-site) project gives a set of views and javascript already designed to produce a responsive website that can be easily extended. Furthermore, the [lotus-i18n](https://github.com/hotsh/lotus-i18n) project adds internationalization that will be shared among all federated sites.

With these base projects I have implemented a distributed, federated social framework for microblogging (tweets), blogging, and image sharing. It will be easy to add other types of sharable objects, and external systems hosted by others will gracefully support them even if they do not understand them. Any site that you produce with the framework will be easily deployable to enjoy a low barrier of entry for non-technical folks.

### xomb (D, assembly) - Systems Design and Implementation

* ***Source:*** [github](https://github.com/xomboverlord/xomb)

![right|border|!xomb screenshot](xomb.png)

XOmB is a novel exokernel-inspired operating system project aimed at developing the most
flexible OS architecture possible as a means of building more efficient systems and building systems more efficiently.
Our immediate aim is to build a research and education platform, but by doing so we contend XOmB offers the
opportunity to develop more streamlined OS implementations for general purpose and server use. The flexibility we
aim to achieve should allow the same kernel to be deployed in many scenarios, adapting the userspace if needed.

The design of the XOmB kernel does not impose any unnecessary abstractions, and thus avoids hiding
state from the applications or incurring additional overheads (e.g. implementing a database on top of a filesystem
introduces numerous inefficiencies). Due to minimizing abstractions imposed by the OS, XOmB will be able to
provide a software base sufficient to build new interfaces without having to tear down or re-engineer the kernel.

We (myself and [James Larkby-Lahet](http://wolfwood.github.io/2013/06/20/interface-fidelity.html)) diverge significantly from prior efforts in our treatment of state with the XOmB exokernel. We relegate even
more kernel code to userspace libraries, which are untrusted and can be customized (completely modified or replaced)
on a per-application basis. We do so by extracting two key components of the exokernel: device drivers and system
state. These components are implemented in userspace where they are met with easy debugging and hardware enforced safety.

### gutenberg (ruby, javascript/jQuery) - Content Generation

* ***Source:*** [github](https://github.com/wilkie/gutenberg)

![right|border|!gutenberg screenshot](gutenberg.png)

I am very interested in hypermedia and exploring its use to transform traditional media into something more substantial in this information era. To that end, *gutenberg* is a project that turns a flavor of [markdown](http://daringfireball.net/projects/markdown/) into a website that is typeset using javascript code on the client side. The idea is that books can contain links to other books and other external information and to provide, eventually, a seamless experience in reading this information.

The project consists of ruby code that will render the markup into html, css, and images and package them with javascript. It is designed such that without javascript or using a screenreader (typically used by blind individuals), the book is still readable as a basic webpage. The book output can also be easily parsed by html parsers and generates a very minimal markup. The rest of the work to make the book into a dynamic frame with full typesetting is done completely in javascript. Styling can be provided by stylesheets and images provided by the library or easily extended by adding custom css and javascript.

An example of the project in action can be found [here](http://derailingfordummi.es) and compare this to the plain html without any javascript [here](http://derailingfordummi.es/?plain).

### reuleaux-selectors (javascript) - User/Human Interfaces

* ***Source:*** [github](https://github.com/wilkie/reuleaux-selectors)

![right|border|!gutenberg screenshot](reuleaux-selectors.png)

As a queer individual, I'm concerned with forms of available representation and allowances of diversity in the technological space. The role of personal gender identification is a part of human interfaces that has been untouched regardless of the fact that dropdown gender selection of simply male and female is unacceptable. Textfields, while better, allow for so much choice that people may pigeonhole themselves and would be otherwise incomparable.

Along with [Lindsey Bieda](http://rarlindseysmash.com), we designed and [implemented](/posts/reuleaux-selectors) a new form of gender and sexuality selector that we feel is a stage of evolution that provides a familiar selector that is both comparable and highly representative of the queer identity. We see the primary use of such a selector for social networking sites as a means of representing oneself as one pleases, and also for dating services to offer better support for the preferences and identity of queer individuals.

Play around with the selectors [here](http://wilkie.github.io/reuleaux-selectors/).

### apsis (C++, assembly, GLSL) - General-Purpose Game Engine

* ***Source:*** [github](https://github.com/wilkie/apsis)

![right|border|!apsis screenshot](apsis.png)

Going along with my [open source game coding competition](http://osgcc.github.io), I am currently developing a free and open-source (early stages) game engine builder. To jumpstart games and creative expression, I have created a framework that gives you the building blocks for creating game engines.

Here is how it works: Create an Engine. Add a Map to draw tile-based maps. Add an Actor to represent the player. Attach an Up, Down, Left, Right modules to the player actor to give it a set of rules that let it respond to input and move in all four directions. Add a MapCollider rule so that you do not go through walls. You now have a basic **top-down 2D scroller** much like Zelda games. Remove the Up and Down rules on the player actor, and add Jump and Fall rules, and now you have a **2D side-scroller**.

By building games via a set of rules, you can be provided a set of predefined rules to quickly make traditional games, but also allow extensibility by defining new rules. This will be perfect in an educational environment where predefined rules can be used to get things rolling, but programming concepts can be introduced gradually to beginners when they want to do something fancy.

I hope to bind the logic and rule creation to a language that is better suited for beginners such as Lua or Ruby. That way, the game engine itself is written in OpenGL/C++ but the extensible components can be an easy to use scripting language.

## Occasional Contribution

* [gittip](https://github.com/gittip/www.gittip.com/) - Python-based website for weekly tips to online creators.
* [sinatra](https://github.com/sinatra/sinatra) - Ruby rack-based web micro-framework.
* [shoes](https://github.com/shoes/shoes) - C library backend for the shoes ruby GUI framework.
* [hackety-hack](https://github.com/hacketyhack/hacketyhack) - Ruby educational tool to teach programming visually to beginners.
* [ratom](https://github.com/seangeo/ratom) - Ruby library for Atom feed generation.
* [ldc](https://github.com/ldc-developers/ldc) - D compiler frontend to LLVM.
* [redfinger](https://github.com/intridea/redfinger) - Ruby library for webfinger (distributed identity) polling.

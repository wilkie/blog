---
title: The Djehuty Project
author: wilkie
date: 2012-10-25
tags: ["programming", "social"]
summary: "I have a dream that we can solve the current crisis that is software. To do this, and this might seem ambitious but bear with me, we must burn every piece of structure we have to the ground. We must replace the structure around our software with a new infrastructure that gives us more sustainability and versatility. In the process we gain various technological and socialogical advantages."
---

[I](/posts/who-am-i) have a dream that we can solve the current crisis that is software. To do this, and this might seem ambitious but bear with me, we must burn every piece of structure we have to the ground. We must replace the structure around our software with a new infrastructure that gives us more sustainability and versatility. In the process we gain various technological and socialogical advantages.

## What we have now

What are we burning to the ground, you ask? Well, a system of organization that ignores the decentralized world we built out of it.
We build software in a centralized manner. It has one blessed location where it exists, the pieces used to build it (libraries, frameworks) are all built in a centralized manner and exist in generally one place, and we generally hold a relationship between a set of a few people as being in control of that code (and we bless them, perhaps religiously in some cases.)

![Ok. It's not *that* bad, but we can do better. [1]](apocalypse.jpg)

This has resulted in a tolerable, yet inefficient ecosystem where we tend to rewrite instead of reuse.
This is due to spirited debates about abstractions, expression, and simply how likable a set of people are.
This system inherits the lack of diversity of its whole and by being so centralized to ego, it leaves out a rather
large yet invisible section of humanity.

You may disagree with the prior paragraph since it may come across too harsh. However, ask yourself if this model of development of projects, especially in a world of opensource ideals and an increasingly decentralized network, is really appropriate, efficient, or if anything could be better if designed with these technical considerations in mind. My argument hinges on it being both a technical **and** social gain.

## A new infrastructure

I have [discussed previously](/posts/apples) the lack of a distinction between computation and abstraction. Our new infrastructure must promote computation first. How we invoke a behavior should simply be by telling the machine to perform that behavior. Anything beyond that (the human component) is beyond the scope.

What we end up with is a list of behaviors. Each behavior has a common name that is used to invoke it. Each behavior has a well-defined input and will have a well-defined output. Each behavior has a specification that details how the computation should take place; it is a description of input and output. I discuss this component of the infrastructure in [more detail here](/posts/infrastructure).

Beyond these basic descriptions of computation, at the software level, we have something on either side of this thin interface. On the left, is the implementation of the behavior. This can be a piece of code, in whatever language, that takes the input and yields the appropriate output. It could also be a piece of hardware that upholds the specification. In either respect, the implementation is a black box, and regardless of how a behavior is implemented, it is compared against the specification and all other implementations.

On the right of the interface is the abstraction. In this area we have the parts that are for human consumption. These are languages that glue together behaviors to produce something meaningful, artistic, useful, etc. They could be frameworks that make rapid development possible. Some programming languages are more meaningful on this side of the interface, such as scripting and/or dynamic languages.

This is the software component. It is driven by the notion that we select code by what it does, not by what it is called, what language it is written in, or who maintains it. We keep the benefits of abstractions, but they no longer inhibit or obscure performance gains in other parts of the system. I will continue to strengthen these points.

## The hardware

Regarding the left side of the interface which implements well-defined behavior, it is interesting that since such an implementation is a black box, it may be implemented as hardware. We live in a world where 3d-printed hardware is increasingly available. Now, we can find a bottleneck in our software and have our computers print a hardware implementation to solve the performance issue. We can plug in a hardware solution and have it transparently affect any software which uses that interface immediately.

![Although not feasible yet, <a href="http://news.stanford.edu/news/2012/june/printable-electrical-hydrogel-062712.html">printable conductive gels</a> exist and could make circuit printing available in the home. [2]](printer.jpg)

By using this software infrastructure, we make 3d-printed hardware more meaningful and easier to use for less technical users. We allow anybody with hardware knowledge the ability to contribute to opensource hardware communities by giving them the ability to easily solve any computational problem at any granularity (write a hardware implementation for a yaml parser, or maybe just write a hardware tokenizer, hardware string routines... you decide.) All in all, we will promote the much needed involvement from the electrical/computer/etc engineers and makers.

## The network

We currently make use of a huge, barely centralized network of networks we call the internet. This network currently allows you to own a name 'davewilkinsonii.com' or 'github.com' and then use that name to map resources: 'davewilkinsonii.com/posts/djehuty' and 'github.com/wilkie/blog'. We then communicate using well-defined methods in order to retrieve and make sense of those resources: 'http' or 'git' respectively.

Alright, say what you want about hardware and copyright, but the network implications here are the real political meat and bones. We want to provide these elements of computation without the interference of a central authority, government, or malicious organization. We want to ensure both the availability and integrity of the code. We may need to devise a new network infrastructure to support this in a minimal fashion, or craft it out of the parts we already have, namely the internet and world wide web as it is now.

Frankly, the internet as it stands strengthens the argument for this style of encapsulation of interfaces.
It supports a decentralized model where we can ask a question and get an answer. "I need a way to compute a sort of a list of numbers" can retrieve an implementation for quicksort, or maybe on another day will retrieve an implementation of insertion sort. Who knows. All we have to have here, as a basic minimum, is the ability to get *any implementation* that fulfills the specification, of which you retrieve once.

![A peer-to-peer network should be the base model of the infrastructure. [3]](peer-to-peer.png)

Now, with clever use of DNS and frontend servers, we can have a single name resolve to different resources. This is typically done to route resources to the nearest server geographically in order to balance demand and increase responsiveness on popular websites. However, here, we want to get an implementation of a behavior. We can co-opt the internet to get this behavior the same way that bittorrent does in order to create a network without an owner or central authority.

At the end of the day, we can ask for an implementation and get one from a server in belize or our neighbor at the coffee shop, along with any technical data about how performant that implementation is. We can get many implementations and compare them and publish our data as well. What we want to create is something a bit more flexible than the web, but still within its foundational spirit, more like a network of mesh networks.

To sum up, unlike the normal use of the internet and hypermedia, we want to retrieve something that fulfills a behavior through a specification, not retrieve something of a particular name. This network is peer-driven and content-driven, although the specifics of how this would be done are beyond my expertise.

## Technical merit

Through the design and implementation of such an infrastructure, we can achieve many technical goals that are far more difficult otherwise. This is due to the emphasis on benchmarking and scientific measurement over human expression and abstractions.

### Science to automate optimizations of software structure

This type of design will allow for competing implementations based upon facts related to performance and separates those concerns from how computation is expressed, which is relegated to higher level languages. This will promote code reuse across all languages and remove the need for a *standard library* that reimplements basic functionality other languages already have. New languages can be created and supported by an existing wealth of code, and only need to bind to these interfaces to be able to use it. Languages may want to provide better abstractions and perhaps push policies to allow for better expression or analysis, but can do so around the code that already exists instead of rewriting everything.

### Availability of code

Since useful code will exist on many machines, implementations can be retrieved from a great number of sources. This improves availability of code and ensures that code cannot be removed ([see social merit](#social_merit).) Machines may also pass performance details and metrics that it has gathered among the machines it knows to help the destination machine make decisions about which implementation to use. We can effectively crowdsource science about our code. Detailing this type of information would be a big win in optimizing the entire code base on our machines toward specific performance goals. Also, no authority would have a practical method of deleting code or subjecting laws against its use or proliferation.

### Increased feasibility of hardware printing

This infrastructure, as mentioned, promotes hardware implementations that may increase the performance in terms of speed and possibly power when the machine suggests that it could benefit. Hardware implementations will abide by the same specifications as software components, and can therefore be tested against them in already existing applications. This should promote hardware as an optimization of software which in turn can create hardware with less bugs and have the hardware become useful immediately after production. Drivers for hardware are no longer platform specific as they are simply implementations of behavior, and operating system behaviors are also described in the infrastructure.

## Social merit

Computation is important to all people. There are cultures that could benefit from equal access to technology and computation. With this infrastructure, society serves to benefit due to the promotion of solutions without attribution and an ecosystem where code propagates across the world without interference.

### Ubiquitous code

By greatly modularizing code, implementations can exist anywhere. This has a beneficial side-effect: code is much harder to censor or delete. You can build a dependency graph for any application and simply ask any machine in the world for some code that implements those behaviors. Any implementation can be retrieved and then tested for correctness. We can get code reliably from our neighbors, for instance. This better ensures that a single centralized location for code is not the norm, and therefore reduces the ability for centralized authorities to remove or restrict access to computation. Useful code will exist on many machines, and these implementations can be retrieved (along with performance information, [see technical merit](#technical_merit)) from any machine in a network.

### Lower cost of entry

This has another benefit of greatly reducing the cost of entry for using technology. We only need to provide simple hardware with network capability, network driver, and a simple buildtool and dependency grapher to determine what code we need to build the rest of the system. From there it can acquire that code, verify its correctness, and compile the rest of the system. This means 3d-printed hardware can become more feasible as it would have less software requirements out of the box to get it working and deployed on a large scale. As mentioned, we require a better, more specialized network infrastructure to support the peer-to-peer nature of the system where new (untrusted) nodes can enter at anytime, perhaps toward a mesh network or some hybrid mesh-network and typical centralized structure. The social benefit of not using the internet is that we can minimize the technical barrier of entry to create a new system.

### Machines that build themselves

The prospect of hardware printing means that such solutions are potentially available to all people who can manufacture a 3d-printer, or acquire one that can print itself. At the end of the day, we can provide a minimal subset of components that can be used to generate the rest of the machine from information in the network. This should reduce the physical costs of the machine. Upgrades to the machine would be as easy as acquiring the machine, and furthermore would be available to all through the network. Hence, this infrastructure, when implemented at all three components (software, hardware, and network) create a sustainable computational platform for all of humanity and firmly place the power of computation freely in the hands of the people.

### References

1. Artist's depiction of apocalypse from [here](http://pierremassine.deviantart.com/art/Apocalypse-145369171).
2. Discussion of affordable 3d printing [here](http://www.engadget.com/2012/09/26/form-1-delivers-high-end-3d-printing-for-an-affordable-price/), which the image was taken.
3. The minimalistic image of a peer-to-peer network and a simple description of what that is can be found [here](http://www.freelan.org/).

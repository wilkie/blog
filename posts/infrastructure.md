---
title: "An Infrastructure to Promote Sustainable Software"
author: wilkie
date: 2012-10-06
summary: "Given that we have a problem with the organization of code to provide better objective reuse, we can solve this by using a language to describe computational behaviors and specifications and define absolutely nothing else. Implementations of these behaviors can contain isolated abstractions, and applications as a whole can use abstractions to glue together computations. This simple infrastructure provides not just technical benefits but also illustrates many social merits."
---

We have long promoted the idea of the re-usability of our code. After an era of writing for our machines instead of ourselves, we discovered that human literacy was preferred over performance. From this notion, we developed higher level languages that started to abstract and even completely obscure the underlying machine. A beautiful era emerged where the Turing machine was our model, and humans our audience.

However, these methods of human expression are not compatible. Although they all express and run upon the same theoretical basis, they cannot collaborate effectively. This is due, ironically, to the constraints set upon the languages at the machine level. For instance, {Rust, D, Java} implies a garbage collector to allow object expressions that ignore allocations and to better analyze the lifetimes of these objects. When the language constrains the type of garbage collector policy, this constrains the languages that can be used together.

However, it is true that these constraints are not necessary to be Turing complete. For instance, languages that force constraints can still utilize languages that make less (or no) constraints. This is why C is currently preferred for optimizations across languages. We can do slightly better than C, but we must respect the aspects (or lack thereof?) of C that have made it so ubiquitous.

Frankly, computation is simply the transform of information from one phase to another dependent on state. This is the model of the Turing Machine. Such a transformation is hereby called a *behavior*. If behaviors are cleanly described and specified without interpretation, they can be used within any language that has the means to describe that they wish a behavior to be used.

## We must have a language that describes behavior void of policy

In order to cleanly reuse code, we must reuse it at the behavioral level. There shall be no policy about allocations, threading, or architecture unless this is necessary to define the behavior. The implementations of behavior may choose a policy when it benefits that implementation. Behaviors may depend on policy when they are behaviors related to policy (such as describing a memory pool system or threading library in terms of behaviors.)

Only basic language capabilities to describe a name, a set of inputs, and a set of outputs are necessary. Since computation is a mapping of inputs to outputs, providing mutability constraints to both inputs and outputs becomes necessary, including any defined data types such as structs. Generally, inputs will be immutable, but this must be described by the behavior and thus by the language that one writes the interface to the behavior.

    function String.concat(immutable char[] input) : char[]
    
    function MutableString.concat(immutable char[] input) : void

## Behaviors are an interface and a specification

To thoroughly describe how computation is performed, you must describe both the interface and the mapping of inputs to outputs as invariants. There must be a single way to invoke the behavior, and a determined outcome described by a formal model (and informally enforced through a set of tests.) The model is hereby called the *specification*.

    function Array.sort(immutable int[] input) : int[]

    describe Array.sort {
      it "sorts in ascending order" {
        // Randomly generate a list
        // Go through list and check that each item is <= the prior
        // Test gives us a certain amount of confidence that the behavior is
        //  performed by an implementation.
      }
    }

## Implementations of behavior must be flexible

Implementing a behavior (such as sorting a list of non-unique items) can be done various ways. Therefore, since performance of a behavior relates to the distributions of its input, the agent choosing how a behavior is performed should have the ability to switch the implementation. Since the behavior does not change, neither does the interface to invoke that behavior. Therefore, nothing must change in the higher level expression to perform the behavior.

The above description of behavior for the Array.sort specifies the outcome of the computation. Notice, however, that it does not assert performance goals such as wall-time, energy-usage or memory-usage as a factor of the input. That is the responsibility of the implementation. And many implementations could satisfy the interface and the specification.

    function Array.sort(immutable int[] input) : int[] {
      // Insertion sort
    }

    function Array.sort(immutable int[] input) : int[] {
      // Quick sort
    }

    function Array.sort(immutable int[] input) : int[] {
      // Quick sort + Insertion sort
    }

Which one of these implementations is best? Who knows. Use all of them, or perform a benchmark to determine which is the best to use, and link it in. This can be done over a period of time where the program can rerun benchmarks and switch the implementations, or done at the developer's discretion. However, it does not interfere with the expression of 'performing a sort' which means the application code does not need to change to switch the implementation.

We don't need to allow multiple implementations to be defined in our languages. We will assume that implementations are largely unknown to begin with. You 'discover' them over time, through other machines, though people, through applications that beg for a particular one. We discover how good they are through a community: the machine next to you swears that its applications run using 40% less energy with this implementation instead of the one you are using. We can do these things once we start to respect behavioral definitions.

## Technical merit

This type of design will allow for competing implementations based upon facts related to performance and separates those concerns from how computation is expressed, which is relegated to higher level languages. This will promote code reuse across all languages and remove the need for a *standard library* that reimplements basic functionality other languages already have. New languages can be created and supported by an existing wealth of code, and only need to bind to these interfaces to be able to use it. Languages may want to provide better abstractions and perhaps push policies to allow for better expression or analysis, but can do so around the code that already exists instead of rewriting everything.

Since useful code will exist on many machines, implementations can be retrieved from a great number of sources. This improves availability of code and ensures that code cannot be removed ([see social merit](#social_merit)) Machines may also pass performance details and metrics that is has gathered among the machines it knows to help the destination machine make decisions about which implementation to use. We can effectively crowdsource science about our code. Detailing this type of information would be a big win in optimizing the entire code base on our machines toward specific performance goals.

## Social merit

By greatly modularizing code, implementations can exist anywhere. This has a beneficial side-effect: code is much harder to censor or delete. You can build a dependency graph for any application and simply ask any machine in the world for some code that implements those behaviors. Any implementation can be retrieved and then tested for correctness. We can get code reliably from our neighbors, for instance. This better ensures that a single centralized location for code is not the norm, and therefore reduces the ability for centralized authorities to remove or restrict access to computation. Useful code will exist on many machines, and these implementations can be retrieved (along with performance information, [see technical merit](#technical_merit)) from any machine in a network.

This has another benefit of greatly reducing the cost of entry for using technology. We only need to provide simple hardware with network capability, network driver, and a simple buildtool and dependency grapher to determine what code we need to build the rest of the system. From there it can acquire that code, verify its correctness, and compile the rest of the system. This means 3d-printed hardware can become more feasible as it would have less software requirements out of the box to get it working and deployed on a large scale. We may require a better network infrastructure to support the peer-to-peer nature of the system where new (untrusted) nodes can enter at anytime, perhaps toward a mesh network or some hybrid mesh-network and typical centralized structure.

I must defer to the hardware and network communities for their input, as it is not my area of expertise.

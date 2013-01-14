---
title: A Language for Interfaces
author: wilkie
date: 2013-01-13
summary: We need to have a language that can describe behaviors concisely including their name, their inputs, their namespace, and their outputs. With respect to input, we need to know information dealing with the mutability of data, which includes concisely describing state. That ideal language is Rust minus much of that language's memory model and concurrency, which can be relegated to libraries or Rust proper within implementations.
tags: ["programming", "social"]
---

In my [technical description](/posts/djehuty-technical), I described the motivation for a new infrastructure for software to stress a decentralized code ecosystem. From there I discuss the [finer details of such an infrastructure](/posts/infrastructure). I recommend reading these before you read this article. The gist is that we want to describe behaviors distinctly from the choices made within implementations. Think C's header files versus the corresponding source files, but with far more purpose.

## What we need

As discussed in a [prior post](/posts/infrastructure), we require the ability to describe a set of facets of a behavior:

* We must have a language that describes behavior void of policy
* Implementations of behavior must be flexible
* Behaviors are an interface and a specification

This implies we require a language that defines as few rules as possible, while giving you the power to define rules as you need to in order to describe behavior. Explicit rules, no implicit ones. C is an example of a language that attempts this, but it is not sufficient, as I will describe later.

Also, with the second point, the language we need is one where implementations are not tied to the interface description. Think of a C header file where the source file that implements it is not C. This is possible with languages that can export C functions, and I do not consider some shims/bridges to totally violate this idea. The languages that fall out will be languages which do not work well with others. The language will be, with this in mind, a systems oriented language (honing in on C, C++, D, Rust, Go)

Closing on the third point, being able to describe an interface and also test it without respect of the implementation is not something that is necessarily language specific. It need not limit our choice of language. However, it does encourage our interfaces to have very well-defined inputs and outputs. This includes describing whether or not inputs can change, whether they are passed by reference, or whether the inputs given are defined as never-changing (immutable). This also applies to state described in data types described outside of and shared by implementations.

Given this, we will add more refined rules for what we need from an interface language:

* Systems focus
* Lack of a defined memory model
* Typing is static, nominal, preferably subtyped

We care surprisingly little about, due to relegation to implementations, the following:

* Object orientedness, polymorphism, inheritance
* Concurrency, Thread models
* Garbage collection

That is, implementations may require a garbage collector, pull memory from a different memory pool, use different pieces of hardware, make use of a virtual machine, etc. This has nothing to do with the relationship between input and output. If an implementation of a parser interface is written in Rust, however, the memory model enforced by Rust may conflict with other implementations, the goal for this entire project is that another implementation can be found to route around the language choice.

In essence, language choices can not interfere with individuals finding and making use of software. This is why we strive for the lowest common denominator in our interface language.

## The Interface Language

The language that I feel fits these constraints is a subset of Rust. What we will do is take Rust and remove its concurrency model, thus it's process model, and then we remove some of the strictness and garbage collected nature of its memory model. This requires negating some of the strengths of its concurrency safety, but that can be added back in by using Rust as the implementation language. It also removes the utility of Rust's managed boxes, since we do not imply a garbage collector (again the implementor's choice.)

![The Rust programming language, developed by Mozilla Research, is an ideal platform for an interface language](rust.png)

Essentially, although we don't need a full language, the resulting language would be a C replacement on its own. It is interesting that we continue to replace C++ or some higher-level languages over C, which has not seen as much progress. It would stress the following:

* The type safety of Rust (to counter the lack of proper type checking in C)
* Macros instead of a preprocessor
* No null type with subtypes being used for errors
* Memory model is relegated to libraries
* Mutability adjectives for inputs and outputs and fields of structs/datatypes

We do not need the full C-replacement language for simply defining interfaces. Initially, we only need the ability to describe and thus a simple lexer/parser. But the full thing would be nice to have as a consequence! I encourage anybody with the desire to do this.

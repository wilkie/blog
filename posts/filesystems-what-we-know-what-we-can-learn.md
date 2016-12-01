---
title: Distributed Filesystems
subtitle: Getting Rid Of Shared Libraries
author: wilkie
date: 2016-10-01
---

Netflix is down so let's talk about compiling, linking, filesystems, and operating systems.
The roles of each of these is a small step between code and a running program.
Over the years, as computers have taken on different roles in our lives and have gotten bigger,
smaller, and faster seemingly at the same time, each of these roles has changed to fit.
What I find interesting is what parts of them have not changed, and furthermore, thinking about
which parts should have evolved but didn't for some reason.

Our goal? A system where applications can run because they exist, regardless of where they exist.
A solution where data is ubiquitous
and preservation and archival of both digital data and the software needed to view them are trivial.
One where shared libraries do not exist because shared code is just a natural by-product of how the
system works.

## Code Straight To Your Doorstep

Compiling, linking, and filesystems aren't just about a transformation of some kind of code
to some kind of binary blob. They are carefully designed around potential problems and trade-offs.
Compiling is a classic example of a trade-off of essentially caching the transformation between
a human language and a distinctive computer language. Yet, interpretive languages such as Python
or Ruby have been designed to not explicitly perform this type of compilation step and gaining
some separate benefits by doing so.

As you can surmise, compiling takes source code and turns it into binary code. This code is
still in a type of intermediate state. Linking takes your binary code and pieces it together
with similarly compiled code from other sources: system routines, code others have written
(referred to with the misnomer "libraries"), and generated routines provided by the compiler
or runtime that your program relies on to work. Linking is like a bunch of Lego... and a
programmer's job is to tell it how to build your castle.

Back in the day, almost before my time but fortunately not quite, programs ran directly on the
hardware of the machine. There was very little
systems software. Usually just some stuff to boot the machine and some program loader. Over
the years, operating systems became bigger and their responsibilities grew wider. I enjoy
thinking about why this actually is. We take for granted what they do, but if you ask someone
their response to why they exist is some form of "because they need to." That the functionality
they provide is something nobody else would want to write or deal with.

That is true. It is hard to argue with that. Most programs will need the same routines to run
properly. Allocating memory,
managing resources, and stuff like printing to the screen are all ubiquitously useful. So,
operating systems provide that functionality and allow programs to "link" to it. No need to
write it yourself. All programs use the same routines so nobody is stepping on any toes.
It is essentially a way to reuse code and it pushed programmers forward where they could focus
on a task and not worry about a lot of the details.

> We should get rid of shared libraries.
> <div class="citation">&mdash; <cite>anonymous</cite></div>

This linking technique is also useful for another trade-off that used to be very important.
The size vs flexibility trade-off. When storage was expensive and thus rare, programs needed
to fit in small spaces. Making use of code that already existed on machines allowed programmers
the ability to do more with less. They didn't have to worry about writing routines to draw squares
on the screen. They used the existing code provided by the operating system (within what is called
a *shared library*) to do it for them. After all, programs needed to fit on disks that were only
mere kilobytes in size and work with even less RAM. For instance, this website's total size would
likely overwhelm such systems. It is hard to imagine these days, even if you lived through them
in the past.

But that is exactly it. It *is* the past. What is weird is that hardly anybody will protest
against it. Somebody said to me the other day "We should get rid of
shared libraries." They want to get rid of this system! This bastion of sharing! How
could we even consider doing such a thing? But I want you to actually think about this.
Can you fundamentally change a system? Throw away something that has become so commonplace?
I think so. And we have plenty of reasonable techniques to replace it with.

## How Shared Libraries Work

Let's talk about a modern system. I'd actually say a lot of programmers do not know very much
about how compiling and linking actually work. It's a statement about how powerful and successful
this system has been! People use it every day and it's just as much a mystery.

When you write even the smallest amount of code, an incredible amount of stuff happens. Below is
some C code. C is a programming language that has been designed with the idea of shared/dynamic
libraries in mind. It was created in a time of turmoil where code ran only on a few types of
machines and was a headache to get working on new machines or competitor's machines.

```
#include <stdio.h>

int main(int argc, char** argv) {
  printf("hello world\n");
  return 0;
}
```

The way this worked is that the language was designed to provide a standard way of doing the
everyday tasks. Above, the code prints to the screen (or printer, back in this era), an obviously
useful task. You tell the compiler you are using a particular interface (in this case: stdio or
"standard input/output") and then call upon the routine that has already been written for you: printf
(formatted print).

When you compile this tiny amount of code, it compiles it into a type of madlib. It places an empty
space where you called that routine and expects it to be filled in later. It doesn't know who is
providing that routine yet, because you want this to work on many machines and not just a single one.
Each machine may provide a different routine called 'printf'.
When you "link" this program, usually at the time when you compile it, it performs a process called
"relocation" where it fills in the madlibs with the locations of the routines on the specific machine
you want to run it on. These are the "shared libraries."

![width=500|border|!](so-list.png)

On a modern machine, you'll find these shared libraries in system directories. On a Windows machine,
shared libraries have ".DLL" (dynamically linked library) extensions, and on UNIX based systems they
will have ".so" extensions. When you start a program, a process called "loading," on whichever machine,
the program contains a list of the shared objects and each of these also gets loaded into memory as
though it were part of the program itself. The operating system may even employ some techniques to
detect when two programs are loading the same library and only load it once.

The process is entirely
geared toward being very efficient in terms of space while giving up on overall system complexity
while also allowing this loading overhead.

## Filesystems

Filesystems govern how data is laid out on your disk and how it is retrieved. Seems simple.

Here is my theory on filesystems, and I'm just gonna throw it out there... they were designed once
and then people forgot to change them. Filesystems and operating systems grew up alongside this
compiling, linking, and loading system above. Generally, they are hierarchical: directories contain
directories that contain files. When you draw it out, it's like a family tree; branches spread out
but generally only in one direction.

Filesystems were designed this way because of the nature of storage at the time. Originally, machines
simply had a list of files. Then, directories were added because organization became a necessity
particularly when multiple users could access the machine. The reason filesystems are strictly
hierarchical is a result of a technological limitation, not the needs or wants of the people who use
them. Essentially, it was easier to represent that structure in a way that was performant on the
storage types of the time (tape, slower magnetic media, etc) You simply followed a series of named links
to the data: "root" points to "users" points to "wilkie" points to "documents" points to "good-writing.pdf"

> The situation, however, has evolved. In 1992, a “typical”
disk was approximately 300 MB. In 2009, a typical
disk is closer to 300 GB, representing a three order of
magnitude increase. While typical file sizes have also increased,
they have not increased by the same margin. As
a result, users may have many gigabytes worth of photo,
video, and audio libraries on a single pc. This situation
represents a management nightmare, and mere hierarchical
naming is ill-suited to the task. One might want to
access a picture, for instance, based on who is in it, when
it was taken, where it was taken, etc. Applications interacting
with such libraries have evolved external tagging
mechanisms to deal with this problem.
> <div class="citation">&mdash; <cite>Margo Seltzer, Hierarchical File Systems are Dead, 2009</cite></div>

I'm going to channel a lot of Margo Seltzer, here. She wrote
["Hierarchical File Systems are Dead,"](https://www.eecs.harvard.edu/margo/papers/hotos09/paper.pdf) after all.
Even though we disagree on filesystems being one or two words, we generally agree with that bold statement.
People don't want hierarchical filesystems, yet we rarely protest them. They are just how things are. Yet,
as she points out, people use the internet in ways that defy hierarchical organization, and this has become
our predominant way of viewing the world at large. Why limit ourselves when using our own physical machines?
What else have we just ignored and what other merit aren't we willing to investigate?

When we think about our model of linking code with shared libraries, it becomes more damning to consider it
along with the arrested development of filesystems. These shared libraries were motivated by saving storage
space. Filesystems were designed around limitations of storage speed. Therefore, their lives are interwoven.
I will make the argument now that changing shared libraries requires a change in filesystems and that this
change in filesystems is motivated to change how code is linked and loaded.

## A Shared Library Filesystem

Let's get rid of shared libraries. No longer will you have ".so" files littering your system. You simply
do not need them. The main argument is that storage is no longer expensive. I like this argument. It is
simple: the need no longer exists, but it isn't sufficient because why not still care about that type of
efficiency?

No, no. Let's preserve this efficiency, but do so whenever it happens to come up. Newer filesystem ideas
are centered around the idea of inverting the structure. Instead of data being in hierarchical directories,
the data is essentially just floating blobs like that of a lava lamp. They move around and maybe even
fold into one another. The structure is built on top of it. A series of tags and indexes that give some
semantic meaning to the blobs that are otherwise just a bunch of raw binary data.

This parallels how we tend to view the Internet, and predates that by how we organized media in libraries.
Books, passages, newspaper articles are like the oily blobs in that lava lamp. They all tend to look the
same from a distance. We then took keywords out of them and organized them using metadata. We built
card catalogs that people could use to look up these individual pieces of writing without having to
exhaustively search. Card catalogs were certainly hierarchical, but, much like old filesystems, designed
that way due to technical limitations. Internet search engines prove that such limitations no longer
exist. We can build indexes that evolve and can capture a type of semantic meaning for what we are
searching for.

So, as Seltzer argues in 2009, we should very much replace directory-based filesystems on this idea. Directory-based
filesystem designs are called "named-addressed" or "location-addressed" systems. These tag-based systems
are called "content-addressed" or "associative-storage" systems. Where the data is looked up based on
some description or representation of the data itself and not on any arbitrary name.

We can, as implied, pull out words from text and use that as a "tag" to refer to the data itself. That is the
more familiar search-engine idea. More generally, though, we use a form of "hash" mathematically generated
from the data itself. It uses this idea that all data is numerical. Mathematicians have devised formulas that
can take a set of data and produce a much smaller version of that data that will likely represent it. (There
are many philosophical implications of this being practical that keep me up for days, but discussing how it
works in too much detail is out of scope, here.)

There are a few interesting ideas to pull out of this idea. First, is that the nature of mathematics is that it
is true everywhere. So, "Hello World" using the hash algorithm called **MD5** is `b10a8db164e0754105b7a99be72e3fe5`
and it is that exact hash on every machine in the entire universe. Another, is that this garbled, unpronounceable
mess is always the same size (although longer is strictly better for uniqueness) regardless of the size of the
data. So it is easy to use, store, and you interestingly can know one when you see one. Last, you can hash parts
of the data independently. So a large file can be split into a bunch of smaller pieces, hashed, and then that file
is a series of hashes.

Alright. Let's expand upon this idea a bit. Our new filesystem is a bunch of binary blobs stored on disk. We refer
to the data using hashes (or we search by tag or keyword or name and the result is a series of hashes). One thing
we get for free on such a system is that the same file is never stored twice. It just can't happen. Those two files
would have the same hash, that is, they'd have the same name, and therefore when you looked either up, it would
point to the same place. Now, consider that we are splitting large files into smaller pieces. Now, if a file somehow
has a chunk that is the same as another file, that small chunk now only exists once.

The uses for this are invigorating. The versioning of files is made easier. When you change a file, just store the
chunk that changed. The old version will still exist and the new still exist without having to copy the entire
file twice. This is how version control systems such as Git work. If you have ever worked with these systems, the
commit hash is a content-addressable hash of the data that points you to the series of hashes that represent the
code at a particular point in time.

But, we can inspire new forms of operating systems, here. That's what we want to do. Get rid of shared libraries
as these distinct, separate things we know them to be now.
If shared libraries are all about space efficiency, and you get a form of that here, I think we're on the right
track.

All we would need to do is store the shared code on such a tagged filesystem. However, we no longer have to
separate it from the program itself. We can compile shared code directly into a program. If two programs have
both used the same shared code, it will hash to the same place. Even though, if you look at the program, it looks
like it is quite large... on the system itself, it is split up and organized as efficiently as possible.

Sure, you can still have the code be interchangeable, but you can still pass along a canonical version of the
code you know works well with it. Other people can decide to replace that code with something else at any
point... in effect creating a new program in the process that refers to different hashes for the chunks
related to that functionality. It's just a natural part of the system, although we may have to start looking at
code and compilation in different ways.

Oh, and shared library versioning is just something that happens naturally, too.

![width=500|border|Program A and B, although distinct programs, both share code that relates to drawing to the screen. This code logically exists as a whole in these two different contexts, but only physically exists as a set of chunks referred to by their hash.](memory-breakdown.png)

We simply don't need to care about shared libraries as a distinct thing. Just use the code. Have the compiler
split up the program into reasonable, logical chunks (such as each file or module) and have the storage system
handle duplication. When programs use the same code, or code that is interchangeable with code the system already
knows, just link it to the data. If it has never seen that data before, write it to disk. Storage is cheap.
Networks are versatile to simply let you download parts of a program you need when you download or install it.
Which brings us to our final topic.

## Where Does Data Exist?

Now let's focus on the other now-naive assumption that has been made in the design of filesystems and operating
systems that has persisted for decades: the idea that data is local. We use package managers to explicitly
install programs to our disk. This is a by-product of this assumption. Even though programs are almost entirely
available from another machine, we download the entire copy of it at some point, use it, and then it just sits
there.

![width=500|Photo of the Earth by [NASA](https://www.nasa.gov/image-feature/nasa-captures-epic-earth-image)](data-ubiquitous.png)

With our lack of shared libraries comes a lack of concern about where data actually lives. We don't live in the
world where all of our code needs to exist on the disk three feet away from us at every moment of every day. The
surge of popularity of strictly online applications has proven this time and time again, and will continue to
do so until we agree about why. The reason why is that we actually want a fundamentally different operating
system.

Our new filesystem has inspired a new way of linking programs. A new way of organizing code. And therefore, it
must inspire a new operating system. This hypothetical system will no longer care about whether or not a program
exists on your machine when you want to run it. Or any part of it. Maybe parts of the program you never seem to
use can be deleted? Of course, they can! Why not? You aren't using them and they generally exist somewhere.

Since our hash of data is the same in every inch of the universe, we have a powerful means of identifying the
code we actually need anywhere in that universe. If I want to run my system's "calculator" application, it is
represented by a bunch of chunks of data. Some list of hashes. Some may be stored on my system already, some
not. I don't need to install the application, I just need to know what those hashes are... metadata. When I
go to run it, the system can look and see what chunks of the application I have locally, and then simply
download the rest.

Modern package managers handle the installation of applications in a fairly centralized manner. You want
the "calculator" app, you tell it "install calculator" and it will look up the name and install every
single piece it requires. It will also download and install every single shared library it needs that
you don't already have. In our new system, why should we go through that effort? The calculator app is
a series of hashes that consist of all of the code it needs, some of it may be the same code as other
programs. Yet, similar to the package managers we already use, we simply need a place to look.

Since this calculator app is a series of hashes, and those hashes are the same everywhere, we can get
the pieces of the application we don't have from *any* machine that has them. In effect, let's start
thinking about our computers as having the knowledge from every other machine they can talk to. There
is no "local" storage in this system. You simply type "run calculator" and it figures out the rest.

![width=500|border|The same Program A and B from the graphic above are shown here. They don't need to be "whole" to be usable. In fact, Program B doesn't exist locally at all, but it can still be used. Our new operating system sees all blocks as local and can run partial programs by pulling the needed blocks as they are needed and trading blocks that aren't useful to other machines.](machine-breakdown.png)

Now our operating system is the following: a content-addressed filesystem, and the means of downloading
and uploading chunks of data. That is the smallest an operating system needs to be. It can download the
rest of itself at this point. It can effectively learn what it doesn't yet know how to do.

How this generally works is that your system can store a limited set of chunks. We're still bound by
the laws of physics and disks are still only finite in size! When we fill up our storage, we start to
delete chunks we 1) no longer need and 2) feel are replicated elsewhere. To better ensure that data
actually persists in the universe, we employ a strategy where we don't actually delete anything, we just
swap it with the chunk we want from a different machine. That second machine now has the chunk we didn't
need, and we have the one we did want. As storage increases exponentially, we can effectively preserve
useful data. This type of protocol is further explored in current technologies such as
[Kademlia](https://en.wikipedia.org/wiki/Kademlia),
[Coral](https://www.coralcdn.org/docs/coral-nsdi04.pdf),
[BitTorrent](https://en.wikipedia.org/wiki/BitTorrent),
and specifically the dramatically named [InterPlanetary File System](https://ipfs.io/).

At the end of the day, programs no longer need to break themselves into pieces installed independently.
They do not need to be installed at all... no need to be locally available to use. And they do not have
to be limited by the imagination of systems designers of the 1960s. Furthermore, as a nice side-effect,
the software can be preserved for years to come.

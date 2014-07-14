---
title: "Programming Education"
subtitle: "Computer Science Should Reform or Stop Teaching Programming"
author: wilkie
---

In the old times, computers were new, huge, expensive, and complicated.
Programmers of this era were responsible for taking a program and translating it into the machine code of one of these varied and cobbled-together pieces of engineering.
They would determine how to allocate resources and how to arrange the code to have it execute efficiently.
As computers became, not only more powerful, but more prevalent, industry struggled to define what a programmer is.
Over time, professional organizations were founded (IEEE CS 1946, ACM 1947, BCS 1957) along with the development of academic fields (Purdue 1962, Stanford/CMU 1965, University of Pittsburgh 1966) with other schools, such as MIT, reworking existing engineering schools to fit the growing computer industry.
These organizations quickly took initiative to define what a programmer knows and how to certify this knowledge.

Meanwhile, programmer effort could not hope to cope with growing computational power.
In the 1950s, research groups were working on the compilation problem.
They backed a hypothesis that computers were powerful enough to allow describing a program in a more expressive language than the underlying machine through a program that translated this code into machine code.
At the time, people, although naive in hindsight, were dubious and divisive about this possibility.
In 1952, Grace Hopper, inspired by the work of Betty Snyder before her, produced a working compiler for the language A-0.
Even upon demonstration, those aware of her work were still in disbelief and even denied it:

![Rear Admiral "Amazing" Grace Hopper](grace_hopper.png)

> Nobody believed that I had a running compiler and nobody would touch it. They told me computers could only do arithmetic.
> <div class="citation">&mdash; Grace Hopper, <a href="http://www.cs.yale.edu/homes/tap/Files/hopper-wit.html">The OCLC Newsletter, March/April, 1987, No. 167</a></div>

There were honest merits in both sides of the compiler debate.
And quickly, the dissonance against compilation refocused on aspects of compilation that still required humans: automatic bug finding, modeling, etc.
However, what is important here is the fear compilers created within the professional programming community.
These systems promised "automatic programming" which threatened to deskill programmers.
So what is left after that skill is lost?

![Industry quickly marketed compilers as 'automatic programming' implying programming effort could be replaced by a computer. Manager is destroying the code sheets used by the programmers employed by him. Remington Rand advertisement printed in [Pittsburgh Post Gazette. June 9th, 1955](http://news.google.com/newspapers?dat=19550609&id=eZdRAAAAIBAJ&pg=4286,4848225), originally cited by Janet Abbate](univac.png)

Mathematical and engineering roots combined with the ironic fear that computers would replace human programmers produced an industry and academic environment ripe for defining computer science as a hard mathematical field.
If programmers were deskilled in terms of writing code, they would always be able to retreat to analysis and theory.
To industry, with such a rapidly changing environment, programmers with such skills would be seen as more valuable than those without.
Therefore, academic certifications typically used for programming now contain a strong emphasis on such mathematics.

This philosophy persists in modern computer science curriculum.
Students must take several math courses, analyze algorithms in introductory courses, and make use of mathematical examples: summing arrays, factorials for recursion.
**I strongly urge the computer science field to reconsider this or give up the teaching of programming altogether.**

For people learning how to cook, is it introduced through chemistry?
Sure, the knowledge of how various proteins interact with heat can improve your understanding of cooking.
Yet, I challenge the idea that without a sound grounding in food science, most people can't be creative, productive, or make a living by being a cook.
Perhaps, though, unlike programming, we still have an appreciation for "folk cooking" over the academic?

This leads us to the same sentiment as [Lockhart's Lament](https://www.maa.org/external_archive/devlin/LockhartsLament.pdf), where mathematician Paul Lockhart discusses the failure of common curriculum to properly induce mathematic creativity by insisting on strict, formal, analytical standards.
Perhaps by insisting on such an analytical foundation, the programming community has inherited the same flaws as math education.
The tech industry might be worse; there is strong subtext that programmers cannot be valuable or capable without strong theoretical knowledge.
Also damning would be any connection this might have with what Sapna Cheryan, Professor of Psychology, University of Washington, studied on the [stereotype threat](https://www.youtube.com/watch?v=TYwI-qM20x4) that is a very likely cause of the lack of women in computer science and the programming community.

![A real-time computer-generated animation. The fruits of what compilers have enabled.](https://www.youtube.com/watch?v=2sr8e47Z_l8)

I sympathize with mathematicians.
Many of the stigmas and problems with programming curriculum is similar to how people view mathematics.
Just as cooking is tied to chemistry, programming is indeed tied to mathematics.
The [Curry-Howard equivalence](http://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence) demonstrates that all code has an equivalent mathematical model, and thus can serve as a mathematical proof.
Therefore, we can conclude that if a particular piece of code is creative, then mathematics must be creative.
But I am not arguing that programming isn't rooted in math, but rather that introducing it formally through mathematics is a mistake.
However, I hope, then, that instead of improving the mathematics field to improve programming education, that improving programming education can solve Lockhart's Lament.
Still, these are separate problems, though possibly with a similar solution.

I'd rather focus on the programming community.
Just as the invention of compilers ultimately enabled a larger pool of developers, over the years more tools have been designed to ease the task of programming.
These tools have not deskilled anyone.
They have enabled and empowered a new group of programmers.
Frameworks such as Unity and languages such as Processing have given artists an introduction to programming that is not founded in mathematics, formal methods or analytics.
Dynamic scripting languages such as Python and Ruby have been influential in bringing programming to other fields and to non-computer-scientists in the community.
Although, so-called professional programmers, often the people they turn to for help, develop an almost instinctual elitism where they discredit the quality of those programmers through the tools they use. (PHP hate and the many conversations about 'script-kiddies' for instance, which was once a prevalent derogatory term for javascript developers before, you guessed it, javascript was suddenly a professional language community.)
Is computer science's formal curriculum aiding or obstructing such sentiment?

More on point, can students at academic institutions get a minor in computer science that enables them to use such tools?
Generally, no.
In fact, I am far more certain that people will loudly disagree with me about this than I am confident that an artist can benefit from current programming education.
A computer science bachelors minor generally requires an introduction to theory and an algorithm course focused on analysis.
A painter would take a programming course and learn how to sum an array, fiddle with fibonacci sequences, and learn recursion through implementing factorials and if they are lucky through Tower of Hanoi.
They would go on to learn binary, modus ponens, De Morgan's Law, etc.
Digital painters would benefit greatly from scripting and the programming of shaders, and would benefit being introduced to basic programming skills, yet they can't easily get to that point.
This is wrong.

![Andy Warhol paints a portrait of Debbie Harry on an Amiga. This artwork, done in the mid 80s, was rediscovered and recovered in 2014. Article [here](http://news.artnet.com/art-world/cory-arcangel-excavates-andy-warhols-digital-art-from-ancient-floppy-disks-11819).](andy_warhol.jpg)

My use of painters here is not just a throwaway.
Programming has a rich and understated art and music history.
The piracy scene has spawned an independent art scene for real-time computer-generated art.
Digital painters and animators have found success working as programmers on visual effects systems.
Electronic music has a deep connection to programming with allowing code to be used to develop sound synthesis modules and music sequencers with formats that resemble machine code.
In fact, many pioneering computer scientists have a background in music.

So. I ask you this: Why can't a painter learn programming through painting?
Is that so ridiculous?
It is just as possible and valuable to introduce programming through art just as much as through math.
Let's introduce code by looking at code a different way. Looking at its aesthetics. As poetry. What it means. Who wrote it.
Don't write code to calculate the area of a square... write code to draw that square.
Write code that talks to you.
Write code that tells a story.
CS 101 that is Interactive Storytelling.
CS 101 that is Digital Painting.
Instead of a required university-wide Freshman Writing Seminar, give people the option to do Freshman Interactive Fiction Seminar.
Where is the presence of Computer Science, here?
Do we think there is one?

Programming should be the ultimate collaboration among mathematicians, engineers, artists, writers, and community.
Each providing tools the others may freely use with none taking full credit.
Until this is true, I fear computers and computation will be out of reach to so many people.
Computer science does not understand this and has failed them all.

![Ada Lovelace, Mathematician, First Programmer, and "Enchantress of Numbers"](ada.png)

> [The Analytical Engine] might act upon other things besides number, were objects found whose mutual fundamental relations could be expressed by those of the abstract science of operations, and which should be also susceptible of adaptations to the action of the operating notation and mechanism of the engine...
>
> Supposing, for instance, that the fundamental relations of pitched sounds in the science of harmony and of musical composition were susceptible of such expression and adaptations, the engine might compose elaborate and scientific pieces of music of any degree of complexity or extent.
> <div class="citation">&mdash; Ada Lovelace, Mathematician, First Programmer, and "Enchantress of Numbers," <a href="http://www.fourmilab.ch/babbage/sketch.html">Notes on an Analytical Engine</a></div>

My work-in-progress solution is this.
And it is both a critical one and a debatable one, not to mention institutionally impossible.
Throw away the roots of our conventional curriculum.
They don't serve a purpose other than to prepare for higher level *computer science* classes, which most won't need.

* Throw out the idea that everybody should learn to code. Replace this with the idea that code should simply be accessible to all.
* Replace general "101" class with a variety of introductions to programming, perhaps through or by other fields.
* Allow other departments to have their own programming courses, and have them count for computer science minors, which are only practical for demonstrating programming anyway.
* Remove statistics, calculus, and linear algebra as a requirement or prerequisite for minor-level courses. (Encourage them elsewhere, if you find them important for general education.)
* Stop letting computer science departments dictate the content and pacing of introductory courses. They don't know how to do it properly.
* Provide the higher level computer science courses for those who want to be computer scientists or "expert" (research oriented or career) programmers.
* Encourage critical thought (ethics, philosophy, sociology) and apply that to code.

If computer science does not reform its programming curriculum to be more general, I fear it will cease to be relevant to programming.
Or worse, it will continue to shallowly define programming and work against inclusion and diversity efforts.
I haven't personally decided this, but I am coming to the conclusion that the obsoleting of computer science programming education would be fine.
We are looking at a field and community that are defining themselves and their work in spite of the academic field which purportedly trains them.
The Information Schools or iSchools are growing to the point where they can overtake Computer Science as the proper place where programming should be taught at university and discussed critically.
I believe that the division where computer science is developing programming **techniques** and models and information science (the programming school and critical code theory) is evaluating their community effectiveness is rather apt, although perhaps a strange thought to most right now.

The idea that information science may teach programming and thus train future computer science researchers might be something that is hard for CS to really swallow.
Yet, the idea that a medical doctor or biologist would go into computer science to study visualizations would now be far more likely if programming education were more accessible.
And that is the type of collaborative future that I think must happen, with or without the support of academic computer science.

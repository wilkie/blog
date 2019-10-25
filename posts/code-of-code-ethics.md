---
title: Code of Code Ethics
subtitle: When Good Code Goes Bad
summary: There is much discourse on software for good and how to enforce the ethical consumption of open code. We need a diverse professional ethics organization. We need it desparately. We need it more than a feel-good do-good-license.
tags: ["programming", "programming/ethics"]
date: 2019-10-25
author: ["wilkie"]
---

With the growing resentment toward the United States government's treatment of refugees and immigrants, activist discourse has amplified in its pursuit of an answer.
How do we stop this evil?
And, to be frank, it is evil. An evil that has existed for quite some time, but never with this type of attention.
The internet, in spite of its faults, has a potent ability to shine a bright light on blight.

Within the tech space, under that illumination, we found a shadow feebly hiding an unsurprising collaboration between government agencies, such as ICE, and technology giants, such as [Microsoft](https://www.nytimes.com/2018/07/26/technology/microsoft-ice-immigration.html), [Google](https://www.theverge.com/2019/8/29/20838201/google-cloud-immigration-uscis-protests), and Microsoft's new problematic child, [GitHub](https://www.washingtonpost.com/technology/2019/10/09/employees-ask-github-cancel-ice-contract-we-cannot-offset-human-lives-with-money/).
The tech world, including these companies and their products, has greatly benefited from decades of community labor in the form of free and open-source software.
Now, that community has a grievance and a dastardly dilemma: how to prevent further misappropriation of that labor without hurting the community it originally meant to bolster?

## Code of Ethics

Following the discourse, a strong consensus is forming around a particular solution.
To start, much of the open-source community is built around the ideals of sharing the burden: I give you my code, you improve it, you share that with everybody all the same.
This axiom defines the spirit of this community and it is represented, legally, in the form of several compatible copyright licenses, the most significant arguably being the [GPL](https://www.gnu.org/licenses/gpl-3.0.en.html), which is the software license Linux and its GNU commands use.

I mention this specifically because the ideals and mechanism are so well-established: share and share-alike, and the copyright license respectively.
The  solution, then, is to do the same, but imbue another set of ideals: ethics/morality.
The community simply creates a software license that has an added set of constraints, much like the existing "you must share changes," stating something like, "you must do no harm."
A type of hippocratic-inspired contract between coder and user.
Although there have been historical examples, the modern attempts include the [Do No Harm License](https://github.com/raisely/NoHarm), which excludes profiting from violence and environmental destruction, and the aptly-named [Hippocratic License](https://firstdonoharm.dev/), which directly references the UN definition of human rights.

![The logo for the hippocratic license, one example of a modification to an open-source license to add ethical usage requirements.](hippocratic.png)

However, there are a few reasons why "share" and "do no harm" are not quite the same ideas and somewhat strange when included as a copyright provision.
Copyright licensing is generally bound to the act of distribution.
If you hoard your changes and never share them, that's technically allowed.
That's generally a good thing. If you needed to patch something for your own personal use, it would be quite restrictive (and possibly personally sensitive) to then have to publish a description of your change.
Although the GPL upholds the ideal of "you are always allowed to modify and run," it does so by the same act of distribution. That is, by always forcing code to be available, any usage is also valid.

Now, I'm not a lawyer. My student loans are high enough already. But, I work in archival (it has lots of [ethical software issues](social-archival), too) and I'm absolutely terrified of copyright.
Copyright is hard to leverage.
More to the point, it has been, historically, very difficult to enforce some implied usage agreement via copyright.
The case that comes to mind is the [PC-MOS v. Arizona Retail Systems](https://cyber.harvard.edu/property00/alternatives/arizona.html) where shrink-wrap agreements seemed to not be binding.

Another is some thankfully good court opinions with respect to interpreting reverse-engineering (something licenses attempt to enforce in terms of usage).
The courts ruled that reverse-engineering can be fair-use such as with the famous [Sega v. Accolade](https://www.copyright.gov/fair-use/summaries/segaenters-accolade-9thcir1992.pdf) with other courts setting the bounds to exclude, naturally, [cases where that effort is redistributed](https://www.hklaw.com/en/insights/publications/2018/01/reverse-engineering-source-code-of-software-is-not).
In these cases, distribution (and intent) is key. All other usage governed by copyright could be strongly argued as fair-use.
Every other rule would be expected to be clarified in a contractual agreement, which a distributed software license would not be... [kinda...](https://www.theregister.co.uk/2017/05/13/gnu_gpl_enforceable_contract/) it's complicated.

## Can Ethical Enforcement Encourage Ethical Use?

Yet, some dismiss enforcement as a concern.
Chris Jensen, co-creator of the Do No Harm License, writes in [6 Myths about Ethical Open Source Licenses](https://hackernoon.com/6-myths-about-ethical-open-source-licenses-3bfbd042b1dc) that "Enforcement isn't the point." They continue, 

> The GPL wasn't written so that developers could haul big companies to court for misusing open source code. Yes, it's legally specific in it's construction and possible to enforce, but that wasn't the purpose the authors had in mind for it. They created the GPL to spread an idea-- the idea that software and it's source should be freely shared.

Surely the GPL, revised by a lawyer and enforced in court, is designed to leverage the legal system to push those ideals?
Surely it is written in the form of a copyright record for that reason.

This is the issue.
If it is not meant to be enforceable, then it is meant to simply be a message.
It is a signal that you, the developer, want the world to be better and do not want to be a participant in making the world worse.
That is certainly a valid goal.
It just does not actually make anything better.
You are placing all of the burden of appropriately using the code on the next developer down the line without giving them any guidance.

Code that actively hurts people written by an unaware developer could certainly have such an ethical license.
Code with the license could be used by a developer that makes something unintentionally damaging.

To be fair, the licenses linked above only trigger on "knowing" ethical abuses clearly targetting corporate and government misuse.
Furthermore, it is classically difficult to separate ethics, morality, and harm from context, and I certainly won't attempt that here.
Yet, there are victims that could still be better served by providing them better software that protects them from such harm in the first place.
Along with that statement of intent on how the software is to be used, we have to provide guidance and more strongly define such potential harm.
Otherwise, we have created an excuse. Something small that is not actually actionable, but makes a developer feel like they have contributed to the safety of others.

## We Need an Ethical Professional Organization

If we want to sent the right signal, then we need to hold ourselves accountable just as much as the giants.
We need an ethical profession, not just a copy-and-paste statement of intent.
We need to reörient our community so our best effort is facing forward.
And be constantly held to that ever-self-reflective standard.

The community has an existing set of ideals which are well-established and well-understood.
As argued by others, we no longer need to organize solely around software freedom, and can and should push the domain of freedom further.
This new organization, replacing the role the [FSF](https://www.fsf.org) had in promoting software freedom, will uphold software ethics.
It will continue to uphold traditional software freedoms as greater access to ethical software is a valuable goal.

With modern technology companies and products always quick to ignore certain parts of the population, we need to create this organization with the most diverse and motivated leadership.
To build off of the established labor of the free-software movement, the community should reclaim its collective ownership of that software.
One benefit, here, is that open-source software that would otherwise not apply an ethical license (due to stubbornness, conservatism, or its owner is, well, dead... it happens) can still be part of a new whole due to it already being unburdened by the existing GPL.
The community can then make use of the current work defining software ethics and reappropriate that to the task of software guidance and review in order to curate this existing body of work into a catalog of ethical software.

![!](fsf-future.svg)

The professional organization will take new software projects under their wing if and only if they uphold such a review.
Specifically, software can be assessed by a diverse group for the attention it places toward the safety and security of its patrons.
Reviews will give feedback on development changes which, through iteration, strengthens software toward the goal of being more accessible and safe.
Developers that are part of the organization can then help maintain and patch software in support of the established ethics and to support the community's most vulnerable and to train junior members.
Inclusion of software into the professional domain, then, strongly implies that software has been appropriately designed for ethical use.

Let's pull out a perhaps prescient example.
Social media applications can be reviewed for their moderation features such that they are less likely to be used and operated in a way that makes less technical and/or younger users vulnerable.
Does your social media software focus too much on solving the technical challenge of scaling to millions of users?
Where are your moderation tools?
Ah, well, just because the software **can** scale does not mean you or any person can reasonably support the moderation of those potential millions of users.
The guidance could be, then, to constrain the design to build social media software that emphasizes building smaller communities and scaling softly and carefully.

As the catalog of software grows, so does the possible leverage the organization can apply to misappropriating entities.
When a tech giant uses software for an evil purpose, the community has a vehicle for not only voicing those concerns, but disrupting that activity.
If a developer that is part of that organization and also employed at such a company can more easily act in protest when supported by the many other developers and activists.
The establishment of a professional code of ethics, by virtue of being a member, will mean that such developers will not work at abusive companies and be more accepted at others.
Furthermore and perhaps controversally, while companies lose access to developers, membership can be revoked in the case a developer is employed under an unethical contract (for instance, an ICE contract) and does not take action to leave that work.
This will work well in an organization that can help relocate a worker from one company to another.
Companies have a vested interest in supporting a community that performs maintenance labor on collectively useful software and will be expected, beyond its ethical duties, to fund its ongoing operating costs in order to be held in good standing.


## In Summary

Have I invented a union?
Yes.
I dream big. It's what I want.
I'm turning this big ship around and pointing the blame right back at us, where it should be... where it can be acted upon.
I want to use the catalog of open source software toward collective action, while improving the body of software to care about the people dependent on it.

Create a software union, specifically a professional organization with a professional code of ethics. Let software projects be part of the union so we can clarify ethical design and practice. Create a process for publicly accessing ethical practice and curate a list of ethical software.
Create a space for developers to easily organize and strike when ANY code is being unethically used, not just the code from the folks that selectively and currently care.

I'm not the right person to do this, but please do this.

And, to close, yes, sure, slap a statement that says "don't use this to hurt people" but, my goodness, also do something else that includes the input of others so you, yourself, don't accidentally hurt people.

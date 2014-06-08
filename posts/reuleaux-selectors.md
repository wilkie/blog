---
title: "Reuleaux Selectors"
author: [wilkie, lindsey]
gittip: [wilkie, LindseyB]
date: 2013-06-27
summary: "Gender is a complicated attribute, and as such has been difficult for developers and designers of web services to allow users to describe properly. In this article, we discuss a new type of gender/orientation selector that respects a very broad spectrum of possible values. This selector stresses an incomplete solution to a difficult usecase: a selection that allows a large set of possible values, yet is comparable."
tags: ["diversity", "diversity/gender", "programming", "programming/ui"]
scripts: ["raphael-min", "reuleaux-selectors"]
---

Whether you believe gender follows essentialist principles or is constructed, the concept of gender identity is a very complicated subject.
Contrary to unfortunately popular belief, gender is not chosen from a binary as though it were conjured at the whim of a coin-toss.
Gender is different for just about every individual and as infinite as our collective imaginations can bear.

In this post, we describe a new form of gender selection interface (the [code](https://github.com/wilkie/blog/blob/master/public/javascript/reuleaux-selectors/reuleaux-selectors.js) is open and in need of refactoring).
It is worth noting this disclaimer: we are not trying to develop the perfect representation.
For decades, the computer science community has not explored new approaches to this problem, and thus for decades people have been excluded based on not being able to fully reflect themselves.
There are a few reasons why&mdash; particularly computer science's predilection toward metrics and peer-review which hurt divisive, intentionally vague, or exploratory work.
Yet this is exactly meant to be a provocative push to get people, including UI/UX researchers, invigorated about this problem.
We should ultimately be collaborating on a better solution.

For now, though, if you ask for gender, reconsider asking.
If that fails, consider asking for pronouns instead.
If you still can't say no, use a text field.

## What is gender?

In order to describe a method of how to represent gender and allow an individual to select a gender identity, we first will explore the variety of gender we tend to describe, and the variety of gender that exists.
Many people will be surprised at the amazing rainbow-like diversity of gender that the universe contains.
It is perfectly acceptable to be unaware, but as we build social spaces and as we interact with a diversity of people, we should certainly make an attempt to empathize.

### Gender binary

![border|The gender binary is enforced by culture](gender-binary.png)

The prevailing, yet optimistically evolving, perspective of gender throughout society remains mostly that of a binary.
You are either a man or a woman and if you are not one of those two, you are pushed into situations where you have to choose. Our social networks, dating services, and other online communities should not enforce this broad and unfair generalization.

It is clear that our overall society enforces this concept through its presentation in various societal forms: which bathroom we use, and reinforced through cultural symbols: such as the ones that adorn such bathroom doors and through gendered language such as binary pronouns (he, she) and gendered nouns (blond, blonde in English).

There is no room for diversity here. A person could be on that fuzzy (and ever-changing) line between men and women. What pronouns do we use? Well, we should use what pronouns they prefer, and should ask for such. As it stands, though, we are still pushing this individual to select between two choices, when in fact, they may prefer another option. This choice is perfectly, and naturally, acceptable.

### Gender scale

![The gender scale allows for bigender/intersex individuals, but not agender](gender-scale.png)

Given that a binary system is inadequate for individuals not self-identifying at extremes, another option that people have presented to define gender is a sliding scale with male at one end and female at the other. This is better, because we can now represent more feminine men, masculine women, intersex, bigender, and some androgynous people. However, this scale actually still supports the concept of gender binary, and as such does not respect individuals that exist outside of its normative bounds. For instance, where does one go in the scale that have no self-identifiable gender characteristics? Frankly, an individual that is neither man nor woman is not necessarily in the middle of one particular scale.

### Gender spectrum

![The gender spectrum is a continuum that allows for a variety of genders and allows for a diversity of non-conformity](gender-spectrum.png)

The reason gender is so hard to define as an input method is that, in reality, gender is more of a spectrum of possibility. Male and female are not truly endpoints, but rather simply points in the spectrum.

So, to interpret the spectrum as I have defined it in the image above, we would have male and female on opposite sides of a ring. Starting from female, moving around toward the northwest portion would add male identity and going toward the southeast portion would subtract female identity. Hitting the top-left would give you both gender identities and hitting the bottom-right would be void of both. By no means is this the only proper representation.

We could stop right here and say, "let's use the spectrum above." While it does illustrate the idea that in reality gender has no endpoints, it is also a bit problematic about where certain representations are.
Agender individuals, represented here as &#9898;, are within the broad spectrum of gender options. However, you should be able to move from bigender, &#9893;, to agender without having to pass through male or female.

That is, it is good for representing the qualification of gender, but not very good for comparison.

![The gender triangle represents the spectrum yet allows the middle point of agender to be the farthest point from any extreme](gender-triangle.png)

Therefore, a triangle would represent the same idea. It does make certain landmarks clear by placing familiar gender identities in the corners. However, this should help individuals choose by selecting a gender identity relative to those landmarks.
Also, by placing agender at the midpoint, bigender at the bottom center, and polygender at the top, eschewing gender is always a matter of going toward the center without having to move through genders to be rid of them.

This representation is a 2d input that provides input for a three dimensional point. The point will be calculated as a vector of the distances to each corner. From there, we can create a gender selector by refining this triangle concept such that a fuller representation of the spectrum is available.

## Defining a comparable gender value

### Triangles

The intuitive attempt to represent directional values for male, female, and androgynous would be to use a triangle and place each gender at a corner.
This posed some difficulty in selection.
Based on informal feedback, some individuals were quick to place their marker in a corner directly.
The corners, by being corners, could not capture the fluidity of the spectrum.

Therefore, the corners should be rounded off in a way that did not compromise their position as an extent, but also give the impression of fluidity.

Another design flaw of the triangles is that the relationship between two extremes is a straight line. Although the straight line seems intuitive, the relationship to the center point changes rapidly across such a line. That is, one might believe that the relationship between two gender identities could go through the center point, yet that is not true. Individuals may misjudge the relative nature of two points as a result.

Related, the last design flaw of the triangle is that the center point is nearly invisible and hard to select. Since it represents agender, it seems fitting that the center point be expanded such that defining a point there would position the selector's knob outside of the bounds of the shape representing a value of gender.

Therefore, the triangle was abandoned.

### Reuleaux triangles

To revise the triangle to better reflect the gender spectrum, we expanded the center point to better accommodate agender qualities.

![The Reuleaux ring is the result of considering better representations and visibility for agender/asexual individuals](gender-reuleaux.png)

When you take a triangle and blow out its center point, you produce an interesting piece of geometry. It is essentially a three-sided ring defined by two similar [Reuleaux triangles](http://en.wikipedia.org/wiki/Reuleaux_triangle).

Geometry time! A **Reuleaux triangle** is a three-sided curved polygon with a constant width along any line perpendicular to the tangent of the curve. It is produced by the arcs of three congruent circles with each circle's center point corresponding to a corner point of the triangle.

<p></p>
<div class="image">
  <div id="genderTriFieldIllustration" style="width: 430px"></div>
  <input type="hidden" id="genderValI" value=""></input>
  <input type="hidden" id="genderXPosI" value=""></input>
  <input type="hidden" id="genderYPosI" value=""></input>
  <div class="caption">
    <strong>Interactive</strong>: Reuleaux coordinates are transformed into triangle coordinates.
  </div>
</div>

In order to represent the data in a way that is intuitive, we transform the point the user selects within the Reuleaux to the corresponding point on a triangle. Drag the selector above to get a feel as to how the geometry relates. Notice that as you drag the selector along a curve, it corresponds to a line on the triangle. Also, every point along the boundary of the inner Reuleaux corresponds equally to the center point of the triangle.

## Input methods we have now

Even though we have a growing awareness of the incorrectness of the notion of a gender binary, the presentation of only two choices is retained in our software systems and social networks.
The selection is given as a strict choice normally between two different values: male or female.

### dropdown

The dropdown is the traditional gender selector. Generally, it seems developers tend to only allot the two familiar choices. Even social services proud to be used by millions of people, such as facebook, have long fought offering any amount of choice, even under [heavy criticism](http://www.zdnet.com/blog/facebook/nepal-asks-facebook-for-third-sex-option/11117). Interestingly, facebook has always contained internal support for a third gender that users were [able to enable through a hack](http://www.youtube.com/watch?v=rb68sPtblyo) which then used non-gendered pronouns to refer to them to friends.

Eventually, [facebook added](http://abcnews.go.com/blogs/headlines/2014/02/heres-a-list-of-58-gender-options-for-facebook-users/) a curated list of gender options, most of which are just variants along the cis/trans binary and vague angrogynous terms.
Notably, facebook hid their list of acceptable genders and employed in place of a drop-down an auto-complete text field, which is certainly an implicit drop-down.
However, with this change, they also ask for pronouns and allow people to select a long-supported non-gendered 'their'.

![border|Facebook, a social network with millions of users, allows basic non-binary genders if you can guess the terms they support. Image from [Will Oremus's article](http://www.slate.com/blogs/future_tense/2014/02/13/facebook_custom_gender_options_here_are_all_56_custom_options.html).](fb_gender.png)

There was a conscious effort of developers in general (facebook avoided this trend), perhaps to retrofit a proactive model with an existing system, to add a third catch-all option usually titled "other."
This is an incorrect solution because culturally it paints the image that this third option represents a third gender, when it really collects those strictly outside of the cultural gender-binary.
It dismisses the gender identity of all of those outside male and female. Furthermore, the term "*other*" depicts these individuals as abnormal.
It says, you can be a man, a woman, or something else. This is not equality. This is merely placation without respect for identity.
Not to mention that some individuals may wish to opt out of the politics of gender and the "other" option unduly oppresses them into that system.

In the end, for a dropdown to be successful in representing the full spectrum of gender options, it would have to continue to add them as they become desired.
Such an exhaustive list would never-the-less be excluding somebody.
At the end of the day, the freedom to express one's gender identity could be better suited for an input method based upon the whole freedom-to-write-whatever mechanic.

### textfield

With that in mind, we need a way to depict gender that presents equal opportunity to all genders.
This is, of course, a simple textfield.
This solution is generally seen as a versatile solution that allows a wealth of choices.
It is a solution that is used, perhaps slightly strategically, by facebook's cultural competitor [Diaspora](http://www.sarahmei.com/blog/2010/11/26/disalienation/).

![border|The change to a text field for gender was a divisive issue for Diaspora, shown here, but not for Metafilter who originally had such a field for over 10 years. [1]](diaspora-gender.png)

However, it is not without fault. A textfield cannot describe all options because it is limited by language. It also does not represent degrees of gender. That is, one person can say "male"
and so can the next, yet, we cannot tell if such a set of individuals was presented with a scale, would they then say that they are 80% male and 70% male?
Does a textfield allow them to too quickly choose to pigeonhole themselves?

Also, a textfield is hard to compare. There are times when a genderqueer individual would like to use a more fluid value for gender identity in comparison to others. For instance, a dating
service. A textfield, beyond influencing self-pigeonholing, is difficult to quantify as a mathematical value. You could limit the choices to a tagged dropdown, [which has been proposed](http://www.sarahdopp.com/blog/2010/designing-a-better-drop-down-menu-for-gender/),
however, you would then have to manually assign weights in order to determine how far away one gender is from another.

While the textfield is still invaluable and it is very apt to recommend it (perhaps in conjunction to our proposal), we need a field that can both provide a wealth of gender options that can represent the gender spectrum (qualification) *and* a field that produces values that can be easily compared with one another (quantification).

## The selectors

We believe the Reuleaux gender selector solves the issues apparent in other approaches. It provides a broad range of gender identities in a way that is fairly easy to use. Furthermore, it results in a quantifiable value, a three-dimensional coordinate, which can be used for comparison.

![The selector can identify a wide variety of genders independently giving freedom to the degree of strength of the identification.](gender-chart.png)

### Sexual orientation selector

One of the interesting extensions of the gender selector is also using it for sexual orientation.
This presents some issues and complications, but using the gender selector to also select for orientation works fairly well.
The one problem is that while gender is a union (I identify with male and female: I am bigender), sexual orientation tends to also be intersectional (I am attracted to those that are both male and female: I am attracted to bigenders).
That is, the selector allows you to put a point at the bottom of the field. But this indicates a union (bisexual) instead of somebody that happens to only be attracted to the specific bigender identity.

<p></p>
<div class="image">
  <div style="width: 430px">
    <div id="genderTriField" style="float: left"></div>
    <input type="hidden" id="genderVal" value=""></input>
    <input type="hidden" id="genderXPos" value=""></input>
    <input type="hidden" id="genderYPos" value=""></input>
    <div id="sexualityTriFieldSimple"></div>
    <input type="hidden" id="sexualityValSimple" value=""></input>
    <input type="hidden" id="sexualityXPosSimple" value=""></input>
    <input type="hidden" id="sexualityYPosSimple" value=""></input>
  </div>
  <div class="caption">
    <strong>Interactive</strong>: Gender and orientation selectors as Reuleaux triangles.
  </div>
</div>

This can be solved by allowing gender to be specified as a single point, and sexual orientation to be a set of points to form areas of selection.
In this form, if a gender identity that an individual **A** selects falls within the area given by the sexual orientation selector of person **B**, then you could say that **A** would be gender-compatible with **B** from **B**'s perspective.
This greatly complicates the sexual orientation selector relative to the gender selector in terms of user ease of use.
However, in cases where this type of input is very useful (such as with dating services,) this complication can be tolerated by users in order to increase the quality of their representation.

<p></p>
<div class="image">
  <div style="width: 430px">
    <div id="genderTriField2" style="float: left"></div>
    <input type="hidden" id="genderVal2" value=""></input>
    <input type="hidden" id="genderXPos2" value=""></input>
    <input type="hidden" id="genderYPos2" value=""></input>
    <div id="sexualityTriField"></div>
    <input type="hidden" id="sexualityVal" value=""></input>
    <input type="hidden" id="sexualityXPos" value=""></input>
    <input type="hidden" id="sexualityYPos" value=""></input>
  </div>
  <div class="caption">
    <strong>Interactive</strong>: Sexual orientation selector can select areas that indicate attraction to the given gender identity. Drag the middle circle out, use smaller circle to expand area. To remove a circle, shrink it until very small. As you drag circles out of the middle area, new circles can be added. Add as many as you would like.
  </div>
</div>

Please experiment with the selectors above to create your identity profile below.

<p></p>
<div class="image">
  <div style="width: 470px">
    <div id="output">
    </div>
  </div>
  <div class="caption">
    <strong>Interactive</strong>: Use the selectors directly above these to create your identity image.
  </div>
</div>

## Not an end-all solution

### Genderfuck

One of the issues with the gender identity selectors is that they represent a static, unchanging representation.
It could very well be that one's identity changes over time, perhaps even daily.
This selector would then have to be changed as the identity changes manually.

One solution would be to use an area selector for identity as well.
A genderfuck individual, whose identity is not well defined, can then select an area of identity.
Gender-compatibility can then be defined as whether or not the area of the gender identity intersects with the area of the sexual orientation, although this is not entirely perfect.

However, in the end, this selector is designed to only be effective for well-defined identities.
It is always best to include both this selector and a textfield for clarification.
The ability to well-define your identity is still the most practical and most awesome benefit to provide a user.

### Physical characteristics

This selector does not, in any way, take into account physical characteristics of the individual.
One criticism received for this selector is that one cannot specify clearly that they have a particular set
of genitalia. Also, as far as sexual gender preference goes, some were rather upset that they cannot specify
that they are attracted only to women with cisgendered reproductive systems.

After all is said and done, this selector is only concerned about gender. Physical characteristics do not correlate with gender identity, and therefore cannot be depicted in this selector.
That said, some interpret areas of the gender selector as indicating this, however.
Since no instruction was given, feedback in discussion shows that individuals do see a correlation that does not explicitly exist.
They may assign their gender identity accordingly, which is fine, and within the bounds of use of the selector.
However, you cannot reverse engineer that decision to draw any conclusions.

### Ease of use

It is not clear how intuitive the selector is.
In open-trials, where no instruction is given, individuals were presented with the simple, single-point gender and sexuality selectors.
They were able to give feedback, privately and also among a forum.
I have suppressed the exact feedback due to privacy and due to the fact that the discussion was not fruitful (that is, sometimes a bit hateful) to the discussion on a whole.

However, it is difficult to conceive of a simpler way of inputting a broad range of gender choices.
It is possible that one could add the ability to use preset points according to a dropdown or determined from a textfield to prepopulate the selectors.
This would show the intention of the selectors and also help the assumed majority of people make quick decisions, but still allow the genderqueer community the ability to be visible by refining their identity further.

## General advice for usage of gender fields

If you add a gender field to your project, you must ask yourself the question: what do the users gain from being able to report this value?
The general advice that one can give is to drop it altogether, especially if there is nothing directly related to the service you are providing that benefits from gender.

![border|Imagine you are a person that does not fall cleanly into one of these two categories. You are now presented with a bright red flag that will not let you continue until you choose. How would you feel? (Image is rdio's registration and courtesy of <a href="https://www.rstat.us/updates/50e8a221aeb89a00020202e4">@carols10cents</a>)](gender-rdio.png)

A common reason for including gender, even if only privately stored and never publicly displayed, is to provide humanization through gendered language, such as personalizing text with the correct pronouns.
If this is the case, then the correct action is to just simply ask the user for their preferred pronouns and allow for a non-gendered form if language permits (which [English does](http://en.wikipedia.org/wiki/Gender-neutral_pronoun#Summary)).

![border|Rdio only uses their gender information to provide linguistics. We recommend that pronouns be explicitly asked for in place of gender, and that you allow a non-gendered option (his/her/their.)](gender-rdio-response.png)

When you are providing a social service, users may wish to publicly display their gender.
In these cases, since it directly benefits their ability to express their identity, you should allow for a free range of choice.
Therefore, in this case, simply use a textfield, and **always** allow them to specify nothing.
It may benefit to suggest common genders to allow more ease of use to the majority of normative users and to encourage genders that are quantifiable for statistical purposes.
However, you must look at this from your users' perspective: which method improves *their* ability to *self*-describe *their* identity, because that's what *they* want.

As mentioned above, textfields may have some form of societal influence that actually could limit choice.
In this case, use the Reuleaux gender selector.
There is nothing that prevents you from using such a selector alongside a textfield.
This allows both a comparable value for gender and a way to self-label with a finer granularity (or for a user to make it very clear what gender they identify as.)

Such a combination seems most viable on a dating service that is genderqueer friendly where the matching logic is gender-seeking.
In such a case, it may offer better opportunities to suggest gender labels for the textfield based upon your gender value in the selector.
That is, using the gender value as a relevancy hint for the keyword search to order the suggestions more properly.

All in all, gender is a complicated subject.
It is best to avoid collecting that aspect of identity if possible.
However, we wish to make it clear that there is still room in social places where
gender is meaningful to also be willing to include individuals that fall outside of gender-normative groups.
We do not believe this is the end-all solution, but we do believe it is progress in a space that
lacks new ideas and it is our ultimate goal that it motivates discussion and even fresher solutions.

### References

1. Interesting statistics about textfield usage at Metafilter and relation to Diaspora's decision in Carina C. Zona's talk [Schemas for the Real World](http://confreaks.com/videos/1120-gogaruco2012-schemas-for-the-real-world), 2012 Golden Gate Ruby Conference, exact reference is ~17:00.

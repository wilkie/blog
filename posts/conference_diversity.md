---
title: "Conferences Must Be Active to Promote Diversity"
author: wilkie
tags: ["diversity", "diversity/sexism", "diversity/racism"]
summary: "Conferences are being criticized by the lack of diversity in their speaker lineup. This has led to such a criticism causing the cancellation of a conference. I argue that this is correct as the conference is devalued by its lack of diversity, and it should have been more active in its promotion of voice."
date: 2012-11-19
---

In the spring of 2012, the [BritRuby](http://britruby.com) conference presented their speaker lineup. They decide to invite 15 speakers and then
allot 5 more to select later based on submissions. However, their speaker lineup was later [contested heavily on twitter](https://twitter.com/joshsusser/status/269844125363339264) due to consisting of all white men. Due to this,
the organizers decided to [cancel](http://2013.britruby.com/) the conference altogether.

> Nice speaker lineup for BritRuby. Except for the 100% white guys part.
>
> <div class="citation">&mdash; Josh Susser, organizer of Golden Gate RubyConf, <a href="https://twitter.com/joshsusser/status/269844125363339264">on twitter</a></div>

## The conference that is critical of voice

It is a very dangerous proposition to suggest that the conversations on Twitter that indeed led to the demise of the conference
should have been suppressed. To say such a thing, and it has [been said](https://gist.github.com/4106776), would be tantamount to suggesting that the value of
holding the conference surpasses the value of an expression of equal rights. It would be as though the conference as it stood would be better
than the ideal function of such a venue to provide a fair and equal platform for being heard. Certainly a venue of communication that
fails to provide equal voice is devalued over that voice?

Let's look at the math. The likelihood that a selection process that is blind to gender would select certain combinations of men and women
is a simple Bernoulli distribution. I'm going to assume a gender binary for simplicity and discuss the notion of not selecting women. They
are the largest unrepresented group and among underrepresented groups, they enjoy the most privilege. Therefore, anything dismissing women must also be dismissing minority
groups.

[Taubee studies](http://cra.org/uploads/documents/resources/taulbee/CRA_Taulbee_2011-2012_Results.pdf) show that women earn 20% of the degrees in computer science. That being my best statistic, I will assume
that 20% of women are involved in the tech field in some way. That implies the expected number of women speakers would be 3, not 0, although to match the true population we
would ideally shoot for a 1:1 ratio in all regards (degree awardees, conference speaking, etc) and look for about 7 to 8. With that in mind, the probabilities given a field of 15 speakers are as follows:

### Probabilities of outcomes given random selection:
```
15 men and  0 women =  3.5%  <-- Observed
14 men and  1 women = 13.1%
13 men and  2 women = 23.0%
12 men and  3 women = 25.0%  <-- Expected (Against number of CS degree awardees)
11 men and  4 women = 18.7%
10 men and  5 women = 10.3%
9  men and  6 women =  4.2%
8  men and  7 women =  1.3%  <-- Ideal (Against world population)
7  men and  8 women = ~0.3%
6  men and  9 women = ~0.0%
```

### Probability of having...
```
=0  women:  3.5%  <-- Observed
>0  women: 96.5%
>1  women: 83.4%
>2  women: 60.4%  <-- Expected (Against number of CS degree awardees)
>3  women: 35.4%  <-- It is more likely to have more than the expected number
>4  women: 16.7%      than to have exactly no women represented.
>5  women:  6.4%
>6  women:  2.2%  <-- Ideal (Against world population)
>7  women:  0.9%
>8  women: ~0.0%
=0  men:   ~0.0%
```

The probability of such an arrangement, by blind review, suggests one of two things: either women are extremely unqualified to be
leaders in this area / have no such interest by virtue of genetics due to the fact that their proposals were deemed less interesting or vital
compared to men. Or **there is no such correlation and women are intellectually equal to men and the system of organization that prevails in this culture
has oppressed their ability to be visible**. The former claim is preposterous given our scientific knowledge that gender differences are
not biological, especially in terms of intelligence, problem solving, and interest. They are indeed constructed from a series of social
factors, such as the well-studied stereotype threat. Therefore, it is far more likely that the social factors that obscure women from
being represented include the subconscious bias against them represented here by the conference speaker lineup.

The solution is to actively promote such diversity and be proud of supporting it. But affirmative action is bad, they say. It hurts the meritocracy, they say.
To suggest that a (specifically. as in, the adjective was actually actively [used in opposition](https://gist.github.com/4106776).) token minority would not be acceptable is to suggest that
no such qualified speaker is available. "How dare we push an African speaker just because of their skin color! They couldn't possibility have anything of value to
say! A woman? No, she failed to pass our rigorous test. There is no way her input could ever be valid!" Yes, it is a ridiculous thing to say. I agree. But this
is a valid interpretation of that argument. It suggests a speaker of quality that happens to be a woman or within a minority group does not exist.

  We must acknowledge that
this is not only false, but a rather dismissive idea that serves only to diminish the voice of an already relatively invisible
section of our community. We should be taking the effort to help those in this situation to be heard. Look for quality, and you shall find it,
  and you can promote it with, yes, special focused effort. This conference did not do this, has a statistically significant disparity, and
was called out upon it rightfully. **If you as a conference are inviting speakers and actively looking for quality yet not actively promoting diversity, then you are not trying hard enough.** Even if you criticize my numbers and suggest that, although 20% of the community are women, more percentage of men than women want to speak. That's
still a problem! A problem a conference must be willing to solve by actively promoting voice so that there are more potential voices
through the dispelling of stereotypes and better, more visible role models.

Considering the effect occurs on the most optimistic of cases (providing a voice for women) and this voice is being suppressed, it only follows that
other voices of minority communities that are far less represented are being oppressed considerably more. Since the number of active voices in the
CS community for those of African ethnicity are [less than 1%](http://www.math.buffalo.edu/mad/computer-science/cs-peeps.html), the probability distribution shifts dramatically toward the choosing of just one individual
in a blind review (just by chance!) becoming nearly a miracle. Therefore, a blind review cannot capture a diversity of voice, and organizers must
be more active to promote a higher probability and thus opportunity to those voices that go unheard. Is it fair that your system of assessment is devised by
the least diverse group you can build? Communicate with others and consult with diverse community leaders to bring their knowledge to more people.
That should be what your conference is about: being heard.

### Probability Proofs

I have developed a small program that produces the probability distribution of gender selection
for tech events in a [gist found here](https://gist.github.com/4114968). Included with this is
a simulation experiment that shows just how unlikely the situation that resulted in this conference
really is. This simulation should affirm the mathematics as well.

### Blind Review Correlation

Some have pointed out that comparing the handpicking scenario of BritRuby does not compare to the blind evaluation presented here. However, it does indeed compare. If your handpicking process is blind to gender (assuming that intellectual capacities are also gender-neutral) then your process will yield the same gender distribution as a blind review. The point is that their process did not do so, and now we can draw valid conclusions about the bias that exists. We can now say, "their selection process is biased against women.' Furthermore, we can draw some hypotheses that the representation of minorities is also not being considered. This is damning. We must also conclude that bringing awareness to this issue was correct as long as we suggest that bias should not occur in speaker selection at conferences.

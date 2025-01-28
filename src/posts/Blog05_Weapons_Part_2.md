---
title: Lyra Sound Redesign Blog 4 - Weapons (Part 1)
date: 2024-12-15
author: "Georgios Georgakis"
---




![description](/blogImages/Blog05_Weapons_Part_2.png)

# Lyra Sound Redesign Blog 5 - Weapons (Part 2)

## By Georgios Georgakis



&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;


Hello Audio Peeps! 

This is the second and final part of my series on the weapon systems I created for my Lyra audio redesign. Let’s dive right in!

&nbsp;&nbsp;&nbsp;

## Bullet Whiz-By

The bullet whiz-by sound is a crucial element in any shooter game. It adds realism and excitement to gameplay while serving a tactical purpose—alerting you that someone is shooting at you (and thankfully missed!). This type of sound isn’t exclusive to shooters; racing games, for instance, use similar "whoosh" sounds when cars narrowly avoid collisions. ([Example](https://www.youtube.com/watch?v=5soym8z7Q5A)).

&nbsp;&nbsp;&nbsp;

![Grenade_Toss](/blogImages/BL04_Grenade_Toss_BP.png)
###### Figure 01. Triggering the grenade toss sound in the animation blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Bullet fly-bys are handled by the "WeaponAudioFunctions" blueprint. Using the "Whiz By" function within this blueprint, I integrated my Wwise nodes to retrieve the fire distance value, which is then sent to an RTPC to trigger the sound effect.

The fire distance dynamically controls both the voice volume and a high-pass filter. This means that distant bullet whiz-bys are louder and deeper, while closer ones are thinner and less pronounced. The design rationale is that players get more critical information from weapon fire and footsteps, making whiz-bys less important in close quarters. However, at long range, whiz-bys become more valuable, providing essential feedback that someone is firing in your direction.


![Grenade_Toss](/blogImages/BL04_Grenade_Toss_BP.png)
###### Figure 02. Triggering the grenade toss sound in the animation blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## Damage Audio Cues

By modifying the "GCNL_Character_DamageTaken" blueprint, I can now trigger Wwise events based on whether the player is dealing or taking damage. Both actions follow a similar process: when a bullet hits, the system detects whether it struck the body or a weak point (like the head) and plays the appropriate Wwise event.

![Grenade_Toss](/blogImages/BL04_Grenade_Toss_BP.png)
###### Figure 03. Triggering the grenade toss sound in the animation blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

![Grenade_Toss](/blogImages/BL04_Grenade_Toss_BP.png)
###### Figure 04. Triggering the grenade toss sound in the animation blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

### Headshot

The headshot sound includes an additional layer. When you land a headshot on an enemy, an extra ringing sound is added to the damage dealt sound. Conversely, when you take headshot damage, a short, snappy layer is added to the damage taken sound to alert the player.

&nbsp;&nbsp;&nbsp;

## Kill Confirm / Player Death

A kill confirmation sound plays when a player successfully eliminates an enemy. This feedback informs the player that the enemy is down, allowing them to shift focus to another target or objective. I implemented this by modifying the "GA_Death" blueprint, which triggers upon a character’s death. Depending on the character's name, the system plays either a kill confirmation cue for enemy deaths or a player death cue when the player is defeated.

![Grenade_Toss](/blogImages/BL04_Grenade_Toss_BP.png)
###### Figure 05. Triggering the grenade toss sound in the animation blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## Bullet Impacts

To enrich the auditory experience, I added bullet impact sounds for different surfaces. 

&nbsp;&nbsp;&nbsp;

First, I identified the blueprint handling bullet impacts on surfaces and noticed that two new surfaces I added—plastic and wood—were not included in the "Current System Template", which checks the surface material. I created two new variables for these materials and added them as an index to the select node so they could be recognized by the "Current System Template" variable.

Additionally, I created new particle effects for these surfaces to provide a visual representation. I duplicated the "NS_ImpactConcrete" Niagara system, made slight modifications to differentiate it from the concrete effect, and renamed it appropriately for plastic and wooden surfaces. Finally, I updated the blueprint to handle the audio events from Wwise.

![Grenade_Toss](/blogImages/BL04_Grenade_Toss_BP.png)
###### Figure 06. Triggering the grenade toss sound in the animation blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

![Grenade_Toss](/blogImages/BL04_Grenade_Toss_BP.png)
###### Figure 07. Triggering the grenade toss sound in the animation blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;
This system checks which "Current System Template" is being used and, based on its name, activates the corresponding Wwise switch and triggers the appropriate sound event.

&nbsp;&nbsp;&nbsp;

## Portal Update

I also made a small update to the Portal system. Previously, it misbehaved when teleporting grenades, so I rewrote the blueprint to be clearer and tag-based. The logic remains the same: when something enters the portal, it checks whether it’s the player, an NPC, or a grenade and sets the RTPCs and Wwise events accordingly.

![Grenade_Toss](/blogImages/BL04_Grenade_Toss_BP.png)
###### Figure 08. Triggering the grenade toss sound in the animation blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Additionally, I changed the virtual voice behavior from "continue to play" to "send to virtual voice" to save some resources.

![Grenade_Toss](/blogImages/BL04_Grenade_Toss_BP.png)
###### Figure 09. Triggering the grenade toss sound in the animation blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## Conclusion

That wraps up my work on the weapon audio redesign! This part was one of my favorites because I had the opportunity to experiment more with sound design and implementation. The Lyra redesign project is almost complete, and I can’t wait to share a real-time showcase of all the sounds and systems! 

The next blog will focus on UI sounds, including victory/defeat screens, respawning, and countdowns.

Thanks for reading, and as always, feel free to reach out with feedback!

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

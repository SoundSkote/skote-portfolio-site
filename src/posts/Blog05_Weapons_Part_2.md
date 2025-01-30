---
title: Lyra Sound Redesign Blog 5 - Weapons (Part 2)
date: 2025-01-25
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

The bullet whiz-by sound is a crucial element in any shooter game. It adds realism and excitement to gameplay while serving a tactical purpose—alerting you that someone is shooting at you (and thankfully missed!). This type of sound isn’t exclusive to shooters; racing games, for instance, use similar "whoosh" sounds when [**cars narrowly avoid collisions.**](https://www.youtube.com/watch?v=5soym8z7Q5A)

&nbsp;&nbsp;&nbsp;

![Whiz_By](/blogImages/BL05_Whiz_By.png)
###### Figure 01. Triggering the whiz-by sound in the "WeaponAudioFunctions" blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Bullet fly-bys are handled by the "WeaponAudioFunctions" blueprint. Using the "Whiz By" function within this blueprint, I integrated my Wwise nodes to retrieve the fire distance value, which is then sent to an RTPC to trigger the sound effect.

The fire distance dynamically controls both the voice volume and a high-pass filter. This means that distant bullet whiz-bys are louder and deeper, while closer ones are thinner and less pronounced. The design rationale is that players get more critical information from weapon fire and footsteps, making whiz-bys less important in close quarters. However, at long range, whiz-bys become more valuable, providing essential feedback that someone is firing in your direction.


![Whiz_By_RTPC](/blogImages/BL05_Whiz_By_RTPC.png)
###### Figure 02. Whiz-by RTPCs in Wwise.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## Damage Audio Cues

By modifying the "GCNL_Character_DamageTaken" blueprint, I can now trigger Wwise events based on whether the player is dealing or taking damage. Both actions follow a similar process: when a bullet hits, the system detects whether it struck the body or a weak point (head) and plays the appropriate Wwise event.

![Damage_Dealt](/blogImages/BL05_Damage_Dealt.png)
###### Figure 03. Wwise integration in the "GCNL_Character_DamageTaken" blueprint for dealt damage. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

![Damage Taken](/blogImages/BL05_Damage_Taken.png)
###### Figure 04. Wwise integration in the "GCNL_Character_DamageTaken" blueprint for taken damage. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

### Headshot

The headshot sound includes an additional layer. When you land a headshot on an enemy, an extra ringing sound is added to the damage dealt sound. Conversely, when you take headshot damage, a short, snappy layer is added to the damage taken sound to alert the player.

&nbsp;&nbsp;&nbsp;

## Kill Confirm / Player Death

A kill confirmation sound plays when a player successfully eliminates an enemy. This feedback informs the player the enemy is down and they can shift  focus on another target or objective. I wanted this sound to be broken in two different pieces. One is the clear information that the player gets when they get an elimination and its high ping (UI) sound to make it easier for the player to identify the sound. The second sound will be the enemy’s body breaking down and will sound like a sci-fi deconstruction similar to the animation. I implemented the first sound by modifying the “GA_Death” blueprint, which triggers upon any character’s death. In this blueprint, I’ll also implement the player’s death sound which is different to the enemy’s sound. This is happening to enrich the storytelling and make it clearer about who died. So, depending on the character's name, the system plays either a kill confirmation cue for enemy’s death or a player’s death cue when the player is defeated.



![Death](/blogImages/BL05_Death.png)
###### Figure 05. Triggering the kill confirm or player death sound in the "GA_Hero_Death" blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

For the second part of the kill confirmation sound, the “GCNL_Character_DamageTaken” blueprint wll be used again. In this blueprint, we check whether the character’s health points are equal or below 0 and we call our second wwise event. 

![Char_Death](/blogImages/BL05_Char_Death.png)
###### Figure 06. Triggering the enemy deconstruction sound in the "GCNL_Character_DamageTaken" blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

This event, contrary to the first one, uses an attenuation to affect the voice volume, a low-pass filter and spread based on the enemy’s distance. 

![Char_Death_Atten](/blogImages/BL05_Char_Death_Atten.png)
###### Figure 07. Voice volume, Low-Pass filter and Spread attenuation settings in Wwise.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## Bullet Impacts

To enrich the auditory experience, I added bullet impact sounds for different surfaces. 


First, I identified the blueprint handling bullet impacts on surfaces and noticed that two new surfaces I added—plastic and wood—were not included in the "Current System Template", which checks the surface material. I created two new variables for these materials and added them as an index to the select node so they could be recognized by the "Current System Template" variable.

Additionally, I created new particle effects for these surfaces to provide a visual representation. I duplicated the "NS_ImpactConcrete" Niagara system, made slight modifications to differentiate it from the concrete effect, and renamed it appropriately for plastic and wooden surfaces. Finally, I updated the blueprint to handle the audio events from Wwise.

![Bullet_Impacts_Materials](/blogImages/BL05_Bullet_Impacts_Materials.png)
###### Figure 08. Added materials for the "Current System Template" variable. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

![BL05_Bullet_Impacts](/blogImages/BL05_Bullet_Impacts.png)
###### Figure 09. Triggering the appropriate bullet impact for each surface.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

This system checks which "Current System Template" is being used and, based on its name, activates the corresponding Wwise switch and triggers the appropriate sound event.

&nbsp;&nbsp;&nbsp;

## Portal Update

I also made a small update to the Portal system. Previously, it misbehaved when teleporting grenades, so I rewrote the blueprint to be clearer and tag-based. The logic remains the same: when something enters the portal, it checks whether it’s the player, an NPC, or a grenade and sets the RTPCs and Wwise events accordingly.

![New_portal](/blogImages/BL05_New_portal.png)
###### Figure 10. Triggering the grenade toss sound in the animation blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Additionally, I changed the virtual voice behavior from "continue to play" to "send to virtual voice" to save some resources.

![Portal_Loop_Virtual_Voice](/blogImages/BL05_Portal_Loop_Virtual_Voice.png)
###### Figure 11. Triggering the grenade toss sound in the animation blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## Conclusion

That wraps up my work on the weapon audio redesign! This part was one of my favorites because I had the opportunity to experiment more with sound design and implementation. The Lyra redesign project is almost complete, and I can’t wait to share a real-time showcase of all the sounds and systems! 

The next blog will focus on UI sounds, including victory/defeat screens, respawning, and countdowns.

Thanks for reading, and as always, feel free to reach out with feedback!

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

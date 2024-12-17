---
title: Lyra Sound Redesign Blog 4 - Weapons (Part 1)
date: 2024-12-15
author: "Georgios Georgakis"
---



![description](/blogImages/Blog04_Weapons_Part_1.png)

# Lyra Sound Redesign Blog 4 - Weapons (Part 1)

## By Georgios Georgakis



&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;



Hi,

In this blog post, I’ll discuss the audio implementation for weapons I did for Lyra. The whole weapon section covers various sounds, from throwing grenades to headshots. That’s why I decided to split it into two blog posts. This is the first post, and it will cover grenades, weapon foley, and weapon firing.

&nbsp;&nbsp;&nbsp;

## Grenades

As someone who gets excited by explosions, the first thing I focused on was the grenade sound. The grenade action consists of four parts: throwing the grenade, the grenade starting to beep, the grenade potentially hitting a wall or the floor, and the grenade detonates.

### Grenade Throw & Beep Timer

When the player presses “Q”, they will throw a grenade. To easily implement the sound of the throw, the animation blueprint was used to play the appropriate sound when the animation's notifier gets triggered.

![Grenade_Toss](/blogImages/BL04_Grenade_Toss_BP.png)
###### Figure 01. Triggering the grenade toss sound in the animation blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Additionally, although Lyra does not have a beeping timer function for the grenade, I thought it would be fun to create one. This system gives players extra auditory information about not only how far they are from an active grenade but how soon it is going to explode as well. This will hopefully prevent players from making deadly mistakes. 💣

When the grenade is thrown, the timer is set alongside a boolean to have better control over the system. Then, the grenade beeping Wwise event gets triggered.

![Grenade_Beeping](/blogImages/BL04_Grenade_Beeping.png)
###### Figure 02. Setting up the beeping sound when the grenade gets thrown in the "B_Grenade" blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

![Beep_Timer_BP](/blogImages/BL04_Beep_Timer_BP.png)
###### Figure 03. Controlling the beeping behaviour in the "B_Grenade" blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

If the grenade has been thrown, the timer will start counting down and will be sending this value to an RTPC. Following that, the occlusion system gets triggered and there’s a fail-safe system that stops the beep sound if the grenade falls over the map.

![Grenade_Beep_RTPC](/blogImages/BL04_Grenade_Beep_RTPC.png)
###### Figure 04. "Grenade_Beep" RTPCs in Wwise.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

As the timer value gets closer to 0 the beep sound gets faster and its pitch gets higher.



&nbsp;&nbsp;&nbsp;

### Grenade Bounce

Before moving to the explosion, we need to check whether the grenade is bouncing off of any walls or floors.

![Grenade_Bounce](/blogImages/BL04_Grenade_Bounce.png)
###### Figure 05. Setting up the bouncing sounds for the grenade in the "B_Grenade" blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Using the Event Hit node, each time the grenade hits something, it will send a trigger and will also provide information about the physical material of the hit surface. The surface type is sent to Wwise to set the respective switch and post the Wwise event.

&nbsp;&nbsp;&nbsp;

### Detonation

Time to go boom! As the grenade detonates, the “Grenade_Throw” boolean is turned off. This will prevent the event tick in the Beep Timer section from running unnecessarily. Then, the “Grenade_Distance_Wwise_Switch” system and the detonation sound gets triggered.

![GG_Detonate](/blogImages/BL04_GG_Detonate.png)
###### Figure 06. Setting up the detonation sound in the "B_Grenade" blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

The “Grenade_Distance_Wwise_Switch” is a small system that can change the explosion sound depending on how far from the player it detonated. There are three Wwise switches that correspond to close, near, and far distances.

![Grenade_Distance_Switch](/blogImages/BL04_Grenade_Distance_Switch.png)
###### Figure 07. “Grenade_Distance_Wwise_Switch” system in the "B_Grenade" blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Moreover, to make the detonation more dynamic and aware of the environment, I also created two new actor blueprints and placed them in areas where there is glass nearby. Using collision boxes, the first blueprint is covering the area on or next to the glass and the second blueprint is covering the corridor area near the glass.

![Grenade_Glass](/blogImages/BL04_Grenade_Glass.png)
###### Figure 08. The collision boxes that control the value of “Grenade_Glass_Layer” RTPC.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

After adding a tag in the “B_Grenade” blueprint, I added a branch node to check if the overlapping actor is the grenade. Using an RTPC (“Grenade_Glass_Layer”), I’m able to control the volume of the glass layer in the explosion blend container in Wwise. When the grenade enters the box, the RTPC value will be set to `1` (full volume) if it's next to or near the glass (green box in figure 8). It will be set to `0.5` (-6 dB) if it's near the glass (yellow box in figure 8). If the grenade leaves the collision box or never enters, the RTPC value will be `0`, hence, basically muted. This allows the explosion sound to add a glass layer and even have some dynamic control over it depending on its distance from the glass.

![Grenade_Glass_BP](/blogImages/BL04_Grenade_Glass_BP.png)
###### Figure 09. "Grenade_Check_For_Glass_Full_Volume" blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;


## Weapon Foley

I always loved weapon foley in video games and especially the mechanical sounds such as reloading as they often feel very satisfying. For Lyra, I redesigned the reload, dryfire/empty clip sounds and I added some extra weapon foley when the character is running.

I have once again used the animation blueprint to trigger the Wwise events which made it very straightforward.

![Pistol_Notifiers](/blogImages/BL04_Pistol_Notifiers.png)
###### Figure 10. Notifiers set for pistol reload animation.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Following the same logic as the previous animations, notifiers have been set to the respective animations to trigger the corresponding Wwise events. So, the dryfire/empty clip, reload, and equipping weapon sounds have been set. All three weapons follow the same logic and it is working seamlessly.

![Pistol_Triggers](/blogImages/BL04_Pistol_Triggers.png)
###### Figure 11. Using the notifiers in the animation blueprint to trigger wwise events and wwise switches.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Additionally, I added some weapon foley while the player is running. A new switch container “Weapon_Running” has been added to the footstep blend container. This switch container includes three random containers that are triggering foley sounds for each weapon respectively. By setting the switch when the weapon is equipped, the correct random container is selected and played as the player runs. This adds more weight to the sound and provides a better sense of the character’s movement and effort.

![Weapon_Running](/blogImages/BL04_Weapon_Running.png)
###### Figure 12. "Weapon_Running" switch container in Wwise.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;


## Aim Down Sights (ADS)

Before diving into the actual weapon firing, the ADS system should be set. ADS refers to Aim Down Sights and enables shooting using the weapon’s sights. Setting this beforehand simplified testing the weapon sounds. ADS can either be enabled or disabled. I used the “GA_ADS” blueprint and made a “detour” in the event graph to trigger my sounds and set my switches.

![ADS_Enabled](/blogImages/BL04_ADS_Enabled.png)
###### Figure 13. Setting the Wwise switches and events in the "GA_ADS" blueprint when ADS is enabled.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

When ADS is enabled, the player’s weapon is checked, and the “Weapon_Equipped” switch is set for the corresponding weapon using the B Weapon as an actor. This will ensure that the switches and the Wwise event refer to the same actor. After, the ADS switch and the corresponding sound will be triggered.

![ADS_Disabled](/blogImages/BL04_ADS_Disabled.png)
###### Figure 14. Setting the Wwise switches and events in the "GA_ADS" blueprint when ADS is disabled.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Likewise when the ADS is disabled the switch changes. However, the switch doesn’t need to be reset, as it was already configured when ADS was enabled.

&nbsp;&nbsp;&nbsp;

## Firing

For the weapon fire sound, I found the corresponding blueprint for each weapon and added a patch that checks if it is being used by the player or an NPC, how much ammo the weapons have, and triggers the weapon fire Wwise event.

![Fire_Pistol](/blogImages/BL04_Fire_Pistol.png)
###### Figure 15. Triggering the pistol fire sound in the “GCN_Pistol_Fire” blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

### ADS Check

The Wwise event for the weapon fire triggers a switch container that selects a blend container to be played based on the ADS switch that we mentioned before. If ADS is enabled, the ADS_ON switch is selected. Otherwise, the ADS_OFF switch is used. This way we can have a different mix for our firing sound based on whether the player uses ADS or not.

![ADS_Shotgun_Switch](/blogImages/BL04_ADS_Shotgun_Switch.png)
###### Figure 16. The "Shotgun_Fire" switch container in Wwise.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

### Player or NPC Check

Since the player’s shooting will always be at a set distance from the listener, the weapon fire audio mix will always be somewhat similar. However, the NPCs might fire their weapon while being close or far away from the player. So, the mix has to change respectively to have a more realistic audio system.

![Weapon_NPC](/blogImages/BL04_Weapon_NPC.png)
###### Figure 17. "Pisto_Fire_NPC" blend container highlighting the differences with the "Pistol_Fire_ADS_OFF" blend container.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

For the NPC weapons, I used the blend container made for the corresponding weapon when the ADS is off. For example, the “Pistol_Fire_ADS_OFF” blend container got duplicated and became “Pistol_Fire_NPC”. Then, layers such as sub, mech, and special were removed and the volume of the transient layer was lowered. Also, attenuation has been used to change the volume and filter the sound based on the distance. This effectively still gives the information about what weapon the enemy is using by using the same body layer but changes it enough for the player to understand that it’s someone else's weapon. More systems such as occlusion and reverb will be added soon!

&nbsp;&nbsp;&nbsp;

### Ammo Count RTPC

To reflect on the ammo left in the weapon’s magazine and translate this information to the player I subtly change the mix based on the number of bullets in the magazine. This may be different for each layer but in general, voice volume to either make a layer quieter or louder, voice pitching, or a subtle use of the initial delay to create a bit more space between the layers were used. Of course, these changes can be small but still make an impact on the sound.

![Pistol_Empty_Clip_RTPC](/blogImages/BL04_Pistol_Empty_Clip_RTPC.png)
###### Figure 18. Introducing a new mech layer as the magazine gets empty using the Pistol_Ammo_Count RTPC.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

![Pistol_Fire_Sub_RTPC](/blogImages/BL04_Pistol_Fire_Sub_RTPC.png)
###### Figure 19. Pistol_Ammo_Count RTPC controlling the voice volume and initial delay on the Pistol_Fire_Sub layer.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

![Pistol_Fire_Mech_RTPC](/blogImages/BL04_Pistol_Fire_Mech_RTPC.png)
###### Figure 20. Pisto_Ammo_Count RTPC controlling the voice volume and the voice pitch on the Pistol_Fire_Mech layer.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;


## Conclusions and Part 2

Redesigning the weapon systems and their sound design was absolutely fun but also proved to be a delicate challenge. Things would easily misbehave or not sound quite right the first time so there was a lot of fine-tuning. Nevertheless, I’m happy with the outcome so far! The next part of the weapon redesign will focus on the bullet whiz/flybys and sounds such as getting damaged, dealing damage, or headshotting. 🎯

Any feedback is always appreciated!

Thank you!

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

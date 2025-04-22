---
title: Lyra Sound Redesign Blog 8 - Final Blog – Mixing, Updates & Optimisations
date: 2025-04-01
author: "Georgios Georgakis"
---




![description](/blogImages/Blog07_Sound_Propagation.png)



Hi everyone!

&nbsp;&nbsp;&nbsp;

I’m excited to be writing the final blog about my Lyra redesign. I’ll try to keep it clean and tidy as this one is about mixing plus some updates and optimisations. 

&nbsp;&nbsp;&nbsp;

This project is about audio design, meaning that my sounds do not compete with other elements such as dialogue and music. While this gives my sounds more focus, proper mixing remains critical to give each sound room to breathe and give the player a clear audio feedback. 

Mixing doesn’t start at the end of the project but by the time the first sound goes into the game. It’s important to always be mindful of the state of the sound while implementing it (e.g., loudness and attenuation) to not only save us time and energy towards the end of the project but also make testing and QA better and easier. Final mix involves refining balances based on priority and playtesting.

When I started thinking about the final mixing, I tried to define my goal.

**What do I want my game to sound like? What sounds does the player NEED to hear?**

Lyra is a fast paced shooter where a sound can literally save you or give you an advantage over the enemy. It might not be as complex as games like Overwatch or The Finals but the main pillars are the same. Gameplay information and clarity were on top of my priorities. I made a priority list of the sounds that should be clearer than others. 

![Middle_tower_Inside](/blogImages/Bl07_Middle_tower_Inside.png)
###### Figure 01. Audio Buses.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

From highest to lowest priority the list looks like this:

&nbsp;&nbsp;&nbsp;

**HUD > Player_Fire > NPC_Fire > NPC_Foley > Bullets > UI > Level_Int > Player_Foley > Ambience**

&nbsp;&nbsp;&nbsp;

The HUD sounds are on top as they:

- Give feedback to the player about dealt/taken damage and kill confirmation.
- Give strong information about the state of the game (e.g., player is dead or match ended).
- Are short and would not draw too much attention during a crossfire. 

&nbsp;&nbsp;&nbsp;

Player’s gunshots are also very important. The player can switch at any time between a pistol, a shotgun, a rifle or throw a grenade. For that reason, I think it is important to:

- Give the player a clear gameplay cue about what weapon they use.
- Be clear to them that the weapon is firing and they are not having an empty magazine or just aiming.

&nbsp;&nbsp;&nbsp;

Almost as important are the enemy fire and enemy foley and bullets. It's crucial that the player needs to:

- Be aware that the enemy is shooting.
- Pin-point their location if they cannot see them.
- Know what weapon the enemy uses in order to be able to strategize better.
- Hear their footsteps when they are nearby.
- Be informed that the enemy fired towards the player’s direction even if they didn’t hit us.

Since enemies are threats, their foley is prioritized over the player’s own sounds.

&nbsp;&nbsp;&nbsp;

Next in my list is the sounds of the level interactions (e.g., using a jump pad or a health item, entering a control point) as they:

- Confirm the player's interactions with the map or the objective.
- Give away the character's position to another player.

&nbsp;&nbsp;&nbsp;

When gunfire pauses, the player’s foley becomes more audible, helping them:

- Know if they’re silent or loud.
- Get information about the surface they are stepping on.
- Immerse them into the world.

&nbsp;&nbsp;&nbsp;

Lastly, ambience is there as a bed that ties everything together and gets pushed the most in an intense gunfight. 

&nbsp;&nbsp;&nbsp;

## Mixing in Wwise

In Wwise, I created audio buses in Wwise to allow me to control the mix better. Every 3D sound has its own attenuation, driving its volume and often a filter based on distance.

![Middle_tower_Inside](/blogImages/Bl07_Middle_tower_Inside.png)
###### Figure 02. Attenuaton curves for "Character_Spawn" sound.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Also, I used sidechaining to dynamically control the volume of each bus based on the mentioned priority list. A volume sidechain can easily be done using a meter effect on the source bus (e.g., Character_Player), then mapped its output via RTPC to control the volume of lower-priority buses (e.g., Ambience).

![Middle_tower_Inside](/blogImages/Bl07_Middle_tower_Inside.png)
###### Figure 03. Meter effect on the "Character_Weapon_Fire" aux bus.

&nbsp;&nbsp;&nbsp;

![Middle_tower_Inside](/blogImages/Bl07_Middle_tower_Inside.png)
###### Figure 04. Ambience Bus volume RTPC curve driven by "Player_Weapon_Fire" RTPC.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## Optimisation

To optimise a few things, I started limiting sound instances, killing voices that can be built up unnecessarily as well as changing the Playback Priority settings. For example, I limited the wind gusts to 2 sound instances globally as they do not add any gameplay information and the player does not need to hear more than 1 or 2 at the same time. Moreover, if they leave the area where the wind gusts spawn, then that will kill the voices, saving some needed memory.

![Middle_tower_Inside](/blogImages/Bl07_Middle_tower_Inside.png)
###### Figure 05. Voice Limiting in Wwise.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Also, I changed the portal ambience sounds to be proximity-triggered to save CPU/memory. Since the map has 9 portals, it is not needed for all of them to play if no player is not nearby. As the philosophical question asks, *If a tree falls in a forest and no one is around to hear it, does it make a sound?* In my case, it doesn’t. So I added a new collision sphere to the B_Teleport blueprint which will trigger the source sound based on if the player is inside or not.

![Middle_tower_Inside](/blogImages/Bl07_Middle_tower_Inside.png)
###### Figure 06. New Portal source sound triggering system.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## Updates

I noticed two major bugs while I was testing the game.

Firstly, sometimes when the player would die, the general wind would stop playing. That was because the system would lose track of the player’s position (that is being used to change the sound based on their z location). To solve that problem I added a branch that checks if the player’s Z position is >=0. If it is, it means that the player is somewhere in the map and the system runs fine. If they are not, it stops looking for the player’s position. This simple game-code check resolved the issue.

![Middle_tower_Inside](/blogImages/Bl07_Middle_tower_Inside.png)
###### Figure 07. "Gen_Wind" blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Another bug I noticed was about the Control Points. This bug would not trigger the capturing audio when an enemy tries to steal a control point that is owned by my team. Although I was checking the character’s team, sometimes both teams would respond with the same value. This was solved by doing an extra check on whether the Control Point is owned by the enemy and using a NAND gate the capturing sounds are being triggered perfectly every time.

![Middle_tower_Inside](/blogImages/Bl07_Middle_tower_Inside.png)
###### Figure 08. Control Point blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## Conclusions

I’m very happy about the progress I made with this project and the things I’ve learned. Mixing it made me realise two things. Firstly, how mixing can help to give the player more clarity in terms of information. Secondly is the progress I’ve made through this game and it was nice to finally take a step back and see how all of it came together.
&nbsp;&nbsp;&nbsp;

As promised at the start of this project, a breakdown video of my redesign will follow shortly and will be going over my favourite systems.

&nbsp;&nbsp;&nbsp;

As always, feel free to give me feedback and let me know your thoughts.

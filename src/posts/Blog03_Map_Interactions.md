---
title: Lyra Sound Redesign Blog 3 - Map Interactions
date: 2024-09-18
author: "Georgios Georgakis"
---


![description](/blogImages/Blog03_Map_Interactions.png)

# Lyra Sound Redesign Blog 3 - Map Interactions

## By Georgios Georgakis



&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;

Hi everyone!


This blog will cover the player interactions within the map, ranging from launcher pads to health pickups and claiming control points. This part of the redesign was particularly fun to implement, as there were enough complications to create interesting systems, especially for the control points, while also providing a great opportunity for creative sound design.

&nbsp;&nbsp;&nbsp;

## Launchers


Starting with the simpler elements to implement, launchers trigger a sound whenever the player uses them. Since the launchers are activated when the player overlaps with them, I used the “Event ActorBeginOverlap” node as a trigger. This connects with a “Set Obstruction Occlusion Refresh Interval” node which  removes any previous occlusion and proceeds to trigger the Wwise event. The same logic is applied to all launchers.

![Map_Overview!](/blogImages/Bl03_Launcher_Up.png "Launcher_BP") 
###### Figure 01. Triggering the launcher sound in the “B_Launcher_Up” blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## Health and Weapon Pickups 


In the [**first blog**](https://www.georgiosaudio.com/blog/Blog01_Environment), I mentioned the spawners, where I discussed the game’s ambience and environment. In this blog, I’ll show how I further modified the same blueprints to trigger pickup sounds accurately, depending on what weapon the player is picking up, whether they are collecting extra ammo, or if they already own the weapon.


The Health Pick-Ups basically work exactly as the launchers (see figure xx) but they use the “GCN_Character_Heal” blueprint which is triggered only when the character has taken damage and therefore can heal. 

The Weapon pickups are more interesting because they spawn either a rifle or a shotgun creating a bit more complex system. If the player owns the weapon already, they will receive ammo for the corresponding weapon, but only if they aren't full.  Hence, a system needs to be set up to check all the conditions when the player interacts with the weapon spawners, based on the player’s inventory.

![Map_Overview!](/blogImages/Bl03_Weapon_Spawner_Mind_Map.png "Weapon_Spawner_Mind_Map") 
###### Figure 02. Weapon Spawner Mind Map.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Firstly, when the player overlaps, the system checks whether the player owns the weapon. If not, the player gets the weapon. If they already own the weapon, it checks whether they are full of ammo. If the player has full ammo for that weapon, then nothing happens; If not, then they’ll get more ammo for the corresponding weapon.

![Map_Overview!](/blogImages/Bl03_Weapon_Spawner1.png "Weapon_Spawner1") 
###### Figure 03. “B_WeaponSpawner” Event Graph Blueprint.

&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;
Using the blueprint’s event graph we can easily check whether the weapon is a rifle or a shotgun based on the mesh’s name and then trigger the appropriate sound. If the player already owns the weapon, the weapon pickup sound will not play. However, it still needs to check whether the player needs ammo. For this reason, the Give Weapon function that has been made by the original developers is being used, and allows us to set what kind of ammo will the player receive, based on what mesh the spawner spawns. 


![Map_Overview!](/blogImages/Bl03_Weapon_Spawner2.png "Weapon_Spawner2") 
###### Figure 04. “B_WeaponSpawner” Give Weapon (function) Blueprint. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;


## Portal

The interaction with the portal is another important sound in the game, as it gives audio information to other players when used. While testing the game, I discovered that not only does it teleport characters, but it also teleports grenades! This makes the portals an easy way to flank, so pinpointing which portal was used is crucial. Therefore, this sound needs to be spatialized. However, I didn’t like how it sounded when the player used it, so I decided to adjust the stereo information based on who or what is using the portal. 

![Map_Overview!](/blogImages/Bl03_Portal_Entry_MM.png "Portal_Entry_Mind_Map") 
###### Figure 05. Portal Entry Mind Map.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

The idea here is to play the character entry sound whenever a character enters the portal and another sound for grenades. A third sound just for NPCs could have been used but using an RTPC to swap between 2D and 3D spatialization seemed a lighter alternative for the memory than to load an extra sound.  


The blueprint logic is straightforward. When there’s an overlap, it checks what triggered the portal. If it is the player, the “Portal_Entry_Spatialization” RTPC is used to adjust the “3D Spatialization Mix” in Wwise and trigger the sound. If not, it can either be another character such as an NPC or a grenade.if it is a grenade going through the portal, it plays the corresponding sound. The grenade’s spatialization is being controlled by its attenuation spread (figure xx) as it only changes by the distance. If it isn’t the grenade nor the player, we can safely assume to be another character. In that case, the RTPC value is set to 0 to and the sould will be heard as 3D. 

![Map_Overview!](/blogImages/Bl03_Portal_Entry.png "Portal_Entry_SFX") 
###### Figure 06. Triggering the portal entry sound in the “B_Teleport” blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

![Map_Overview!](/blogImages/Bl03_Portal_3D_RTPC.png "Portal_3D_RTPC") 
###### Figure 07. Speaker Panning/3D Spatialization Mix RTPC for "Portal_Entry_Char".

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

![Map_Overview!](/blogImages/Bl03_Portal_Grenade_Spread.png "Portal_Grenade_Spread") 
###### Figure 08. Spread curve for "Portal_Enter_Grenade".

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;


## Control Point

The control point is definitely the most interesting system in this blog, as it is the most complex mechanism but also quite standard for many multiplayer shooters, from older games like the Call of Duty series (Capture the Flag mode) to more recent ones like xDefiant (Domination mode). The goal of this mode is to capture and control the three points on the map for as long as possible, scoring points in the process. The first team to reach 125 points wins!

![Map_Overview!](/blogImages/Blog03_Map_Interactions.png "Control Point") 
###### Figure 09. A screenshot of a control point in the map.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

### Capturing Control Points

Each control point’s capturing value starts increasing when a character enters the point, with a minimum value of 0 and a maximum of 1. If a character stays until the control point is fully charged, they’ll capture it. Once it's captured, it will start giving points to the owning team. However, If the team exits without having captured the point or another team comes in the control point while being captured, the value will start to decrease and will stay 0 until only one team is present. If both teams leave, the value resets to 0, deactivating the point or if captured, remaining to the owner’s team.

![Map_Overview!](/blogImages/Bl03_Control_Point_MindMap.png "Control_Point_Mind_Map") 
###### Figure 10. Control Point Mind Map.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;


### Entering the Capture Point

I hooked two “call function” nodes at the end of “On ComponentBegin Overlap” and “On ComponentEnd Overlap” respectively. These trigger my custom events responsible for starting and stopping the sound of the point being captured. 
&nbsp;&nbsp;&nbsp;

![Map_Overview!](/blogImages/Bl03_Exit_Point_1_2.png "Exit_Point_1_2") 
###### Figure 11. Enter/Exit triggers in "B_ControlPointVolume" blueprint 1/2.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

![Map_Overview!](/blogImages/Bl03_Exit_Point_2_2.png "Exit_Point_2_2") 
###### Figure 12. Enter/Exit triggers in "B_ControlPointVolume" blueprint 2/2.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;


When a character enters the capture point, my custom event is triggered. The first thing it checks is the character’s team. If the character’s team owns the control point, nothing happens. Otherwise, it starts capturing the point and the sound begins to play.


![Map_Overview!](/blogImages/Bl03_Enter_Control_Point.png "Enter_Control_Point") 
###### Figure 13. Triggering the point capturing sound using “GG_Enter_Capture_Audio” custom event.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;


### Capturing the Point

Using data from “TL”ConvertPoint”, we can get the capture value ranging from 0.00 to 1.00. This value is sent to an RTPC, allowing for a more dynamic audio response to the capturing sound.


![Map_Overview!](/blogImages/Bl03_Control_Point_RTPC.png "Control_Point_RTPC") 
###### Figure 14. Sending the "Capture" value to "ControlPoints_Value" RTPC in Wwise.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

### Point Captured

Once a team captures a control point, the point gets owned by that team. When this happens, we stop the capturing sound and trigger a global stinger that informs all players a point has been captured. To enhance the audio experience, the stinger changes depending on who captured the point. If the player’s team captured it, the stinger sounds more rewarding and exciting. If the opponents captured it, the stinger sounds more ominous to notify the player about the opponents’ progress.


![Map_Overview!](/blogImages/Bl03_Capture_Point.png "Capture_Point") 
###### Figure 15. Triggering the captured sound using "GG_Audio_Capture" custom event.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;


### Overlapping Control Points

One of the trickiest parts is managing every possible situation when multiple teams overlap at a control point—especially when it comes to stopping the capturing sound. 

![Map_Overview!](/blogImages/Bl03_Stop_Capture.png "Stop_Capture") 
###### Figure 16. Triggering "GG_Exit_Capture_Audio" when capture value equals 0.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

The basic idea is that the capturing sound stops when the point is claimed, the value reaches 0, or all teams exit the point. However, these cases might overlap. For example, we need to stop the capturing sound when a player exits, but not if there’s still another player inside. For this reason, a number of checks are required before stopping the sound.

![Map_Overview!](/blogImages/Bl03_Enter_Exit_Point.png "Enter_Exit_Point") 
###### Figure 17. "GG_Enter_Capture_Audio" and "GG_Exit_Capture_Audio" custom events system. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

At this point, when the sound needs to be stopped the “GG_Exit_Capture_Audio” custom event is being triggered. This can be seen in Figure xx where the Capture Value equals 0 (figure xx), or when the player exits the point (figure xx and xx). The stopping sound also gets stopped when the point gets owned. Since there are multiple ways to trigger the “GG_Exit_Capture_Audio” event, these checks ensure the sound won’t stop prematurely.


In Figure xx, you can see that when the “GG_Exit_Capture_Audio” custom event is triggered, there are three steps before the sound stops. First, a short delay ensures that if two players from different teams are in the point, and one leaves while the capture value is at 0, the timer has time to increase again, preventing the sound from stopping. Then, we use a branch to check whether the capture value is greater than or equal to 0.01, meaning the capturing sound will continue until the value reaches 0.Lastly, another branch checks for team overlap in the capture point, using Lyra’s recompute system (figure xx).

![Map_Overview!](/blogImages/Overlapping.png "Overlapping_Teams") 
###### Figure 18. Setting the overlapping variable based on the number of teams within the capture point. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## Conclusions

Map interactions are highly responsive, so I aimed to use sound design as a tool to inform the player about their actions. This chapter was especially fun to sound design, implement, and playtest, as it allowed me to experiment with blueprints and create cool sounds! After extensive testing, everything seems to be working perfectly, which is fantastic. The control point was the most complex part, requiring constant tuning to cover all scenarios, but I’m very happy with the outcome!

As always feedback is more than welcome!
&nbsp;&nbsp;&nbsp;

#### Thank you.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;


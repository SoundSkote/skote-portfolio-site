---
title: Lyra Sound Redesign Blog 2 - Character Animations & Updates
---


![description](/blogImages/Blog02_Character_Animations_&_Updates.png)

# Lyra Sound Redesign Blog 2 - Character Animations & Updates

# By Georgios Georgakis



&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;


This blog will cover player animation sounds such as running, dashing, and jumping on different surfaces, as well as some updates on the project's progress.

## Updates

I've already started updating previous work, and I’ll quickly cover the two most notable updates: the audio listener update and the birds update.

### Audio Listener Update

While the audio listener worked fine during solo play, I encountered a problem when adding NPCs. Often, the audio listener would attach to the NPCs instead of the player, resulting in an unplayable experience. I believe this occurred because Lyra uses the same character blueprint for every character in the game. Therefore, when multiple characters were present, the system couldn’t distinguish which character I intended to use as the listener.

This issue was resolved by checking the name string of each character upon spawning. Dec Birchall helped me find this straightforward solution: by checking the name of each character as it spawns, we can determine which character is playable and attach the listener to the player.

![Map_Overview!](/blogImages/AudioListener.png "AudioListener") 
###### Figure 01. Printing the “Get Display Name” node on screen allows us to view each character’s name.

![Map_Overview!](/blogImages/AudioListenerUpdate.png "AudioListenerUpdate") 
###### Figure 02. The “Get_Player” patch helps us locate who the player is.

This solution is an easy way to identify the player character, but it is limited to scenarios involving NPCs. While this is perfectly fine for the scope of this project, it should be noted that in a multiplayer game with other playable characters, this solution would not be sufficient.


### Birds Update (Emitter Automation)

In this update, I used emitter automation in Wwise to give the bird sounds more dynamic movement. Previously, the bird sound played from a specific position around the player. While this was adequate for notifying the player, I believed it could sound better. Therefore, I changed the 3D position setting to "Emitter with Automation," which allows the sound to move following user-defined automation around the emitter. I created six different automation paths that are randomly selected when the sound triggers, along with additional randomization of the axis range to create even more variation. This way, we still get the original bird position, but now the sound has more movement (as it should for a flying bird!), creating a better audio experience.

![Map_Overview!](/blogImages/Lyra_Birds_Automation.png "Lyra_Birds_Automation") 
###### Figure 03. Path example in Emitter with Automation 3D Position.

## New Additions - Character Animations

### Surfaces

Before adding any sounds, it’s important to know what surfaces the player will be running on. I decided to create four physical materials corresponding to different surfaces on the map: concrete, glass, wood, and plastic.

![Map_Overview!](/blogImages/PM.png "Physical Materials") 
###### Figure 04. Screenshots of Physical Materials set in Unreal Engine 5.

After creating the physical materials in Unreal Engine, I assigned each surface to its corresponding material and made a switch container in Wwise for the footstep sounds.

![Map_Overview!](/blogImages/Surfaces.png "Surfaces") 
###### Figure 05. The different surfaces in the map.

### Animations

The audio system for the animations is built using notifiers. I went through all the game animations and added notifiers to trigger the appropriate sounds at the appropriate moments.

![Map_Overview!](/blogImages/Notifiers.png "Notifiers") 
###### Figure 06. Notifiers in “MM_Pistol_Jog_Bwd_Start”.

Once that was done, I created the necessary blueprints in the animation’s Event Graph. Now, each notifier triggers the respective Wwise event or Wwise switch.

For example, here is the blueprint for the running animation:

![Map_Overview!](/blogImages/Footsteps_BP_1_2.png "Footsteps_BP_1_2") 
###### Figure 07. Footsteps blueprint patch in Animation Blueprint 1-2.

![Map_Overview!](/blogImages/Footsteps_BP_2_2.png "Footsteps_BP_2_2") 
###### Figure 08. Footsteps blueprint patch in Animation Blueprint 2-2.

The system begins by creating a line trace that checks the physical material of the floor with each step and sets the switch container in Wwise accordingly. Next, it checks whether the character is crouching or not. To switch between running and crouch-walking, a branch node checks the player’s crouch status and changes the Wwise crouch switch container accordingly. Then, we remove any unnecessary occlusion coming from Unreal Engine and trigger the footstep sound. This system allows all the mentioned possibilities to change dynamically and seamlessly.

![Map_Overview!](/blogImages/Fs_Wwise.png "Footstep_Switch_Container") 
###### Figure 09. “Player_Fs” Switch container in Wwise.

### Foley

To make the foley sounds more interesting and dynamic, I created a switch container in Wwise that changes the sound depending on whether the player is moving or stopped. This ensures that the foley sounds remain consistent while the character is running but also allows for better matching sounds during other animations, such as when the character stops moving.

### Occlusion and Mix

As with every other sound, all the characters’ sounds are occluded when they move behind walls, using filtering and volume changes. Moreover, to help the player detect NPC footsteps more easily, I added a function that changes the pitch of the sound depending on whether the player is on a floor above or below.

![Map_Overview!](/blogImages/Check_Z_Axis.png "Check_Z_Axis") 
###### Figure 10. Blueprint patch comparing characters’ Z-axis and setting the “Occlusion_Footsteps_Z_Axis” RTPC.

![Map_Overview!](/blogImages/Z_Axis_wise.png "Z_Axis_Wwise") 
###### Figure 11. Voice Pitch change based on “Occlusion_Footsteps_Z_Axis” RTPC.

Originally, I wanted to create different occlusion settings and mixes between enemies and friendly players, but I couldn’t find a way to check if the NPC is hostile or friendly. I’ll discuss this problem in more detail in the “Problems” section of this blog.

However, I did manage to differentiate between the player and NPCs using the same logic as in the audio listener. By doing this, I created a sidechain in Wwise that controls the player’s footstep volume and HPF based on the NPC's footsteps. As the NPCs' footsteps get closer and louder, the player’s footsteps become softer and thinner. This helps to clear the mix when multiple characters are running together and also provides a better sense of the enemy’s location, which is extremely important in fast-paced shooter games.

![Map_Overview!](/blogImages/NPC_Meter_Effect.png "NPC_Meter_Effect") 
###### Figure 12. Meter effect on the NPC bus in Wwise.

![Map_Overview!](/blogImages/Player_Bus_Sidechain.png "Player_Bus_Sidechain") 
###### Figure 13. Bus Volume and Voice High-pass Filter on the Player bus based on sidechain in Wwise.

## Problems

### Friend Or Foe

Initially, I intended to differentiate the footstep sounds of friendly and enemy NPCs. This discrepancy would provide the player with better information about the enemy’s position, helping them prepare for a fight. I tried using different nodes, such as “Is Instigator Locally Controlled Player” and “Find Team from Actor,” but they didn’t work as expected. Since I successfully managed to differentiate between the player and the NPC, I’ve decided to move forward with other parts of the game and revisit this issue later.

## Conclusions

Although I couldn’t find a solution for the Friend or Foe problem, I’m happy with the progress I’ve made. It’s a great feeling to start bringing a project to life with your sounds. Adding the notifiers required a lot of manual work, and I did a significant amount of debugging, but it’s rewarding to see everything working seamlessly. So far, we have ambient sounds and character animation sounds, and soon, map interactions will be added!

Any feedback is appreciated!

Thank you.

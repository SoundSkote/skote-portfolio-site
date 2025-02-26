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


As this project finishes, it's time to work on the UI and HUD sounds. These sounds include:

- **Respawn Timer**
- **Spawn/Respawn**
- **Last Seconds Timer**
- **Match Ended (Victory/Defeat Screen)**

&nbsp;&nbsp;&nbsp;

## Respawn Timer

When the player dies they’ll see a timer on their screen that counts down until they respawn. For this sound, I used a blend container in Wwise to play four different layers. One of them provides a tonal element, another can be described as a data-transmitting sound, and the other two consist of a looping beep and a clicky sound. All layers use data from the game engine to change the pitch based on the remaining time. This creates a dynamic and evolving sound that peaks just before the player respawns.


In Unreal Engine, I used the W_RespawnTimer blueprint and replaced the pre-existed audio system with my Wwise nodes. I set my “RespawnTimerValue” RTPC to retrieve the time until respawn and then I triggered my wwise event. Additionally, because this system triggers continuously, I limited the sound instances in Wwise to play one sound while killing the oldest instances. Once the respawn happens, I stop the wwise event and reset my RTPC.

&nbsp;&nbsp;&nbsp;

![Whiz_By](/blogImages/BL05_Whiz_By.png)
###### Figure 01. Triggering Wwise events in the “W_RespawnTimer” widget blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Something more exciting is a transition sound I added to play when the timer stops and the spawning begins. When the Stop_RespawnTimer” wwise event gets triggered to stop the timer, a new sound gets triggered by the same wwise event. This sound is a whoosh that incorporates elements from the sound design of the spawning sound. It serves to hint the player spawn is imminent while also building a foundation for the upcoming sound.

&nbsp;&nbsp;&nbsp;

## Respawn/Spawn


The spawn/respawn sound is played when the player reappears in the game. This sound aligns with the style of the VFX, where particles reveal the character. Implementing this sound was relatively straightforward. I located the corresponding blueprint responsible for the spawn effect and I added a new pin to the sequence node to trigger my Wwise event.


![Damage_Dealt](/blogImages/BL05_Damage_Dealt.png)
###### Figure 02. Play spawn Wwise event in “GCNL_Spawning” blueprint. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Additionally, I added attenuation to control the voice volume, low-pass filter, and spread based on distance. 

![Damage Taken](/blogImages/BL05_Damage_Taken.png)
###### Figure 03. "Character_Spawn" attenuation settings in Wwise. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

### Last Seconds Timer


The game includes a system that plays a sound during the final moments before the match ends. I utilized this system to trigger a ping sound, with its pitch and volume increasing as the number approaches its peak.

![Damage Taken](/blogImages/BL05_Damage_Taken.png)
###### Figure 04. Setting the “Last”Sec_RTPC” and triggering my wwise event for the last points of the match in the “W_CPScoreWidget” widget blueprint. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;


## Match Ended (Victory/Defeat)

 
Last but not least are the match-ended sounds. When the match ends, the player will see a HUD (head-up display) showing whether they won or lost. It was quite simple to play the corresponding sound—I simply added the appropriate Wwise events on the “W_MatchDecided_Message” blueprint. 


![Damage Taken](/blogImages/BL05_Damage_Taken.png)
###### Figure 04. Setting the “Last”Sec_RTPC” and triggering my wwise event for the last points of the match in the “W_CPScoreWidget” widget blueprint. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## Conclusion

That wraps up my work on the weapon audio redesign! This part was one of my favorites because I had the opportunity to experiment more with sound design and implementation. The Lyra redesign project is almost complete, and I can’t wait to share a real-time showcase of all the sounds and systems! 

The next blog will focus on UI sounds, including victory/defeat screens, respawning, and countdowns.

Thanks for reading, and as always, feel free to reach out with feedback!

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

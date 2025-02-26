---
title: Lyra Sound Redesign Blog 6 - UI and HUD
date: 2025-02-25
author: "Georgios Georgakis"
---




![description](/blogImages/Blog06_UI_and_HUD.png)

# Lyra Sound Redesign Blog 6 - Blog 06 UI and HUD

## By Georgios Georgakis



&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;


As this project finishes, it's time to work on the UI and HUD sounds. These sounds include:

- Respawn Timer
- Spawn/Respawn
- Last Seconds Timer
- Match Ended (Victory/Defeat Screen)

&nbsp;&nbsp;&nbsp;

### Respawn Timer

When the player dies they’ll see a timer on their screen that counts down until they respawn. For this sound, I used a blend container in Wwise to play four different layers. One of them provides a tonal element, another can be described as a data-transmitting sound, and the other two consist of a looping beep and a clicky sound. All layers use data from the game engine to change the pitch based on the remaining time. This creates a dynamic and evolving sound that peaks just before the player respawns.


In Unreal Engine, I used the W_RespawnTimer blueprint and replaced the pre-existed audio system with my Wwise nodes. I set my “RespawnTimerValue” RTPC to retrieve the time until respawn and then I triggered my wwise event. Additionally, because this system triggers continuously, I limited the sound instances in Wwise to play one sound while killing the oldest instances. Once the respawn happens, I stop the wwise event and reset my RTPC.

&nbsp;&nbsp;&nbsp;

![Respawn_Timer](/blogImages/BL06_Respawn_Timer.png)
###### Figure 01. Triggering Wwise events in the “W_RespawnTimer” widget blueprint.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Something more exciting is a transition sound I added to play when the timer stops and the spawning begins. When the Stop_RespawnTimer” wwise event gets triggered to stop the timer, a new sound gets triggered by the same wwise event. This sound is a whoosh that incorporates elements from the sound design of the spawning sound. It serves to hint the player spawn is imminent while also building a foundation for the upcoming sound.

&nbsp;&nbsp;&nbsp;

### Respawn/Spawn


The spawn/respawn sound is played when the player reappears in the game. This sound aligns with the style of the VFX, where particles reveal the character. Implementing this sound was relatively straightforward. I located the corresponding blueprint responsible for the spawn effect and I added a new pin to the sequence node to trigger my Wwise event.


![Spawn](/blogImages/BL06_Spawn.png)
###### Figure 02. Play spawn Wwise event in “GCNL_Spawning” blueprint. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

Additionally, I added attenuation to control the voice volume, low-pass filter, and spread based on distance. 

![Spawn_Atten](/blogImages/BL06_Spawn_Atten.png)
###### Figure 03. "Character_Spawn" attenuation settings in Wwise. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

### Last Seconds Timer


The game includes a system that plays a sound during the final moments before the match ends. I utilized this system to trigger a ping sound, with its pitch and volume increasing as the number approaches its peak.

![Last_Sec](/blogImages/BL06_Last_Sec.png)
###### Figure 04. Setting the “Last_Sec_RTPC” and triggering my wwise event for the last points of the match in the “W_CPScoreWidget” widget blueprint. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;


### Match Ended (Victory/Defeat)

 
Last but not least are the match-ended sounds. When the match ends, the player will see a HUD (head-up display) showing whether they won or lost. It was quite simple to play the corresponding sound—I simply added the appropriate Wwise events on the “W_MatchDecided_Message” blueprint. 


![End_Screen](/blogImages/BL06_End_Screen.png)
###### Figure 04. Triggering the Victory/Defeat wwise events in “W_MatchDecided_Messages” widget blueprint. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

### Conclusion

This was shorter than my usual blogs but I had a really fun time redesigning it! UI and HUD can often be a bit tricky to get it right but it possibly one of the few things that any type of game would include. They are a very important section for any game as they need to provide quick and clear information to the player. The next blog will be about reverb and occlusion which I ma very excited to experiment with!

Again, thanks for reading and feel free to reach out with any feedback or questions.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

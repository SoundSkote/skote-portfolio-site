---
title: Lyra Sound Redesign Blog 7 - Sound Propagation
date: 2025-04-01
author: "Georgios Georgakis"
---


![description](/blogImages/Blog07_Sound_Propagation.png)

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;




This blog is about how I approached the sound propagation for my Lyra audio redesign.

&nbsp;&nbsp;&nbsp;

## Sound Propagation Techniques

This sound propagation includes:

- **An occlusion system**
- **Reverbs**
- **Diffraction and Transmission**
- **Slapback delay system**

&nbsp;&nbsp;&nbsp;

## Initial Approach

When I started this project I initially relied on occlusion and reverb as the main sound propagation systems. And for the most part, this worked well! However, one of the reasons I started this redesign was to also experiment and learn new techniques.

I decided to dive into diffraction and transmission using Wwise, and on top of that, I created my own stereo slapback delay which significantly improved the game's sound. The current version is far more dynamic and realistic, elevating the overall audio experience. That said, I kept the occlusion system for certain elements since it requires less computing power and isn’t as critical from a gameplay (ludic) perspective.

&nbsp;&nbsp;&nbsp;

## Occlusion

The occlusion system works in a straightforward way. I cast a trace line from the emitter to the listener and check whether there is a wall in between (figure 02). For each wall it detects, it multiplies the number with my variable (“Occlusion Percentage Per Hit”) and sends it to my RTPC (figure 03).

For example, If the trace line hits 1 wall and my Occlusion Percentage Per Hit value is 33 then it would have 33% occlusion. If there are 2 hits, then it will be 66% occlusion.

This value is then sent to an RTPC, which adjusts the sound’s filtering and volume, effectively occluding it (Figure 04).

![Occlusion_Hit](/blogImages/Bl07_Occlusion_Hit.png)
###### Figure 01. Trace line hit.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

![Wind_Gusts_Occ_01](/blogImages/Bl07_Wind_Gusts_Occ_01.png)
###### Figure 02. Occlusion system in Wind_Gusts blueprint 1/2.

&nbsp;&nbsp;&nbsp;

![Wind_Gusts_Occ_01](/blogImages/Bl07_Wind_Gusts_Occ_02.png)
###### Figure 03. Occlusion system in Wind_Gusts blueprint 2/2.

&nbsp;&nbsp;&nbsp;

![Wind_Gusts_Occ_01](/blogImages/Bl07_Wind_Gusts_Occ_03.png)
###### Figure 04. Creating occlusion using RTPCs in Wwise.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## Diffraction, Transmission and Reverb 

### Concepts

- **Diffraction**: Sound bending around edges, openings, or obstacles.
- **Transmission**: Sound passing through and between materials.
- **Reverb**: The persistence of sound in a space due to reflections after the source stops.

To implement these effects, I placed **AkReverbZones** and **AkSpatialAudioVolumes** across the map, tailored to different environments:

- Outdoors
- Middle tower
- Small corridors
- Ground floor
- Upper floor
- Control Points
- Columns & Portals

&nbsp;&nbsp;&nbsp;

### Outdoors

When the player isn’t inside a defined area, they exist within the "Outdoors" AkReverbZone. This serves as a neutral acoustic space between smaller rooms, providing a baseline reverb profile for open environments.

&nbsp;&nbsp;&nbsp;

### Middle Tower and Small Corridors (Ak Spatial Audio Volumes)

For the enclosed spaces such as the Middle Tower and the Small Corridors, I used Ak Spatial Audio Volumes to reflect the sound using geometry and apply reverb. Then I added Ak Portals to the spaces’ openings. Ak Portals work seamlessly with Ak Spatial Audio Volumes, allowing the sound to escape from the room’s openings.

![Middle_tower_Inside](/blogImages/Bl07_Middle_tower_Inside.png)
###### Figure 05. Inside Middle Tower (Ak Spatial Audio Volume and Ak Portals are highlighted).

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

It's also important to disable/enable surfaces per room to avoid unnecessary diffraction calculations. Diffraction calculations can be CPU intensive so we want to always use as few triangles as possible (Nathan Harris, 2023). Therefore, only walls that physically exist should be processed.

![Small_Corridor_Reverb_Settings](/blogImages/Bl07_Small_Corridor_Reverb_Settings.png)
###### Figure 06. Late Reverb Settings for Small Corridors Ak Spatial Audio Volumes.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

### Ground floor, Upper floor, and Control Points (Ak Reverb Zones)

These larger, open areas primarily use **AkReverbZones** since they focus on reverb rather than complex diffraction/transmission.

However, To maintain acoustic consistency, I placed **AkSpatialAudioVolumes** on individual columns. This enables realistic diffraction around edges, material-based transmission and most importantly, seamless integration with the broader acoustic environment.


![Bl07_Ground_and_Upper_Floor.png](/blogImages/Bl07_Ground_and_Upper_Floor.png)
###### Figure 07. Ground Floor and Upper Floor.

&nbsp;&nbsp;&nbsp;

![Ground_and_Upper_Floor_Columns_Highlighted](/blogImages/Bl07_Ground_and_Upper_Floor_Columns_Highlighted.png)
###### Figure 08. Ground Floor and Upper Floor with the columns’ Ak Spatial Audio Volumes highlighted.

&nbsp;&nbsp;&nbsp;

![Columns_Settings](/blogImages/Bl07_Columns_Settings.png)
###### Figure 09. Diffraction and Transmission setting in the item’s Positioning Tab in Wwise.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## Setting Diffraction, Transmission and Reverb in Wwise

### Enabling Diffraction & Transmission

To enable a sound’s Diffraction and Transmission settings in Wwise is quite straightforward. You need to navigate to the Positioning Tab and enable the “Diffraction and Transmission” setting (Figure 10). Then, define behavior curves in the Attenuation Settings to control how sound bends (diffraction) and passes through materials (transmission) (Figure 11).


![Diffraction_Settings_Wwise](/blogImages/Bl07_Diffraction_Settings_Wwise.png)
###### Figure 10. Diffraction and Transmission setting in the item’s Positioning Tab in Wwise.

&nbsp;&nbsp;&nbsp;

![Diffraction_Curves_Wwise](/blogImages/Bl07_Diffraction_Curves_Wwise.png)
###### Figure 11. Diffraction and Transmission curves in Grenades_Beep attenuation. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

### Setting Up Reverb

To set the Reverb in Wwise for the Ak Reverb Zones and the Ak Spatial Audio Volumes, aux buses are needed for each reverb type. For better organization, a parent audio bus was created to group all reverb Aux Buses (Figure 12). Also, they need to be named clearly to avoid confusions and have a quick workflow.

All the “rev” aux buses use the RoomVerb effect and sometimes paired with a delay for added depth. To route the sounds to the reverb, the “Use game-defined aux sends” setting in the General Settings Tab needs to be enabled (Figure 13).



![Aux_Buses](/blogImages/Bl07_Aux_Buses.png)
###### Figure 12. “Aux_Bus” audio bus including the aux buses. 

&nbsp;&nbsp;&nbsp;

![Enable_Aux_Send](/blogImages/Bl07_Enable_Aux_Send.png)
###### Figure 13. Enabling the “Use game-defined aux sends” setting in the General Settings Tab. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## SlapBack Stereo Delay

One of the most exciting systems I’ve made for Lyra is the SlapBack Stereo Delay. I designed it to make gunshots feel more dynamic and realistic in enclosed spaces. This feature adds a responsive echo when the player fires near a wall. Also, it detects wall materials to vary the echo’s character, providing even more detail, and adjusts stereo positioning based on the wall’s direction.


![Slapback](/blogImages/Bl07_Slapback.png)
###### Figure 14. Trace Lines for the slapback delay.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

### Blueprint Logic Breakdown

Firstly, it is needed to efficiently detect the walls around the player. This is done by casting rays at multiple angles around the player using a Line Trace by Channel node. This needs to be running very frequently so I decided to use the Event Tick with a Delay node to balance responsiveness and CPU usage. To do some data preparation, the arrays storing hit distances and materials before each scan are getting cleared.

After the rays are successfully casted, the hit distances are stored in the Trace Length Array and the shortest distance is used to determine the proximity and the wall material. These values are being sent to the corresponding RTPCs.

Lastly, there is the direction detection. Using the trace line’s index it identifies the wall’s relative position. If there is a hit on an index ≥ 5, the SlapBack_Left RTPC is being fed and an echo is coming from the left stereo channel. Same for the right stereo channel if the index is between 1 and 3. In cases where the hit is coming from straight ahead or straight behind (Index 0 or 4), a subtler, balanced delay will be applied. If there are no hits then the RTPCs are set to default. 


![SlapBack01](/blogImages/Bl07_SlapBack01.png)
###### Figure 15. SlapBackDelay blueprint 1/4.

&nbsp;&nbsp;&nbsp;

![SlapBack02](/blogImages/Bl07_SlapBack02.png)
###### Figure 16. SlapBackDelay blueprint 2/4.

&nbsp;&nbsp;&nbsp;

![SlapBack03](/blogImages/Bl07_SlapBack03.png)
###### Figure 17. SlapBackDelay blueprint 3/4. 

&nbsp;&nbsp;&nbsp;

![SlapBack04](/blogImages/Bl07_SlapBack04.png)
###### Figure 18. SlapBackDelay blueprint 4/4. 

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

### SlapBack Stereo Delay in Wwise

#### Aux Bus Setup

In Wwise, I created two dedicated Aux Buses (Left/Right) with hard-panned stereo positioning (Figure 19).

![Slapback_Panning](/blogImages/Bl07_Slapback_Panning.png)
###### Figure 19. Hard panning SlapBack_Delay_Left and SlapBack_Delay_Right aux buses.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

#### Effect Chain Configuration

Each bus features two key effects. Firstly, a dynamic Parametric EQ that is controlled by the RTPCs to adjust frequency attenuation based on wall proximity and shifts EQ curves per surface type (e.g., wood = less highs, plastic = more lows) (Figure 19). Secondly, a delay effect driven by the data from Unreal Engine (figure 20).


![SlapBackEQ](/blogImages/Bl07_SlapBackEQ.png)
###### Figure 20. RTPCs set on the Parametric EQ effect.

&nbsp;&nbsp;&nbsp;

![SlapBackDelay_Wwise](/blogImages/Bl07_SlapBackDelay_Wwise.png)
###### Figure 21. RTPCs set for Delay effect.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## Conclusions

Each system works great and these systems truly elevated the overall sound of the game. The occlusion system might be simpler but remains ideal for less critical sounds since it needs less computing power and still gives good results. However, I wanted to present a better sound propagation solution and that's why I chose to use diffraction and transmission. It was great to explore how diffraction and transmission work in Wwise and in conjunction with Unreal Engine and I was very happy to learn a few things on the way. That said, the most exciting thing was to create the slapback delay using blueprints and Wwise. I am really happy with the results, seeing (and hearing!) walls respond differently based on material and distance was incredibly rewarding!

&nbsp;&nbsp;&nbsp;

I hope this blog can be beneficial to audio peeps and sparks ideas for your own audio implementations. Thanks for reading, and as always, feel free to reach out with feedback!

&nbsp;&nbsp;&nbsp;


Georgios Georgakis

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

## References


Audiokinetic (2023) Wwise Up On Air Hands-On | Wwise Spatial Audio: Acoustics - Getting Started in Unreal, Available from: <https://www.youtube.com/watch?v=O09X1xBhcuI>.

&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

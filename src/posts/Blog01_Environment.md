---
title: Lyra Sound Redesign Blog 1 - Ambience and Environment
---


![description](/blogImages/Blog01_Environment.png)

# Lyra Sound Redesign Blog 1 - Ambience and Environment

# By Georgios Georgakis







&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;

Hi!

This is the first chapter of this blog series and I’ll focus on the game’s environment and ambience. These sounds include all the sounds that exist in the map that the player will hear without the need to interact with anything. Since Lyra is a fast paced shooter, ambience can easily be overlooked. However, background ambience forms the crucial foundations on which everything else sits (Stevens and Raybould, 2016), and it deserves attention to detail.


First, let me show you an overview of the map:

![Blog01_Environment!](/blogImages/Blog01_Environment.png "Blog01_Environment") 
###### Figure 01. Map overview [top view].


The map looks like a circular sky island consisting of two floors. There are three control points (A,B and C) and an open building in the centre. 

The map is quite minimal without many sources to create noise. Other than what the map has provided me with, additional sounds that don't necessarily have a visual representation have been added to enhance the experience. 


### Ambience Structure

**Source loops that exist in the map we got:**

- Portal loop
- Weapon Spawner
- Health Spawner

**Sounds without a visual representation:**

- Area wind
- Some wind gusts (when the player is close to the edge)
- Birds chirping (when the player is idle)

### Source Loops

**Portal Loop**

The sound of the portal was the first sound I made for Lyra because it’s creative and easy to implement. 

This source loop consists of four asynchronous loops creating a single loop that always evolves but never stops. Additionally, two of them use a very slow LFO (In Wwise) that subtly shifts the pitch of the affected loops. Also, two different attenuations are being used in Wwise to control how the sound changes depending on the character’s distance. Lastly, the sounds are tied to an RTPC that changes the volume and adjusts a Low Pass Filter based on the occlusion.  



![Portal_Attenution_1!](/blogImages/Portal_Attenuation_1.png "Portal Attenuation 1") 
###### Figure 02. Portal Attenuation 01.

![Portal_Attenution_2!](/blogImages/Portal_Attenuation_2.png "Portal_Attenution_2") 
###### Figure 03. Portal Attenuation 02.

o play the portal loop sound UE5, simply we use the “Event Begin Play” node within the Teleport’s blueprint to a “Set Obstruction Occlusion Refresh Interval” node to basically turn off the Unreal Engine’s occlusion system and then a “Post Event” node is connected to play the Ak Event. 

![Portal_loop!](/blogImages/Portal_loop.png "Portal_loop") 
###### Figure 04. Portal_Loop_SFX in B_Teleport blueprint.

### Spawners

Similarly, the weapon/health item spawners use asynchronous loops that can be heard when the player gets close by. Again, attenuation and RTPCs have been created to simulate the change of sound based on distance and occlusion, and slow LFOs have been added in Wwise to subtly modulate the pitch over time. Unlike the static portal, spawners have a state where a weapon/health item is spawned and another state where they are recharging. Therefore, when this happens, we need to change the sound so the player will know that the spawner is ready or reloading.

![Spawner play/stop system!](/blogImages/Health_Item_BP.png "Spawner play/stop system") 
###### Figure 05. Spawner play/stop system in B_AbilitySpawner blueprint.

All the spawners spawn in the game loaded. Using the “Event Begin Play” node the loaded weapon/health item loop will play and when a character picks up the weapon/health item the loop gets stopped and the second one starts playing. Respectively, when the spawner reloads the loading loop stops playing the other one starts.

### General Area Wind


To create an ambience base for our map, a wind bed has been made. However, to avoid making it very monotonous and uninteresting I optimised a few things. Firstly, I created a new actor blueprint and placed it above the center of the map. This felt like the most natural way to check if the player is behind a wall or not. This way, I was able to add occlusion to mask the wind when the player runs between buildings or hides on the lower floors. So, I implemented a simple occlusion system but I will talk more about the occlusion system in its own chapter. Additionally, to make it a bit more dynamic and exciting I also created a system where the sound will get louder and clearer based on the player’s height in the map. For example, if the player is on the lower floor, the wind will be very subtle, but as they move in higher positions, the wind will become much more present.

![Ambience_Height_System!](/blogImages/Ambience_Height_System.png "Ambience_Height_System") 
###### Figure 06. Wind ambience system based on player's height.

To add more depth to the general ambience, I added some wind gusts that are triggered when the player is close to the edge of the map.

![Wind_Gusts_Colliders!](/blogImages/Wind_Gusts_Boxes.png "Wind_Gusts_Colliders") 
###### Figure 07. Wind Gusts trigger boxes.

I made a reusable blueprint that triggers player-oriented wind gusts whenever the player is within these boxes. So, when the player overlaps with the box, a timer will trigger the “Play_Wind_Gusts” custom event (within the time range set), which will spawn the wind gust sound around the player’s position. This helps us create an oriented sound in a randomized position but within our set limits.

![Wind_Gusts_Blueprints_1_2!](/blogImages/Wind_Gusts_Blueprint_1_2.png "Wind_Gusts_Blueprints_1_2") 
###### Figure 08. Wind Gusts Play/Stop system in "Wind_Gust_POS" blueprint.

![Wind_Gusts_Blueprints_2_2!](/blogImages/Wind_Gusts_Blueprint_2_2.png "Wind_Gusts_Blueprints_2_2") 
###### Figure 09. Wind Gusts player-oriented spawning system in "Wind_Gust_POS" blueprint.

### Bird Chirping

Bird chirping may come last, but it's definitely not least! I am excited about this one because not only it provides an addition to the ambience and environment but also gives me the opportunity to implement it as a game mechanic. Let me explain.

I have added some bird chirping as a player-oriented sound, similar to the wind gusts, but the birds are not triggered by overlapping with boxes or existing in the environment. Chirping starts playing when the character is not moving for a set amount of time. This helps the environment become richer and more characterful, while also working as a game mechanic providing information to nearby enemies about the player's approximate position. The idea is that it discourages players from camping* and reinforces the fast-paced element of the game.

As mentioned before, it is yet another player-oriented system, so the sounds spawn around the player. For that reason, the system needs to be carefully balanced so it does not trigger for players who do not camp (e.g., stopping for a short time period to shoot an enemy) or escalate the chirping too quickly for those who stay put (resulting to being irritating).

In Wwise, I use two random containers under a blend container that include the bird chirping sounds. Again, their own attenuation and occlusion systems have been applied.

![Lyra_Birds_1_2!](/blogImages/Lyra_Birds_1_2.png "Lyra_Birds_1_2") 
###### Figure 10. Birds play system in "Birds_POS" blueprint.

The way this system is set in Unreal Engine, it checks every second for the player’s velocity. If the player is not moving, the system will move forward and wait for some time (“Lyra Voices_Delay”) to check if the player will move. If the player hasn’t moved yet, they'll start to hear a bird. As the player stays idle, they’ll hear more and more birds chirping around them, and they’ll get louder to the point of being easily spotted, and they will start getting annoyed themselves.

![Lyra_Birds_2_2!](/blogImages/Lyra_Birds_2_2.png "Lyra_Birds_2_2") 
###### Figure 11. System that checking if the player is idle in "Birds_POS" blueprint.

One extra thing I did was to adjust the audio listener. I realized while testing my sounds that the listener was my camera instead of my character. This is not a problem per se, but it results in panning  and distance feeling wrong sometimes. To make it sound better and more immersive, I overrode the audio listener following Bartosz Kamiński’s [**video**](https://www.youtube.com/watch?v=KBzHTX-9BvE) inside the character’s blueprint. Now, when the character runs past a spawner, its loudness will peak when my character is next to it rather than when the camera is.

### Conclusions

Overall, I think this makes a good foundation for my Lyra redesign, and I am happy with the progress so far. I already started thinking about improvements and new features to add which is a good sign.  In my next blog, I’ll discuss how I handle animation-related sounds such as footsteps and how they can change based on different character states or floor textures.

As always, feedback is more than welcome!

**Thank you.**

*Camp: A multiplayer technique in shooters where the "camper" finds a relatively safe spot to stay at and pick off enemies as they enter the frame, rather than going out and seeking enemies to kill (DOJNDO, 2015).

### Bibliography

Stevens, R. and Raybould, Dave. (2016) Game Audio Implementation : A Practical Guide Using the Unreal Engine [Online]. New York ; Focal Press. Available from: [**<https://www.taylorfrancis.com/books/e/9781315772783>**](https://www.taylorfrancis.com/books/e/9781315772783).

DOJNDO. (2015) Camping - The Gaming Dictionary Guide [Online]. IGN. Available from: [**<https://www.ign.com/wikis/the-gaming-dictionary/Camping>**](https://www.ign.com/wikis/the-gaming-dictionary/Camping) [Accessed 01 July 2024].
```

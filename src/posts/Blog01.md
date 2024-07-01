---
title: Lyra Sound Redesign Blog 1 - Ambience and Environment
---


![description](/blogImages/Blog0_Setting_Up.png)

# Lyra Sound Redesign Blog 0 - Setting Up  

# By Georgios Georgakis







&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;

Hi!

This is the first chapter of this blog series and I’ll focus on the game’s environment and ambience. These sounds include all the sounds that exist in the map that the player will hear without the need to interact with anything. Since Lyra is a fast paced shooter, ambience can easily be overlooked. However, background ambience forms the crucial foundations on which everything else sits (Stevens and Raybould, 2016), and it deserves attention to detail.


First, let me show you an overview of the map:

**Figure xx. Map overview [top view]**

**Figure xx. Map overview [Player’s view]**

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

#### Source Loops

**Portal Loop**

The sound of the portal was the first sound I made for Lyra because it’s creative and easy to implement.

This source loop consists of four asynchronous loops creating a loop that always evolves but never stops. Additionally, two of them use a very slow LFO that subtly shifts the pitch of the affected loops. Also, I use two different attenuations in Wwise to control how the sound changes depending on the character’s distance. Lastly, each individual sound is tied to an RTPC that changes the sound based on occlusion.

To play the portal loop sound in UE5, we use the “Event Begin Play” node within the Teleport’s blueprint to trigger a “Post Event” node that uses our Ak Event.

**Spawners**

Similarly, the weapon and health item spawners use asynchronous loops that can be heard when the player gets close by. Again, attenuation and RTPCs have been created to simulate the change of sound based on distance and occlusion, and slow LFOs have been added to subtly modulate the pitch over time. Unlike the portal, the spawners have a state where the player can pick up a weapon/health item and another where they recharge. Therefore, when this happens, we need to change the sound so the player will know that the spawner is reloading.

All the spawners spawn in the game loaded. Using the “Event Begin Play” node, we play our loaded sound, and when a character picks up the weapon/health item, the loop stops and the second one starts playing. Respectively, when the spawner reloads, the loading loop stops, and the other one starts.

**General Area Wind**

To create an ambiance base for our map, a wind bed has been made. However, to avoid making it very monotonous and uninteresting, I optimized a few things. Firstly, I created a new actor blueprint and placed it above the center of the map. This felt like the most natural way to check if the player is behind a wall or not. This way, I was able to add occlusion to mask the wind when the player runs between buildings or hides on the lower floors. So, I implemented a simple occlusion system. I will talk more about the occlusion system in its own chapter. Additionally, I created a system where the sound gets louder and clearer based on the player’s height in the map. For example, if the player is on the lower floor, the wind will be very subtle, but if they go up to the top floor, the wind will become much more present. This also covers the quick change of height that happens when the player uses the launching pad, but I will discuss this in the next chapter, which will focus on map interactions.

To add more depth to the general ambiance, I added some wind gusts that are triggered when the player is close to the edge of the map.

I made a reusable blueprint that triggers player-oriented wind gusts whenever the player is within these boxes. So, when the player overlaps with the box, a timer will trigger the “Play_Wind_Gusts” custom event (within the time range set), which will spawn the wind gust sound around the player’s position. This helps us create an oriented sound in a randomized position but within our set limits.

**Bird Chirping**

Bird chirping may come last, but it's definitely not least! I am excited about this one because it not only provides an addition to the ambiance and environment but also gives me the opportunity to implement it as a game mechanic. Let me explain.

I have added some bird chirping as a player-oriented sound, similar to the wind gusts, but the birds are not triggered by overlapping with boxes. Chirping starts playing when the character is not moving for a set amount of time. This helps the environment become richer and more characterful, while also working as a game mechanic by allowing nearby enemies to get information about your approximate position. This discourages players from camping* and reinforces the fast-paced element of the game.

As mentioned before, it is a player-oriented system, so the sounds spawn around the player. For that reason, the system needs to be carefully balanced so it does not trigger for players who do not camp (e.g., stopping for a short period to shoot an enemy) or escalate the chirping too quickly for those who stay put.

In Wwise, I use two random containers under a blend container that include the bird chirping sounds. Again, their own attenuation and occlusion systems have been applied.

The way this system is set in Unreal Engine, it checks every second for the player’s velocity. If the player is not moving, the system will move forward and wait for some time (“Lyra Voices_Delay”) to check if the player will move. If the player hasn’t moved yet, they'll start to hear a bird. As the player stays idle, they’ll hear more and more birds chirping around them, and they’ll get louder to the point of being easily spotted, and they will start getting annoyed themselves.

One extra thing I did was to adjust the audio listener. I realized while testing my sounds that the listener was the camera instead of the character. This is not a problem per se, but it results in panning and distance feeling wrong sometimes. To make it sound better and more immersive, I overrode the audio listener following Bartosz Kamiński’s video (LINK) inside the character’s blueprint. Now, when the character runs past a spawner, its loudness will peak when my character is next to it rather than when the camera is.

Overall, I think this makes a good foundation for my Lyra redesign, and I am happy with the progress so far. In my next blog, I’ll discuss how I handle animation-related sounds such as footsteps and how they can change based on different character states or floor textures.

As always, feel free to give me some feedback!

*Camp: A multiplayer technique in shooters where the "camper" finds a relatively safe spot to stay at and pick off enemies as they enter the frame, rather than going out and seeking enemies to kill.
```

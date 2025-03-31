---
title: Lyra Sound Redesign Blog 7 - Sound Propagation
date: 2025-01-04
author: "Georgios Georgakis"
---


![description](/blogImages/Blog06_UI_and_HUD.png)


# Sound Propagation in Lyra Audio Redesign

This blog is about how I approached the sound propagation for my Lyra audio redesign.

---

## Sound Propagation Techniques

This sound propagation includes:

- **An occlusion system**
- **Reverbs**
- **Diffraction and Transmission**
- **Slapback delay system**

---

## Initial Approach

When I started this project, I initially relied on occlusion and reverb as the main sound propagation systems. For the most part, this worked well! However, one of the reasons I started this redesign was to also experiment and learn new techniques.

I decided to dive into diffraction and transmission using Wwise, and on top of that, I created my own stereo slapback delay which significantly improved the game's sound. The current version is far more dynamic and realistic, elevating the overall audio experience. That said, I kept the occlusion system for certain elements since it requires less computing power and isn’t as critical from a gameplay perspective.

---

## Occlusion

The occlusion system works in a straightforward way. I cast a trace line from the emitter to the listener and check whether there is a wall in between (Figure XX). For each wall it detects, it multiplies the number with my variable (“Occlusion Percentage Per Hit”) and sends it to my RTPC (Figure XX).

For example, if the trace line hits one wall and my Occlusion Percentage Per Hit value is 33, then it would have 33% occlusion. If there are two hits, it will be 66% occlusion.

This value is then sent to an RTPC, which adjusts the sound’s filtering and volume, effectively occluding it (Figure XX).

---

## Diffraction, Transmission, and Reverb

### Concepts

- **Diffraction**: Sound bending around edges, openings, or obstacles.
- **Transmission**: Sound passing through and between materials.
- **Reverb**: The persistence of sound in a space due to reflections after the source stops.

To implement these effects, I placed **AkReverbZones** and **AkSpatialAudioVolumes** across the map, tailored to different environments:

- **Outdoors**
- **Middle tower**
- **Small corridors**
- **Ground floor**
- **Upper floor**
- **Control Points**
- **Columns & Portals**

---

### Outdoors

When the player isn’t inside a defined area, they exist within the "Outdoors" AkReverbZone. This serves as a neutral acoustic space between smaller rooms, providing a baseline reverb profile for open environments.

---

### Middle Tower and Small Corridors (Ak Spatial Audio Volumes)

For enclosed spaces like the Middle Tower and Small Corridors, I used AkSpatialAudioVolumes to reflect sound using geometry and apply reverb. Then, I added Ak Portals to the spaces’ openings. Ak Portals work seamlessly with AkSpatialAudioVolumes, allowing sound to escape from the room’s openings.

It’s crucial to disable/enable surfaces per room to minimize unnecessary diffraction calculations. Diffraction can be CPU intensive, so we aim to use as few triangles as possible (Nathan Harris, 2023). Therefore, only walls that physically exist should be processed.

---

### Ground Floor, Upper Floor, and Control Points (Ak Reverb Zones)

These larger, open areas primarily use **AkReverbZones** since they focus on reverb rather than complex diffraction or transmission. 

However, to maintain acoustic consistency, I placed **AkSpatialAudioVolumes** on individual columns. This enables realistic diffraction around edges, material-based transmission, and most importantly, seamless integration with the broader acoustic environment.

---

### Setting Up Diffraction, Transmission, and Reverb in Wwise

#### Enabling Diffraction & Transmission

To enable a sound’s Diffraction and Transmission settings in Wwise, navigate to the **Positioning Tab** and enable the “Diffraction and Transmission” setting (Figure X). Then, define behavior curves in the **Attenuation Settings** to control how sound bends (diffraction) and passes through materials (transmission) (Figure XX).

---

#### Setting Up Reverb

To set the reverb in Wwise for the Ak Reverb Zones and the Ak Spatial Audio Volumes, **Aux Buses** are needed for each reverb type. To keep things organized, I created a parent audio bus to group all reverb Aux Buses (Figure X). Also, naming conventions are essential for a quick workflow and to avoid confusion.

All “rev” aux buses use the **RoomVerb** effect and sometimes pair with a delay for added depth. To route sounds to the reverb, enable the **“Use game-defined aux sends”** setting in the **General Settings Tab** (Figure X).

---

## SlapBack Stereo Delay

One of the most exciting systems I made for Lyra is the **SlapBack Stereo Delay**. I designed it to make gunshots feel more dynamic and realistic in enclosed spaces. This feature adds a responsive echo when the player fires near a wall, detects wall materials to vary the echo’s character, and adjusts stereo positioning based on the wall’s direction.

---

### Blueprint Logic Breakdown

To detect walls around the player efficiently, I cast rays at multiple angles using a **Line Trace by Channel** node. Since this needs to run frequently, I used the **Event Tick** with a **Delay node** to balance responsiveness and CPU usage. Before each scan, arrays storing hit distances and materials are cleared.

Once the rays are cast successfully, the shortest hit distance is stored in the **Trace Length Array**, which determines proximity and wall material. These values are sent to the corresponding RTPCs.

#### Direction Detection

The direction detection uses the trace line’s index to identify the wall’s relative position:

- **Index ≥ 5**: Sets the **SlapBack_Left RTPC** to trigger an echo from the left stereo channel.
- **Index between 1 and 3**: Sets the **SlapBack_Right RTPC** for the right stereo channel.
- **Index 0 or 4 (straight ahead/behind)**: Applies a balanced, subtler delay.
- **No hits**: RTPCs are set to default.

---

### SlapBack Stereo Delay in Wwise

#### Aux Bus Setup

In Wwise, I created two dedicated **Aux Buses (Left/Right)** with hard-panned stereo positioning (Figure X).

#### Effect Chain Configuration

Each bus features two key effects:

1. **Dynamic Parametric EQ**: Controlled by RTPCs to adjust frequency attenuation based on wall proximity and shift EQ curves per surface type (e.g., wood = fewer highs, plastic = more lows) (Figure X).
2. **Delay Effect**: Driven by data from Unreal Engine (Figure X).

---

## Conclusions

Each system works great, and these techniques truly elevated the overall sound of the game. While the occlusion system remains ideal for less critical sounds due to lower computational demands, diffraction and transmission offer a more immersive soundscape. Experimenting with these advanced systems in Wwise and Unreal Engine was a valuable learning experience.

The most rewarding part was creating the slapback delay using blueprints and Wwise. Seeing (and hearing!) walls respond differently based on material and distance was incredibly satisfying!

I hope this blog inspires other audio enthusiasts to experiment with their own implementations.

Thanks,  
**Georgos Georgakis**

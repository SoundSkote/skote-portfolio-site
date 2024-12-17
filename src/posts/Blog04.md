# Audio Implementation for Weapons in Lyra

Hi,

In this blog post, I’ll discuss the audio implementation for weapons I did for Lyra. The whole weapon section covers various sounds, from throwing grenades to headshots. That’s why I decided to split it into two blog posts. This is the first post, and it will cover grenades, weapon foley, and weapon firing.

---

## Grenades

As someone who gets excited by explosions, the first thing I focused on was the grenade sound. The grenade action consists of four parts: throwing the grenade, the grenade starting to beep, the grenade potentially hitting a wall or the floor, and the grenade detonates.

### Grenade Throw & Beep Timer

When the player presses “Q”, they will throw a grenade. To easily implement the sound of the throw, the animation blueprint was used to trigger the appropriate sound when the animation gets triggered.

**[Animation BP]**

Additionally, although Lyra does not have a beeping timer function for the grenade, I thought it would be fun to create one. This system gives players extra auditory information about not only how far they are from an active grenade but how soon it is going to explode as well. This will hopefully prevent players from making deadly mistakes. 💣

When the grenade is thrown, the timer is set alongside a boolean to have better control over the system. Then, the grenade beeping Wwise event gets triggered.

If the grenade has been thrown, the timer will start counting down and will be sending this value to an RTPC. Following that, the occlusion system gets triggered and there’s a fail-safe system that stops the beep sound if the grenade falls over the map.

As the timer value gets closer to 0 the beep sound gets faster and its pitch gets higher.

*(There’s also an attenuation sphere that changes the volume based on the player’s distance, a low-pass filter controlled by occlusion. These provide the player with a good understanding of where the grenade is and when it is going to explode.)*

---

### Grenade Bounce

Before moving to the explosion, we need to check whether the grenade is bouncing off of any walls or floors.

Using the Event Hit node, each time the grenade hits something, it will send a trigger and will also provide information about the physical material of the hit surface. The surface type is sent to Wwise to set the respective switch and post the Wwise event.

---

### Detonation

Time to go boom! As the grenade detonates, the “Grenade_Throw” boolean is turned off. This will prevent the event tick in the Beep Timer section from running unnecessarily. Then, the “Grenade_Distance_Wwise_Switch” system and the detonation sound gets triggered.

The “Grenade_Distance_Wwise_Switch” is a small system that can change the explosion sound depending on how far from the player it detonated. There are three Wwise switches that correspond to close, near, and far distances.

Moreover, to make the detonation more dynamic and aware of the environment, I also created two new actor blueprints and placed them in areas where there is glass nearby. Using collision boxes, the first blueprint is covering the area on or next to the glass and the second blueprint is covering the corridor area near the glass.

After adding a tag in the “B_Grenade” blueprint, I added a branch node to check if the overlapping actor is the grenade. Using an RTPC, I’m able to control the volume of the glass layer in the explosion blend container in Wwise. When the grenade enters the box, the RTPC value will be set to `1` (full volume) if it's next to or on the glass (green box in figure x). It will be set to `0.5` (-6 dB) if it's near the glass (yellow box in figure x). If the grenade leaves the collision box or never enters, the RTPC value will be `0`, hence, basically muted. This allows the explosion sound to add a glass layer and even have some dynamic control over it depending on its distance from the glass.

---

## Weapon Foley

I always loved weapon foley in video games and especially the mechanical sounds such as reloading as they often feel very satisfying. For Lyra, I redesigned the reload, dryfire/empty clip sounds and I added some extra weapon foley when the character is running.

I have once again used the animation blueprint to trigger the Wwise events which made it very straightforward.

Following the same logic as the previous animations, notifiers have been set to the respective animations to trigger the corresponding Wwise events. So, the dryfire/empty clip, reload, and equipping weapon sounds have been set. All three weapons follow the same logic and it is working seamlessly.

Additionally, I added some weapon foley while the player is running. A new switch container **“Weapon_Running”** has been added to the footstep blend container. This switch container includes three random containers that are triggering foley sounds for each weapon respectively. By setting the switch when the weapon is equipped, the correct random container is selected and played as the player runs. This adds more weight to the sound and provides a better sense of the character’s movement and effort.

**[Wwise Switch Screenshot]**

---

## Aim Down Sights (ADS)

Before diving into the actual weapon firing, the ADS system should be set. ADS refers to Aim Down Sights and enables shooting using the weapon’s sights. Setting this beforehand simplified testing the weapon sounds. ADS can either be enabled or disabled. I used the “GA_ADS” blueprint and made a “detour” in the event graph to trigger my sounds and set my switches.

When ADS is enabled, the player’s weapon is checked, and the “Weapon_Equipped” switch is set for the corresponding weapon using the B Weapon as an actor. This will ensure that the switches and the Wwise event refer to the same actor. After, the ADS switch and the corresponding sound will be triggered.

Likewise when the ADS is disabled the switch changes. However, the switch doesn’t need to be reset, as it was already configured when ADS was enabled.

---

## Firing

For the weapon fire sound, I found the corresponding blueprint for each weapon and added a patch that checks if it is being used by the player or an NPC, how much ammo the weapons have, and triggers the weapon fire Wwise event.

### ADS Check

The Wwise event for the weapon fire triggers a switch container that selects a blend container to be played based on the ADS switch that we mentioned before. If ADS is enabled, the ADS_ON switch is selected. Otherwise, the ADS_OFF switch is used. This way we can have a different mix for our firing sound based on whether the player uses ADS or not.

---

### Player or NPC Check

Since the player’s shooting will always be at a set distance from the listener, the weapon fire audio mix will always be somewhat similar. However, the NPCs might fire their weapon while being close or far away from the player. So, the mix has to change respectively to have a more realistic audio system.

For the NPC weapons, I used the blend container made for the corresponding weapon when the ADS is off. For example, the “Pistol_Fire_ADS_OFF” blend container got duplicated and became “Pistol_Fire_NPC”. Then, layers such as sub, mech, and special were removed and the volume of the transient layer was lowered. Also, attenuation has been used to change the volume and filter the sound based on the distance. This effectively still gives the information about what weapon the enemy is using by using the same body layer but changes it enough for the player to understand that it’s someone else's weapon. More systems such as occlusion and reverb will be added soon!

---

### Ammo Count RTPC

To reflect on the ammo left in the weapon’s magazine and translate this information to the player I subtly change the mix based on the number of bullets in the magazine. This may be different for each layer but in general, voice volume to either make a layer quieter or louder, voice pitching, or a subtle use of the initial delay to create a bit more space between the layers were used. Of course, these changes can be small but still make an impact on the sound.

- Introducing a new mech layer as the magazine gets empty.
- **Pisto_Ammo_Count RTPC** controlling the voice volume and initial delay on the Pistol_Fire_Sub layer.
- **Pisto_Ammo_Count RTPC** controlling the voice volume and the voice pitch on the Pistol_Fire_Mech layer.

---

## Conclusions and Part 2

Redesigning the weapon systems and their sound design was absolutely fun but also proved to be a delicate challenge. Things would easily misbehave or not sound quite right the first time so there was a lot of fine-tuning. Nevertheless, I’m happy with the outcome so far! The next part of the weapon redesign will focus on the bullet whiz/flybys and sounds such as getting damaged, dealing damage, or headshotting. 🎯

Thank you!

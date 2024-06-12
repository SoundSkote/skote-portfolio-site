---
title: Lyra Sound Redesign Blog 0 - Setting Up
---


![description](/blogImages/Blog0_Setting_Up.png)

# Lyra Sound Redesign Blog 0 - Setting Up  

# By Georgios Georgakis







&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;


Hi all!

I decided to start blogging my progress on a portfolio project I started. This project is a complete sound redesign of the sample game Lyra using Wwise. The aim of this project is to create a playable level that will allow me to showcase my skills but will also allow me to experiment and learn.This point of this redesign is not just replace the sounds on pre-existing systems but to create my own with my own sounds attached to them. For that reason, I am going to use Wwise instead of the pre-made Metasound systems. At the end of this blog series, I’ll also create a video showcasing my work. Any advice or feedback about the sound design or the implementation is much appreciated!

## Project Overview

Before proceeding with this blog, please keep in mind that these systems are being made by a sound designer for other sound designers. Everything in this project will be made from a non-coder perspective for the purpose of exploring and creating interesting audio systems. However, I’ll try to optimise these systems as much as I can to create a better end product. 


### So what is Lyra? 

Lyra is a third-person shooter sample game project for Unreal Engine 5 (UE5) made by Epic Games. I chose this game as it features many gameplay mechanics that allow me to create systems for, such as shooting and map interactions. Additionally, it is fully playable and will allow me to experiment with audio systems without having to create other systems such as animations and new assets, although I plan to add a few extra pieces. 

### Blog Structure

To make it easier for people to follow my progress, I’ll blog each section of the game as it’s completed and I will be covering the following topics:

  -  Environment and Ambience
  -  Animations
  -  Interactions
  -  Weapons
  -  Occlusion and Reverb
  -  Overall Mixing


### Wwise Integration

To start working on this project, I need to set things up. Firstly, I integrated Wwise 2023.1.2 and Unreal Engine 5.2. I wanted to use Wwise for two main reasons. Firstly, this is a purely personal project and although I’ve planned its production and deadlines, I have the flexibility to allow myself to experiment more in an environment that I’m already pretty familiar with. The second reason is that Lyra already uses UE’s Metasounds, so it wouldn’t be much of a technical challenge or a learning experience for me as most of the systems are already set inside.

### Planning ahead

Before diving into the work, planning is crucial. It helps me track progress and prioritize important tasks. After playing the game, I created a spreadsheet listing all the sounds I need to make. This provides a good initial picture of the game’s audio needs. 

&nbsp;&nbsp;&nbsp;



![Lyra Control Asset List!](/blogImages/post0.png "Lyra Control Asset List") 
###### Lyra Control Asset List.

&nbsp;&nbsp;&nbsp;

I added the type of sounds that I’ll need to make. This gives a good first picture of what the game’s needs are, but keep in mind that all of these sounds need multiple variations, so the actual number of the SFX will multiply.

Lastly, to make the Lyra project a bit more unique, I used assets from the Unreal Engine Marketplace to add a new character asset and change the map's textures to bring more life and excitment into the game.

&nbsp;&nbsp;&nbsp;

![New Character Asset!](/blogImages/New_Char.png "New Character Asset") 
###### New character asset and textures around the map.

&nbsp;&nbsp;&nbsp;

### Next Steps

The first chapter of the blog will focus on the game's environment and ambience. Stay tuned, and feel free to share any feedback or advice you might have!







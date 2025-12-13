# My plan

I will start by making the state files. I will need :

Game play states

-   The TitleState
-   The MapState

Equipement states

-   ArmorSelectionState
-   WeaponSelectionState
-   RangedWeaponSelectionState
-   MagicSelectionState

Player States
[Note] [There might be a more efficient alternative than to make a state for every possible move but this method might be the easiest to implement]

-   IdleState
-   JumpForwardState
-   JumpBackwardsState
-   ... (all possible jump states including the ones with attacks)

Regarding the player states, I might have an easier way to do it but if i can't find an engine that

######

# Sounds

## Music

I found a website where i can find all th background music for the gameplay.
[link] [https://downloads.khinsider.com/game-soundtracks/album/shadow-fight-2]

## Character Hits

I found this website that has all the hits sounds for the characters
[link] [https://sounds.spriters-resource.com/mobile/shadowfight2/asset/430524/]

It has different sounds for the female characetrs, the male characters and the sound effects for hits and enemies etc.

######

# Images

## Location Sprites

i found location sprites on this website :
[link] [https://www.spriters-resource.com/mobile/shadowfight2/asset/144593/]

## Equipment sprites

It is very hard to find sprites for the equipment since shadow fight 2 is apparently based of
i would have to make the sprite programmatically considering each weapon has a different move.
I think I will just start and then i will see how it goes or what i come up with

```js
// this is my idea of a constructor for the PlayerShadow figure class at first
constructor(x, y) {
        this.x = x;
        this.x = y;
        this.state = "idle";
        this.equipment = null;
        this.facing = 1; // 1 = right, -1 = left
        this.animationFrame = 0;
        this.animations = []; // will store all the possible animations once the whole equipement has been chose (might be passed in later too)
    }
```

# Branch 1 - Shadow Figures and Equipment

In this branch, my goal is to implement the shadow figures and equipment classes as well as get the canvas initialized.

## Classes

### Shadow Figures Classes

I started by making 3 classes in the last branch:

-   ShadowFigure.js
-   PlayerShadowFigure.js
-   EnemyShadowFigure.js

I made changes to the file structure to organize it a bit more. i made a shadow figures folder that will contain the equipment and Character Figures.

I still need to find a source for the sprites for the shadow figures and the equipment

**Movement Animation Research**
I found this link to the moves combinations in shadow fight:
[link] [https://shadowfight.fandom.com/wiki/Moves_(SF2)]

I have to find a way to extract the animation frames of the moves to make them sprites maybe or use a mesh.
** Moves **
_Up_ : w
_down_:
_left_ :
_right_ :

### Equipment Classes

#### Armor

#### Healmet

#### Weapon

for the weapons i found this :
[link] [https://www.freepik.com/free-photos-vectors/knife-silhouette#uuid=919fb144-d0d3-44d5-bf9d-e0250c4a0c7e]
I will use this as the sprite sheet for teh swords because it is impossible to find the sprites for the game i want to replicate.

#### RangedWeapon

i found a sprite sheet for charcters that have moves similar to the ones in shadow fight 2. Althought they don't look like the characters i was trying to make, and in those sprite sheets

#### Magic

This class will carry the magic object. it will have a damage, lifetime, states

## Factories

## States

# Branch 2 - Movement Logic Implementation

This branch will have the logic for the movements of the players and the equipement

I am taking code from the mario assignment as a boilerplate for the PlayerShadowFigure class.

# Branch 3 - Damage and hitboxes Implementation

This branch will take care of the

# Branch 4 - Special Effects and Enchantement Damage Implementation

# Branch 5 - Enemy AI implementation

I want to do the weapons i want to make 3 weapons that have a very simple move. like the samurai blade, the one where the the player does a sort of tornado attack, (repeated animation frame ) and another simple one but that has an enchatement like ppision or smt. then for the armors, just choose 3 of them (1 has enchantement). for the ranged weapons, i need one that is trown straight, one that spllits in 3 and one that is trown from under(again one with an enchatement) eah has a coin value and the same level structure as the game i the sense that the armor has a shilding level the weapon has a

**_AI Usage_**
I used AI to try and figure out how to find the sprites for the shadow fighter. this was more complicated than anticipated due to the fact that the shadow fight 2 game does not use sprites, rather it uses a skeleton mesh that uses articulation joints to make the player figure. I also tried to find the limbs but that didnt work.

## change of plans!!!

I will be using sprites from another game for the characters because time tells me that i wont have time to finish if i don't do so and that it would be pretty much impossible to make the sprites for my game otherwise. So i will try tthis approach instead.

i will also remove the equipement selections and replace that with a player selection maybe. (I say maybe because i might just take that all off since i have the different enemies anyway.)

I am trying to use ai to generate the sprite sheets for the game since itis almost impossible for me to find teh actual sprites.

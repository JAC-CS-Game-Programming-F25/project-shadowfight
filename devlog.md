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

#### RangedWeapon

#### Magic

This class will carry the magic object. it will have a damage, lifetime, states

## Factories

## States

# Branch 2 - Movement Logic Implementation

This branch will have the logic for the movements of the players and the equipement

# Branch 3 - Damage and hitboxes Implementation

This branch will take care of the

# Branch 4 - Special Effects and Enchantement Damage Implementation

# Branch 5 - Enemy AI implementation

I want to do the weapons i want to make 3 weapons that have a very simple move. like the samurai blade, the one where the the player does a sort of tornado attack, (repeated animation frame ) and another simple one but that has an enchatement like ppision or smt. then for the armors, just choose 3 of them (1 has enchantement). for the ranged weapons, i need one that is trown straight, one that spllits in 3 and one that is trown from under(again one with an enchatement) eah has a coin value and the same level structure as the game i the sense that the armor has a shilding level the weapon has a

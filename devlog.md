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

## Equipement sprites

It is very hard to find sprites for the equipement since shadow fight 2 is apparently based of
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

Continuing on what i built yesterday, i will start with the

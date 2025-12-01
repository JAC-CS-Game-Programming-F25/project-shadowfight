\*\*\*\* i edited this with ai to make my ideas more clear and comprehensive

# Final Project - Shadow Fight 2 Replica

## Project Checklist

-   [x] Read the [project requirements](https://vikramsinghmtl.github.io/420-5P6-Game-Programming/project/requirements)
-   [ ] Get the proposal greenlit by Vik
-   [ ] Place assets in `assets/` and update `src/config.json`
-   [ ] Decide on height and width in `src/globals.js` based on asset sizes
-   [ ] Build individual game components according to proposal
-   [ ] Test and polish final game

---

# Shadow Fight 2 Game Replica

> [!NOTE]
> This project is inspired by Shadow Fight 2, one of my favorite mobile fighting games. I will replicate the core combat mechanics, progression system, and visual style of the original game, adapting it for web-based gameplay with JavaScript and Canvas.

## ✒️ Description

Shadow Fight 2 follows the journey of Shadow, a warrior cursed to exist as a silhouette who must fight through multiple worlds to regain his physical form. The player controls Shadow through various combat encounters, facing increasingly difficult opponents and bosses.

### Core Gameplay Mechanics

-   **Combat System**: Players engage in 2D fighting matches against AI opponents
-   **Hit Types**:
    -   **Normal Hit**: Standard damage
    -   **Critical Hit**: High damage when landing powerful strikes
    -   **Head Hit**: Bonus damage when striking the opponent's head
-   **Blocking**: Players can block incoming attacks (except critical hits) by staying still
-   **Round System**: Best of 3 rounds - first to win 2 rounds wins the match
-   **Equipment System**: Players can equip weapons, armor, helmets, ranged weapons, and magic spells
-   **Progression**: Defeat opponents to earn coins and gems, unlock new equipment, and advance through worlds

### Simplified Scope

To make this project feasible within the course timeframe:

-   Limited weapon selection (3-5 weapon types instead of the full arsenal)
-   Simplified animation system using sprite-based or skeleton mesh approach
-   Focus on core combat mechanics rather than full RPG progression
-   Single-player experience with AI opponents only

## 🕹️ Gameplay

### Game Flow

1. **Main Menu**: Player selects game mode and manages equipment
2. **Equipment Selection**: Choose weapon, armor, helmet, ranged weapon (unlocked after Tournament Level 5), and magic (unlocked after Boss 1)
3. **Fight Selection**: Choose from available fights on the world map
4. **Pre-Fight Screen**: View opponent, potential rewards (coins/gems), and confirm entry
5. **Combat**: Engage in best-of-3 rounds fighting match
6. **Post-Fight**: Collect rewards, gain experience, return to map

### Combat Mechanics

**Turn Structure**:

-   Real-time combat with simultaneous player and AI actions
-   Players can move left/right, jump, attack (punch/kick), block, use ranged weapons, and cast magic
-   Timing and positioning are critical for landing hits and avoiding damage

**Damage System**:

-   **First Hit**: First successful strike in a round
-   **Normal Damage**: Base damage from attacks
-   **Critical Hit**: Triggered when damage exceeds critical threshold, deals extra damage
-   **Head Hit**: Bonus damage when attack connects with opponent's head hitbox
-   **Enchantments**: Special effects triggered by equipment under specific conditions

**Round Timer**:

-   Regular fights: 60 seconds per round
-   Boss fights: 90 seconds per round
-   If timer expires, player with higher health wins the round

**Controls**:

-   **Movement Wheel** (Arrow Keys): Left/Right movement, Up to jump, Down to crouch
-   **Punch Button** (Z): Perform punch attacks
-   **Kick Button** (X): Perform kick attacks
-   **Ranged Button** (C): Use equipped ranged weapon (cooldown-based)
-   **Magic Button** (V): Cast equipped magic spell (cooldown-based)
-   **Combo System**: Chain punch and kick in sequences for special moves

### Game Modes

1. **Tournament**: Series of fights against progressively harder opponents
2. **Boss Fight**: Special encounters against world bosses (3 rounds required)
3. **Duel**: Quick single fights for practice and coin farming
4. **Survival**: Fight continuous waves of enemies (stretch goal)

### Progression System

**Currency**:

-   **Coins**: Earned from fights, used to purchase and upgrade equipment
-   **Gems**: Rare currency for premium items (optional if time permits)

**Equipment**:

-   **Weapons**: Different attack patterns and damage values
-   **Armor**: Increases defense and health pool
-   **Helmets**: Additional defense, may have special effects
-   **Ranged Weapons**: Shurikens, kunai, etc. with limited cooldown
-   **Magic Spells**: Fireball, lightning, etc. with mana/cooldown cost
-   **Enchantments**: Special passive effects (e.g., poison on hit, life steal, critical chance boost)

**Leveling**:

-   Equipment can be upgraded using coins
-   Higher levels increase base stats (damage, defense, etc.)
-   Player gains XP from fights to unlock new content

## 📃 Requirements

### Core Requirements (Must-Have)

1. ✅ Equipment selection system with inventory UI
2. ✅ Coin and gem currency system
3. ✅ Pre-fight reward display showing potential earnings
4. ✅ Shop system for purchasing equipment
5. ✅ Inventory management screen
6. ✅ Multiple game modes (Tournament, Boss Fight, Duel)
7. ✅ Enchantment system with activation conditions
8. ✅ Equipment upgrade system
9. ✅ AI opponent with difficulty scaling
10. ✅ Thematic music and backgrounds matching original game aesthetic
11. ✅ Sound effects for hits, getting hit, and special moves
12. ✅ Gender-based voice variations for opponents
13. ✅ Boss fights with mandatory 3-round format
14. ✅ Simplified storyline progression through worlds
15. ✅ Move list/combo reference accessible from main menu
16. ✅ Round timer (60s regular, 90s boss fights)

### Technical Requirements

1. **State Management**: Implement state machines for game flow and combat states
2. **Entity System**: Create base Entity class with Fighter, Player, and Opponent subclasses
3. **Collision Detection**: Accurate hitboxes for attacks and blocking
4. **Animation System**: Smooth sprite-based or skeleton mesh animations
5. **AI System**: Behavior tree or state-based AI for opponents
6. **Data Persistence**: Save player progress, inventory, and currency
7. **Responsive UI**: Clean interface matching game aesthetic

### Stretch Goals (Nice-to-Have)

-   Survival mode with endless waves
-   More weapon variety (6-10 types)
-   Advanced enchantment combinations
-   Gem-based premium shop
-   Special moves with cinematic animations
-   Tournament leaderboard system

## 🤖 State Diagram

The game uses multiple state machines:

### Main Game States

```
MainMenu → CharacterSelection / Controls → Map → PreFight → Fighting → RoundEnd → Victory/Defeat → Rewards → Map
MainMenu → Controls → MainMenu
```

### Combat States

```
PlayerIdle ↔ PlayerWalking ↔ PlayerAttacking → PlayerCombo
PlayerIdle ↔ PlayerJumping → PlayerAirborne → PlayerAttacking
PlayerIdle ↔ PlayerBlocking
Any State → PlayerHit → PlayerKnockedDown → PlayerGettingUp → PlayerIdle
Any State → PlayerDead (when HP = 0)
```

> [!NOTE]
> Full state diagram created using Mermaid.js - see `assets/diagrams/state-diagram.md`

## 🗺️ Class Diagram

### Entity Hierarchy

```
Entity (abstract)
├── Fighter (abstract)
│   ├── Player
│   └── Opponent
├── Projectile
└── MagicEffect
```

### Equipment System

```
Weapon
RangedWeapon
Magic
Inventory
```

### AI System

```
AIBehavior
└── Decision tree for opponent actions
```

> [!NOTE]
> Complete class diagram with methods and properties - see `assets/diagrams/class-diagram.md`

## 🧵 Wireframes

### Main Menu

-   **SHADOW FIGHT** title at top
-   Menu buttons: PLAY, SHOP, INVENTORY, SETTINGS
-   Simple, dark theme with orange accents

### Map / Level Selection

-   Node-based progression path
-   Regular fight nodes (circles)
-   Boss fight nodes (larger, distinct design)
-   Visual progression showing completed and locked fights

### Fight Screen

-   **Top**: Player health bar (left), Opponent health bar (right)
-   **Center**: Round indicator (3 dots showing wins)
-   **Main Area**: Player character (left), Opponent (right), background
-   **Bottom Left**: Movement wheel (directional controls)
-   **Bottom Right**: Action buttons (Punch, Kick, Ranged, Magic)

### Shop

-   Tabbed interface: Weapons, Ranged, Magic, Armor
-   Grid layout showing items with icons, names, and prices
-   Coin display in top-right corner
-   BUY buttons for each item

### Inventory / Loadout

-   Three equipment slots: WEAPON, RANGED, MAGIC
-   Visual display of equipped items
-   Item stats and descriptions
-   EQUIP button for owned items

### Victory / Defeat Screen

-   Large "VICTORY!" or "DEFEAT" text
-   Rewards display: +XP, +Coins, +Gems
-   Buttons: CONTINUE (back to map), MENU (main menu)

> [!NOTE]
> Interactive wireframes created in HTML - see `assets/wireframes/wireframe.html`

## 🎨 Assets

### Required Assets

#### 🖼️ Images

-   **Character Sprites**: Shadow silhouette animations for idle, walk, attack, block, jump, hit, death
-   **Opponent Sprites**: Various enemy types with different silhouettes
-   **Backgrounds**: Multiple world-themed backgrounds (dojo, forest, temple, etc.)
-   **Equipment Icons**: Visual representations of weapons, armor, helmets, ranged weapons, magic
-   **UI Elements**: Buttons, health bars, menus, icons
-   **Effects**: Hit sparks, magic effects, projectile sprites

#### ✏️ Fonts

-   **Title Font**: Bold, stylized font for "SHADOW FIGHT" title
-   **UI Font**: Clean, readable font for menus and stats
-   **Damage Numbers**: Bold font for displaying damage values
-   **Timer Font**: Clear font for round timer

#### 🔊 Sounds

-   **Background Music**:
    -   Menu theme
    -   Tournament fight music (multiple tracks for variety)
    -   Boss fight music (more intense)
-   **Sound Effects**:
    -   Punch sounds (multiple variations)
    -   Kick sounds (multiple variations)
    -   Block/deflect sound
    -   Ranged weapon throw
    -   Magic casting sound
    -   Hit impact (normal, critical, head hit)
    -   Getting hit grunts (male and female voices)
    -   Death sound
    -   Victory fanfare
    -   UI click/select sounds

### Asset Sources

1. **Official Shadow Fight 2 Assets**: Extract sprites and sounds from game files (for educational purposes)
2. **Sprite Creation**: Screenshot gameplay and use background removal tools to create custom sprites
3. **Skeleton Mesh Library**: Use libraries like Spine or DragonBones for character animation (if time permits)
4. **Icon Sets**: Use matching icon packs for equipment and UI elements
5. **Sound Libraries**: Freesound.org, OpenGameArt.org for additional sound effects
6. **Music**: Original Shadow Fight 2 soundtrack or similar royalty-free alternatives

## 📚 References

### Game Reference

-   **Shadow Fight 2** (Nekki, 2014) - Primary reference for gameplay, mechanics, and aesthetics
-   **Shadow Fight 3** - Reference for improved combat mechanics
-   **Shades** - Similar game for alternative implementation ideas

### Technical References

-   **Shadow Fight 2 Wiki**: Detailed information on mechanics, damage calculations, and progression
-   **Game Physics**: 2D fighting game physics and collision detection
-   **AI Behavior Trees**: For implementing opponent decision-making
-   **Canvas Animation**: Smooth sprite animation techniques

### Resources

-   Shadow Fight 2 Fandom Wiki: https://shadowfight.fandom.com/
-   Combat system documentation
-   Equipment stats and enchantment effects
-   Move combinations and combo system

## 🔧 Libraries & Tools

### Planned Libraries

1. **Animation System** (Choose One):

    - **Spine / DragonBones**: Skeleton-based animation (if available)
    - **Custom Sprite Engine**: Frame-based animation system
    - Goal: Smooth, responsive character animations

2. **Physics** (if needed):

    - Simple custom physics for movement and jumping
    - Collision detection using rectangular hitboxes

3. **AI Decision Making**:

    - Custom behavior tree system
    - State-based AI with difficulty modes (Easy, Medium, Hard)
    - Possible integration with AI services for adaptive difficulty

4. **Audio**:
    - Web Audio API for sound effects and music
    - Audio sprite sheets for efficient loading

### Development Tools

-   **Canvas API**: Core rendering
-   **JavaScript ES6+**: Game logic and OOP structure
-   **JSON**: Asset configuration and data management
-   **Git**: Version control

## 🧮 Algorithms & Game Logic

### Combat Algorithm

```
Every Frame:
1. Update player input state
2. Update AI decision (every N frames)
3. Update character positions and velocities
4. Check for attack collisions
5. Apply damage calculations
6. Update animations
7. Check win conditions
8. Update UI (health bars, timer)
```

### Damage Calculation

```javascript
baseDamage = weapon.damage + player.attackPower;
if (hitType === "critical") {
    finalDamage = baseDamage * 1.5;
} else if (hitType === "head") {
    finalDamage = baseDamage * 1.3;
} else {
    finalDamage = baseDamage;
}

if (opponent.isBlocking && hitType !== "critical") {
    finalDamage *= 0.3; // Blocking reduces damage by 70%
}

finalDamage -= opponent.defense;
applyDamage(opponent, finalDamage);
```

### AI Behavior Algorithm

```
AI Decision Tree:
1. Calculate distance to player
2. Evaluate threat level
3. Check health percentage
4. Determine action based on:
   - If far away: Move closer OR use ranged weapon
   - If close and player attacking: Block OR dodge
   - If close and player vulnerable: Attack OR use magic
   - If low health: Defensive tactics, use magic
   - If high health: Aggressive tactics, combos
5. Apply difficulty modifiers:
   - Easy: Slow reactions, simple patterns
   - Medium: Moderate reactions, some combos
   - Hard: Fast reactions, advanced combos, feints
```

### Enchantment System

```javascript
enchantments = {
    poison: {
        condition: "onHit",
        effect: "damageOverTime",
        duration: 3000,
        tickDamage: 5,
    },
    lifesteal: {
        condition: "onDamage",
        effect: "healOnHit",
        healPercent: 0.2, // Heal 20% of damage dealt
    },
    criticalBoost: {
        condition: "passive",
        effect: "increaseCritChance",
        bonus: 0.15, // +15% crit chance
    },
};
```

## 📅 Development Timeline

### Week 1-2: Foundation

-   Set up project structure and canvas rendering
-   Implement base Entity and Fighter classes
-   Create basic movement and collision detection
-   Load and display basic sprites

### Week 3-4: Combat System

-   Implement attack system and hitboxes
-   Add blocking and damage calculation
-   Create combo system
-   Develop AI behavior for opponents

### Week 5-6: Game States & UI

-   Build all game state screens
-   Implement menu navigation
-   Create shop and inventory systems
-   Add equipment management

### Week 7-8: Content & Polish

-   Add multiple weapons and equipment
-   Implement enchantment system
-   Create multiple opponent types
-   Add sounds and music

### Week 9-10: Testing & Refinement

-   Balance damage and difficulty
-   Polish animations and effects
-   Bug fixing and optimization
-   Final presentation preparation

## 🎯 Success Criteria

This project will be considered successful if it achieves:

1. ✅ Playable combat system with smooth controls
2. ✅ Working AI opponent with multiple difficulty levels
3. ✅ Complete equipment and upgrade system
4. ✅ At least 2 game modes (Tournament, Boss Fight)
5. ✅ Persistent progression (saves coins, equipment, progress)
6. ✅ Polished UI matching the Shadow Fight aesthetic
7. ✅ Sound effects and music implementation
8. ✅ Minimum 3 different weapons and 2 opponent types
9. ✅ Stable performance (60 FPS target)
10. ✅ Complete game loop from menu to victory

---

**Student Name**: [Your Name]  
**Course**: 420-5P6 Game Programming  
**Instructor**: Vik  
**Submission Date**: [Date]

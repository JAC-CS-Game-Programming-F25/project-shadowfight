import Background from "./Background.js";
import Ground from "../entities/Ground.js";
import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    context,
    matter,
    world,
} from "../globals.js";
import PlayerShadowFigure from "../entities/ShadowFigures/CharacterFigures/PlayerShadowFigure.js";
import RightWall from "../entities/RightWall.js";
import LeftWall from "../entities/LeftWall.js";
import ProgressBar from "../user-interface/ProgressBars.js";

export default class Level {
    constructor(LevelType, backgroundImage) {
        this.levelType = LevelType;

        // Create players with proper spacing
        this.player = new PlayerShadowFigure(
            100,
            CANVAS_HEIGHT - PlayerShadowFigure.HEIGHT - 32,
            false // Not enemy
        );

        this.enemy = new PlayerShadowFigure(
            CANVAS_WIDTH - 200,
            CANVAS_HEIGHT - PlayerShadowFigure.HEIGHT - 32,
            true // Is enemy
        );

        // Make enemy face left
        this.enemy.direction = -1;

        this.background = new Background(backgroundImage);
        this.ground = new Ground();
        this.rightWall = new RightWall();
        this.leftWall = new LeftWall();

        // Create health bars
        const healthBarWidth = 200;
        const healthBarHeight = 20;
        const healthBarY = 20;

        this.playerHealthBar = new ProgressBar(
            20,
            healthBarY,
            healthBarWidth,
            healthBarHeight,
            this.player.health,
            this.player.maxHealth,
            true // Is health bar
        );

        this.enemyHealthBar = new ProgressBar(
            CANVAS_WIDTH - healthBarWidth - 20,
            healthBarY,
            healthBarWidth,
            healthBarHeight,
            this.enemy.health,
            this.enemy.maxHealth,
            true // Is health bar
        );
    }

    update(dt) {
        this.player.update(dt);
        this.enemy.update(dt);

        // Check for attacks hitting
        this.checkCollisions();

        // Update health bars
        this.playerHealthBar.setValue(this.player.health);
        this.enemyHealthBar.setValue(this.enemy.health);
    }

    checkCollisions() {
        // Check if player is attacking enemy
        if (this.player.isAttacking && !this.player.hasDealtDamage) {
            const playerHitbox = this.player.getAttackHitbox();
            if (
                playerHitbox &&
                this.checkHitboxCollision(playerHitbox, this.enemy)
            ) {
                this.enemy.takeDamage(this.player.attackDamage);
                this.player.hasDealtDamage = true;
            }
        }

        // Check if enemy is attacking player
        if (this.enemy.isAttacking && !this.enemy.hasDealtDamage) {
            const enemyHitbox = this.enemy.getAttackHitbox();
            if (
                enemyHitbox &&
                this.checkHitboxCollision(enemyHitbox, this.player)
            ) {
                this.player.takeDamage(this.enemy.attackDamage);
                this.enemy.hasDealtDamage = true;
            }
        }
    }

    checkHitboxCollision(hitbox, target) {
        // AABB collision detection
        return (
            hitbox.x < target.position.x + target.dimensions.x &&
            hitbox.x + hitbox.width > target.position.x &&
            hitbox.y < target.position.y + target.dimensions.y &&
            hitbox.y + hitbox.height > target.position.y
        );
    }

    render() {
        this.background.render();
        this.ground.render();
        this.rightWall.render();
        this.leftWall.render();
        this.player.render();
        this.enemy.render();

        // Render health bars on top
        this.playerHealthBar.render();
        this.enemyHealthBar.render();

        // Render names above health bars
        context.fillStyle = "white";
        context.font = "16px Arial";
        context.textAlign = "left";
        context.fillText("PLAYER", 20, 15);

        context.textAlign = "right";
        context.fillText("ENEMY", CANVAS_WIDTH - 20, 15);
        context.textAlign = "left"; // Reset
    }

    didWin() {
        return this.player.health > 0 && this.enemy.health === 0;
    }

    didLose() {
        return this.player.health === 0 && this.enemy.health > 0;
    }
}

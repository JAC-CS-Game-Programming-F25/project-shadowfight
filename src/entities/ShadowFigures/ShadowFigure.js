import StateMachine from "../../../lib/StateMachine.js";
import Hitbox from "../../../lib/Hitbox.js";
import Vector from "../../../lib/Vector.js";

export default class ShadowFigure {
    constructor(x, y) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.facing = 1; // 1 = right, -1 = left

        // Combat properties
        this.health = 100;
        this.maxHealth = 100;
        this.isAlive = true;

        // Equipment
        this.weapon = null;
        this.armor = null;

        // Animation
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.frameDelay = 0.1; // seconds per frame

        // Hitboxes
        this.hurtbox = new Hitbox(x - 20, y - 80, 40, 80, "red");
        this.attackHitbox = null;

        // Initialize body parts (skeleton)
        this.initializeBodyParts();

        // State machine
        this.stateMachine = new StateMachine();
        this.initializeStateMachine();
    }

    initializeBodyParts() {
        this.bodyParts = {
            head: { x: 0, y: -60, radius: 12 },
            torso: { x: 0, y: -35, width: 24, height: 35 },

            // Arms
            upperArmR: { x: 12, y: -45, width: 6, height: 20, rotation: 0 },
            lowerArmR: { x: 12, y: -25, width: 5, height: 18, rotation: 0 },

            upperArmL: { x: -12, y: -45, width: 6, height: 20, rotation: 0 },
            lowerArmL: { x: -12, y: -25, width: 5, height: 18, rotation: 0 },

            // Legs
            upperLegR: { x: 8, y: -5, width: 8, height: 22, rotation: 0 },
            lowerLegR: { x: 8, y: 17, width: 6, height: 20, rotation: 0 },

            upperLegL: { x: -8, y: -5, width: 8, height: 22, rotation: 0 },
            lowerLegL: { x: -8, y: 17, width: 6, height: 20, rotation: 0 },
        };

        this.defaultPose = JSON.parse(JSON.stringify(this.bodyParts));
    }

    initializeStateMachine() {
        // Override in child classes
    }

    setPose(poseName) {
        const poses = {
            idle: {
                upperArmR: { rotation: 20 },
                lowerArmR: { rotation: -10 },
                upperArmL: { rotation: 20 },
                lowerArmL: { rotation: -10 },
            },

            punch: {
                upperArmR: { rotation: 0, x: 20 },
                lowerArmR: { rotation: 0, x: 35 },
                upperArmL: { rotation: 45 },
                lowerArmL: { rotation: -20 },
                torso: { x: 5 },
            },

            kick: {
                upperLegR: { rotation: -60, y: -15 },
                lowerLegR: { rotation: -30, y: 5 },
                upperLegL: { rotation: 10 },
                upperArmR: { rotation: -45 },
                upperArmL: { rotation: 45 },
            },

            block: {
                upperArmR: { rotation: -90, x: 0 },
                lowerArmR: { rotation: -45, y: -55 },
                upperArmL: { rotation: -90, x: 0 },
                lowerArmL: { rotation: -45, y: -55 },
                torso: { x: -3 },
            },

            hit_stun: {
                torso: { x: -10, rotation: -15 },
                head: { x: -5 },
                upperArmR: { rotation: -45 },
                upperArmL: { rotation: -45 },
            },
        };

        this.bodyParts = JSON.parse(JSON.stringify(this.defaultPose));

        if (poses[poseName]) {
            for (const [part, modifications] of Object.entries(
                poses[poseName]
            )) {
                if (this.bodyParts[part]) {
                    Object.assign(this.bodyParts[part], modifications);
                }
            }
        }
    }

    update(dt) {
        this.stateMachine.update(dt);

        // Update animation frame
        this.frameTimer += dt;
        if (this.frameTimer >= this.frameDelay) {
            this.frameTimer = 0;
            this.currentFrame++;
        }

        // Update hurtbox position
        this.hurtbox.set(this.position.x - 20, this.position.y - 80, 40, 80);
    }

    render(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.scale(this.facing, 1);

        // Shadow effect
        context.shadowColor = "rgba(0, 0, 0, 0.5)";
        context.shadowBlur = 8;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;

        // Draw body parts (back to front)
        this.drawBodyPart(context, "lowerLegL");
        this.drawBodyPart(context, "upperLegL");
        this.drawBodyPart(context, "lowerArmL");
        this.drawBodyPart(context, "upperArmL");

        this.drawBodyPart(context, "torso");
        this.drawBodyPart(context, "head");

        this.drawBodyPart(context, "upperArmR");
        this.drawBodyPart(context, "lowerArmR");
        this.drawBodyPart(context, "upperLegR");
        this.drawBodyPart(context, "lowerLegR");

        // Draw weapon if equipped
        if (this.weapon) {
            this.drawWeapon(context);
        }

        context.restore();

        // Draw hitboxes for debugging
        // this.hurtbox.render(context);
        // if (this.attackHitbox) this.attackHitbox.render(context);
    }

    drawBodyPart(context, partName) {
        const part = this.bodyParts[partName];
        if (!part) return;

        context.save();
        context.fillStyle = "#000000";

        if (part.radius) {
            context.beginPath();
            context.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
            context.fill();
        } else {
            context.translate(part.x, part.y);
            if (part.rotation) {
                context.rotate((part.rotation * Math.PI) / 180);
            }
            context.fillRect(-part.width / 2, 0, part.width, part.height);
        }

        context.restore();
    }

    drawWeapon(context) {
        const hand = this.bodyParts.lowerArmR;

        context.save();
        context.fillStyle = "#1a1a1a";
        context.translate(hand.x, hand.y + hand.height);
        context.rotate(((hand.rotation || 0) * Math.PI) / 180);

        // Simple sword
        context.fillRect(-3, 0, 6, 40);
        context.fillRect(-4, 40, 8, 12);
        context.fillRect(-8, 38, 16, 4);

        context.restore();
    }

    attack(attackType) {
        const baseRange = 50;
        const weaponBonus = this.weapon ? 30 : 0;
        const range = baseRange + weaponBonus;

        const hitboxX = this.position.x + (range / 2) * this.facing;
        const hitboxY = this.position.y - 40;

        this.attackHitbox = new Hitbox(
            hitboxX - range / 2,
            hitboxY,
            range,
            40,
            "green"
        );
    }

    clearAttackHitbox() {
        this.attackHitbox = null;
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.isAlive = false;
        }
    }

    checkHit(otherFigure) {
        if (!this.attackHitbox || !otherFigure.isAlive) return false;
        return this.attackHitbox.didCollide(otherFigure.hurtbox);
    }
}

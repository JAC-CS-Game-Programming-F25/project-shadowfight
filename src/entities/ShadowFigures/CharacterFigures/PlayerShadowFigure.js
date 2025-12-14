import StateMachine from "../../../../lib/StateMachine.js";
import BlockState from "../../../states/PlayerStates/BlockState.js";
import IdleState from "../../../states/PlayerStates/IdleState.js";
import KickState from "../../../states/PlayerStates/KickState.js";
import PunchState from "../../../states/PlayerStates/PunchState.js";
import WalkState from "../../../states/PlayerStates/WalkState.js";
import PlayerStateName from "../../../enums/PlayerStateName.js";
import JumpState from "../../../states/PlayerStates/JumpState.js";
import GameEntity from "../../GameEntity.js";
import { context } from "../../../globals.js";

export default class PlayerShadowFigure extends GameEntity {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.stateMachine = new StateMachine();
        this.initializeStateMachine();
        this.moveSpeed = 150;
    }

    /**
     * Initializes the player state machine
     */
    initializeStateMachine() {
        this.stateMachine.add(PlayerStateName.Idle, new IdleState(this));
        this.stateMachine.add(PlayerStateName.Idle, new WalkState(this));
        this.stateMachine.add(PlayerStateName.Idle, new PunchState(this));
        this.stateMachine.add(PlayerStateName.Idle, new KickState(this));
        this.stateMachine.add(PlayerStateName.Idle, new BlockState(this));
        this.stateMachine.add(PlayerStateName.Stuned, new JumpState(this));
        this.stateMachine.change(PlayerStateName.Idle);
    }

    initializeBodyParts() {
        // Scale factor - makes character bigger
        const scale = 2.5;

        // Human proportions (head = 1 unit, body = 7-8 heads tall)
        const headSize = 12 * scale;
        const torsoWidth = 20 * scale;
        const torsoHeight = 40 * scale;
        const upperArmWidth = 6 * scale;
        const upperArmHeight = 24 * scale;
        const lowerArmWidth = 5 * scale;
        const lowerArmHeight = 22 * scale;
        const upperLegWidth = 8 * scale;
        const upperLegHeight = 28 * scale;
        const lowerLegWidth = 7 * scale;
        const lowerLegHeight = 26 * scale;

        // Calculate positions from ground up (y=0 is at character's feet)
        const legTop = -(upperLegHeight + lowerLegHeight);
        const torsoTop = legTop - torsoHeight;
        const headY = torsoTop - headSize;
        const shoulderY = legTop - 5; // Shoulders slightly below torso top

        this.bodyParts = {
            // Head
            head: {
                x: 0,
                y: headY,
                radius: headSize,
            },

            // Torso
            torso: {
                x: 0,
                y: torsoTop,
                width: torsoWidth,
                height: torsoHeight,
            },

            // Right Arm (attached at shoulder)
            upperArmR: {
                x: torsoWidth / 2,
                y: shoulderY,
                width: upperArmWidth,
                height: upperArmHeight,
                rotation: 20,
            },
            lowerArmR: {
                parentX: torsoWidth / 2,
                parentY: shoulderY,
                offsetY: upperArmHeight,
                width: lowerArmWidth,
                height: lowerArmHeight,
                rotation: -10,
            },

            // Left Arm (attached at shoulder)
            upperArmL: {
                x: -torsoWidth / 2,
                y: shoulderY,
                width: upperArmWidth,
                height: upperArmHeight,
                rotation: 20,
            },
            lowerArmL: {
                parentX: -torsoWidth / 2,
                parentY: shoulderY,
                offsetY: upperArmHeight,
                width: lowerArmWidth,
                height: lowerArmHeight,
                rotation: -10,
            },

            // Right Leg (starts at hip)
            upperLegR: {
                x: torsoWidth / 4,
                y: legTop,
                width: upperLegWidth,
                height: upperLegHeight,
                rotation: 0,
            },
            lowerLegR: {
                parentX: torsoWidth / 4,
                parentY: legTop,
                offsetY: upperLegHeight,
                width: lowerLegWidth,
                height: lowerLegHeight,
                rotation: 0,
            },

            // Left Leg (starts at hip)
            upperLegL: {
                x: -torsoWidth / 4,
                y: legTop,
                width: upperLegWidth,
                height: upperLegHeight,
                rotation: 0,
            },
            lowerLegL: {
                parentX: -torsoWidth / 4,
                parentY: legTop,
                offsetY: upperLegHeight,
                width: lowerLegWidth,
                height: lowerLegHeight,
                rotation: 0,
            },
        };

        this.defaultPose = JSON.parse(JSON.stringify(this.bodyParts));
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

        // Apply gravity
        if (!this.isGrounded) {
            this.velocity.y += this.gravity * dt;
        }

        // Update position
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;

        // Ground collision
        if (this.position.y >= this.groundY) {
            this.position.y = this.groundY;
            this.velocity.y = 0;
            this.isGrounded = true;
        }

        // Update animation frame
        this.frameTimer += dt;
        if (this.frameTimer >= this.frameDelay) {
            this.frameTimer = 0;
            this.currentFrame++;
        }

        // Update hurtbox (bigger now)
        this.hurtbox.set(this.position.x - 50, this.position.y - 200, 100, 200);
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

        // Draw back limbs first (left side when facing right)
        this.drawLimb(context, "upperLegL", "lowerLegL");
        this.drawLimb(context, "upperArmL", "lowerArmL");

        // Draw torso and head
        this.drawBodyPart(context, "torso");
        this.drawBodyPart(context, "head");

        // Draw front limbs (right side when facing right)
        this.drawLimb(context, "upperArmR", "lowerArmR");
        this.drawLimb(context, "upperLegR", "lowerLegR");

        // Draw weapon if equipped
        if (this.weapon) {
            this.drawWeapon(context);
        }

        context.restore();
    }

    drawLimb(context, upperName, lowerName) {
        const upper = this.bodyParts[upperName];
        const lower = this.bodyParts[lowerName];

        context.save();

        // Draw upper part
        context.fillStyle = "#000000";
        context.translate(upper.x, upper.y);
        context.rotate((upper.rotation * Math.PI) / 180);

        // Upper limb shape
        context.beginPath();
        context.moveTo(-upper.width / 2, 0);
        context.lineTo(-upper.width / 3, upper.height);
        context.lineTo(upper.width / 3, upper.height);
        context.lineTo(upper.width / 2, 0);
        context.closePath();
        context.fill();

        // Draw lower part (at end of upper)
        context.translate(0, upper.height);
        context.rotate((lower.rotation * Math.PI) / 180);

        context.beginPath();
        context.moveTo(-lower.width / 2, 0);
        context.lineTo(-lower.width / 3, lower.height);

        // Add foot/hand detail for lower limbs
        if (lowerName.includes("Leg")) {
            // Foot
            context.lineTo(-lower.width / 2, lower.height);
            context.lineTo(lower.width / 2, lower.height);
            context.lineTo(lower.width * 0.8, lower.height * 0.9);
        } else {
            // Hand
            context.lineTo(-lower.width / 4, lower.height);
            context.lineTo(lower.width / 4, lower.height);
        }

        context.lineTo(lower.width / 3, lower.height);
        context.lineTo(lower.width / 2, 0);
        context.closePath();
        context.fill();

        context.restore();
    }

    drawBodyPart(context, partName) {
        const part = this.bodyParts[partName];
        if (!part) return;

        context.save();
        context.fillStyle = "#000000";

        if (partName === "head") {
            // Head
            context.beginPath();
            context.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
            context.fill();

            // Helmet/mask detail
            context.fillStyle = "#1a1a1a";
            context.beginPath();
            context.arc(
                part.x,
                part.y - 2,
                part.radius * 0.6,
                0,
                Math.PI,
                true
            );
            context.fill();
        } else if (partName === "torso") {
            // Muscular torso
            context.translate(part.x, part.y);

            context.beginPath();
            context.moveTo(-part.width / 2, 0);
            context.bezierCurveTo(
                -part.width / 2,
                part.height * 0.3,
                -part.width / 3,
                part.height * 0.7,
                -part.width / 3,
                part.height
            );
            context.lineTo(part.width / 3, part.height);
            context.bezierCurveTo(
                part.width / 3,
                part.height * 0.7,
                part.width / 2,
                part.height * 0.3,
                part.width / 2,
                0
            );
            context.closePath();
            context.fill();

            // Chest detail
            context.fillStyle = "#1a1a1a";
            context.fillRect(
                -part.width / 4,
                part.height * 0.2,
                part.width / 2,
                3
            );
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

    jump() {
        if (this.isGrounded) {
            this.velocity.y = this.jumpForce;
            this.isGrounded = false;
        }
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

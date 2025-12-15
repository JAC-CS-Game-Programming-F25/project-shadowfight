import Rectangle from "../../Rectangle.js";
import StateMachine from "../../../../lib/StateMachine.js";
import Sprite from "../../../../lib/Sprite.js";
import IdleState from "../../../states/PlayerStates/IdleState.js";
import WalkState from "../../../states/PlayerStates/WalkState.js";
import PunchState from "../../../states/PlayerStates/PunchState.js";
import KickState from "../../../states/PlayerStates/KickState.js";
import BlockState from "../../../states/PlayerStates/BlockState.js";
import JumpState from "../../../states/PlayerStates/JumpState.js";
import FallingState from "../../../states/PlayerStates/FallingState.js";
import BodyType from "../../../enums/BodyType.js";
import ImageName from "../../../enums/ImageName.js";
import PlayerStateName from "../../../enums/PlayerStateName.js";
import { images, matter, context, CANVAS_HEIGHT } from "../../../globals.js";

export default class PlayerShadowFigure extends Rectangle {
    static WIDTH = 28; // Doubled from 40
    static HEIGHT = 1; // Doubled from 48
    static FRAME_WIDTH = 48.5;
    static FRAME_HEIGHT = 86;

    constructor(x, y, isEnemy = false) {
        super(x, y, PlayerShadowFigure.WIDTH, PlayerShadowFigure.HEIGHT, {
            label: BodyType.Player,
            density: 0.01,
            friction: 1.0,
            frictionStatic: 1.0,
            frictionAir: 0.01,
            restitution: 0,
            isStatic: false,
            inertia: Infinity,
        });

        this.position = { x: this.body.position.x, y: this.body.position.y };
        this.dimensions = {
            x: PlayerShadowFigure.WIDTH,
            y: PlayerShadowFigure.HEIGHT,
        };

        this.velocity = { x: 0, y: 0 };

        this.moveSpeed = 5; // Horizontal movement speed
        this.jumpForce = 50; // Jump strength
        this.health = 100;
        this.maxHealth = 100;
        this.isAlive = true;
        this.direction = 1;
        this.isBlocking = false;
        this.isEnemy = isEnemy;
        this.isAttacking = false;
        this.attackDamage = 0;
        this.hasDealtDamage = false; // Prevent multiple damage in one attack

        this.renderOffset = {
            x: -PlayerShadowFigure.FRAME_WIDTH,
            y: -PlayerShadowFigure.FRAME_HEIGHT,
        };

        this.sprites = Sprite.generateSpritesFromSpriteSheet(
            images.get(ImageName.ShadowSprites),
            PlayerShadowFigure.FRAME_WIDTH,
            PlayerShadowFigure.FRAME_HEIGHT
        );

        this.currentAnimation = null;
        this.currentFrame = 0;
        this.initializeStateMachine();

        this.groundY = CANVAS_HEIGHT - PlayerShadowFigure.HEIGHT - 32;
    }

    initializeStateMachine() {
        this.stateMachine = new StateMachine();
        this.stateMachine.add(PlayerStateName.Idle, new IdleState(this));
        this.stateMachine.add(PlayerStateName.Walking, new WalkState(this));
        this.stateMachine.add(PlayerStateName.Punching, new PunchState(this));
        this.stateMachine.add(PlayerStateName.Kicking, new KickState(this));
        this.stateMachine.add(PlayerStateName.Blocking, new BlockState(this));
        this.stateMachine.add(PlayerStateName.Jumping, new JumpState(this));
        this.stateMachine.add(PlayerStateName.Falling, new FallingState(this));
        this.stateMachine.change(PlayerStateName.Idle);
    }

    update(dt) {
        super.update(dt);
        this.stateMachine.update(dt);

        if (this.currentAnimation) {
            this.currentAnimation.update(dt);
            this.currentFrame = this.currentAnimation.getCurrentFrame();
        }

        this.position.x = this.body.position.x;
        this.position.y = this.body.position.y;

        // Keep player grounded when not jumping
        if (this.position.y > this.groundY) {
            matter.Body.setPosition(this.body, {
                x: this.position.x,
                y: this.groundY,
            });
            matter.Body.setVelocity(this.body, {
                x: this.body.velocity.x,
                y: 0,
            });
        }
    }

    render() {
        super.render(() => {
            const scaleX = this.direction === -1 ? -2 : 2;
            const scaleY = 2;

            context.save();
            if (this.direction === -1) {
                context.scale(-1, 1);
                this.sprites[this.currentFrame].render(
                    -this.renderOffset.x - PlayerShadowFigure.FRAME_WIDTH,
                    this.renderOffset.y,
                    { x: 2, y: 2 }
                );
            } else {
                this.sprites[this.currentFrame].render(
                    this.renderOffset.x,
                    this.renderOffset.y,
                    { x: 2, y: 2 }
                );
            }
            context.restore();
        });
    }

    move(direction) {
        this.direction = direction;
        matter.Body.setVelocity(this.body, {
            x: this.moveSpeed * direction,
            y: this.body.velocity.y,
        });
    }

    stop() {
        matter.Body.setVelocity(this.body, {
            x: 0,
            y: this.body.velocity.y,
        });
    }

    jump() {
        // Only jump if on ground
        if (Math.abs(this.position.y - this.groundY) < 5) {
            matter.Body.setVelocity(this.body, {
                x: this.body.velocity.x,
                y: -this.jumpForce,
            });
        }
    }

    takeDamage(amount) {
        if (this.isBlocking) {
            amount = Math.floor(amount * 0.3); // Block reduces damage by 70%
        }

        this.health = Math.max(0, this.health - amount);

        if (this.health <= 0) {
            this.isAlive = false;
        }
    }

    startAttack(damage) {
        this.isAttacking = true;
        this.attackDamage = damage;
        this.hasDealtDamage = false;
    }

    endAttack() {
        this.isAttacking = false;
        this.attackDamage = 0;
        this.hasDealtDamage = false;
    }

    getAttackHitbox() {
        if (!this.isAttacking) return null;

        const hitboxWidth = 60;
        const hitboxHeight = 60;
        const offsetX = this.direction === 1 ? this.dimensions.x : -hitboxWidth;

        return {
            x: this.position.x + offsetX,
            y: this.position.y,
            width: hitboxWidth,
            height: hitboxHeight,
        };
    }
}

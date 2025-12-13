import State from "../../../lib/State.js";
import { input, keys } from "../../globals.js";

/**
 * JUMP STATE - Males the player jump up
 */
export default class JumpState extends State {
    constructor(fighter) {
        super();
        this.fighter = fighter;
    }

    enter(params) {
        this.direction = params?.direction || 1;
        this.fighter.facing = this.direction;
        this.fighter.clearAttackHitbox();
    }

    update(dt) {
        // Mkae character jump ***** fix after
        this.fighter.position.y += this.direction * this.fighter.moveSpeed * dt;

        // Walking animation
        const swing = Math.sin(this.fighter.currentFrame * 0.5) * 15;
        this.fighter.bodyParts.upperArmR.rotation = swing;
        this.fighter.bodyParts.upperArmL.rotation = -swing;
        this.fighter.bodyParts.upperLegR.rotation = -swing * 0.5;
        this.fighter.bodyParts.upperLegL.rotation = swing * 0.5;

        // Check movement input
        const movingRight =
            this.direction > 0 &&
            (input.isKeyHeld("D") || input.isKeyHeld("ARROWRIGHT"));
        const movingLeft =
            this.direction < 0 &&
            (input.isKeyHeld("A") || input.isKeyHeld("ARROWLEFT"));

        if (!movingRight && !movingLeft) {
            this.fighter.stateMachine.change("idle");
        }

        // Can attack while walking
        if (input.isKeyHeld("J")) {
            this.fighter.stateMachine.change("punch");
        } else if (input.isKeyHeld("K")) {
            this.fighter.stateMachine.change("kick");
        }
    }
}

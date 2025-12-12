import State from "../../../lib/State.js";
import { keys } from "../../globals.js";
import { input } from "../../globals.js";
export default class IdleState extends State {
    constructor(fighter) {
        super();
        this.fighter = fighter;
    }

    enter() {
        this.fighter.setPose("idle");
        this.fighter.currentFrame = 0;
        this.fighter.clearAttackHitbox();
    }

    update(dt) {
        // Breathing animation
        const breathe = Math.sin(this.fighter.currentFrame * 0.2) * 2;
        this.fighter.bodyParts.torso.y = -35 + breathe;

        // Handle input - use Input class
        if (input.isKeyHeld("D") || input.isKeyHeld("ARROWRIGHT")) {
            this.fighter.stateMachine.change("walk", { direction: 1 });
        } else if (input.isKeyHeld("A") || input.isKeyHeld("ARROWLEFT")) {
            this.fighter.stateMachine.change("walk", { direction: -1 });
        } else if (input.isKeyHeld("J")) {
            this.fighter.stateMachine.change("punch");
        } else if (input.isKeyHeld("K")) {
            this.fighter.stateMachine.change("kick");
        } else if (input.isKeyHeld("L")) {
            this.fighter.stateMachine.change("block");
        }
    }
}

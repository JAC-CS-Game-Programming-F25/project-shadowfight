import State from "../../../lib/State.js";
import { keys } from "../../globals.js";
export default class PunchState extends State {
    constructor(fighter) {
        super();
        this.fighter = fighter;
    }

    enter() {
        this.fighter.setPose("punch");
        this.fighter.currentFrame = 0;
        this.totalFrames = 10; // Punch lasts 10 frames
        this.hitboxActive = false;
    }

    update(dt) {
        this.fighter.currentFrame++;

        // Activate hitbox during active frames (3-6)
        if (this.fighter.currentFrame >= 3 && this.fighter.currentFrame <= 6) {
            if (!this.hitboxActive) {
                this.fighter.attack("punch");
                this.hitboxActive = true;
            }
        } else {
            this.fighter.clearAttackHitbox();
        }

        // Return to idle after animation completes
        if (this.fighter.currentFrame >= this.totalFrames) {
            this.fighter.stateMachine.change("idle");
        }
    }

    exit() {
        this.fighter.clearAttackHitbox();
    }
}

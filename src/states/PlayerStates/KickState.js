import State from "../../../lib/State.js";
import { keys } from "../../globals.js";
export default class KickState extends State {
    constructor(fighter) {
        super();
        this.fighter = fighter;
    }

    enter() {
        this.fighter.setPose("kick");
        this.fighter.currentFrame = 0;
        this.totalFrames = 15; // Kick is slower
        this.hitboxActive = false;
    }

    update(dt) {
        this.fighter.currentFrame++;

        // Activate hitbox during active frames (5-9)
        if (this.fighter.currentFrame >= 5 && this.fighter.currentFrame <= 9) {
            if (!this.hitboxActive) {
                this.fighter.attack("kick");
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

import State from "../../../lib/State.js";
import { input, keys } from "../../globals.js";

export default class BlockState extends State {
    constructor(fighter) {
        super();
        this.fighter = fighter;
    }

    enter() {
        this.fighter.setPose("block");
        this.fighter.clearAttackHitbox();
    }

    update(dt) {
        // Hold block while key is pressed
        if (!input.isKeyHeld("L")) {
            this.fighter.stateMachine.change("idle");
        }
    }
}

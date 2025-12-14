import State from "../../../lib/State.js";
import PlayerStateName from "../../enums/PlayerStateName.js";
import { input, keys } from "../../globals.js";

export default class BlockState extends State {
    constructor(fighter) {
        super();
        this.animationFrames = [];
        this.currentFrame = null;
        this.fighter = fighter;
        // set the animation
    }

    enter() {}

    update(dt) {
        // Hold block while key is pressed
        if (!input.isKeyHeld("L")) {
            this.fighter.stateMachine.change("idle");
        }
    }
}

import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import PlayerStateName from "../../enums/PlayerStateName.js";
import { input } from "../../globals.js";

export default class BlockState extends State {
    constructor(player) {
        super();
        this.player = player;
        // Block: frame 13 (defensive stance)
        this.animation = new Animation([13], 0.1);
    }

    enter() {
        this.player.currentAnimation = this.animation;
        this.animation.refresh();
        this.player.stop();
        this.player.isBlocking = true;
        this.player.endAttack();
    }

    update(dt) {
        this.player.currentAnimation.update(dt);

        // Only player responds to input
        if (!this.player.isEnemy) {
            if (!input.isKeyHeld("L")) {
                this.player.stateMachine.change(PlayerStateName.Idle);
            }
        }
    }

    exit() {
        this.player.isBlocking = false;
    }
}

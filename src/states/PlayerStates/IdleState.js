import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import PlayerStateName from "../../enums/PlayerStateName.js";
import { input } from "../../globals.js";

export default class IdleState extends State {
    constructor(player) {
        super();
        this.player = player;
        this.animation = new Animation([62, 2], 0.15);
    }

    enter() {
        this.player.currentAnimation = this.animation;
        this.animation.refresh();
        this.player.stop();
    }

    update(dt) {
        // update the animation
        this.player.currentAnimation.update(dt);

        // Only handle input for player (not enemy)
        if (!this.player.isEnemy) {
            if (input.isKeyHeld("D") || input.isKeyHeld("ARROWRIGHT")) {
                this.player.stateMachine.change(PlayerStateName.Walking, {
                    direction: 1,
                });
            } else if (input.isKeyHeld("A") || input.isKeyHeld("ARROWLEFT")) {
                this.player.stateMachine.change(PlayerStateName.Walking, {
                    direction: -1,
                });
            } else if (input.isKeyPressed("J")) {
                this.player.stateMachine.change(PlayerStateName.Punching);
            } else if (input.isKeyPressed("K")) {
                this.player.stateMachine.change(PlayerStateName.Kicking);
            } else if (input.isKeyHeld("L")) {
                this.player.stateMachine.change(PlayerStateName.Blocking);
            } else if (
                input.isKeyPressed("W") ||
                input.isKeyPressed("ARROWUP")
            ) {
                this.player.stateMachine.change(PlayerStateName.Jumping);
            }
        }
    }
}

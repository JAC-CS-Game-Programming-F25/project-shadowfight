import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import PlayerStateName from "../../enums/PlayerStateName.js";
import { input } from "../../globals.js";

export default class WalkState extends State {
    constructor(player) {
        super();
        this.player = player;
        this.animation = new Animation([32, 33, 34, 35, 36, 37, 38, 39], 0.1);
    }

    enter(params) {
        this.direction = params?.direction || 1;
        this.player.direction = this.direction;
        this.player.currentAnimation = this.animation;
        this.animation.refresh();
    }

    update(dt) {
        // upadte animation and player
        this.player.currentAnimation.update(dt);
        this.player.move(this.direction);

        // Only handle input for player (not enemy)
        if (!this.player.isEnemy) {
            const movingRight =
                this.direction > 0 &&
                (input.isKeyHeld("D") || input.isKeyHeld("ARROWRIGHT"));
            const movingLeft =
                this.direction < 0 &&
                (input.isKeyHeld("A") || input.isKeyHeld("ARROWLEFT"));

            if (!movingRight && !movingLeft) {
                this.player.stateMachine.change(PlayerStateName.Idle);
            }

            if (input.isKeyPressed("J")) {
                this.player.stateMachine.change(PlayerStateName.Punching);
            } else if (input.isKeyPressed("K")) {
                this.player.stateMachine.change(PlayerStateName.Kicking);
            } else if (
                input.isKeyPressed("W") ||
                input.isKeyPressed("ARROWUP")
            ) {
                this.player.stateMachine.change(PlayerStateName.Jumping);
            }
        }
    }

    exit() {
        this.player.stop();
    }
}

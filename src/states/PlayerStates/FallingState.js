import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import PlayerStateName from "../../enums/PlayerStateName.js";
import { input, matter } from "../../globals.js";

export default class FallingState extends State {
    constructor(player) {
        super();
        this.player = player;
        this.animation = new Animation([100, 101], 0.1);
    }

    enter() {
        this.player.currentAnimation = this.animation;
        this.animation.refresh();
    }

    update(dt) {
        this.player.currentAnimation.update(dt);

        // Check if landing ocured
        if (Math.abs(this.player.position.y - this.player.groundY) < 5) {
            this.player.stateMachine.change(PlayerStateName.Idle);
        }

        // Allow player to control the character i the air
        if (!this.player.isEnemy) {
            if (input.isKeyHeld("D") || input.isKeyHeld("ARROWRIGHT")) {
                this.player.move(1);
            } else if (input.isKeyHeld("A") || input.isKeyHeld("ARROWLEFT")) {
                this.player.move(-1);
            } else {
                matter.Body.setVelocity(this.player.body, {
                    x: 0,
                    y: this.player.body.velocity.y,
                });
            }
        }
    }
}

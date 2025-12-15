import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import PlayerStateName from "../../enums/PlayerStateName.js";
import MusicName from "../../enums/MusicName.js";
import { sounds } from "../../globals.js";

export default class KickState extends State {
    constructor(player) {
        super();
        this.player = player;
        this.animation = new Animation([64, 65, 66, 67, 68, 69, 70], 0.06, 1);
        this.hitboxActivated = false;
    }

    enter() {
        this.player.currentAnimation = this.animation;
        this.animation.refresh();
        this.player.stop();
        this.hitboxActivated = false;

        sounds.play(MusicName.M_kick);
    }

    update(dt) {
        this.player.currentAnimation.update(dt);

        const currentFrame = this.player.currentAnimation.currentFrame;
        if (currentFrame >= 3 && currentFrame <= 5 && !this.hitboxActivated) {
            this.player.startAttack(15); // damage set ot 15
            this.hitboxActivated = true;
        } else if (currentFrame < 3 || currentFrame > 5) {
            this.player.endAttack();
        }

        if (this.animation.isDone()) {
            this.player.stateMachine.change(PlayerStateName.Idle);
        }
    }

    exit() {
        this.player.endAttack();
    }
}

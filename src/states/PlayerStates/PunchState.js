import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import PlayerStateName from "../../enums/PlayerStateName.js";
import MusicName from "../../enums/MusicName.js";
import { sounds } from "../../globals.js";

export default class PunchState extends State {
    constructor(player) {
        super();
        this.player = player;

        this.animation = new Animation([69, 79, 89], 0.6);
        this.hitboxActivated = false;
    }

    enter() {
        this.player.currentAnimation = this.animation;
        this.animation.refresh();
        this.player.stop();
        this.hitboxActivated = false;

        sounds.play(MusicName.M_Punch);
    }

    update(dt) {
        this.player.currentAnimation.update(dt);

        const currentFrame = this.player.currentAnimation.currentFrame;
        if (
            (currentFrame === 2 || currentFrame === 3) &&
            !this.hitboxActivated
        ) {
            this.player.startAttack(10); // 10 damage
            this.hitboxActivated = true;
        } else if (currentFrame < 2 && currentFrame !== 3) {
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

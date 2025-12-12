import State from "../../../lib/State.js";
import { input, keys } from "../../globals.js";

export default class HitStunState extends State {
    constructor(fighter) {
        super();
        this.fighter = fighter;
    }

    enter(params) {
        this.fighter.setPose("hit_stun");
        this.fighter.currentFrame = 0;
        this.stunDuration = 15;

        const damage = params?.damage || 10;
        this.fighter.takeDamage(damage);

        const knockback = params?.knockback || -20;
        this.fighter.position.x += knockback * this.fighter.facing;
    }

    update(dt) {
        this.fighter.currentFrame++;

        if (this.fighter.currentFrame >= this.stunDuration) {
            if (this.fighter.isAlive) {
                this.fighter.stateMachine.change("idle");
            }
        }
    }
}

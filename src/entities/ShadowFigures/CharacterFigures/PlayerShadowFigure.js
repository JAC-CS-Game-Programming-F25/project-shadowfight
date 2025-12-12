import BlockState from "../../../states/PlayerStates/BlockState.js";
import IdleState from "../../../states/PlayerStates/IdleState.js";
import KickState from "../../../states/PlayerStates/KickState.js";
import PunchState from "../../../states/PlayerStates/PunchState.js";
import HitStunState from "../../../states/PlayerStates/StunState.js";
import WalkState from "../../../states/PlayerStates/WalkState.js";
import ShadowFigure from "../ShadowFigure.js";

export default class PlayerShadowFigure extends ShadowFigure {
    constructor(x, y) {
        super(x, y);

        // Player-specific properties
        this.moveSpeed = 150;
        this.attackDamage = 10;
    }

    /**
     * Initialize state machine with player states
     */
    initializeStateMachine() {
        this.stateMachine.add("idle", new IdleState(this));
        this.stateMachine.add("walk", new WalkState(this));
        this.stateMachine.add("punch", new PunchState(this));
        this.stateMachine.add("kick", new KickState(this));
        this.stateMachine.add("block", new BlockState(this));
        this.stateMachine.add("hit_stun", new HitStunState(this));

        this.stateMachine.change("idle");
    }
}

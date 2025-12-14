import State from "../../../lib/State.js";
import MusicName from "../../enums/MusicName.js";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    context,
    sounds,
    stateMachine,
    timer,
} from "../../globals.js";

/**
 * An "intermediary" state whose sole job is to play a fade out/in animation.
 */
export default class TransitionState extends State {
    constructor() {
        super();

        // Used to animate the full-screen transition rectangle.
        this.transitionParameters = { alpha: 0 };
        this.currentState = null;
    }

    enter(parameters = {}) {
        this.fromState = parameters.fromState;
        this.toState = parameters.toState;
        this.toStateEnterParameters = parameters.toStateEnterParameters;
        this.currentState = this.fromState;
        console.log("Entered transition state");
        this.transitionParameters = { alpha: 0 };
        sounds.play(parameters.transitionMusic); // play the transition music to the map (later we can pass this a one of the parameters maybe?)
        this.fadeOut();
    }

    update(dt) {
        timer.update(dt);
    }

    render() {
        this.currentState.render();
        context.fillStyle = `rgb(0, 0, 0, ${this.transitionParameters.alpha})`;
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    /**
     * Tween the transition rectangle's alpha to 1, then begin to
     * fade in the next state.
     */
    async fadeOut() {
        await timer.tweenAsync(this.transitionParameters, { alpha: 1 }, 3.5);

        this.currentState = this.toState;
        this.currentState.enter(this.toStateEnterParameters);
        this.fadeIn();
    }

    /**
     * Tween the transition rectangle's alpha to 0, then set the
     * current state to the new state in the state machine.
     */
    async fadeIn() {
        await timer.tweenAsync(this.transitionParameters, { alpha: 0 }, 3.5);
        stateMachine.currentState = this.currentState;
    }
}

import Sounds from "../../../lib/Sounds.js";
import State from "../../../lib/State.js";
import ImageName from "../../enums/ImageName.js";
import BattleName from "../../enums/BattleName.js";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    context,
    images,
    sounds,
    stateMachine,
    timer,
} from "../../globals.js";

/**
 * An "intermediary" state whose sole job is to play a fade out/in animation
 * and show the VS screen with character matchup.
 */
export default class TransitionState extends State {
    constructor() {
        super();
        this.transitionParameters = { alpha: 0 };
        this.currentState = null;
        this.opponentIcon = null;
    }

    enter(parameters = {}) {
        this.fromState = parameters.fromState;
        this.toState = parameters.toState;
        this.toStateEnterParameters = parameters.toStateEnterParameters;
        this.currentState = this.fromState;
        this.transitionParameters = { alpha: 0 };

        console.log(this.toState);

        switch (this.toState.name) {
            case BattleName.Boss:
                this.opponentIcon = ImageName.Lynx;
                break;
            case BattleName.Survival:
                this.opponentIcon = ImageName.Ninja;
                break;
            case BattleName.Practice:
                this.opponentIcon = ImageName.Sensei;
                break;
            default:
                this.opponentIcon = ImageName.Ninja;
                break;
        }

        sounds.play(parameters.transitionMusic);
        this.fadeOut();
    }

    update(dt) {
        timer.update(dt);
    }

    render() {
        // Render the background
        images.render(
            ImageName.BattleTransitionBackground,
            0,
            0,
            CANVAS_WIDTH,
            CANVAS_HEIGHT
        );

        // Calculate positions for centered icons
        const iconSize = 200;
        const vsSize = 200;
        const spacing = 40;

        // Center Y position
        const centerY = CANVAS_HEIGHT / 2 - iconSize / 2;

        // Shadow icon on the left
        const shadowX = CANVAS_WIDTH / 2 - vsSize / 2 - spacing - iconSize;
        images.render(
            ImageName.ShadowIcon,
            shadowX,
            centerY,
            iconSize,
            iconSize
        );

        // VS in the middle
        const vsX = CANVAS_WIDTH / 2 - vsSize / 2;
        const vsY = CANVAS_HEIGHT / 2 - vsSize / 2;
        images.render(ImageName.VS, vsX, vsY, vsSize, vsSize);

        // Opponent icon on the right
        const opponentX = CANVAS_WIDTH / 2 + vsSize / 2 + spacing;
        images.render(
            this.opponentIcon,
            opponentX,
            centerY,
            iconSize,
            iconSize
        );
    }

    /**
     * Tween the transition rectangle's alpha to 1, then begin to
     * fade in the next state.
     */
    async fadeOut() {
        await timer.tweenAsync(this.transitionParameters, { alpha: 1 }, 1.5);

        this.currentState = this.toState;
        this.currentState.enter(this.toStateEnterParameters);
        this.fadeIn();
    }

    /**
     * Tween the transition rectangle's alpha to 0, then set the
     * current state to the new state in the state machine.
     */
    async fadeIn() {
        await timer.tweenAsync(this.transitionParameters, { alpha: 0 }, 1.5);
        stateMachine.currentState = this.currentState;
    }
}

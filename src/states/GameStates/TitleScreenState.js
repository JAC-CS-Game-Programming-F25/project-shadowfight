import State from "../../../lib/State.js";
import ImageName from "../../enums/ImageName.js";
import MusicName from "../../enums/MusicName.js";
import GameStateName from "../../enums/GameStateName.js";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    context,
    images,
    input,
    sounds,
    stateMachine,
    timer,
} from "../../globals.js";
import Input from "../../../lib/Input.js";

export default class TitleScreenState extends State {
    constructor() {
        super();
        this.fighter;
        this.context = context;
    }

    enter(parameters = {}) {
        sounds.play(MusicName.Dojo);
    }

    exit() {
        sounds.stop(MusicName.Dojo);
    }

    update(dt) {
        timer.update(dt);

        if (input.isKeyPressed(Input.KEYS.ENTER)) {
            console.log("Changing to the transition State ");
            stateMachine.change(GameStateName.Transition, {
                fromState: this,
                toState: stateMachine.states[GameStateName.HeroRebornMap],
            });
        }
    }
    render() {
        images.render(ImageName.Dojo, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Render ground object
        if (this.ground) {
            this.ground.render();
        }

        // Draw controls reminder
        this.context.fillStyle = "white";
        this.context.font = "20px times new roman";
        this.context.fillText(
            "Controls: A/D - Move | J - Punch | K - Kick | L - Block",
            50,
            30
        );
    }
}

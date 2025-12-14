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
    matter,
} from "../../globals.js";
import Input from "../../../lib/Input.js";
import Ground from "../../entities/Ground.js";
import PlayerShadowFigure from "../../entities/ShadowFigures/CharacterFigures/PlayerShadowFigure.js";

export default class TitleScreenState extends State {
    constructor() {
        super();
        this.context = context;
        this.player = null;
        this.ground = null;
        this.leftWall = null;
        this.rightWall = null;
    }

    enter(parameters = {}) {
        sounds.play(MusicName.Dojo);
        this.engine = matter.Engine.create({
            gravity: { x: 0, y: 1 },
        });

        // Create ground object at bottom of screen
        this.ground = new Ground(
            CANVAS_WIDTH / 2, // x position (center)
            640, // y position (where floor starts)
            CANVAS_WIDTH, // width
            80, // height
            this.engine
        );
    }

    exit() {
        sounds.stop(MusicName.Dojo);
        console.log("Music stoped in title screen state");
    }

    update(dt) {
        timer.update(dt);

        if (input.isKeyPressed(Input.KEYS.ENTER)) {
            console.log("Changing to the transition State ");
            stateMachine.change(GameStateName.Transition, {
                fromState: this,
                toState: stateMachine.states[GameStateName.HeroRebornMap],
                transitionMusic: MusicName.Transition,
            });

            // debug statement
            console.log("Not exited");
        }
    }
    render() {
        images.render(ImageName.Dojo, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Render ground object
        if (this.ground) {
            this.ground.render();
        }

        // Draw controls
        this.context.fillStyle = "white";
        this.context.font = "20px times new roman";
        this.context.fillText(
            "Controls: A/D - Move | J - Punch | K - Kick | L - Block",
            50,
            30
        );
    }
}

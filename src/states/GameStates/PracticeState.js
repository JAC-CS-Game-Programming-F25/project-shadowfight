import State from "../../../lib/State.js";
import ImageName from "../../enums/ImageName.js";
import MusicName from "../../enums/MusicName.js";
import GameStateName from "../../enums/GameStateName.js";
import {
    input,
    sounds,
    stateMachine,
    matter,
    engine,
    world,
} from "../../globals.js";
import Input from "../../../lib/Input.js";
import Level from "../../objects/Level.js";
import BattleName from "../../enums/BattleName.js";

const { Composite, Engine } = matter;

export default class PracticeState extends State {
    constructor() {
        super();
    }

    enter() {
        console.log(sounds.sounds);
        sounds.play(MusicName.Dojo);
        this.level = new Level(BattleName.Practice, ImageName.Dojo);
    }

    exit() {
        Composite.allBodies(world).forEach((body) =>
            Composite.remove(world, body)
        );
    }

    update(dt) {
        Engine.update(engine);
        this.level.update(dt);
        this.checkWinOrLose();

        // listen for key presses for survival mode and for boss fight
        if (input.isKeyPressed(Input.KEYS.S)) {
            sounds.stop(MusicName.Dojo);
            stateMachine.change(GameStateName.Transition, {
                fromState: this,
                toState: stateMachine.states[GameStateName.Survival],
                transitionMusic: MusicName.Transition,
            });
        } else if (input.isKeyPressed(Input.KEYS.B)) {
            sounds.stop(MusicName.Dojo);
            stateMachine.change(GameStateName.Transition, {
                fromState: this,
                toState: stateMachine.states[GameStateName.BossFight],
                transitionMusic: MusicName.Transition,
            });
        }
    }

    render() {
        this.level.render();
    }

    checkWinOrLose() {
        if (this.level.didWin()) {
            stateMachine.change(GameStateName.Victory, {
                background: this.level.background,
                level: this.level.number,
            });
        } else if (this.level.didLose()) {
            stateMachine.change(GameStateName.GameOver, {
                background: this.level.background,
            });
        }
    }
}

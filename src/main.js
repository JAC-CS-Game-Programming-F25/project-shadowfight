/**
 * Shadow Fight 2
 *
 * Nekki
 *
 * a fighting game involving a fight being turned into a shadow figure
 * that fights other shadow figures with the goal of reclaiming his human state.
 *
 * Asset sources
 */

import GameStateName from "./enums/GameStateName.js";
import Game from "../lib/Game.js";
import {
    canvas,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    context,
    fonts,
    images,
    timer,
    sounds,
    stateMachine,
} from "./globals.js";

// import PlayState from "./states/GameStates/PlayState.js";
import GameOverState from "./states/GameStates/GameOverState.js";
import VictoryState from "./states/GameStates/VictoryState.js";
import PracticeState from "./states/GameStates/PracticeState.js";
import SurvivalState from "./states/GameStates/SurvivalState.js";
import TransitionState from "./states/GameStates/TransitionState.js";
import BattleState from "./states/BattleStates/BattleState.js";
import BossFightState from "./states/GameStates/BossFightState.js";

// Set the dimensions of the play area.
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute("tabindex", "1"); // Allows the canvas to receive user input.

// Now that the canvas element has been prepared, we can add it to the DOM.
document.body.appendChild(canvas);

// Fetch the asset definitions from config.json.
const {
    images: imageDefinitions,
    fonts: fontDefinitions,
    sounds: soundDefinitions,
} = await fetch("./src/config.json").then((response) => response.json());

// Load all the assets from their definitions.
images.load(imageDefinitions);
fonts.load(fontDefinitions);
sounds.load(soundDefinitions);

// Add all the states to the state machine.
stateMachine.add(GameStateName.Practice, new PracticeState());
stateMachine.add(GameStateName.Transition, new TransitionState());
stateMachine.add(GameStateName.Survival, new SurvivalState());
stateMachine.add(GameStateName.GameOver, new GameOverState());
stateMachine.add(GameStateName.Victory, new VictoryState());
stateMachine.add(GameStateName.Play, new BattleState());
stateMachine.add(GameStateName.BossFight, new BossFightState());

stateMachine.change(GameStateName.Practice); // start in the practice state

const game = new Game(
    stateMachine,
    context,
    timer,
    canvas.width,
    canvas.height
);

game.start();

// Focus the canvas so that the player doesn't have to click on it.
canvas.focus();

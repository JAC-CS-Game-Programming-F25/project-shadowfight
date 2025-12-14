import State from "../../../lib/State.js";
import PlayerShadowFigure from "../../entities/ShadowFigures/CharacterFigures/PlayerShadowFigure.js";
import MusicName from "../../enums/MusicName.js";
import ImageName from "../../enums/ImageName.js";
import { context, sounds, images } from "../../globals.js";

export default class HeroRebornState extends State {
    constructor() {
        super();
        this.context = context;
        this.backgroundImage = images.get(ImageName.HeroRebornMap);
    }

    enter(parameters = {}) {}

    update(dt) {
        this.player.update(dt);
    }

    render() {
        // Draw a simple floor line
        this.context.fillStyle = "#333333";
        this.context.fillRect(0, 640, this.context.canvas.width, 80);

        // Render the player
        this.player.render(this.context);

        // Draw controls
        this.context.fillStyle = "white";
        this.context.font = "20px Arial";
        this.context.fillText(
            "Controls: A/D - Move | J - Punch | K - Kick | L - Block",
            50,
            30
        );
    }
}

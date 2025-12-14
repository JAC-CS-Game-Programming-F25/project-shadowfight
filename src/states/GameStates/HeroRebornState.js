import State from "../../../lib/State.js";
import PlayerShadowFigure from "../../entities/ShadowFigures/CharacterFigures/PlayerShadowFigure.js";
import MusicName from "../../enums/MusicName.js";
import ImageName from "../../enums/ImageName.js";
import { context, sounds, images } from "../../globals.js";

export default class HeroRebornState extends State {
    constructor() {
        super();
        this.context = context;
        // get the battles
        this.battles = [];
        this.selectedBattle = this.backgroundImage = images.get(
            ImageName.HeroRebornMap
        );
    }

    enter() {
        sounds.play(MusicName.Dojo);
    }

    update(dt) {
        this.player.update(dt);
    }

    render() {
        // Draw a simple floor line
        this.context.fillStyle = "#333333";
        this.context.fillRect(0, 640, this.context.canvas.width, 80);

        // Render the player
        this.player.render(this.context);

        // Draw health bar
        this.renderHealthBar(this.player, 50, 50);

        // Draw controls reminder
        this.context.fillStyle = "white";
        this.context.font = "20px Arial";
        this.context.fillText(
            "Controls: A/D - Move | J - Punch | K - Kick | L - Block",
            50,
            30
        );
    }

    renderHealthBar(fighter, x, y) {
        const barWidth = 200;
        const barHeight = 20;

        // Background
        this.context.fillStyle = "#333";
        this.context.fillRect(x, y, barWidth, barHeight);

        // Health
        const healthPercent = fighter.health / fighter.maxHealth;
        this.context.fillStyle = healthPercent > 0.5 ? "#00ff00" : "#ff0000";
        this.context.fillRect(x, y, barWidth * healthPercent, barHeight);

        // Border
        this.context.strokeStyle = "white";
        this.context.strokeRect(x, y, barWidth, barHeight);

        // Text
        this.context.fillStyle = "white";
        this.context.font = "14px Arial";
        this.context.fillText(
            `${fighter.health}/${fighter.maxHealth}`,
            x + 5,
            y + 15
        );
    }
}

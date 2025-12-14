import Background from "./Background.js";
import Ground from "../entities/Ground.js";
import { context, DEBUG, matter, world } from "../globals.js";
import PlayerShadowFigure from "../entities/ShadowFigures/CharacterFigures/PlayerShadowFigure.js";
export default class Level {
    /**
     *
     * @param {number} number: the level number
     * @param {PlayerShadowFigure} player: the player instance
     * @param {EnemyShadowFigure} opponent:The opponenet insatance
     */
    constructor(round, player, opponent) {
        this.round = round;
        this.player = player;
        this.opponent = opponent;
        this.ground = new Ground();
    }

    update(dt) {
        // this.fortress.update(dt);
        // this.slingshot.update(dt);
        // this.birdQueue.update(dt);
    }

    render() {
        this.background.render();
        this.renderStatistics();
        this.birdQueue.render();
        this.slingshot.render();
        this.fortress.render();
        this.ground.render();
    }

    renderStatistics() {
        if (DEBUG) {
            context.fillText(
                `Birds: ${
                    this.birdQueue.birds.length +
                    (this.slingshot.bird === null ? 0 : 1)
                }`,
                50,
                190
            );
            context.fillText(`Blocks: ${this.fortress.blocks.length}`, 50, 280);
            context.fillText(`Pigs: ${this.fortress.pigs.length}`, 50, 370);
            context.fillText(
                `Bodies: ${matter.Composite.allBodies(world).length - 1}`,
                50,
                460
            );
        }
    }

    didWin() {
        return this.fortress.areNoPigsLeft();
    }

    didLose() {
        //
        this.eggs.forEach((egg) => {
            if (egg.isFalling) {
                return false;
            }
        });

        return this.birdQueue.areNoBirdsLeft() && this.slingshot.isEmpty();
    }
}

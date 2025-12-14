import Sprite from "../../lib/Sprite.js";
import BodyType from "../enums/BodyType.js";
import ImageName from "../enums/ImageName.js";
import Rectangle from "./Rectangle.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, images } from "../globals.js";

export default class Wall extends Rectangle {
    static Wall = {
        x: 0,
        y: 0,
        width: 70,
        height: 70,
    };
    static SPRITE_MEASUREMENTS = {
        x: 0,
        y: CANVAS_HEIGHT,
        width: 16,
        height: Ground.Wall.height,
    };

    /**
     * The  is a large Matter static body
     * where everything in the world sits upon.
     */
    constructor(isRightWall = true) {
        super(
            Ground.SPRITE_MEASUREMENTS.x,
            Ground.SPRITE_MEASUREMENTS.y,
            Ground.SPRITE_MEASUREMENTS.width,
            Ground.SPRITE_MEASUREMENTS.height,
            {
                label: BodyType.Ground,
                isStatic: true,
            }
        );

        this.sprites = Ground.generateSprites();
    }

    render() {
        super.render();

        for (let i = 0; i < CANVAS_WIDTH / Ground.Wall.width; i++) {
            this.sprites[0].render(
                i * Ground.Wall.width,
                CANVAS_HEIGHT - Ground.Wall.height
            );
        }
    }

    static generateSprites() {
        return [
            new Sprite(
                images.get(ImageName.Dojo),
                Ground.Wall.x,
                Ground.Wall.y,
                Ground.Wall.width,
                Ground.Wall.height
            ),
        ];
    }
}

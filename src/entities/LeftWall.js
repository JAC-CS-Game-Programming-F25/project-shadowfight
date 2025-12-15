import Sprite from "../../lib/Sprite.js";
import BodyType from "../enums/BodyType.js";
import ImageName from "../enums/ImageName.js";
import Rectangle from "./Rectangle.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, images } from "../globals.js";

export default class LeftWall extends Rectangle {
    static WALL = {
        x: 0, //(CANVAS_WIDTH - 200),
        y: 0,
        width: 200,
        height: 300,
    };

    static SPRITE_MEASUREMENTS = {
        x: 0,
        y: 0,
        width: 32,
        height: CANVAS_HEIGHT,
    };

    constructor() {
        super(
            LeftWall.SPRITE_MEASUREMENTS.x,
            LeftWall.SPRITE_MEASUREMENTS.y,
            LeftWall.SPRITE_MEASUREMENTS.width,
            LeftWall.SPRITE_MEASUREMENTS.height,
            {
                label: BodyType.Wall,
                isStatic: true,
            }
        );

        this.sprites = LeftWall.generateSprites();
    }

    render() {
        super.render();

        for (let i = 0; i < CANVAS_HEIGHT / LeftWall.WALL.height; i++) {
            this.sprites[0].render(0, i * LeftWall.WALL.height);
        }
    }

    static generateSprites() {
        return [
            new Sprite(
                images.get(ImageName.ForestLeftWall),
                LeftWall.WALL.x,
                LeftWall.WALL.y,
                LeftWall.WALL.width,
                LeftWall.WALL.height
            ),
        ];
    }
}

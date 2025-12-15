import Sprite from "../../lib/Sprite.js";
import BodyType from "../enums/BodyType.js";
import ImageName from "../enums/ImageName.js";
import Rectangle from "./Rectangle.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, images } from "../globals.js";

export default class RightWall extends Rectangle {
    static WALL = {
        x: 0,
        y: 0,
        width: 200,
        height: 300,
    };

    static SPRITE_MEASUREMENTS = {
        x: CANVAS_WIDTH - 32,
        y: 0,
        width: 32,
        height: CANVAS_HEIGHT,
    };

    constructor() {
        super(
            RightWall.SPRITE_MEASUREMENTS.x,
            RightWall.SPRITE_MEASUREMENTS.y,
            RightWall.SPRITE_MEASUREMENTS.width,
            RightWall.SPRITE_MEASUREMENTS.height,
            {
                label: BodyType.Wall,
                isStatic: true,
            }
        );

        this.sprites = RightWall.generateSprites();
    }

    render() {
        super.render();

        for (let i = 0; i < CANVAS_HEIGHT / RightWall.WALL.height; i++) {
            this.sprites[0].render(
                CANVAS_WIDTH - RightWall.WALL.width,
                i * RightWall.WALL.height
            );
        }
    }

    static generateSprites() {
        return [
            new Sprite(
                images.get(ImageName.ForestRightWall),
                RightWall.WALL.x,
                RightWall.WALL.y,
                RightWall.WALL.width,
                RightWall.WALL.height
            ),
        ];
    }
}

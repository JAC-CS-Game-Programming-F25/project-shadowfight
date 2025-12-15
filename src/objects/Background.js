import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, images } from "../globals.js";

export default class Background {
    /**
     * Randomly generates a background from 2 sprites
     * dynamically based on the width of the canvas.
     */
    constructor(image) {
        this.backgroundImage = image;
    }

    render() {
        images.render(this.backgroundImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

import UserInterfaceElement from "../objects/UserInterfaceElement.js";
import Colour from "../enums/Colour.js";
import { context } from "../globals.js";
import { roundedRectangle } from "../../lib/Drawing.js";
import { timer } from "../globals.js";

export default class ProgressBar extends UserInterfaceElement {
    static BAR_HEIGHT = 12;
    static BORDER_WIDTH = 3;
    static CORNER_RADIUS = 7;
    static HEALTH_HIGH_THRESHOLD = 0.5;
    static HEALTH_LOW_THRESHOLD = 0.25;
    static TWEEN_DURATION = 0.5;
    /**
     * A UI element that displays a progress bar with color transitions.
     * Used for health and experience bars in Pokémon battles.
     *
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} currentValue
     * @param {number} maxValue
     * @param {boolean} isHealthBar: determines if its a health bar or an experience bar
     */
    constructor(x, y, width, height, currentValue, maxValue, isHealthBar) {
        super(x, y, width, height);

        this.currentValue = currentValue;
        this.displayValue = currentValue;
        this.maxValue = maxValue;
        this.isHealthBar = isHealthBar;
        this.barHeight = this.isHealthBar ? ProgressBar.BAR_HEIGHT : 10;
        this.cornerRadius = ProgressBar.CORNER_RADIUS;

        // color
        this.backgroundColor = Colour.White;
        this.borderColour = Colour.Black;
        this.fillColour = this.isHealthBar ? Colour.Green : Colour.Blue;

        this.tweenTimer = timer;
    }

    /**
     * Updates the current value of the progress bar.
     * This should be called when tweening values.
     *
     * @param {number} value
     */
    setValue(value) {
        // get the new value
        const newValue = Math.max(0, Math.min(value, this.maxValue));

        // Only tween if the value actually changed values
        if (newValue !== this.currentValue) {
            this.currentValue = newValue;

            //tween
            this.tweenTimer.tween(
                this,
                { displayValue: newValue },
                ProgressBar.TWEEN_DURATION
            );
        }

        //this.currentValue = Math.max(0, Math.min(value, this.maxValue));
    }

    /**
     * Gets the current value as a percentage (0 to 1).
     *
     * @returns {number}
     */
    getPercentage() {
        return this.maxValue > 0 ? this.displayValue / this.maxValue : 0;
    }

    /**
     * Determines the color of the health bar based on current health percentage.
     *
     * @returns {string} The color for the bar
     */
    getHealthBarColour() {
        const percentage = this.getPercentage();
        if (percentage > ProgressBar.HEALTH_HIGH_THRESHOLD) {
            return Colour.Green;
        } else if (percentage > ProgressBar.HEALTH_LOW_THRESHOLD) {
            return Colour.Yellow;
        } else {
            return Colour.Red;
        }
    }

    render() {
        context.save();
        this.renderBackground();
        this.renderFill();
        context.restore();
    }

    renderBackground() {
        context.beginPath();
        context.fillStyle = this.borderColour;
        roundedRectangle(
            context,
            this.position.x,
            this.position.y,
            this.dimensions.x,
            this.barHeight,
            this.cornerRadius,
            true,
            false
        );
        context.beginPath();
        context.fillStyle = this.backgroundColor;
        roundedRectangle(
            context,
            this.position.x + ProgressBar.BORDER_WIDTH,
            this.position.y + ProgressBar.BORDER_WIDTH,
            this.dimensions.x - ProgressBar.BORDER_WIDTH * 2,
            this.barHeight - ProgressBar.BORDER_WIDTH * 2,
            this.cornerRadius - 2,
            true,
            false
        );
    }

    renderFill() {
        const percentage = this.getPercentage();
        const innerWidth = this.dimensions.x - ProgressBar.BORDER_WIDTH * 2;
        const fillWidth = innerWidth * percentage;

        // Only render if there's something to show
        if (fillWidth <= 0) {
            return;
        }

        // if its a health bar get the right color
        const fillColour = this.isHealthBar
            ? this.getHealthBarColour()
            : this.fillColour;

        context.beginPath();
        context.fillStyle = fillColour;

        roundedRectangle(
            context,
            this.position.x + ProgressBar.BORDER_WIDTH,
            this.position.y + ProgressBar.BORDER_WIDTH,
            fillWidth,
            this.barHeight - ProgressBar.BORDER_WIDTH * 2,
            this.cornerRadius - 2,
            true,
            false
        );
    }
}

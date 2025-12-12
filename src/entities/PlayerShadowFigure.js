const AttackType = {
    None: "none",
    Punch: "punch",
    Kick: "kick",
};

class PlayerShadowFigure {
    constructor(x, y) {
        this.x = x;
        this.x = y;
        this.state = "idle";
        this.equipment = null;
        this.facing = 1; // 1 = right, -1 = left
        this.animationFrame = 0;
        this.animations = []; // will store all the possible animations once the whole equipement has been chose (might be passed in later too)
    }

    /**
     * Method that will attribute a weapon to the
     * @param {} weapon: the weapon object.
     */
    equipWeapon(weapon) {
        //
    }

    equipArmor(armor) {
        // this is what is called to change the armor of the shadow fighter
    }

    /**
     *
     * @param {AttackType} type : the attack type
     * @param {number} facing : the direction the player was facing when the move was made
     * @param {combination}:
     */
    attack(type, facing) {
        switch (type) {
            case AttackType.None:
                // this is the case where the player is idle and is "breathing"
                // the motion slightly extending and retracting the player vertically.

                break;
            case AttackType.Punch:
                // this is the case where the player is idle and is "breathing"
                // the motion slightly extending and retracting the player vertically.

                break;
            case AttackType.Kick:
                // this is the case where the player is kicking

                break;

            default:
                break;
        }
    }

    draw(ctx) {
        // Draw body parts
        this.drawBody(ctx);
        // Draw equipment on top
        if (this.equipment) {
            this.equipment.draw(ctx, this);
        }
    }
}

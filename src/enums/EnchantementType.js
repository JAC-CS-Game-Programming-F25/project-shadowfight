/**
 * Enchantment types from the sprite sheet
 * Based on the enchantments image provided
 */
const EnchantmentType = {
    // Row 1 (frames 0-7)
    Fire: { frame: 0, damage: 15, probability: 0.15, name: "Fire" },
    Ice: { frame: 1, damage: 12, probability: 0.15, name: "Ice" },
    Lightning: { frame: 2, damage: 18, probability: 0.1, name: "Lightning" },
    Poison: { frame: 3, damage: 10, probability: 0.2, name: "Poison" },
    Wind: { frame: 4, damage: 8, probability: 0.2, name: "Wind" },
    Earth: { frame: 5, damage: 14, probability: 0.12, name: "Earth" },
    Light: { frame: 6, damage: 20, probability: 0.05, name: "Light" },
    Dark: { frame: 7, damage: 20, probability: 0.03, name: "Dark" },
};

/**
 * Get a random enchantment based on probability weights
 */
EnchantmentType.getRandom = function () {
    const random = Math.random();
    let cumulative = 0;

    for (const key in EnchantmentType) {
        if (EnchantmentType[key].probability) {
            cumulative += EnchantmentType[key].probability;
            if (random <= cumulative) {
                return EnchantmentType[key];
            }
        }
    }

    // Fallback to Fire if something goes wrong
    return EnchantmentType.Fire;
};

export default EnchantmentType;

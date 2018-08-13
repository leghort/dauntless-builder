export default class TierUtility {
    static getTierName(tier) {
        switch(Number(tier)) {
            case 1: return "Tier 1 - The Sheltered Frontier";
            case 2: return "Tier 2 - The Monstrous Verge";
            case 3: return "Tier 3 - The Yonder Keys";
            case 4: return "Tier 4 - The Uncharted Reaches";
            case 5: return "Tier 5 - The Maelstrom";
        }

        return `Tier ??? - ${tier} is not a valid tier.`;
    }
}
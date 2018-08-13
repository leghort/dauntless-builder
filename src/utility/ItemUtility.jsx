import DataUtility from "./DataUtility";

export default class ItemUtility {
    static maxLevel(collection, itemName) {
        if(!itemName || !(collection in DataUtility.data())) {
            return 0;
        }

        let levelKey = null;

        switch(collection) {
            case "weapons": levelKey = "power"; break;
            case "armours": levelKey = "resistance"; break;
        }

        if(!levelKey) {
            return 0;
        }

        return Math.max(...Object.keys(DataUtility.data()[collection][itemName][levelKey]).map(k => Number(k)));
    }
}
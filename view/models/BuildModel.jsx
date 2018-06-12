import Hashids from "hashids";
import DataUtil from "../utils/DataUtil";

const hashids = new Hashids("spicy");

export default class BuildModel {
    constructor(data) {
        for(let key of Object.keys(data)) {
            this[key] = data[key];
        }
    }

    serialize() {
        return DataUtil.stringMap(this.__version).then(stringMap => {
            return hashids.encode(
                this.__version,
                DataUtil.getKeyByValue(stringMap, this.weapon_name),
                this.weapon_level,
                DataUtil.getKeyByValue(stringMap, this.weapon_cell0),
                DataUtil.getKeyByValue(stringMap, this.weapon_cell1),
                DataUtil.getKeyByValue(stringMap, this.head_name),
                this.head_level,
                DataUtil.getKeyByValue(stringMap, this.head_cell),
                DataUtil.getKeyByValue(stringMap, this.chest_name),
                this.chest_level,
                DataUtil.getKeyByValue(stringMap, this.chest_cell),
                DataUtil.getKeyByValue(stringMap, this.gloves_name),
                this.gloves_level,
                DataUtil.getKeyByValue(stringMap, this.gloves_cell),
                DataUtil.getKeyByValue(stringMap, this.legs_name),
                this.legs_level,
                DataUtil.getKeyByValue(stringMap, this.legs_cell),
                DataUtil.getKeyByValue(stringMap, this.lantern_name),
                DataUtil.getKeyByValue(stringMap, this.lantern_cell),
            );
        });
    }

    static deserialize(str) {
        let numbers = hashids.decode(str);

        return DataUtil.stringMap(numbers[0]).then(stringMap => {
            return new BuildModel({
                __version: numbers[0],
                weapon_name: stringMap[numbers[1]],
                weapon_level: numbers[2],
                weapon_cell0: stringMap[numbers[3]],
                weapon_cell1: stringMap[numbers[4]],
                chest_name: stringMap[numbers[5]],
                chest_level: numbers[6],
                chest_cell: stringMap[numbers[7]],
                gloves_name: stringMap[numbers[8]],
                gloves_level: numbers[9],
                gloves_cell: stringMap[numbers[10]],
                legs_name: stringMap[numbers[11]],
                legs_level: numbers[12],
                legs_cell: stringMap[numbers[13]],
                head_name: stringMap[numbers[14]],
                head_level: numbers[15],
                head_cell: stringMap[numbers[16]],
                lantern_name: stringMap[numbers[17]],
                lantern_cell: stringMap[numbers[18]]
            });
        });
    }

    static tryDeserialize(str) {
        if(BuildModel.isValid(str)) {
            return BuildModel.deserialize(str);
        }

        return Promise.resolve(BuildModel.empty());
    }

    static empty() {
        return new BuildModel({
            __version: 1,
            weapon_name: "",
            weapon_level: 0,
            weapon_cell0: "",
            weapon_cell1: "",
            chest_name: "",
            chest_level: 0,
            chest_cell: "",
            gloves_name: "",
            gloves_level: 0,
            gloves_cell: "",
            legs_name: "",
            legs_level: 0,
            legs_cell: "",
            head_name: "",
            head_level: 0,
            head_cell: "",
            lantern_name: "",
            lantern_cell: "",
        });
    }

    static isValid(str) {
        return hashids.decode(str).length === 19;
    }
}
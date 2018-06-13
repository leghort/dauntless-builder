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
                DataUtil.getKeyByValue(stringMap, this.torso_name),
                this.torso_level,
                DataUtil.getKeyByValue(stringMap, this.torso_cell),
                DataUtil.getKeyByValue(stringMap, this.arms_name),
                this.arms_level,
                DataUtil.getKeyByValue(stringMap, this.arms_cell),
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
            let idcounter = 0;
            return new BuildModel({
                __version: numbers[idcounter++],
                weapon_name: stringMap[numbers[idcounter++]],
                weapon_level: numbers[idcounter++],
                weapon_cell0: stringMap[numbers[idcounter++]],
                weapon_cell1: stringMap[numbers[idcounter++]],
                head_name: stringMap[numbers[idcounter++]],
                head_level: numbers[idcounter++],
                head_cell: stringMap[numbers[idcounter++]],
                torso_name: stringMap[numbers[idcounter++]],
                torso_level: numbers[idcounter++],
                torso_cell: stringMap[numbers[idcounter++]],
                arms_name: stringMap[numbers[idcounter++]],
                arms_level: numbers[idcounter++],
                arms_cell: stringMap[numbers[idcounter++]],
                legs_name: stringMap[numbers[idcounter++]],
                legs_level: numbers[idcounter++],
                legs_cell: stringMap[numbers[idcounter++]],
                lantern_name: stringMap[numbers[idcounter++]],
                lantern_cell: stringMap[numbers[idcounter++]]
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
            torso_name: "",
            torso_level: 0,
            torso_cell: "",
            arms_name: "",
            arms_level: 0,
            arms_cell: "",
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
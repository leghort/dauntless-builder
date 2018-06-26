const assert = require("assert");
const Hashids = require("hashids");

const hashids = new Hashids("spicy");

const stringMap = require("../.map/v1.json");

function makeBuild(buildId) {
    const numbers = hashids.decode(buildId);

    let idcounter = 0;

    return {
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
    };
}

function assertValid(data) {
    for(let [buildId, assertions] of data) {
        let build = makeBuild(buildId);

        for(let assertion of assertions) {
            assert.equal(
                build[assertion.field],
                assertion.value
            );
        }
    }
}

describe("Dauntless Builder - Build IDs", () => {
    it("should be able to deserialize", () => {
        // TODO: add more
        assertValid([
            ["P5CQUXiNTETzTMTvTLTaToTqTwTgTKTmTPTQTJ", [
                {field: "weapon_name", value: "Bloodfire Axe"},
                {field: "weapon_level", value: 10}
            ]],
            // TODO: add more items / build variations etc
        ])
    })
});
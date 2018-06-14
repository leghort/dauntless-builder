const glob = require("glob");
const yaml = require("js-yaml");
const fs = require("fs");
const pathlib = require("path");

let stringVersion = 1;
let stringMap = {};
let stringCounter = 1; // 0 is empty value

if(fs.existsSync(`./dist/map_v${stringVersion}.json`)) {
    let data = fs.readFileSync(`./dist/map_v${stringVersion}.json`)
    stringMap = JSON.parse(data);
}

function tryInsertToStringMap(string) {
    let strings = Object.values(stringMap);

    if(strings.indexOf(string) > -1) {
        return;
    }

    while(true) {
        if(Object.keys(stringMap).indexOf(`${stringCounter}`) == -1) {
            stringMap[stringCounter] = string;
            console.log("Added " + string + " to " + stringCounter);
            break;
        }

        stringCounter++;
    }
}

function build(path) {
    return new Promise((resolve, reject) => {
        glob(path, (err, files) => {
            let data = {};

            for(let file of files) {
                let content = fs.readFileSync(file, "utf8");
                let doc = yaml.safeLoad(content);
                data[doc.name] = doc;

                // it is a cell use variant names instead of name
                if(file.indexOf("/cells/") > -1) {
                    for(let v of Object.keys(doc.variants)) {
                        tryInsertToStringMap(v);
                    }
                } else {
                    tryInsertToStringMap(doc.name);
                }
            }

            resolve(data);
        });
    });
}

Promise.all([
    build("data/armours/*.yml"),
    build("data/behemoths/*.yml"),
    build("data/cells/*/*.yml"),
    build("data/lanterns/*.yml"),
    build("data/perks/*.yml"),
    build("data/weapons/*/*.yml"),
]).then(data => {
    let object = {
        armours: data[0],
        behemoths: data[1],
        cells: data[2],
        lanterns: data[3],
        perks: data[4],
        weapons: data[5],
    }

    fs.writeFileSync("./dist/data.json", JSON.stringify(object));

    console.log("Built data.json");

    fs.writeFileSync(`./dist/map_v${stringVersion}.json`, JSON.stringify(stringMap));

    console.log("Build string map with " + Object.keys(stringMap).length + " entries.");
});
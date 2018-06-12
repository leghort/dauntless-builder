const glob = require("glob");
const yaml = require("js-yaml");
const fs = require("fs");
const pathlib = require("path");

function build(path) {
    return new Promise((resolve, reject) => {
        glob(path, (err, files) => {
            let data = {};

            for(let file of files) {
                let content = fs.readFileSync(file, "utf8");
                let doc = yaml.safeLoad(content);
                data[doc.name] = doc;
            }

            resolve(data);
        });
    });
}

Promise.all([
    build("data/armors/*.yml"),
    build("data/behemoths/*.yml"),
    build("data/cells/*.yml"),
    build("data/perks/*.yml"),
    build("data/weapons/*/*.yml"),
]).then(data => {
    let object = {
        armors: data[0],
        behemoths: data[1],
        cells: data[2],
        perks: data[3],
        weapons: data[4],
    }

    fs.writeFileSync("./dist/data.json", JSON.stringify(object));

    console.log("Built data.json");
})
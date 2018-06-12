export default class DataUtil {
    static get(url) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", url, true);

            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(request.status, request.responseText);
                }
            };

            request.onerror = function () {
                reject("ERROR");
            };

            request.send();
        })
    }

    static getKeyByValue(object, value) {
        for(let prop in object) {
            if(object.hasOwnProperty(prop)) {
                 if(object[prop] === value) {
                    return prop;
                 }
            }
        }

        return "0";
    }

    static data() {
        if(DataUtil.__data_cache) {
            return Promise.resolve(DataUtil.__data_cache);
        }

        return DataUtil.get("/dist/data.json");
    }

    static stringMap(version = 1) {
        if(DataUtil[`__stringmap_cache_v${version}`]) {
            return DataUtil[`__stringmap_cache_v${version}`];
        }

        return DataUtil.get(`/dist/map_v${version}.json`);
    }
}
const defaultOptions = {
    darkModeEnabled: false
};

export default class SettingsUtility {

    static boolify(val) {
        if(typeof val === "boolean") {
            return val;
        }

        return val === "true";
    }

    static isDarkModeEnabled() {
        return SettingsUtility.boolify(SettingsUtility.get("darkModeEnabled"));
    }

    static setDarkModeEnabled(val) {
        SettingsUtility.set("darkModeEnabled", val);
    }

    static set(key, value) {
        localStorage.setItem("__db_settings_" + key, value);
    }

    static get(key) {
        // key is not know, return null
        if(!(key in defaultOptions)) {
            return null;
        }

        return localStorage.getItem("__db_settings_" + key) || defaultOptions[key];
    }
}

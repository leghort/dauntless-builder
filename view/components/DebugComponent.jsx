import React from "react";

export default class DebugComponent extends React.Component {

    filteredData() {
        // don't filter arrays
        if(Array.isArray(this.props.data)) {
            return this.props.data;
        }

        let ignores = this.props.ignore || [];

        let newData = {};

        for(let key in this.props.data) {
            if(ignores.indexOf(key) === -1) {
                newData[key] = this.props.data[key];
            }
        }

        return newData;
    }

    render() {
        if(localStorage.getItem("__db_developer_mode") !== "enabled") {
            return null;
        }

        return <pre className="debug"><code>{JSON.stringify(this.filteredData(), null, "    ")}</code></pre>;
    }
}
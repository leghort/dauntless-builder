import React from "react";

export default class DebugComponent extends React.Component {
    render() {
        if(localStorage.getItem("__db_developer_mode") !== "enabled") {
            return null;
        }

        return <pre className="debug"><code>{JSON.stringify(this.props.data, null, "    ")}</code></pre>;
    }
}
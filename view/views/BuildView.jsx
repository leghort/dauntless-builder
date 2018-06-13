import React from "react";

import {Link} from "react-router-dom";

import BuildModel from "../models/BuildModel";

export default class BuildView extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            ready: false
        };
    }

    componentDidMount() {
        const buildData = this.props.match.params.buildData;

        BuildModel.tryDeserialize(buildData).then(build => {
            this.setState({
                build, ready: true
            });

            build.serialize().then(string => {
                console.log(string);
            })
        });
    }

    updateUrl() {
        let buildData = this.state.build.serialize();

        window.history.replaceState({}, "Dauntless Builder: " + buildData, "/b/" + buildData);
    }

    render() {
        if(!this.state.ready) {
            return <div>...</div>;
        }

        return <div className="columns">
            <div className="column is-two-thirds">
                yolo
            </div>
            <div className="column is-one-third">
                <code><pre>{JSON.stringify(this.props, null, "    ")}</pre></code>
                <code><pre>{JSON.stringify(this.state, null, "    ")}</pre></code>
            </div>
        </div>;
    }
}
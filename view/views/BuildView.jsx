import React from "react";

import {Link} from "react-router-dom";

import BuildModel from "../models/BuildModel";
import DataUtil from "../utils/DataUtil";

import ItemComponent from "../components/ItemComponent";

export default class BuildView extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            ready: false
        };
    }

    componentDidMount() {
        const buildData = this.props.match.params.buildData;

        Promise.all([
            DataUtil.data(),
            BuildModel.tryDeserialize(buildData)
        ]).then(res => {
            let [itemData, build] = res;

            this.setState({
                itemData, build, ready: true
            });

            build.serialize().then(string => {
                console.log(string);
            })
        });
    }

    updateUrl() {
        this.state.build.serialize().then(buildData => {
            window.history.replaceState({}, "Dauntless Builder: " + buildData, "/b/" + buildData);
        });
    }

    dummyData() {
        let build = this.state.build;

        // weapon
        build.weapon_name = "Ragesaber";
        build.weapon_level = 10;
        build.weapon_cell0 = "+3 Ragehunter Cell";
        build.weapon_cell1 = "+3 Ragehunter Cell";

        this.setState({
            build
        }, () => this.updateUrl());
    }

    render() {
        if(!this.state.ready) {
            return <div>...</div>;
        }

        return <div className="columns">
            <div className="column is-two-thirds">
                <button onClick={() => this.dummyData()} className="button is-warning">Add dummy data</button>

                <ItemComponent title="Weapon" item={this.state.itemData.weapons[this.state.build.weapon_name]} />
            </div>
            <div className="column is-one-third">
                <code><pre>{JSON.stringify({build: this.state.build}, null, "    ")}</pre></code>
            </div>
        </div>;
    }
}
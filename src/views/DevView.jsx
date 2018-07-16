import React from "react";

import {Redirect, Link} from "react-router-dom";
import DataUtil from "../utils/DataUtil";
import BuildModel from "../models/BuildModel";

export default class DevView extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.tabs = [
            "CustomBuilds",
            "Icons",
            "MissingPerks"
        ]

        this.tabTitles = {
            "CustomBuilds": "Custom Builds",
            "Icons": "Items without Icons",
            "MissingPerks": "Missing Perks"
        }

        this.state = {
            currentTab: this.tabs[0],

            customBuild: {
                __version: 1,
                weapon_name: "",
                weapon_level: 0,
                weapon_cell0: "",
                weapon_cell1: "",
                head_name: "",
                head_level: 0,
                head_cell: "",
                torso_name: "",
                torso_level: 0,
                torso_cell: "",
                arms_name: "",
                arms_level: 0,
                arms_cell: "",
                legs_name: "",
                legs_level: 0,
                legs_cell: "",
                lantern_name: "",
                lantern_cell: ""
            }
        }
    }

    componentDidMount() {
        this.setState({currentTab: this.props.match.params.tab || this.tabs[0]});
    }

    updateCustomBuildOption(field, value) {
        let customBuild = this.state.customBuild;
        customBuild[field] = value;
        this.setState({customBuild});
    }

    openBuild() {
        let build = new BuildModel(this.state.customBuild);

        const buildId = build.serialize();

        window.open(`https://www.dauntless-builder.com/b/${buildId}`);
    }

    renderTabs() {
        return this.tabs.map(tab => (
            <li key={tab}
                className={tab === this.state.currentTab ? "is-active" : ""}
                onClick={() => this.setState({currentTab: tab})}>
                    <Link to={"/dev/" + tab}>{tab in this.tabTitles ? this.tabTitles[tab] : tab}</Link>
            </li>
        ))
    }

    renderCustomBuilds() {
        const weapons = Object.keys(DataUtil.data().weapons).map(weapon => <option key={weapon} value={weapon}>{weapon}</option>);
        const armours = Object.keys(DataUtil.data().armours).map(armour => ({name: armour, type: DataUtil.data().armours[armour].type}));
        const heads = armours.filter(armour => armour.type === "Head").map(armour => <option key={armour.name} value={armour.name}>{armour.name}</option>);
        const torsos = armours.filter(armour => armour.type === "Torso").map(armour => <option key={armour.name} value={armour.name}>{armour.name}</option>);
        const arms = armours.filter(armour => armour.type === "Arms").map(armour => <option key={armour.name} value={armour.name}>{armour.name}</option>);
        const legs = armours.filter(armour => armour.type === "Legs").map(armour => <option key={armour.name} value={armour.name}>{armour.name}</option>);
        const lanterns = Object.keys(DataUtil.data().lanterns).map(lantern => <option key={lantern} value={lantern}>{lantern}</option>);

        const cells = [];

        for(let cellName in DataUtil.data().cells) {
            let cell = DataUtil.data().cells[cellName];

            for(let variant in cell.variants) {
                cells.push(
                    <option key={variant} value={variant}>[{cell.slot}] {variant}</option>
                );
            }
        }

        const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => <option key={level} value={level}>+{level}</option>);

        return <React.Fragment>
            <h3 className="title is-4">Custom Builds - Without constraints</h3>
            <div className="columns">
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.weapon_name} onChange={e => this.updateCustomBuildOption("weapon_name", e.target.value)}>
                            <option>Select Weapon...</option>
                            {weapons}
                        </select>
                    </div>
                </div>
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.weapon_level} onChange={e => this.updateCustomBuildOption("weapon_level", e.target.value)}>
                            <option value={0}>Base</option>
                            {levels}
                        </select>
                    </div>
                </div>
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.weapon_cell0} onChange={e => this.updateCustomBuildOption("weapon_cell0", e.target.value)}>
                            <option>Select Weapon Cell 1...</option>
                            {cells}
                        </select>
                    </div>
                </div>
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.weapon_cell1} onChange={e => this.updateCustomBuildOption("weapon_cell1", e.target.value)}>
                            <option>Select Weapon Cell 2...</option>
                            {cells}
                        </select>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.head_name} onChange={e => this.updateCustomBuildOption("head_name", e.target.value)}>
                            <option>Select head...</option>
                            {heads}
                        </select>
                    </div>
                </div>
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.head_level} onChange={e => this.updateCustomBuildOption("head_level", e.target.value)}>
                            <option value={0}>Base</option>
                            {levels}
                        </select>
                    </div>
                </div>
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.head_cell} onChange={e => this.updateCustomBuildOption("head_cell", e.target.value)}>
                            <option>Select head Cell...</option>
                            {cells}
                        </select>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.torso_name} onChange={e => this.updateCustomBuildOption("torso_name", e.target.value)}>
                            <option>Select torso...</option>
                            {torsos}
                        </select>
                    </div>
                </div>
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.torso_level} onChange={e => this.updateCustomBuildOption("torso_level", e.target.value)}>
                            <option value={0}>Base</option>
                            {levels}
                        </select>
                    </div>
                </div>
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.torso_cell} onChange={e => this.updateCustomBuildOption("torso_cell", e.target.value)}>
                            <option>Select torso Cell...</option>
                            {cells}
                        </select>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.arms_name} onChange={e => this.updateCustomBuildOption("arms_name", e.target.value)}>
                            <option>Select arms...</option>
                            {arms}
                        </select>
                    </div>
                </div>
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.arms_level} onChange={e => this.updateCustomBuildOption("arms_level", e.target.value)}>
                            <option value={0}>Base</option>
                            {levels}
                        </select>
                    </div>
                </div>
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.arms_cell} onChange={e => this.updateCustomBuildOption("arms_cell", e.target.value)}>
                            <option>Select arms Cell...</option>
                            {cells}
                        </select>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.legs_name} onChange={e => this.updateCustomBuildOption("legs_name", e.target.value)}>
                            <option>Select legs...</option>
                            {legs}
                        </select>
                    </div>
                </div>
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.legs_level} onChange={e => this.updateCustomBuildOption("legs_level", e.target.value)}>
                            <option value={0}>Base</option>
                            {levels}
                        </select>
                    </div>
                </div>
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.legs_cell} onChange={e => this.updateCustomBuildOption("legs_cell", e.target.value)}>
                            <option>Select legs Cell...</option>
                            {cells}
                        </select>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.lantern_name} onChange={e => this.updateCustomBuildOption("lantern_name", e.target.value)}>
                            <option>Select lantern...</option>
                            {lanterns}
                        </select>
                    </div>
                </div>
                <div className="column">
                    <div className="select" style={{width: "100%"}}>
                        <select style={{width: "100%"}} value={this.state.customBuild.lantern_cell} onChange={e => this.updateCustomBuildOption("lantern_cell", e.target.value)}>
                            <option>Select lantern Cell...</option>
                            {cells}
                        </select>
                    </div>
                </div>
            </div>
            <br />
            <button className="button is-primary is-large" onClick={() => this.openBuild()}>Open Build</button>
        </React.Fragment>
    }

    renderIcons() {
        let weapons = Object.keys(DataUtil.data().weapons).filter(weaponName =>
            !("icon" in DataUtil.data().weapons[weaponName])).sort((a, b) =>
                a.localeCompare(b)).map(weaponName =>
                    <li key={weaponName}><a>{weaponName}</a></li>);

        let armours = Object.keys(DataUtil.data().armours).filter(armourName =>
            !("icon" in DataUtil.data().armours[armourName])).sort((a, b) =>
                a.localeCompare(b)).map(armourName =>
                    <li key={armourName}><a>{armourName}</a></li>);

        return <React.Fragment>
            <h3 className="title is-4">Items without icons</h3>

            <div className="columns">
                <div className="column">
                    <h4 className="title is-6">Weapons</h4>
                    <ul className="menu-list">
                        {weapons}
                    </ul>
                </div>
                <div className="column">
                    <h4 className="title is-6">Armours</h4>
                    <ul className="menu-list">
                        {armours}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    }

    renderMissingPerks() {
        let perksFromWeapons = Object.values(DataUtil.data().weapons).map(weapon => weapon.perks ? weapon.perks.map(p => p.name) : []);
        let perksFromArmours = Object.values(DataUtil.data().armours).map(armour => armour.perks ? armour.perks.map(p => p.name) : []);
        let perksFromCells = Object.values(DataUtil.data().cells).map(cell => Object.values(cell.variants).map(p => Object.keys(p.perks)));

        let all = [].concat(...perksFromWeapons, ...perksFromArmours, ...perksFromCells);
        all = [].concat(...all.filter(e => Array.isArray(e)));
        all = all.sort();
        all = all.filter((perk, index) => all.indexOf(perk) === index);

        let unknownPerks = all.filter(perk => !(perk in DataUtil.data().perks));

        let unknownPerksElements = unknownPerks.map(perk =>
            <li key={perk}><a>{perk}</a></li>)

        return <React.Fragment>
            <h3 className="title is-4">Perks that are used but don't exist</h3>

            <ul className="menu-list">
                {unknownPerksElements}
            </ul>
        </React.Fragment>
    }

    render() {
        if(!window.isDeveloperModeEnabled()) {
            return <Redirect to="/" />
        }

        if(this.tabs.indexOf(this.state.currentTab) === -1) {
            this.setState({currentTab: this.tabs[0]});
            return <Redirect to={"/dev/" + this.tabs[0]} />
        }

        return <section className="section">
            <h3 className="subtitle"><i className="fas fa-code"></i> Developer Menu</h3>
            <div style={{marginBottom: "20px"}}>
                This menu offers you certain functionality that makes it easier to debug the application.

                <div style={{marginBottom: "20px"}}></div>

                <button className="button is-dark" onClick={window.disableDeveloperMode}>
                    Disable Developer Mode
                </button>
            </div>

            <div className="tabs">
                <ul>
                    {this.renderTabs()}
                </ul>
            </div>

            <div className="tab-content">
                {this["render" + this.state.currentTab]()}
            </div>
        </section>;
    }
}
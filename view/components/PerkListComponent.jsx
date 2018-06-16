import React from "react";

import "../styles/components/perk-list.scss";

import BuildModel from "../models/BuildModel";

export default class PerkListComponent extends React.Component {
    getPerkLevelClass(perkValue) {
        if(perkValue >= 1 && perkValue < 6) {
            return "perk-ok perk-level-" + perkValue;
        }

        if(perkValue == 6) {
            return "perk-max";
        }

        return "perk-overload";
    }

    renderPerkEffect(perkName, perkValue) {
        let perk = BuildModel.findPerkByName(perkName);

        if(!perk) {
            return null;
        }

        let effectCount = Array.isArray(perk.key) ? perk.key.length : 1;

        let effect = perk.effects[Math.max(0, Math.min(6, perkValue))];

        console.log(effect);

        let elems = [];

        for(let i = 0; i < effectCount; i++) {
            elems.push(
                <div className="perk-effect" key={"perk-effect-" + i}>
                    {Array.isArray(perk.key) ? effect.description[i] : effect.description}
                </div>
            );
        }

        return <React.Fragment>
            {elems}
        </React.Fragment>
    }

    render() {
        let perks = this.props.perks.map(perk =>
            <li key={perk.name} className={this.getPerkLevelClass(perk.value)}>
                <div className="perk-title">+{perk.value} {perk.name}</div>
                {this.renderPerkEffect(perk.name, perk.value)}
            </li>
        );

        return <ul className="perk-list">
            {perks}
        </ul>;
    }
}
import React from "react";

import "../styles/components/perk-list.scss";

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

    render() {
        let perks = this.props.perks.map(perk =>
            <li key={perk.name} className={this.getPerkLevelClass(perk.value)}>+{perk.value} {perk.name}</li> );

        return <ul className="perk-list">
            {perks}
        </ul>;
    }
}
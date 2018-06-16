import React from "react";

import "../styles/components/perk-list.scss";

export default class PerkListComponent extends React.Component {
    render() {
        let perks = this.props.perks.map(perk =>
            <li key={perk.name}>+{perk.value} {perk.name}</li> );

        return <ul className="perk-list">
            {perks}
        </ul>;
    }
}
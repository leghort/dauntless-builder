import React from "react";
import PropTypes from "prop-types";

export default class PerkString extends React.Component {

    render() {
        const perkList = this.props.perks.map(perk => `+${perk.value} ${perk.name}`);

        if(perkList.length > 0) {
            return <div><strong>Perks</strong>: {perkList.join(", ")}</div>;
        }

        return null;
    }
}

PerkString.propTypes = {
    perks: PropTypes.array
};
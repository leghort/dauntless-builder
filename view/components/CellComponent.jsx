import React from "react";

export default class CellComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        return <div className="cell">
            <img className="epic" src={"/assets/icons/perks/" + this.props.type + ".png"} />
            <span className="cell-title">+3 Ragehunter Cell</span>
        </div>;
    }
}



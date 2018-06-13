import React from "react";

export default class CellComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        return <div className="cell">
            <img className="empty" src={"/assets/icons/perks/" + this.props.type + ".png"} />
            <span className="cell-title"></span>
        </div>;
    }
}



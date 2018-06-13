import React from "react";

import CellComponent from "./CellComponent";

export default class ItemComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};

        console.log(this.props.parent.findCellByVariantName("+3 Ragehunter Cell"));
    }

    getIcon() {
        if(this.props.item.icon) {
            return this.props.item.icon;
        }

        // TODO: find placeholder icon by item type
        return "/assets/icons/weapons/swords/Ragesaber.png";
    }

    render() {
        if(!this.props.item) {
            return <div>No item</div>;
        }

        let cells = [];

        let cellSlots = this.props.item.cells;

        if(!Array.isArray(cellSlots)) {
            cellSlots = [cellSlots];
        }

        for(let slot of cellSlots) {
            cells.push(
                <CellComponent
                    parent={this.props.parent}
                    type={slot} />
            );
        }

        let levelString = "";

        if(this.props.level && this.props.level > 0) {
            levelString = `+${this.props.level}`;
        }

        return <React.Fragment>
            <h2 className="subtitle">{this.props.title}</h2>
            <div className="item-wrapper">
                <div className="item" title={this.props.item.description}>
                    <img src={this.getIcon()} />
                    <div className="item-data">
                        <h3 className="item-title">Ragesaber {levelString}</h3>
                        <span>Power: {this.props.item.power[this.props.level]}</span>
                    </div>
                </div>
                <div className="cells">
                    {cells}
                </div>
            </div>
        </React.Fragment>;
    }
}
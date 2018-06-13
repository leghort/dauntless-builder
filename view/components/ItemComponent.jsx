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

        let cellCounter = 0;

        for(let slot of cellSlots) {
            cells.push(
                <CellComponent
                    parent={this.props.parent}
                    key={"cell_" + (cellCounter++)}
                    type={slot} />
            );
        }

        let levelString = "";

        if(this.props.level && this.props.level > 0) {
            levelString = `+${this.props.level}`;
        }

        let statString = "";

        switch(this.props.item.type) {
            case "Sword":
            case "Chain Blades":
            case "Axe":
            case "Hammer":
            case "War Pike":
                statString = `Power: ${this.props.item.power[this.props.level]}`
                break;
            case "Head":
            case "Chest":
            case "Gloves":
            case "Legs":
                statString = `Resistance: ${this.props.item.resistance[this.props.level]}`
                break;
            default:
                statString = "???";
        }

        return <div className="item-title-wrapper">
            <h2 className="subtitle">{this.props.title}</h2>
            <div className="item-wrapper">
                <div className="item" title={this.props.item.description}>
                    <img src={this.getIcon()} />
                    <div className="item-data">
                        <h3 className="item-title">{this.props.item.name} {levelString}</h3>
                        <span>{statString}</span>
                    </div>
                </div>
                <div className="cells">
                    {cells}
                </div>
            </div>
        </div>;
    }
}
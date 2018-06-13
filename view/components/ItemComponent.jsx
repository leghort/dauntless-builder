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

        let name = this.props.item.type;

        if(!name) {
            name = this.getItemType();
        }

        return "/assets/icons/general/" + name + ".png"
    }

    getItemType() {
        switch(this.props.item.type) {
            case "Sword":
            case "Chain Blades":
            case "Axe":
            case "Hammer":
            case "War Pike":
                return "Weapon"
            case "Head":
            case "Torso":
            case "Arms":
            case "Legs":
                return "Armor"
        }

        return "Lantern";
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

        let stats = null;

        switch(this.getItemType()) {
            case "Weapon":
                stats = <span>Power: {this.props.item.power[this.props.level]}</span>
                break;
            case "Armor":
                stats = <span>Resistance: ${this.props.item.resistance[this.props.level]}</span>
                break;
        }

        return <div className="item-title-wrapper">
            <h2 className="subtitle">{this.props.title}</h2>
            <div className="item-wrapper">
                <div className="item" title={this.props.item.description}>
                    <img src={this.getIcon()} />
                    <div className="item-data">
                        <h3 className="item-title">{this.props.item.name} {levelString}</h3>
                        {stats}
                    </div>
                </div>
                <div className="cells">
                    {cells}
                </div>
            </div>
        </div>;
    }
}
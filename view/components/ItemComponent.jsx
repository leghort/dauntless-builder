import React from "react";

import CellComponent from "./CellComponent";

export default class ItemComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
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

    getPerks() {
        if(!this.props.item.perks) {
            return [];
        }

        let level = Number(this.props.level);

        return this.props.item.perks.filter(
            perk =>
                !("from" in perk && "to" in perk) ||
                    (level >= perk.from && level <= perk.to)
            );
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
            return <div className="item-title-wrapper">
                <div className="item-wrapper">
                    <div className="item no-item">
                        <i className="fas fa-question no-item-icon"></i>
                        <div className="item-data">
                            <h3 className="subtitle">No <strong>{this.props.title}</strong> selected.</h3>
                            <div>Click here to select one.</div>
                        </div>
                    </div>
                </div>
            </div>
        }

        let cells = [];
        let cellCounter = 0;

        let cellSlots = this.props.item.cells;

        if(!Array.isArray(cellSlots)) {
            cellSlots = [cellSlots];
        }

        let assignedCells = this.props.cells.slice();

        for(let slot of cellSlots) {
            let index = assignedCells.findIndex(cellHandle => cellHandle[1] && cellHandle[1].slot === slot);

            if(index > -1) {
                cells.push(
                    <CellComponent
                        parent={this.props.parent}
                        key={"cell_" + (cellCounter++)}
                        type={assignedCells[index][1].slot}
                        variant={assignedCells[index][0]}
                        cell={assignedCells[index][1]} />
                );

                assignedCells.splice(index, 1);
            } else {
                cells.push(
                    <CellComponent
                        parent={this.props.parent}
                        key={"cell_" + (cellCounter++)}
                        type={slot} />
                );
            }
        }

        let levelString = "";

        if(this.props.level && this.props.level > 0) {
            levelString = `+${this.props.level}`;
        }

        let perkElement = null;

        let perks = this.getPerks().map(perk => `+${perk.value} ${perk.name}`);

        if(perks.length > 0) {
            perkElement = <div><strong>Perks</strong>: {perks.join(", ")}</div>;
        }

        let stats = null;

        switch(this.getItemType()) {
            case "Weapon":
                stats = <React.Fragment>
                    <div><strong>Power</strong>: {this.props.item.power[this.props.level]}</div>
                    {perkElement}
                </React.Fragment>;
                break;
            case "Armor":
                stats = <React.Fragment>
                    <div><strong>Resistance</strong>: {this.props.item.resistance[this.props.level]}</div>
                    {perkElement}
                </React.Fragment>;
                break;
            case "Lantern":
                stats = <React.Fragment>
                    <div><strong>Instant</strong>: {this.props.item.lantern_ability.instant}</div>
                    <div><strong>Hold</strong>: {this.props.item.lantern_ability.hold}</div>
                    {perkElement}
                </React.Fragment>;
        }

        return <div className="item-title-wrapper">
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
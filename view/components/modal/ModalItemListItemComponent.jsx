import React from "react";
import BuildModel from "../../models/BuildModel";

import ItemIconComponent from "../ItemIconComponent";

export default class ModalItemListItemComponent extends React.Component {

    getItemType() {
        let type = this.props.item.type;

        switch(type) {
            case "Weapon":
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
                return "Armour"
        }

        return "Lantern";
    }

    getLevel() {
        if(this.props.type === "Lantern") {
            return 0;
        }

        return Math.max(...Object.keys(this.props.item[this.props.type === "Weapon" ? "power" : "resistance"]).map(k => Number(k)));
    }

    render() {
        const item = this.props.item;
        const type = this.props.type;
        const level = this.getLevel();

        // TODO: this is copied from ItemComponent needs some refactoring to be DRY (Clean Code)
        let levelString = "";

        if(level && level > 0) {
            levelString = `+${level}`;
        }

        let perkElement = null;

        let perks = BuildModel.getAvailablePerksByLevel(item.name, this.getItemType(), level).map(perk => `+${perk.value} ${perk.name}`);

        if(perks.length > 0) {
            perkElement = <div><strong>Perks</strong>: {perks.join(", ")}</div>;
        }

        let stats = null;

        switch(this.getItemType()) {
            case "Weapon":
                stats = <React.Fragment>
                    <div><strong>Power</strong>: {item.power[level]}</div>
                    {perkElement}
                </React.Fragment>;
                break;
            case "Armour":
                stats = <React.Fragment>
                    <div><strong>Resistance</strong>: {item.resistance[level]}</div>
                    {perkElement}
                </React.Fragment>;
                break;
            case "Lantern":
                let instant = null;
                let hold = null;

                if(item.lantern_ability.instant) {
                    instant = <div><strong>Instant</strong>: {item.lantern_ability.instant}</div>;
                }

                if(item.lantern_ability.hold) {
                    hold = <div><strong>Hold</strong>: {item.lantern_ability.hold}</div>;
                }

                stats = <React.Fragment>
                    {instant}
                    {hold}
                    {perkElement}
                </React.Fragment>;
        }

        let uniqueEffects = [];

        if(item.unique_effects) {
            uniqueEffects = BuildModel.getAvailableUniqueEffectsByLevel(item.name, this.getItemType(), level).map(uniqueEffect =>
                <div key={uniqueEffect.name} className="unique-effects">{uniqueEffect.description}</div>);
        }

        let cellLine = null;

        let cells = item.cells;

        if(!Array.isArray(cells)) {
            cells = [cells];
        }

        if(item.cells) {
            cellLine = <div className="cell-slots">{cells.map(cell =>
                <span key={"CellLine_" + cell} className="cell-line">
                    <img className="cell-icon" src={"/assets/icons/perks/" + cell + ".png"} /> {cell}
                </span>
            )}</div>;
        }

        return <div className="item-title-wrapper">
            <div className="item-wrapper">
                <div className="item" title={item.description} onClick={() => this.props.onSelected(type, item.name)}>
                    <ItemIconComponent item={item} defaultType={this.getItemType()} />
                    <div className="item-data">
                        <h3 className="item-title">{item.name} {levelString}</h3>
                        {stats}
                        {cellLine}
                        {uniqueEffects}
                    </div>
                </div>
            </div>
        </div>;
    }
}
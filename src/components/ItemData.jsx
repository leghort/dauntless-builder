import React from "react";
import PropTypes from "prop-types";
import ItemUtility from "../utility/ItemUtility";
import BuildModel from "../models/BuildModel";
import PerkString from "./PerkString";
import ElementalAffinities from "./ElementalAffinities";
import PropTypeUtility from "../utility/PropTypeUtility";

export default class ItemData extends React.Component {

    render() {
        const levelString = ItemUtility.levelString(this.props.level);
        const perkElement = <PerkString perks={
            BuildModel.getAvailablePerksByLevel(this.props.item.name,
                ItemUtility.itemType(this.props.item.type),
                this.props.level
            )
        } />;

        const titlePrefix = this.props.titlePrefix ? this.props.titlePrefix + ": " : null;

        let title = <h3 className="item-title">{titlePrefix}{this.props.item.name} {levelString}</h3>;

        let stats = null;

        switch(ItemUtility.itemType(this.props.item.type)) {
            case "Weapon":
                stats = <React.Fragment>
                    <div className="stat-data">
                        <strong>Power</strong>: {this.props.item.power[this.props.level]} <ElementalAffinities item={this.props.item} />
                    </div>
                    {perkElement}
                </React.Fragment>;

                if(ItemUtility.isRepeater(this.props.item)) {
                    stats = null;
                }

                break;
            case "Armour":
                stats = <React.Fragment>
                    <div className="stat-data">
                        <strong>Resistance</strong>: {Math.ceil(this.props.item.resistance[this.props.level])}
                        <ElementalAffinities item={this.props.item} />
                    </div>
                    {perkElement}
                </React.Fragment>;
                break;
            case "Lantern": {
                let instant = null;
                let hold = null;

                if(this.props.item.lantern_ability.instant) {
                    instant = <div><strong>Instantané</strong>: {this.props.item.lantern_ability.instant}</div>;
                }

                if(this.props.item.lantern_ability.hold) {
                    hold = <div><strong>Maintenir</strong>: {this.props.item.lantern_ability.hold}</div>;
                }

                stats = <React.Fragment>
                    {instant}
                    {hold}
                    {perkElement}
                </React.Fragment>;
            }
        }

        if (this.props.simpleView) {
            title = <h3 className="item-title">{titlePrefix}{this.props.item.name}</h3>;
            stats = perkElement;
        }

        let cellLine = null;

        if(this.props.renderCellLine) {
            cellLine = this.renderCellLine(this.props.item);
        }

        return <div className="item-data">
            {title}
            {stats}
            {cellLine}
        </div>;
    }

    renderCellLine(item) {
        let cellLine = null;

        let cells = item.cells;

        if(!Array.isArray(cells)) {
            cells = [cells];
        }

        if(item.cells) {
            let cellLineCounter = 0;

            cellLine = <div className="cell-slots">{cells.map(cell =>
                <span key={"CellLine_" + cell + (cellLineCounter++)} className="cell-line">
                    <img className="cell-icon" src={"/assets/icons/perks/" + cell + ".png"} /> {cell}
                </span>
            )}</div>;
        }

        return cellLine;
    }
}

ItemData.propTypes = {
    item: PropTypeUtility.item(),
    level: PropTypes.number,
    renderCellLine: PropTypes.bool,
    simpleView: PropTypes.bool,
    titlePrefix: PropTypes.oneOfType([PropTypes.string, PropTypes.any])
};

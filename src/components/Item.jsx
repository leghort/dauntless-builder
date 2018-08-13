import React from "react";
import PropTypes from "prop-types";

import Cell from "./Cell";

import ItemIcon from "./ItemIcon";
import ItemData from "./ItemData";
import ItemUtility from "../utility/ItemUtility";
import PropTypeUtility from "../utility/PropTypeUtility";

export default class Item extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
    }

    getItemType() {
        let type = this.props.defaultType;

        if(this.props.item) {
            type = this.props.item.type;
        }

        return ItemUtility.itemType(type);
    }

    onClicked() {
        let filterOption = {};
        filterOption.__itemType = this.getItemType();
        filterOption.filters = [];

        if(filterOption.__itemType === "Weapon" && this.props.item) {
            filterOption.__weaponType = this.props.item.type;
            filterOption.__tier = 5;

            if(this.props.item.tier) {
                filterOption.__tier = this.props.item.tier;
            }
        }

        if(filterOption.__itemType === "Armour") {
            filterOption.__armourType = this.props.defaultType;
            filterOption.__tier = 5;

            if(this.props.item && this.props.item.tier) {
                filterOption.__tier = this.props.item.tier;
            }

            filterOption.filters.push({
                field: "type",
                value: this.props.defaultType
            });
        }

        this.props.onItemClicked(filterOption);
    }

    renderCells() {
        let cells = [];
        let cellCounter = 0;

        let cellSlots = this.props.item.cells;

        if(!this.props.item.cells) {
            return [];
        }

        if(!Array.isArray(cellSlots)) {
            cellSlots = [cellSlots];
        }

        let assignedCells = this.props.cells.slice();

        let slotIndex = 0;

        for(let slot of cellSlots) {
            let index = assignedCells.findIndex(cellHandle => cellHandle[1] && cellHandle[1].slot === slot);

            if(index > -1) {
                cells.push(
                    <Cell
                        parent={this.props.parent}
                        parentType={this.props.defaultType}
                        slotPosition={slotIndex}
                        onCellClicked={this.props.onCellClicked}
                        key={"cell_" + (cellCounter++)}
                        type={assignedCells[index][1].slot}
                        variant={assignedCells[index][0]}
                        cell={assignedCells[index][1]} />
                );

                assignedCells.splice(index, 1);
            } else {
                cells.push(
                    <Cell
                        parent={this.props.parent}
                        parentType={this.props.defaultType}
                        slotPosition={slotIndex}
                        onCellClicked={this.props.onCellClicked}
                        key={"cell_" + (cellCounter++)}
                        type={slot} />
                );
            }

            slotIndex++;
        }

        return cells;
    }

    render() {
        if(!this.props.item) {
            return <div className="item-title-wrapper">
                <div className="item-wrapper">
                    <div className="item no-item" onClick={() => this.onClicked()}>
                        <i className="fas fa-question no-item-icon"></i>
                        <div className="item-data">
                            <h3 className="subtitle">No <strong>{this.props.title}</strong> selected.</h3>
                            <div>Click here to select one.</div>
                        </div>
                    </div>
                </div>
            </div>;
        }

        let cells = this.renderCells();

        return <div className="item-title-wrapper">
            <h2 className="subtitle hidden-on-large-screens">{this.getItemType() + (this.props.item.type ? ` - ${this.props.item.type}` : "")}</h2>
            <div className="item-wrapper">
                <div className={"item"+ (cells.length === 0 ? " no-cells" : "")} title={this.props.item.description} onClick={() => this.onClicked()}>
                    <ItemIcon item={this.props.item} defaultType={this.props.defaultType} />
                    <ItemData item={this.props.item} level={this.props.level} />
                </div>
                <div className="cells">
                    {cells}
                </div>
            </div>
        </div>;
    }
}

Item.propTypes = {
    item: PropTypeUtility.item(),
    title: PropTypes.string,
    parent: PropTypes.object,
    cells: PropTypes.array,
    defaultType: PropTypes.string,
    level: PropTypes.number,
    onItemClicked: PropTypes.func,
    onCellClicked: PropTypes.func
};

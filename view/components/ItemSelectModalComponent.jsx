import React from "react";

import DebugComponent from "./DebugComponent";

export default class ItemSelectModalComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: !!this.props.isOpen,
            searchQuery: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isOpen !== this.state.open) {
            this.setState({open: nextProps.isOpen});
        }
    }

    getIsActive() {
        return this.state.open ? "is-active" : "";
    }

    onSelected() {
        this.setState({open: false}, () => {
            if(this.props.onSelected) {
                this.props.onSelected();
            }
        })
    }

    onClose() {
        this.setState({open: false}, () => {
            if(this.props.onCanceled) {
                this.props.onCanceled();
            }
        });
    }

    getAvailableItems() {
        let items = [];

        console.log(this.props.data.filterOptions);

        let itemType = this.props.data.filterOptions.__itemType;

        let key = null;

        switch(itemType) {
            case "Weapon": key = "weapons"; break;
            case "Armour": key = "armours"; break;
            case "Lantern": key = "lanterns"; break;
            case "Cell": key = "cells"; break;
        }

        const filtersApply = (item, filters) => {
            return filters.every(filter => {
                if(filter.method) {
                    return filter.method(item, filter);
                }

                return item[filter.field] === filter.value
            });
        };

        for(let itemName in this.props.itemData[key]) {
            let item = this.props.itemData[key][itemName];

            if(filtersApply(item, this.props.data.filterOptions.filters)) {
                let itemsToRender = this["render" + itemType](item);

                if(!Array.isArray(itemsToRender)) {
                    itemsToRender = [itemsToRender];
                }

                itemsToRender.forEach(r => items.push(r));
            }
        }

        return items;
    }

    renderWeapon(item) {
        return <div key={item.name}>Weapon: {item.name}</div>;
    }

    renderArmour(item) {
        return <div key={item.name}>Armour: {item.name}</div>;
    }

    renderLantern(item) {
        return <div key={item.name}>Lantern: {item.name}</div>;
    }

    renderCell(item) {
        return <div key={item.name}>Cell: {item.name}</div>;
    }

    render() {
        if(!this.state.open) {
            return null;
        }

        return <div className={`modal ${this.getIsActive()}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="card modal-card">
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input
                                autoFocus={true}
                                className="input"
                                type="text"
                                placeholder="Search..."
                                value={this.state.searchQuery}
                                onChange={e => this.setState({searchQuery: e.target.value})} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-search"></i>
                            </span>
                        </p>
                    </div>

                    <div className="item-modal-list">
                        {this.getAvailableItems()}
                    </div>

                    <DebugComponent data={{filterOptions: this.props.data.filterOptions, state: this.state}} />
                </div>
            </div>
            <button className="modal-close is-large" onClick={() => this.onClose()}></button>
        </div>;
    }
}
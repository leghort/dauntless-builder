import React from "react";
import Select from "react-select";

require("react-select/dist/react-select.css");

import DebugComponent from "./DebugComponent";

export default class ItemSelectModalComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: !!this.props.isOpen,
            searchQuery: "",
            perkFilter: null,
            weaponTypeFilter: null
        }

        this.defaultState = {
            open: false,
            searchQuery: "",
            perkFilter: null,
            weaponTypeFilter: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isOpen !== this.state.open) {
            this.setState({open: nextProps.isOpen});
        }

        if(nextProps.data && nextProps.data.filterOptions && nextProps.data.filterOptions.__weaponType) {
            this.setState({weaponTypeFilter: {
                    value: nextProps.data.filterOptions.__weaponType,
                    label: nextProps.data.filterOptions.__weaponType,
                }
            });
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
        this.setState(this.defaultState, () => {
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
                    try {
                        return filter.method(item, filter);
                    } catch(ex) {
                        console.warn(ex);
                        return false;
                    }
                }

                return item[filter.field] === filter.value
            });
        };

        let filterOptions = [];

        filterOptions = filterOptions.concat(this.props.data.filterOptions.filters);
        filterOptions = filterOptions.concat(this.getDynamicFilters());

        for(let itemName in this.props.itemData[key]) {
            let item = this.props.itemData[key][itemName];

            if(filtersApply(item, filterOptions)) {
                let itemsToRender = this["render" + itemType](item);

                if(!Array.isArray(itemsToRender)) {
                    itemsToRender = [itemsToRender];
                }

                itemsToRender.forEach(r => items.push(r));
            }
        }

        return items;
    }

    getDynamicFilters() {
        let filters = [];

        // apply search filter
        if(this.state.searchQuery.length > 0) {
            filters.push({
                field: ["name", "description"],
                value: this.state.searchQuery,
                method: (item, filter) =>
                    filter.field.some(f => item[f].toLowerCase().indexOf(filter.value.toLowerCase()) > -1)
            });
        }

        if(this.state.perkFilter && this.state.perkFilter.value) {
            filters.push({
                field: "perks",
                value: this.state.perkFilter.value,
                method: (item, filter) =>
                    item.perks.some(p => p.name === filter.value)
            });
        }

        if(this.state.weaponTypeFilter && this.state.weaponTypeFilter.value) {
            filters.push({
                field: "type",
                value: this.state.weaponTypeFilter.value
            });
        }

        return filters;
    }

    getPerkOptions() {
        let perks = Object.keys(this.props.itemData.perks).map(perk => {
            return {value: perk, label: perk};
        });

        return perks;
    }

    renderFilterFields() {
        let fields = [];

        const isType = (type) => {
            if(!Array.isArray(type)) {
                type = [type];
            }

            return type.indexOf(this.props.data.filterOptions.__itemType) > -1;
        }

        // add search filter
        fields.push(
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
        );

        // add Weapon Type filter
        if(isType(["Weapon"])) {
            let options = [];

            for(let weaponName in this.props.itemData.weapons) {
                let weapon = this.props.itemData.weapons[weaponName];

                if(weapon.type && options.indexOf(weapon.type) == -1) {
                    options.push(weapon.type);
                }
            }

            options = options.sort().map(option => ({value: option, label: option}));

            fields.push(
                <div key="weaponTypeFilter" className="field">
                    <Select
                        placeholder="Select weapon type..."
                        onChange={weaponType => this.setState({weaponTypeFilter: weaponType})}
                        value={this.state.weaponTypeFilter}
                        options={options} />
                </div>
            );
        }

        // add Perk filter
        if(isType(["Weapon", "Armour"])) {
            fields.push(
                <div key="perkFilter" className="field">
                    <Select
                        placeholder="Select perk..."
                        onChange={perk => this.setState({perkFilter: perk})}
                        value={this.state.perkFilter}
                        options={this.getPerkOptions()} />
                </div>
            );
        }

        return fields;
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
                    {this.renderFilterFields()}

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
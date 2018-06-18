import React from "react";

export default class ModalItemListItemComponent extends React.Component {
    render() {
        const item = this.props.item;
        const type = this.props.type;

        return <button className="button is-dark is-debug-button" onClick={() => this.props.onSelected(type, item.name)}>{item.name}</button>
    }
}
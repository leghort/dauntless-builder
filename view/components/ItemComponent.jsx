import React from "react";

export default class ItemComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
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

        return <React.Fragment>
            <h2 className="subtitle">{this.props.title}</h2>
            <div className="item-wrapper">
                <div className="item">
                    <img src={this.getIcon()} />
                    <div className="item-data">
                        <h3 className="item-title">Ragesaber</h3>
                        <span>Power: 10</span>
                    </div>
                </div>
                <div className="cells">
                    <div className="cell">
                        <img src="/assets/icons/weapons/swords/Ragesaber.png" />
                    </div>
                    <div className="cell">
                        <img src="/assets/icons/weapons/swords/Ragesaber.png" />
                    </div>
                </div>
            </div>
        </React.Fragment>;
    }
}
import React from "react";
import PropTypeUtility from "../utility/PropTypeUtility";

import LazyLoad from "react-lazy-load";

export default class ItemIcon extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            src: this.props.item.icon,
            triedDefaultIcon: false,
            errorPersistsAfterDefault: false
        };
    }

    componentDidUpdate(prevProps) {
        let icon = prevProps.item.icon;

        if(icon !== this.state.src) {
            this.setState({src: icon, triedDefaultIcon: false, errorPersistsAfterDefault: false});
        }
    }

    render() {
        if(!this.state.src) {
            return <i className="fas fa-question" style={{
                height: "64px",
                width: "64px",
                fontSize: "48px",
                textAlign: "center"
            }}></i>;
        }

        return <LazyLoad className="image-icon-wrapper" width={128} height={128} offsetVertical={500}>
            <img src={this.state.src} />
        </LazyLoad>;
    }
}

ItemIcon.propTypes = {
    item: PropTypeUtility.item()
};
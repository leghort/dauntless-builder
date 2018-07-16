import React from "react";
import PropTypes from "prop-types";

DebugButtonComponent.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.element
};

export default class DebugButtonComponent extends React.Component {
    render() {
        if(!window.isDeveloperModeEnabled()) {
            return null;
        }

        return <button className="button is-danger is-debug-button" onClick={() => this.props.onClick()}>
            {this.props.children}
        </button>;
    }
}
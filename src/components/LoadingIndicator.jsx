import React from "react";

export default class LoadingIndicator extends React.Component {

    render() {
        return <React.Fragment>
            <div className="db-loading">
                <div className="db-backdrop"></div>
                <i className="fas fa-spinner fa-spin"></i>
            </div>
        </React.Fragment>;
    }
}
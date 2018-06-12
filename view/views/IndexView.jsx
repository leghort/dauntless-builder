import React from "react";

import {Link} from "react-router-dom";

export default class IndexView extends React.Component {
    render() {
        return <div>
            <h1 className="title">Hello!</h1>
            <h2 className="subtitle">World!</h2>

            <p>Lorem ipsum dolor sit amet!</p>

            <Link to="/b/new">
                <button className="button is-dark">
                    <i className="fas fa-plus"></i>&nbsp;
                    Make a new build!
                </button>
            </Link>
        </div>;
    }
}
import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import IndexView from "./views/IndexView";
import BuildView from "./views/BuildView";

require("styles/main.scss");

class App extends React.Component {
    render() {
        return <Router>
            <React.Fragment>
                <div className="container">
                    <Link to="/">
                        <img className="logo" src="/assets/logo.png" />
                    </Link>

                    <div className="card">
                        <Route exact path="/" component={IndexView} />
                        <Route path="/b/:buildData" component={BuildView} />
                    </div>

                    <div className="footers">
                        <a href="https://github.com/atomicptr/dauntless-builder" target="_blank"><i className="fab fa-github"></i></a>
                    </div>
                </div>
            </React.Fragment>
        </Router>;
    }
}

ReactDOM.render(<App />, document.querySelector("#app"));
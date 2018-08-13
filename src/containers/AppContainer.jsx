import React from "react";

import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";

import IndexRoute from "../routes/IndexRoute";
import BuildRoute from "../routes/BuildRoute";
import FavoritesRoute from "../routes/FavoritesRoute";
import DevRoute from "../routes/DevRoute";

import DataUtility from "../utility/DataUtility";

import LoadingIndicator from "../components/LoadingIndicator";
import Footer from "../components/Footer";

import "styles/main.scss";

export default class AppContainer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        DataUtility.loadData().then(success => {
            if(success) {
                this.setState({
                    loading: false
                });
            }
        });
    }

    render() {
        if(this.state.loading) {
            return <LoadingIndicator />;
        }

        return <Router>
            <React.Fragment>
                <div className="container">
                    <Link to="/">
                        <img className="logo" src="/assets/logo.png" />
                    </Link>

                    <div className="card">
                        <Switch>
                            <Route exact path="/" component={IndexRoute} />
                            <Route path="/b/:buildData" component={BuildRoute} />
                            <Route path="/favorites" component={FavoritesRoute} />
                            <Route path="/dev/:tab" component={DevRoute} />
                            <Route path="/dev" render={() => <Redirect to="/dev/Main" />} />
                            <Redirect to="/" />
                        </Switch>
                    </div>

                    <Footer />
                </div>
            </React.Fragment>
        </Router>;
    }
}
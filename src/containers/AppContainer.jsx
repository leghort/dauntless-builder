import React from "react";

import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";

import Helmet from "react-helmet";

import IndexRoute from "../routes/IndexRoute";
import BuildRoute from "../routes/BuildRoute";
import FavoritesRoute from "../routes/FavoritesRoute";
import PrivacyRoute from "../routes/PrivacyRoute";

import DataUtility from "../utility/DataUtility";

import LoadingIndicator from "../components/LoadingIndicator";
import Footer from "../components/Footer";

import "styles/main.scss";
import SettingsUtility from "../utility/SettingsUtility";

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

    getExtraClasses() {
        let classes = [];

        if (SettingsUtility.has("theme")) {
            classes.push(`is-${SettingsUtility.get("theme")}mode`);
        }

        return classes.join(" ");
    }

    render() {
        if(this.state.loading) {
            return <LoadingIndicator />;
        }

        return <React.Fragment>
            <Helmet>
                <title>Dauntless Builder</title>
                <meta name="description" content="Créez et partagez des builds Dauntless avec vos amis!" />

                <meta property="og:site_name" content="Dauntless Builder" />
                <meta property="og:title" content="Dauntless Builder" />
                <meta property="og:description" content="Créez et partagez des builds Dauntless avec vos amis!" />
                <meta property="og:url" content="https://www.dauntless-builder.fr" />
                <meta property="og:image" content="https://www.dauntless-builder.fr/assets/icon.png" />

                <script type='application/ld+json'>{`
                    {
                        "@context": "http://www.schema.org",
                        "@type": "WebSite",
                        "name": "Dauntless Builder",
                        "description": "Créez et partagez des builds Dauntless avec vos amis!",
                        "image": "https://www.dauntless-builder.fr/assets/icon.png",
                        "url": "https://www.dauntless-builder.fr"
                    }
                `}</script>
            </Helmet>
            <Router>
                <React.Fragment>
                    <div className={"primary-container container " + this.getExtraClasses()}>
                        <Link to="/">
                            <img className="logo" src="/assets/logo.png" />
                        </Link>

                        <div className="card">
                            <Switch>
                                <Route exact path="/" component={IndexRoute} />
                                <Route path="/b/:buildData" component={BuildRoute} />
                                <Route path="/favorites" component={FavoritesRoute} />
                                <Route path="/privacy" component={PrivacyRoute} />
                                <Redirect to="/" />
                            </Switch>
                        </div>

                        <Footer />
                    </div>
                </React.Fragment>
            </Router>
        </React.Fragment>;
    }
}

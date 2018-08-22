import React from "react";

export default class PrivacyRoute extends React.Component {

    getMatomoOptoutLink() {
        return "https://stats.dauntless-builder.com/index.php?module=CoreAdminHome&action=optOut&language=en&" +
            "backgroundColor=&fontColor=&fontSize=&fontFamily=";
    }

    renderMatomoIframe() {
        return <iframe
            style={{border: "0", height: "200px", width: "600px"}}
            src={this.getMatomoOptoutLink()}></iframe>;
    }

    render() {
        return <React.Fragment>
            <h2 className="title">Privacy</h2>

            <p>
                This site uses <a href="https://matomo.org/" target="_blank" rel="noopener noreferrer">Matomo</a> to
                analyze traffic and help us to improve your user experience.
            </p>

            <h3 style={{marginTop: "1.5rem"}} className="subtitle">What we collect</h3>

            <ul>
                <li>
                    <strong>Usage data</strong> - when you visit our site, we will store which parts of our site you
                    visit, your <strong>anonymized</strong> IP address, information from the device you&#39;re using
                    (operating system, browser, screen resolution, language, country you&#39;re located in) and&nbsp;
                    <a href="https://matomo.org/faq/general/faq_18254/" target="_blank" rel="noopener noreferrer">more</a>.
                    We process this data for statistical purposes, to improve our site.
                </li>
            </ul>

            <h3 style={{marginTop: "1.5rem"}} className="subtitle">Opt-out of Matomo</h3>

            <p>
                You can opt out of being tracked by our Matomo below or via this&nbsp;
                <a href={this.getMatomoOptoutLink()} target="_blank" rel="noopener noreferrer">link</a>.
            </p>

            {this.renderMatomoIframe()}
        </React.Fragment>;
    }
}
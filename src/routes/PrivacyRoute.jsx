import React from "react";

export default class PrivacyRoute extends React.Component {

    getOptoutLink() {
        return "https://tools.google.com/dlpage/gaoptout";
    }

    render() {
        return <React.Fragment>
            <h2 className="title">Vie privée</h2>

            <p>
                Ce site utilise <a href="https://marketingplatform.google.com/about/analytics/" target="_blank" rel="noopener noreferrer">Google Analytics</a> afin
                d'analyser le trafic, cela nous aider à améliorer votre expérience utilisateur.
            </p>

            <h3 style={{marginTop: "1.5rem"}} className="subtitle">Ce que nous collectons</h3>

            <ul>
                <li>
                    <strong>Utilisation des données</strong> - lorsque vous naviguez sur notre site,
                    nous recueillons certaines informations sur les pages que vous visitez, 
                    l'appareil que vous utilisez (système d'exploitation, navigateur, résolution d'écran, langue, pays dans lequel vous vous trouvez) et
                    <a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener noreferrer"> plus</a>.
                    Nous traitons ces données à des fins statistiques, afin d'améliorer notre site.
                </li>
            </ul>

            <h3 style={{marginTop: "1.5rem"}} className="subtitle">Désactiver Google Analytics</h3>

            <p>
                Vous pouvez choisir de ne pas être suivi par notre Google Analytics via ce &nbsp;
                <a href={this.getOptoutLink()} target="_blank" rel="noopener noreferrer">lien</a>.
            </p>
        </React.Fragment>;
    }
}

import React from "react";
import SettingsUtility from "../utility/SettingsUtility";

export default class DarkModeToggle extends React.Component {

    toggleDarkMode() {
        SettingsUtility.setDarkModeEnabled(
            !SettingsUtility.isDarkModeEnabled()
        );

        window.location.reload();
    }

    render() {
        if(SettingsUtility.isDarkModeEnabled()) {
            return <a className="dropdown-item" onClick={() => this.toggleDarkMode()} title="Dark Mode">
                <i className="fas fa-sun"></i> Disable &quot;Photophobia&quot; Mode
            </a>;
        }

        return <a className="dropdown-item" onClick={() => this.toggleDarkMode()} title="Dark Mode">
            <i className="fas fa-moon"></i> Enable &quot;Photophobia&quot; Mode
        </a>;
    }
}

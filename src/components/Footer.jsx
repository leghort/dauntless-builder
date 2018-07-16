import React from "react";

import DataUtil from "../utils/DataUtil";

export default class Footer extends React.Component {
    render() {
        const misc = DataUtil.data().misc;
        const buildTime = new Date(misc.build_time);

        return <div className="footers">
            <span className="footer-link">
                <a
                    href={`https://playdauntless.com/patch-notes/${misc.patchnotes_version_string}`}
                    target="_blank" rel="noopener noreferrer"
                    title={`Build time: ${buildTime.toDateString()} ${buildTime.toTimeString()}`}>
                        Dauntless <b>v{misc.dauntless_version}</b>
                </a>
            </span>
            <span className="footer-link">
                <a href="https://github.com/atomicptr/dauntless-builder" target="_blank" rel="noopener noreferrer">
                    <span className="icon"><i className="fab fa-github"></i></span>Github
                </a>
            </span>
            <span className="footer-link">
                <a href="https://github.com/atomicptr/dauntless-builder/issues" target="_blank" rel="noopener noreferrer">
                    <span className="icon"><i className="fas fa-comment"></i></span>Feedback
                </a>
            </span>
            <span className="footer-link">
                <a href="https://buymeacoff.ee/atomicptr" target="_blank" rel="noopener noreferrer">
                    <span className="icon"><i className="fas fa-heart"></i></span>Donate
                </a>
            </span>
        </div>;
    }
}
import React from 'react';
import { Link } from 'react-router-dom';
import { PathHelper } from 'scrap-mechanic-common';
import { Modpack } from 'totemod-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faShapes, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

enum EButtonState {
    UNKNOWN,
    ERROR,
    CHECKING_INSTALLED,
    NEEDS_INSTALLING,
    INSTALLING,
    CHECKING_BUILT,
    NEEDS_BUILDING,
    BUILDING,
    PLAYABLE
}

export default class ModCard extends React.Component {
    props!: {modpack: Modpack};
    state = {
        buttonState: EButtonState.UNKNOWN
    }

    setButtonState(buttonState: EButtonState) {
        console.log(`[${this.props.modpack.config.name}] Setting button state: ${EButtonState[this.state.buttonState]}`)
        this.setState({ buttonState: buttonState });
    }

    async updateButtonState() {
        console.log(`[${this.props.modpack.config.name}] Updating button state`);

        if (this.props.modpack.isPlayable === undefined) {
            if (this.props.modpack.isInstalled === undefined) {
                this.setButtonState(EButtonState.CHECKING_INSTALLED);
                await this.props.modpack.checkInstalled();
            }
    
            if (!this.props.modpack.isInstalled) {
                this.setButtonState(EButtonState.NEEDS_INSTALLING);
                return;
            }

            if (this.props.modpack.isBuilt === undefined) {
                this.setButtonState(EButtonState.CHECKING_BUILT);
                await this.props.modpack.checkBuilt();
            }

            if (!this.props.modpack.isBuilt) {
                this.setButtonState(EButtonState.NEEDS_BUILDING);
                return;
            }

            this.setButtonState(EButtonState.PLAYABLE);
        }
    }

    async componentDidMount() {
        await this.updateButtonState();
    }

    dropdownButton = () => {
        return (
            <div className="dropdown with-arrow float-right">
                <button className="btn btn-square" data-toggle="dropdown" type="button" id={`dropdown-${this.props.modpack.config.localId}`} aria-haspopup="true" aria-expanded="false">
                    <FontAwesomeIcon icon={ faEllipsisH }/>
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby={`dropdown-${this.props.modpack.config.localId}`}>
                    <Link to="/modpacks/edit/config" className="dropdown-item">Edit config</Link>
                    <Link to="/modpacks/edit/mods" className="dropdown-item">Edit mods</Link>
                </div>
            </div>
        )
    }

    modpackButton = () => {
        console.log(`[${this.props.modpack.config.name}] Rendering button state: ${EButtonState[this.state.buttonState]}`);

        switch(this.state.buttonState) {
            case EButtonState.ERROR:
                return (
                    <button className="btn btn-danger btn-block" onClick={this.updateButtonState}>
                        Error, retry?
                    </button>
                );

            case EButtonState.CHECKING_INSTALLED:
                return (
                    <button className="btn btn-primary btn-block" disabled>
                        Checking if installed
                    </button>
                );

            case EButtonState.NEEDS_INSTALLING:
                return (
                    <button className="btn btn-primary btn-block" onClick={async () => {
                        this.setButtonState(EButtonState.INSTALLING);
                        try {
                            await this.props.modpack.install();
                            await this.updateButtonState();
                        } catch(ex) {
                            console.error(ex);
                        }
                    }}>
                        <FontAwesomeIcon icon={ faDownload } className="mr-5" />
                        Install
                    </button>
                );

            case EButtonState.INSTALLING:
                return (
                    <button className="btn btn-primary btn-block" disabled>
                        Installing
                    </button>
                );

            case EButtonState.CHECKING_BUILT:
                return (
                    <button className="btn btn-primary btn-block" disabled>
                        Checking if built
                    </button>
                );

            case EButtonState.NEEDS_BUILDING:
                return (
                    <button className="btn btn-primary btn-block" onClick={async () => {
                        this.setButtonState(EButtonState.BUILDING);
                        try {
                            await this.props.modpack.build();
                            await this.updateButtonState();
                        } catch(ex) {
                            console.error(ex);
                        }
                    }}>
                        <FontAwesomeIcon icon={ faShapes } className="mr-5" />
                        Build
                    </button>
                );

            case EButtonState.BUILDING:
                return (
                    <button className="btn btn-primary btn-block" disabled>
                        Building
                    </button>
                );

            case EButtonState.PLAYABLE:
                return (
                    <button className="btn btn-primary btn-block">
                        Play
                    </button>
                );
    
            default:
                return <button className="btn btn-primary btn-block" disabled>???</button>;
        }
    }

    render() {

        return (
            <div className="mw-full">
                <div className="card p-0 m-0">
                    <img src={PathHelper.expandPathPlaceholders("$GAME_DATA/ExampleMods/Blocks and Parts/preview.jpg")} className="img-fluid rounded-top" />
                    <div className="content">
                        <h2 className="content-title">
                            {this.props.modpack.config.name}
                            { this.dropdownButton() }
                        </h2>
                        <p className="text-muted" style={{ overflowWrap: "break-word" }}>
                            {this.props.modpack.config.description}
                        </p>
                        { this.modpackButton() }
                    </div>
                </div>
            </div>
        )
    }
}

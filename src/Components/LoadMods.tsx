import React, { Component } from 'react';
import Settings from '../settings';
import { WorkshopModManager } from 'scrap-mechanic-common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faTimesCircle, faRedo } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

type ProgressState = "LOADING" | "SUCCESS" | "WARNING" | "ERROR";

export default class LoadMods extends Component {
    public static defaultProps = {
        parseShapesets: false
    }

    props!: {
        children?: React.ReactNode,
        parseShapesets: boolean
    };

    state: {
        isDone: boolean,
        progress: number,
        status: ProgressState,
        message: string
    } = {
        isDone: false,
        progress: 0,
        status: "LOADING",
        message: ""
    }

    load() {
        const loadMods = async () => {
            try {

                if (Settings.isSetup && Object.keys(WorkshopModManager.mods).length === 0){
                    
                    await this.setState({
                        isDone: false,
                        progress: 0.5,
                        status: "LOADING",
                        message: "Loading mods"
                    });
                    
                    // Force redraw (couldn't find another way)
                    await new Promise(resolve => setTimeout(resolve, 0));
                    
                    // TODO: make WorkshopModManager.reloadMods async
                    let { modCount, shapeCount } = WorkshopModManager.reloadMods(this.props.parseShapesets);
                    
                    this.setState({
                        isDone: true,
                        progress: 1,
                        status: "SUCCESS",
                        message: `Loaded ${modCount} mods` + (this.props.parseShapesets ? ` with ${shapeCount} shapes` : "")
                    });
                } else {
                    this.setState({
                        isDone: true,
                        progress: 1,
                        status: "SUCCESS",
                        message: "Mods already loaded"
                    });
                }

            } catch (ex) {
                this.setState({
                    isDone: false,
                    status: "ERROR",
                    message: `Failed loading mods: ${ex}`
                });
            }
        }

        if (!Settings.checkSetup()) {
            this.setState({
                isDone: false,
                progress: 1,
                status: "LOADING",
                message: "Looking for installation"
            });

            Settings.setup().then(loadMods).catch(reason => {
                console.error(reason)

                this.setState({
                    isDone: false,
                    status: "ERROR",
                    message: `Failed finding installation: ${reason}`
                });
            });
        } else {
            loadMods();
        }
    }

    componentDidMount() {
        this.load();
    }

    render() {
        let progressStyle: React.CSSProperties = {
            width: `${this.state.progress * 100}%`
        }

        const ProgressIcon = () => {
            switch(this.state.status) {
                case "SUCCESS":
                    return <FontAwesomeIcon icon={faCheckCircle} className="text-success font-size-16"/>
                case "WARNING":
                    return <FontAwesomeIcon icon={faExclamationTriangle} className="text-secondary font-size-16"/>
                case "ERROR":
                    return <FontAwesomeIcon icon={faTimesCircle} className="text-danger font-size-16"/>
            }

            return null;
        }

        const statusToColor = {
            "LOADING": "primary",
            "SUCCESS": "success",
            "WARNING": "secondary",
            "ERROR": "danger",
        }

        return this.state.isDone ? (
            <>
                {this.props.children}
            </>
        ) : (
            <div>
                <div className="progress-group">
                    <div className="progress">
                        <div className={classNames("progress-bar", {"progress-bar-animated": this.state.status === "LOADING"}, `bg-${statusToColor[this.state.status]}`)} role="progressbar" style={progressStyle}></div>
                    </div>
                    <ProgressIcon />
                </div>
                <div className="text-center">
                    {this.state.message}
                </div>
                {(() => {
                    if (this.state.status === "ERROR") {
                        return (
                            <div className="text-center mt-5">
                                <button className="btn btn-primary" type="button" onClick={this.load.bind(this)}>
                                    <FontAwesomeIcon icon={faRedo}/> Retry
                                </button>
                            </div>
                        );
                    }
                    return null;
                })()}
            </div>
        )
    }
}

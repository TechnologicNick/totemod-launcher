import React, { Component } from 'react';
import { PathHelper, WorkshopModManager } from 'scrap-mechanic-common';
import halfmoon from 'halfmoon';
import ModCard from './ModCard';

export default class ModSearch extends Component {
    public static defaultProps = {
        includeFake: false
    }

    props!: { includeFake: boolean; };

    state = {
        filter: ""
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ filter: event.target.value });
    };

    render() {

        if (!PathHelper.USER_MODS_DIR) {
            if (!PathHelper.findUserDir()) {
                halfmoon.initStickyAlert({
                    content: "Unable to find user directory.",
                    title: "Warning while loading mods",
                    alertType: "alert-secondary", // Optional, type of the alert, default: "", must be "alert-primary" || "alert-success" || "alert-secondary" || "alert-danger"
                });
            }
        }

        if (!PathHelper.INSTALLATION_DIR) {
            PathHelper.findSMInstallDir().then(found => {
                if (found) {
                    PathHelper.updatePaths();
                    WorkshopModManager.reloadMods(false);
                    this.forceUpdate();
                } else {
                    halfmoon.initStickyAlert({
                        content: "Unable to find Scrap Mechanic installation. Select it manually in the settings.",
                        title: "Warning while loading mods",
                        alertType: "alert-secondary", // Optional, type of the alert, default: "", must be "alert-primary" || "alert-success" || "alert-secondary" || "alert-danger"
                    });
                }
            });
        } else if(Object.keys(WorkshopModManager.mods).length === 0){
            WorkshopModManager.reloadMods(false);
        }

        const { filter } = this.state;
        const lowercasedFilter = filter.toLowerCase();
        const filteredMods = Object.values(WorkshopModManager.mods)
            .filter(mod => this.props.includeFake || !mod.isFake)
            .filter(mod => Object.values(mod.description).find(value => {
                return value?.toString().toLowerCase().includes(lowercasedFilter);
            }));

        return (
            <div className="container-fluid">
                <input type="text" className="form-control" placeholder="Search (name, description, id)" value={filter} onChange={this.handleChange}></input>
                <div>
                    {filteredMods.map(mod => <ModCard key={mod.description.localId} mod={mod}/>)}
                </div>
            </div>
        )
    }
}

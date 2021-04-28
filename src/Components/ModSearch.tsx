import React, { Component } from 'react';
import { WorkshopModManager } from 'scrap-mechanic-common';
import Settings from '../settings';
import ModSearchRow from './ModSearchRow';

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

        if (Settings.isSetup === undefined) {
            if (!Settings.checkSetup()) {
                Settings.setup().then(() => this.forceUpdate());
            }
        }

        if (Settings.isSetup && Object.keys(WorkshopModManager.mods).length === 0){
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
            <div className="ModSearch container-fluid">
                <input type="text" className="form-control" placeholder="Search (name, description, id)" value={filter} onChange={this.handleChange}></input>
                <table className="table" style={{ tableLayout: "fixed" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "calc(10rem * 16/9)" }}></th> {/* Set the width of the image column */}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMods.map(mod => <ModSearchRow key={mod.description.localId} mod={mod}/>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

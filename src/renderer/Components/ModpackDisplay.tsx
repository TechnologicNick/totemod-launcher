import { Component } from 'react';
import Settings from '../settings';
import { ModpackManager } from 'totemod-core';
import ModpackCard from './ModpackCard';

export default class ModpackDisplay extends Component {
    
    render() {

        if (Settings.isSetup === undefined) {
            if (!Settings.checkSetup()) {
                Settings.setup().then(() => this.forceUpdate());
            }
        }
    
        if (Settings.isSetup && !ModpackManager.isLoaded) {
            ModpackManager.reloadModpacks().then(() => this.forceUpdate());
        }

        return (
            <div className="border-top" style={{ paddingBlock: "var(--content-and-card-spacing)", display: "grid", counterReset: "grid-items", columnGap: "var(--content-and-card-spacing)", rowGap: "var(--content-and-card-spacing)", gridTemplateColumns: "repeat(auto-fill, minmax(30rem, 1fr))" }}>
                {Object.values(ModpackManager.modpacks).map(modpack => <ModpackCard key={modpack.config.localId} modpack={modpack}/>)}
            </div>
        )
    }
}

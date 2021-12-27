import React from 'react';
import ModDnd from '../Components/ModDnd';
import LoadMods from '../Components/LoadMods';
import { WorkshopModManager } from 'scrap-mechanic-common';

export default function PageModpacksEditMods() {
    let Dnd = () => {
                    
        let mods = Object.values(WorkshopModManager.mods).filter(mod => !mod.isFake);
        let half = Math.floor(mods.length / 2);
    
        console.log(mods.slice(half, mods.length))
    
        return <ModDnd modsEnabled={mods.slice(half, mods.length)}/>
    }

    return (
        <div className="content">
            <h2 className="content-title">
                Mod selection
            </h2>
            <LoadMods>
                <Dnd />
            </LoadMods>
        </div>
    )
}

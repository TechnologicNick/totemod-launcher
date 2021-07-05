import React from 'react';
import ModDnd from '../Components/ModDnd';
import LoadMods from '../Components/LoadMods';

export default function PageModpacksEditMods() {
    return (
        <div className="content">
            <h2 className="content-title">
                Mod selection
            </h2>
            <LoadMods>
                <ModDnd modsEnabled={[]}/>
            </LoadMods>
        </div>
    )
}

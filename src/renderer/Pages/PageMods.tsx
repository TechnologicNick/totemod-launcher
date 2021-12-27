import React from 'react';
import ModSearch from '../Components/ModSearch';
import LoadMods from '../Components/LoadMods';

export default function PageMods() {
    return (
        <div className="content">
            <h2 className="content-title">
                Installed mods
            </h2>
            <LoadMods>
                <ModSearch />
            </LoadMods>
        </div>
    )
}

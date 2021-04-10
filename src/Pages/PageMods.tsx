import React from 'react';
import ModSearch from './ModSearch';

export default function PageMods() {
    return (
        <div className="content">
            <h2 className="content-title">
                Installed mods
            </h2>
            <ModSearch />
        </div>
    )
}

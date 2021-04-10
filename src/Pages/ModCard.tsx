import React from 'react';
import { WorkshopMod } from 'scrap-mechanic-common';

export default function ModCard(props: {mod: WorkshopMod}) {
    return (
        <div className="w-400 mw-full">
            <div className="card p-0">
                <img src={props.mod.preview} className="img-fluid rounded-top" />
                <div className="content">
                    <h2 className="content-title">
                        {props.mod.description.name}
                    </h2>
                    <p className="text-muted" style={{ overflowWrap: "break-word" }}>
                        {props.mod.description.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

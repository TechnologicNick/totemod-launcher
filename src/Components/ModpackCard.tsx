import React from 'react';
import { PathHelper } from 'scrap-mechanic-common';
import { Modpack } from 'totemod-core';

export default function ModCard(props: {modpack: Modpack}) {
    return (
        <div className="mw-full">
            <div className="card p-0 m-0">
                <img src={PathHelper.expandPathPlaceholders("$GAME_DATA/ExampleMods/Blocks and Parts/preview.jpg")} className="img-fluid rounded-top" />
                <div className="content">
                    <h2 className="content-title">
                        {props.modpack.config.name}
                    </h2>
                    <p className="text-muted" style={{ overflowWrap: "break-word" }}>
                        {props.modpack.config.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

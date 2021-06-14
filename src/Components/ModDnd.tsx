import React, { Component } from 'react'
import { WorkshopMod, WorkshopModManager } from 'scrap-mechanic-common';
import Settings from '../settings';
import ModSearch from './ModSearch';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';

export default class ModDnd extends Component {

    modsDisabled!: WorkshopMod[];
    modsEnabled!: WorkshopMod[];

    onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        console.log(result, provided);
    }

    render() {
        if (!this.modsDisabled || !this.modsEnabled) {
            let mods = Object.values(WorkshopModManager.mods);
            let half = Math.floor(mods.length / 2);

            this.modsDisabled = mods.slice(0, half - 1);
            this.modsEnabled = mods.slice(half, mods.length);
        }

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="d-flex" style={{ columnGap: "3rem" }}>
                    <div className="w-full">
                        <ModSearch droppableId="disabled" mods={this.modsDisabled}/>
                    </div>
                    <div className="w-full">
                        <ModSearch droppableId="enabled" mods={this.modsEnabled}/>
                    </div>
                </div>
            </DragDropContext>
        )
    }
}

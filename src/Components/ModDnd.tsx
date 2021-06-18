import React, { Component } from 'react'
import { WorkshopMod, WorkshopModManager } from 'scrap-mechanic-common';
import Settings from '../settings';
import ModSearch from './ModSearch';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';

function moveItem<T extends any[]>(arr: T, from: number, to: number) {
    let clonedArr = Array.from(arr);
    let [removed] = clonedArr.splice(from, 1);
    clonedArr.splice(to, 0, removed);

    return clonedArr;
}

export default class ModDnd extends Component {

    constructor(props: {}) {
        super(props);

        // Fill lists with mods
        let mods = Object.values(WorkshopModManager.mods).filter(mod => !mod.isFake);
        let half = Math.floor(mods.length / 2);

        this.state = {
            modsDisabled: mods.slice(0, half - 1),
            modsEnabled: mods.slice(half, mods.length)
        };
    }

    state: {
        modsDisabled: WorkshopMod[],
        modsEnabled: WorkshopMod[],
    } = {
        modsDisabled: [],
        modsEnabled: [],
    }

    onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        console.log(result, provided);

        const { source, destination } = result;

        // Dropped outside of Droppables
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            if (source.droppableId === "disabled") {
                this.setState({
                    modsDisabled: moveItem(this.state.modsDisabled, source.index, destination.index)
                });
            } else if (source.droppableId === "enabled") {
                this.setState({
                    modsEnabled: moveItem(this.state.modsEnabled, source.index, destination.index)
                });
            }
        }
    }

    render() {
        console.table(this.state);

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="d-flex" style={{ columnGap: "3rem" }}>
                    <div className="w-full">
                        <ModSearch droppableId="disabled" mods={this.state.modsDisabled}/>
                    </div>
                    <div className="w-full">
                        <ModSearch droppableId="enabled" mods={this.state.modsEnabled}/>
                    </div>
                </div>
            </DragDropContext>
        )
    }
}

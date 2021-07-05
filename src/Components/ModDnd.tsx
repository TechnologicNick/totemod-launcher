import React, { Component } from 'react'
import { WorkshopMod, WorkshopModManager } from 'scrap-mechanic-common';
import Settings from '../settings';
import ModSearch from './ModSearch';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';

function moveItemSame<T extends any[]>(arr: T, indexFrom: number, indexTo: number) {
    let clonedArr = Array.from(arr);
    let [removed] = clonedArr.splice(indexFrom, 1);
    clonedArr.splice(indexTo, 0, removed);

    return clonedArr;
}

function moveItemBetween<T extends any[]>(arrFrom: T, arrTo: T, indexFrom: number, indexTo: number) {
    let clonedArrFrom = Array.from(arrFrom);
    let clonedArrTo = Array.from(arrTo);
    let [removed] = clonedArrFrom.splice(indexFrom, 1);
    clonedArrTo.splice(indexTo, 0, removed);

    return [ clonedArrFrom, clonedArrTo ];
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

        let idToList: {[key: string]: WorkshopMod[]} = {
            ["disabled"]: this.state.modsDisabled,
            ["enabled"]: this.state.modsEnabled
        }

        let srcList = idToList[source.droppableId];
        let destList = idToList[destination.droppableId];

        if (source.droppableId === destination.droppableId) {
            if (source.droppableId === "disabled") {
                this.setState({
                    modsDisabled: moveItemSame(this.state.modsDisabled, source.index, destination.index)
                });
            } else if (source.droppableId === "enabled") {
                this.setState({
                    modsEnabled: moveItemSame(this.state.modsEnabled, source.index, destination.index)
                });
            }
        } else {
            let [ src, dest ] = moveItemBetween(srcList, destList, source.index, destination.index);

            if (source.droppableId === "disabled") {
                this.setState({
                    modsDisabled: src,
                    modsEnabled: dest
                });
            } else if (source.droppableId === "enabled") {
                this.setState({
                    modsDisabled: dest,
                    modsEnabled: src
                });
            }
        }
    }

    render() {
        let modSearchWidth: React.CSSProperties = {
            width: "calc((100% - 3rem) / 2)"
        } 

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="w-full">
                    <div className="float-left" style={modSearchWidth}>
                        <ModSearch droppableId="disabled" mods={this.state.modsDisabled}/>
                    </div>
                    <div className="float-right" style={modSearchWidth}>
                        <ModSearch droppableId="enabled" mods={this.state.modsEnabled}/>
                    </div>
                </div>
            </DragDropContext>
        )
    }
}

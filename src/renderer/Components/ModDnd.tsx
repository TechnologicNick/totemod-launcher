import React, { Component } from 'react'
import { WorkshopMod, WorkshopModManager } from 'scrap-mechanic-common';
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

type PropsModDnd = {
    mods?: WorkshopMod[],
    modsDisabled?: WorkshopMod[],
    modsEnabled: WorkshopMod[],
}

export default class ModDnd extends Component {
    props!: PropsModDnd;

    constructor(props: PropsModDnd) {
        super(props);
        this.props = props;

        if (this.props.mods && this.props.modsDisabled && this.props.modsEnabled) {
            throw "Can't have `mods` prop when both `modsDisabled` and `modsEnabled` props are set";
        }
        
        if (this.props.modsDisabled && this.props.modsEnabled) {
            this.state = {
                modsDisabled: this.props.modsDisabled,
                modsEnabled: this.props.modsEnabled
            };
        } else {
            let mods = this.props.mods ?? Object.values(WorkshopModManager.mods).filter(mod => !mod.isFake);
            let enabled = this.props.modsEnabled;
            let disabled = this.props.modsDisabled ?? mods.filter(mod => !enabled.includes(mod));

            this.state = {
                modsDisabled: disabled,
                modsEnabled: enabled
            };
        }

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
            // Move inside the same list
            if (source.droppableId === "disabled") {
                this.setState({
                    modsDisabled: moveItemSame(srcList, source.index, destination.index)
                });
            } else if (source.droppableId === "enabled") {
                this.setState({
                    modsEnabled: moveItemSame(srcList, source.index, destination.index)
                });
            }
        } else {
            // Move between lists
            let srcIndex = srcList.findIndex(mod => mod.description.localId === result.draggableId);
            let [ src, dest ] = moveItemBetween(srcList, destList, srcIndex, destination.index);

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
                        <ModSearch droppableId="enabled" mods={this.state.modsEnabled} muteFiltered={true}/>
                    </div>
                </div>
            </DragDropContext>
        )
    }
}

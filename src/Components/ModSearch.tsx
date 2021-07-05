import React, { Component, ReactElement } from 'react';
import { WorkshopMod, WorkshopModManager } from 'scrap-mechanic-common';
import Settings from '../settings';
import ModSearchRow from './ModSearchRow';
import { useResizeDetector } from 'react-resize-detector';
import { Draggable, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot, DraggableProvided } from 'react-beautiful-dnd';
import './ModSearch.global.scss';

export default class ModSearch extends Component {
    public static defaultProps = {
        includeFake: false,
        droppableId: undefined,
        mods: undefined,
        muteFiltered: false
    }

    props!: {
        includeFake: boolean,
        droppableId?: string,
        mods: WorkshopMod[],
        muteFiltered?: boolean
    };

    state = {
        filter: ""
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ filter: event.target.value });
    };

    render() {

        const mods = this.props.mods ?? Object.values(WorkshopModManager.mods)

        const { filter } = this.state;
        const lowercasedFilter = filter.toLowerCase();
        const filteredMods = mods
            .filter(mod => this.props.includeFake || !mod.isFake)
            .filter(mod => Object.values(mod.description).find(value => {
                return value?.toString().toLowerCase().includes(lowercasedFilter);
            }));

        return (
            <div className="ModSearch container-fluid">
                <input type="text" className="form-control" placeholder="Search (name, description, id)" value={filter} onChange={this.handleChange}></input>
                {(() => {
                    if (this.props.droppableId) {
                        return (
                            <Droppable droppableId={ this.props.droppableId ?? "" }>
                                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                                    <div className="list" ref={ provided.innerRef }>
                                        {(this.props.muteFiltered ? mods : filteredMods).map((mod, index) => (
                                            <Draggable
                                                key={mod.description.localId}
                                                draggableId={mod.description.localId}
                                                index={index}
                                            >
                                                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                                    <ModSearchRow
                                                        key={mod.description.localId}
                                                        mod={mod}
                                                        draggableProvided={provided}
                                                        muted={this.props.muteFiltered && !filteredMods.includes(mod)}
                                                    />
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        )
                    } else {
                        return (
                            <div className="list">
                                {filteredMods.map(mod => <ModSearchRow key={mod.description.localId} mod={mod}/>)}
                            </div>
                        );
                    }
                })()}
            </div>
        )
    }
}

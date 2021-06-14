import React, { Component, ReactElement } from 'react';
import { WorkshopMod, WorkshopModManager } from 'scrap-mechanic-common';
import Settings from '../settings';
import ModSearchRow from './ModSearchRow';
import ConditionalWrap from 'conditional-wrap';
import { Draggable, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot, DraggableProvided } from 'react-beautiful-dnd';

export default class ModSearch extends Component {
    public static defaultProps = {
        includeFake: false,
        droppableId: undefined,
        mods: undefined
    }

    props!: {
        includeFake: boolean,
        droppableId?: string,
        mods: WorkshopMod[]
    };

    state = {
        filter: ""
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ filter: event.target.value });
    };

    render() {

        if (Settings.isSetup === undefined) {
            if (!Settings.checkSetup()) {
                Settings.setup().then(() => this.forceUpdate());
            }
        }

        if (Settings.isSetup && Object.keys(WorkshopModManager.mods).length === 0){
            WorkshopModManager.reloadMods(false);
        }

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
                <table className="table" style={{ tableLayout: "fixed" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "calc(10rem * 16/9)" }}></th>{/* Set the width of the image column */}
                            <th></th>
                        </tr>
                    </thead>
                    {(() => {
                        const items: ReactElement[] = filteredMods.map(mod => <ModSearchRow key={mod.description.localId} mod={mod}/>);

                        if (this.props.droppableId) {
                            return (
                                <Droppable droppableId={ this.props.droppableId ?? "" }>
                                    {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                                        <tbody ref={ provided.innerRef }>
                                            {filteredMods.map((mod, index) => (
                                                <Draggable
                                                    key={mod.description.localId}
                                                    draggableId={mod.description.localId}
                                                    index={index}
                                                >
                                                    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                                        // <div
                                                        //     ref={provided.innerRef}
                                                        //     {...provided.draggableProps}
                                                        //     {...provided.dragHandleProps}
                                                        // >
                                                        //     <ModSearchRow key={mod.description.localId} mod={mod}/>
                                                        // </div>
                                                        <ModSearchRow key={mod.description.localId} mod={mod} draggableProvided={provided}/>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </tbody>
                                    )}
                                </Droppable>
                            )
                        } else {
                            return (
                                <tbody>
                                    {filteredMods.map(mod => <ModSearchRow key={mod.description.localId} mod={mod}/>)}
                                </tbody>
                            );
                        }
                    })()}
                </table>
            </div>
        )
    }
}

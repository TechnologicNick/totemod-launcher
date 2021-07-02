import React, { Component } from 'react'
import { DraggableProvided } from 'react-beautiful-dnd';
import { WorkshopMod } from 'scrap-mechanic-common';
import './ModSearchRow.global.scss';

export default class ModSearchRow extends Component {
    props!: {
        mod: WorkshopMod,
        draggableProvided?: DraggableProvided
    };

    render() {
        const provided = this.props.draggableProvided;

        return (
            <div className="item"
                ref={provided?.innerRef}
                {...provided?.draggableProps}
                {...provided?.dragHandleProps}
            >
                <img src={this.props.mod.preview} className="rounded" />
                <div className="info pl-10">
                    <h2 className="m-0 ellipsis content-title">
                        {this.props.mod.description.name}
                    </h2>
                    <span className="ellipsis text-muted">
                        {this.props.mod.description.description}
                    </span>
                    <div>
                        <span className="badge">
                            Creative
                        </span>
                        <span className="badge ml-5">
                            Survival
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import { WorkshopMod } from 'scrap-mechanic-common';
import './ModSearchRow.global.scss';

export default class ModSearchRow extends Component {
    props!: {mod: WorkshopMod};

    render() {
        return (
            <tr>
                <td className="p-0">
                    <img src={this.props.mod.preview} className="h-100 rounded" />
                </td>
                <td>
                    <h2 className="d-inline-block mr-20 mb-5 content-title">
                        {this.props.mod.description.name}
                    </h2>
                    <span className="description d-inline-block text-muted">
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
                </td>
            </tr>
        )
    }
}
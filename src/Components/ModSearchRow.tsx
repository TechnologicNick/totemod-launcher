import React, { Component } from 'react'
import { WorkshopMod } from 'scrap-mechanic-common';

export default class ModSearchRow extends Component {
    props!: {mod: WorkshopMod};

    render() {
        return (
            <tr>
                <td className="p-0 w-25"> {/* Setting the width for some reason stops the cell from expanding */}
                    <img src={this.props.mod.preview} className="h-100 rounded" />
                </td>
                <td>
                    <h2 className="d-inline-block mr-20 mb-5 content-title">
                        {this.props.mod.description.name}
                    </h2>
                    <span className="d-inline-block text-muted" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", width: "100%" }}>
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

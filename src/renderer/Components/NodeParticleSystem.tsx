import { Component } from 'react'
import schemaParticleSystem from 'C:\\Users\\Nick\\Documents\\ProgrammeerProjectjes\\Scrap Mechanic Json Schemas\\schemas\\ParticleSystem.json';
import Node from './Node';
import NodeFieldNumber from './NodeFieldNumber';

export default class NodeParticleSystem extends Component {
    render() {
        const schema = schemaParticleSystem;
        const definition = "#/definitions/System";

        const props = { schema, definition };

        return (
            <div>
                <Node title="Particle System">
                    <NodeFieldNumber {...props} property="scale"/>
                    <NodeFieldNumber {...props} property="scale_time"/>
                    <NodeFieldNumber {...props} property="scale_velocity"/>
                </Node>
            </div>
        )
    }
}

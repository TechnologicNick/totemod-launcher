import { Component } from 'react'
import { JSONSchema7 } from 'json-schema';
import schemaParticleSystem from 'C:\\Users\\Nick\\Documents\\ProgrammeerProjectjes\\Scrap Mechanic Json Schemas\\schemas\\ParticleSystem.json';
import Node from './Node';
import NodeFieldNumber from './NodeFieldNumber';
import NodeFieldEnum from './NodeFieldEnum';

export default class NodeParticleSystem extends Component {
    render() {
        const schema = schemaParticleSystem as JSONSchema7;
        const definition = "#/definitions/System";

        const props = { schema, definition };

        return (
            <div>
                <Node title="Particle System">
                    <NodeFieldNumber {...props} propertyName="scale"/>
                    <NodeFieldNumber {...props} propertyName="scale_time"/>
                    <NodeFieldNumber {...props} propertyName="scale_velocity"/>
                    <NodeFieldEnum {...props} propertyName="system_type"/>
                </Node>
            </div>
        )
    }
}

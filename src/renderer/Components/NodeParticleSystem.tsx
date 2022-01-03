import { Component } from 'react'
import { JSONSchema7 } from 'json-schema';
import schemaParticleSystem from 'C:\\Users\\Nick\\Documents\\ProgrammeerProjectjes\\Scrap Mechanic Json Schemas\\schemas\\ParticleSystem.json';
import Node from './Node';
import NodeFieldNumber from './NodeFieldNumber';
import NodeFieldEnum from './NodeFieldEnum';

export default class NodeParticleSystem extends Component {

    value: {[key: string]: any} = {}

    render() {
        const schema = schemaParticleSystem as JSONSchema7;
        const definition = "#/definitions/System";

        const getValue = (propertyName: string) => this.value[propertyName];
        const setValue = (value: any, propertyName: string) => {
            this.value[propertyName] = value;
            console.log(`Set ${propertyName} to`, value, this.value);
        }

        const props = {
            schema,
            definition,
            getCurrentValue: getValue,
            onChange: setValue
        };

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

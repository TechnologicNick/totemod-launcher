import React from 'react';
import { expandRef } from './../schemas';
import type { JSONSchema7 } from 'json-schema';
import { NodeFieldProps } from './NodeField';
import './NodeField.scss';

const NodeFieldString = (props: NodeFieldProps<string>) => {
    const property: JSONSchema7 = expandRef(props.schema, `${props.definition}/properties/${props.propertyName}`);
    const label = props.propertyName;

    const value = props.getCurrentValue?.(props.propertyName) ?? property.default as string;
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange?.(event.target.value, props.propertyName);
    }

    props.onChange?.(value, props.propertyName);

    return (
        <div className="node-field">
            <span className="node-field-label">{label}</span>
            <div className="node-field-value-column">
                <input type="text" className="form-control" defaultValue={value} onChange={onChange}/>
            </div>
        </div>
    )
}

export default NodeFieldString;

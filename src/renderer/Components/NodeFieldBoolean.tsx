import React from 'react';
import { expandRef } from './../schemas';
import type { JSONSchema7 } from 'json-schema';
import { NodeFieldProps } from './NodeField';
import './NodeField.scss';

const NodeFieldBoolean = (props: NodeFieldProps<boolean>) => {
    const property: JSONSchema7 = expandRef(props.schema, `${props.definition}/properties/${props.propertyName}`);
    const label = props.propertyName;

    const selected = props.getCurrentValue?.(props.propertyName) ?? property.default as boolean;
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange?.(event.target.checked, props.propertyName);
    }

    props.onChange?.(selected, props.propertyName);

    return (
        <div className="node-field react-custom-checkbox">
            <label className="node-field-boolean">
                <input type={"checkbox"} defaultChecked={selected} onChange={onChange} />
                <span />
                {label}
            </label>
        </div>
    )
}

export default NodeFieldBoolean;

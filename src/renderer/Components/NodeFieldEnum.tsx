import React, { ReactNode, useState } from 'react';
import { expandRef } from './../schemas';
import type { JSONSchema7 } from 'json-schema';
import { NodeFieldProps } from './NodeField';
import './NodeField.scss';

const NodeFieldEnum = (props: NodeFieldProps<any> & { children?: (value: any) => ReactNode }) => {
    const property: JSONSchema7 = expandRef(props.schema, `${props.definition}/properties/${props.propertyName}`);
    const label = props.propertyName;

    if (property.enum === undefined)
        throw `Property "${props.definition}/properties/${props.propertyName}" has no enum field!`;

    const [selected, setSelected] = useState(props.getCurrentValue?.(props.propertyName) ?? property.default);

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(JSON.parse(event.target.value));
    }

    props.onChange?.(selected, props.propertyName);

    return (
        <>
            <div className="node-field">
                <span className="node-field-label">{label}</span>
                <div className="node-field-value-column">
                    <select className="form-control" defaultValue={JSON.stringify(selected)} onChange={onChange}>
                        {property.enum.map(option => {
                            const stringified = JSON.stringify(option)
                            return (
                                <option
                                    key={stringified}
                                    value={stringified}
                                >
                                    {option}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
            {props.children?.(selected)}
        </>
    )
}

export default NodeFieldEnum;

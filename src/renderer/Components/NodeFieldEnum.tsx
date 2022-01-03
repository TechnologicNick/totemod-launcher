import { expandRef } from './../schemas';
import type { JSONSchema7 } from 'json-schema';
import { NodeFieldProps } from './NodeField';
import './NodeField.scss';

const NodeFieldEnum = (props: NodeFieldProps) => {
    const property: JSONSchema7 = expandRef(props.schema, `${props.definition}/properties/${props.propertyName}`);
    const label = props.propertyName;

    const selected = JSON.stringify(property.default);

    return (
        <div className="node-field">
            <span className="node-field-label">{label}</span>
            <div className="node-field-value-column">
                <select className="form-control" defaultValue={selected}>
                    {property.enum!.map(option => {
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
    )
}

export default NodeFieldEnum;

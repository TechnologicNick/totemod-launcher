import { expandRef } from './../schemas';
import type { JSONSchema7 } from 'json-schema';
import './NodeField.scss';

const NodeFieldEnum = (props: { schema: any, definition: string, propertyName: string }) => {
    const property: JSONSchema7 = expandRef(props.schema, `${props.definition}/properties/${props.propertyName}`);
    const label = props.propertyName;

    return (
        <div className="node-field">
            <span className="node-field-label">{label}</span>
            <div className="node-field-value-column">
                <select className="form-control">
                    {property.enum!.map(option => (
                        <option
                            value={JSON.stringify(option)}
                            selected={option === property.default || undefined}
                        >
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default NodeFieldEnum;

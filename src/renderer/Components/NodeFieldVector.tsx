import type { NodeFieldProps } from './NodeField';
import { expandRefOnce } from './../schemas';
import NodeFieldNumber from './NodeFieldNumber';
import NodeFieldGroup from './NodeFieldGroup';
import './NodeField.scss';

const NodeFieldVector = (props: NodeFieldProps<object>) => {

    const label = props.propertyName;
    const value: {[key: string]: any} = props.getCurrentValue?.(props.propertyName) ?? {};

    const pointer = `${props.definition}/properties/${props.propertyName}`;
    const base = expandRefOnce(props.schema, pointer);
    if (!base.hasOwnProperty("$ref"))
        throw `Property "${pointer}" has no $ref property! Only references to definitions are supported.`;



    let textRight: HTMLSpanElement | null;

    const updateTextRight = () => {
        if (textRight)
            textRight.textContent = `${value.x?.toFixed(3)} ${value.y?.toFixed(3)} ${value.z?.toFixed(3)}`;
    }

    const getValue = (propertyName: string) => value[propertyName];
    const setValue = (newValue: any, propertyName: string) => {
        value[propertyName] = newValue;
        console.log(`Set ${props.propertyName}.${propertyName} to`, newValue, value);
        props.onChange?.(value, props.propertyName);
        updateTextRight();
    }

    const numberProps: NodeFieldProps<number> = {
        schema: props.schema,
        definition: base.$ref,
        propertyName: props.definition,
        getCurrentValue: getValue,
        onChange: setValue,
    }

    return (
        <NodeFieldGroup label={label} floatRight={<span className="float-right" ref={(ref) => { textRight = ref; updateTextRight(); }} />}>
            <NodeFieldNumber {...numberProps} propertyName="x"/>
            <NodeFieldNumber {...numberProps} propertyName="y"/>
            <NodeFieldNumber {...numberProps} propertyName="z"/>
        </NodeFieldGroup>
    )
}

export default NodeFieldVector;

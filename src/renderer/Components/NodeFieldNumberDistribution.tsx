import type { NodeFieldCompoundProps } from './NodeField';
import NodeFieldNumber from './NodeFieldNumber';
import NodeFieldGroup from './NodeFieldGroup';
import './NodeField.scss';

const NodeFieldNumberDistribution = (compoundProps: NodeFieldCompoundProps<number>) => {

    const { schema, definition, getCurrentValue, onChange } = compoundProps;
    const props = { schema, definition, getCurrentValue, onChange };

    const label = compoundProps.propertyBaseName;

    return (
        <NodeFieldGroup label={label}>
            <NodeFieldNumber {...props} propertyName={`${compoundProps.propertyBaseName}_val`}/>
            <NodeFieldNumber {...props} propertyName={`${compoundProps.propertyBaseName}_min`}/>
            <NodeFieldNumber {...props} propertyName={`${compoundProps.propertyBaseName}_max`}/>
            <NodeFieldNumber {...props} propertyName={`${compoundProps.propertyBaseName}_delta`}/>
        </NodeFieldGroup>
    )
}

export default NodeFieldNumberDistribution;

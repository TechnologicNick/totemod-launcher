import NodeFieldNumber from './NodeFieldNumber';
import type { NodeFieldProps } from './NodeField';

const NodeFieldInteger = (props: NodeFieldProps<number>) => {
    return <NodeFieldNumber {...props} isInteger={true}/>;
}

export default NodeFieldInteger;

import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import './NodeField.scss';

const NodeFieldGroup = (props: { label: string, children?: ReactNode }) => {
    return (
        <details className="node-field-group rounded">
            <summary>
                <FontAwesomeIcon icon={faCaretDown} className="collapse-caret text-muted"/>
                <span className="node-field-label">
                    {props.label}
                </span>
            </summary>
            <div className="node-field-group-content">
                {props.children}
            </div>
        </details>
    )
}

export default NodeFieldGroup

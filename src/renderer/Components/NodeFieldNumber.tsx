import React, { Component, FocusEvent, KeyboardEvent } from 'react'
import { expandRef } from './../schemas';
import { JSONSchema7 } from 'json-schema';
import classNames from 'classnames';
import type { NodeFieldProps } from './NodeField';
import './NodeField.scss';

export type NodeFieldNumberProps = NodeFieldProps<number> & {
    isInteger?: boolean;
}

export default class NodeFieldNumber extends Component {

    props!: NodeFieldNumberProps;

    state!: {
        mode: "draggable" | "dragging_start" | "dragging" | "textbox",
        value: number,
    }

    label: string;
    property: JSONSchema7;

    integer: boolean;
    multipleOf?: number;

    range?: {
        min: number;
        max: number;
    }

    inputRef: React.RefObject<HTMLInputElement>;

    constructor(props: NodeFieldNumberProps) {
        super(props);

        this.property = expandRef(props.schema, `${props.definition}/properties/${props.propertyName}`);
        this.label = props.propertyName;

        if (this.property.type === "integer" && !this.props.isInteger)
            throw `Property "${props.definition}/properties/${props.propertyName}" is of type integer but has no matching isInteger (${this.props.isInteger}) prop!`;

        this.state = {
            mode: "draggable",
            value: props.getCurrentValue?.(props.propertyName) ?? this.property.default as number ?? 0,
        }
        
        this.integer = this.property.type === "integer";
        this.multipleOf = this.property.multipleOf ?? (this.integer ? 1 : undefined);
        
        const min = this.property.minimum ?? (this.property.exclusiveMinimum ? this.property.exclusiveMinimum + (this.multipleOf ?? 0.001) : undefined);
        const max = this.property.maximum ?? (this.property.exclusiveMaximum ? this.property.exclusiveMaximum - (this.multipleOf ?? 0.001) : undefined);
        if (min !== undefined && max !== undefined) {
            this.range = { min, max };
        }

        this.inputRef = React.createRef();

        this.props.onChange?.(this.state.value, this.props.propertyName);
    }

    applyConstraints = ((value: number) => {
        if (this.multipleOf) value = Math.round(value / this.multipleOf) * this.multipleOf;
        if (this.range) value = Math.max(Math.min(value, this.range.max), this.range.min);

        return value;
    }).bind(this);

    onMouseMove = ((event: MouseEvent) => {
        if (this.state.mode === "dragging_start") {
            this.setState({ mode: "dragging" });
        } else if (this.state.mode !== "dragging") {
            return;
        }

        const target = this.inputRef.current!;
        const { width } = target.getBoundingClientRect();

        const minSensitivity = this.integer ? 10 : 1;

        let increaseBy;
        if (this.range) {
            increaseBy = (this.range.max - this.range.min) * (event.movementX / width);
        } else {
            increaseBy = Math.max(Math.abs(this.state.value), minSensitivity) * (event.movementX / width);
        }

        let value = this.state.value + increaseBy;
        if (this.range) value = Math.max(Math.min(value, this.range.max), this.range.min);

        this.setState({ value });
    }).bind(this);

    onMouseUp = ((_event: MouseEvent) => {
        if (this.state.mode === "dragging_start") this.setState({ mode: "textbox" });
        else if (this.state.mode === "dragging") {
            this.setState({ mode: "draggable" });
            this.props.onChange?.(this.applyConstraints(this.state.value), this.props.propertyName);
        }
    }).bind(this);

    onFinishTyping(event: FocusEvent | KeyboardEvent) {
        const target = event.target as HTMLInputElement;
        let value = parseFloat(target.value);
        if (isNaN(value)) {
            // Don't change the value if the input is invalid
            value = this.state.value;
        }

        value = this.applyConstraints(value);

        // Clear the textbox's value
        target.value = "";

        if (this.state.mode === "textbox") this.setState({
            mode: "draggable",
            value,
        });
        this.props.onChange?.(value, this.props.propertyName);
    }

    componentDidMount() {
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("mouseup", this.onMouseUp);
    }

    componentWillUnmount() {
        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("mouseup", this.onMouseUp);
    }

    render() {
        if (this.state.mode === "textbox") {
            this.inputRef.current!.value = this.applyConstraints(this.state.value).toString();
        }

        return (
            <div className={classNames("node-field node-field-number form-control", this.state.mode)}>
                {this.state.mode !== "textbox" ? (<>
                    {this.range ? (
                        <div className="node-field-progressbar" style={{
                            width: `${(this.state.value - this.range.min) / (this.range.max - this.range.min) * 100}%`,
                        }}/>
                    ) : null}
                    <span className="node-field-label">{this.label}</span>
                    <span className="node-field-label text-right">{this.applyConstraints(this.state.value).toFixed(this.integer ? 0 : 3)}</span>
                </>) : null}
                <input
                    ref={this.inputRef}
                    type="number"
                    className="node-field-input form-control"
                    readOnly={this.state.mode !== "textbox"}
                    onMouseDown={() => { if (this.state.mode === "draggable") this.setState({ mode: "dragging_start" }); }}
                    onBlur={this.onFinishTyping.bind(this)}
                    onKeyPress={(event: KeyboardEvent) => { if (event.key === "Enter") this.onFinishTyping(event); }}
                />
            </div>
        )
    }
}

import React, { Component, FocusEvent, KeyboardEvent } from 'react'
import { expandRef } from './../schemas';
import { JSONSchema7 } from 'json-schema';
import classNames from 'classnames';
import type { NodeFieldProps } from './NodeField';
import './NodeField.scss';

export default class NodeFieldNumber extends Component {

    props!: NodeFieldProps<number>;

    state!: {
        mode: "draggable" | "dragging_start" | "dragging" | "textbox",
        value: number,
    }

    label: string;
    property: JSONSchema7;

    range?: {
        min: number;
        max: number;
    }

    multipleOf?: number;

    inputRef: React.RefObject<HTMLInputElement>;

    constructor(props: NodeFieldProps<number>) {
        super(props);

        this.property = expandRef(props.schema, `${props.definition}/properties/${props.propertyName}`);
        this.label = props.propertyName;

        this.state = {
            mode: "draggable",
            value: props.getCurrentValue?.(props.propertyName) ?? this.property.default as number ?? 0,
        }

        const min = this.property.minimum ?? (this.property.exclusiveMinimum ? this.property.exclusiveMinimum + 0.001 : undefined);
        const max = this.property.maximum ?? (this.property.exclusiveMaximum ? this.property.exclusiveMaximum - 0.001 : undefined);
        if (min !== undefined && max !== undefined) {
            this.range = { min, max };
        }

        this.multipleOf = this.property.multipleOf;

        this.inputRef = React.createRef();

        this.props.onChange?.(this.state.value, this.props.propertyName);
    }

    onMouseMove = ((event: MouseEvent) => {
        if (this.state.mode === "dragging_start") {
            this.setState({ mode: "dragging" });
        } else if (this.state.mode !== "dragging") {
            return;
        }

        const target = this.inputRef.current!;
        const { width } = target.getBoundingClientRect();

        let increaseBy;
        if (this.range) {
            increaseBy = (this.range.max - this.range.min) * (event.movementX / width);
        } else {
            increaseBy = Math.max(Math.abs(this.state.value), 1) * (event.movementX / width);
        }

        const value = this.state.value + increaseBy;

        this.setState({ value });
    }).bind(this);

    onMouseUp = ((_event: MouseEvent) => {
        if (this.state.mode === "dragging_start") this.setState({ mode: "textbox" });
        else if (this.state.mode === "dragging") {
            this.setState({ mode: "draggable" });
            this.props.onChange?.(this.state.value, this.props.propertyName);
        }
    }).bind(this);

    onFinishTyping(event: FocusEvent | KeyboardEvent) {
        const target = event.target as HTMLInputElement;
        let value = parseFloat(target.value);
        if (isNaN(value)) {
            // Don't change the value if the input is invalid
            value = this.state.value;
        }

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
        console.log(this.state.mode, this.state.value);

        if (this.state.mode === "textbox") {
            this.inputRef.current!.value = this.state.value.toString();
        }

        return (
            <div className={classNames("node-field node-field-number form-control", this.state.mode)}>
                {this.state.mode !== "textbox" ? (<>
                    <span className="node-field-label">{this.label}</span>
                    <span className="node-field-label text-right">{this.state.value.toFixed(3)}</span>
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

import type { NodeFieldProps } from './NodeField';
import { expandRefOnce } from './../schemas';
import NodeFieldNumber, { NodeFieldNumberProps } from './NodeFieldNumber';
import NodeFieldGroup from './NodeFieldGroup';
import { colord, extend, AnyColor } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import mixPlugin from 'colord/plugins/mix';
import halfmoon from 'halfmoon';
import './NodeField.scss';
import { useEffect } from 'react';

extend([a11yPlugin, mixPlugin]);

export const isLightTextReadable = (backgroundColor: AnyColor, darkModeOn?: boolean) => {
    darkModeOn ??= halfmoon.darkModeOn ?? true;

    const bg = colord(backgroundColor);
    const underlying = darkModeOn ? colord("#23262a") : colord("#ffffff");

    const percievedBg = underlying.mix(bg.toRgb(), bg.alpha());
    const contrastDark = percievedBg.mix("#ffffff", 0.8).contrast(percievedBg);
    const contrastLight = percievedBg.mix("#000000", 0.2).contrast(percievedBg);

    return Math.max(contrastDark, contrastLight) === contrastDark;
}

const NodeFieldColor = (props: NodeFieldProps<object>) => {

    const label = props.propertyName;
    const value: {[key: string]: any} = props.getCurrentValue?.(props.propertyName) ?? {};

    const pointer = `${props.definition}/properties/${props.propertyName}`;
    const base = expandRefOnce(props.schema, pointer);
    if (!base.hasOwnProperty("$ref"))
        throw `Property "${pointer}" has no $ref property! Only references to definitions are supported.`;



    let previewRef: HTMLElement | null;

    const updatePreviewColor = (color: AnyColor = { r: value.r * 255, g: value.g * 255, b: value.b * 255, a: value.a }) => {
        if (!previewRef)
            return;
        
        const hex = colord(color).toHex();
        previewRef.style.setProperty("background-color", hex, "important");
        previewRef.style.setProperty("color", `var(--${isLightTextReadable(hex) ? "dm" : "lm"}-badge-text-color)`);
        previewRef.textContent = hex.padEnd(9, "ff").toUpperCase();
    }

    useEffect(() => {
        const observer = new MutationObserver(() => {
            updatePreviewColor();
        })

        observer.observe(document.body, {
            attributes: true, 
            attributeFilter: ["class"],
            childList: false, 
            characterData: false,
        });

        return () => {
            observer.disconnect();
        };
    });

    const getValue = (propertyName: string) => value[propertyName];
    const setValue = (newValue: any, propertyName: string) => {
        value[propertyName] = newValue;
        console.log(`Set ${props.propertyName}.${propertyName} to`, newValue, value);
        props.onChange?.(value, props.propertyName);
        updatePreviewColor();
    }
    const setIntermediateValue = (newValue: any, propertyName: string) => {
        const preview = {...value};
        preview[propertyName] = newValue;
        updatePreviewColor({ r: preview.r * 255, g: preview.g * 255, b: preview.b * 255, a: preview.a });
    }

    const numberProps: NodeFieldNumberProps = {
        schema: props.schema,
        definition: base.$ref,
        propertyName: props.definition,
        getCurrentValue: getValue,
        onChange: setValue,
        onIntermediateChange: setIntermediateValue,
    }

    return (
        <NodeFieldGroup label={label} floatRight={
            <div className="node-field-color-preview">
                <span className="float-right badge text-monospace" ref={(ref) => { previewRef = ref; updatePreviewColor(); }}>
                    #FFFFFFFF
                </span>
            </div>
        }>
            <NodeFieldNumber {...numberProps} propertyName="r"/>
            <NodeFieldNumber {...numberProps} propertyName="g"/>
            <NodeFieldNumber {...numberProps} propertyName="b"/>
            <NodeFieldNumber {...numberProps} propertyName="a"/>
        </NodeFieldGroup>
    )
}

export default NodeFieldColor;

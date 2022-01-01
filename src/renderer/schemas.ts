import jsonpointer from 'jsonpointer';
import type { JSONSchema7 } from 'json-schema';

export function expandRef(schema: any, pointer: string, alreadyTraversed: string[] = []): any {
    if (pointer.startsWith("#")) {
        pointer = decodeURIComponent(pointer.substring(1));
    } else {
        throw new Error(`Pointer "${pointer}" is not absolute`);
    }

    const base = jsonpointer.get(schema, pointer);

    // Don't expand circular references
    if (pointer in alreadyTraversed) {
        return base;
    }

    console.log({base});

    if (base.hasOwnProperty("$ref")) {
        const recursive = expandRef(schema, base.$ref, [...alreadyTraversed, pointer]);
        const obj = Object.assign({}, recursive, base);
        delete obj.$ref;
        return obj;
    } else {
        return Object.assign({}, base);
    }
}

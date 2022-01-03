import type { JSONSchema7 } from 'json-schema';

export type NodeFieldProps = {
    schema: JSONSchema7;
    definition: string;
    propertyName: string;
}

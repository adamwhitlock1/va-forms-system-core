<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@department-of-veterans-affairs/formulate](./formulate.md) &gt; [FieldProps](./formulate.fieldprops.md)

## FieldProps type

<b>Signature:</b>

```typescript
export declare type FieldProps<V> = Omit<FieldHookConfig<V>, 'required'> & {
    label: string;
    id?: string;
    required?: boolean | string;
};
```
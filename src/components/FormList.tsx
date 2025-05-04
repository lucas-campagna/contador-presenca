import Button from "./Button";

// TODO: fix type
// type AllowedFieldTypes = typeof Input | typeof Select;
type FormFields = {
  name: string;
  type: any; //AllowedFieldTypes;
  [key: string]: any;
}; //& Parameters<AllowedFieldTypes>;
export type FormProps = {
  title?: string;
  fields: FormFields[];
  onSubmit?: (_: { [key: string]: any }) => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
};

function FormList({ title, fields, onSubmit, submitText, onCancel, cancelText }: FormProps) {
  async function handleSubmit(e: any) {
    e.preventDefault();
    onSubmit?.(
      fields.reduce(
        (acc, { name }) => ({ ...acc, [name]: e.target.elements[name].value }),
        {}
      )
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-stretch gap-2">
      {title && <div className="font-bold mb-2">{title}</div>}
      <>
        {fields.map(({ name, type: Type, ...props }, i) => (
          <Type name={name} disabled={!onSubmit} {...props} key={i} />
        ))}
      </>
      {onSubmit && <Button label={submitText ?? "Ok"} type="submit" />}
    </form>
  );
}

export default FormList;
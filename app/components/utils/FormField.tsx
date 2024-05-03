interface FormFieldProps {
    htmlFor: string
    label: string
    type?: string
    value: any
    onChange?: (...args: any) => any
    autocomplete?: string
  }


export function FormField({ htmlFor, label, type = 'text', value, autocomplete, onChange = () => {} }: FormFieldProps) {
    return (
      <>
        <label htmlFor={htmlFor} className="text-base text-mauve1">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type}
          id={htmlFor}
          name={htmlFor}
          className="bg-mauve9 rounded-sm mb-3 p-1"
          value={value}
          aria-label={htmlFor}
          autoComplete={autocomplete}
        />
      </>
    )
  }
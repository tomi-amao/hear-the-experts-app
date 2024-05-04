import { useEffect, useState } from "react";

interface FormFieldProps {
  htmlFor: string;
  label: string;
  type?: string;
  value: any;
  onChange?: (...args: any) => any;
  autocomplete?: string;
  error?: string;
}

export function FormField({
  htmlFor,
  label,
  type = "text",
  value,
  autocomplete,
  onChange = () => {},
  error = "",
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error);

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  return (
    <>
      <label htmlFor={htmlFor} className="text-base text-mauve1">
        {label}
      </label>
      <input
      // clear error message when the user start to type
        onChange={e => {onChange(e); setErrorText('')}}
        type={type}
        id={htmlFor}
        name={htmlFor}
        className="bg-mauve9 rounded-sm mb-3 p-1"
        value={value}
        aria-label={htmlFor}
        autoComplete={autocomplete}
      />
      <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
        {errorText || ""}
      </div>
    </>
  );
}
import { useEffect, useState, Dispatch, SetStateAction, ReactNode } from "react";

interface FormFieldProps {
  htmlFor: string;
  label?: string;
  type?: string;
  value?: any;
  onChange?: (...args: any) => any;
  autocomplete?: string;
  error?: string;
  placeholder: string;
}

export function FormField({
  htmlFor,
  label,
  type = "text",
  value,
  autocomplete,
  onChange = () => {},
  error = "",
  placeholder,
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error);

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  return (
    <>
      <div className="flex flex-col w-full">
        <label htmlFor={htmlFor} className="text-base text-mauve1">
          {label}
        </label>
        <input
          // clear error message when the user start to type
          onChange={(e) => {
            onChange(e);
            setErrorText("");
          }}
          type={type}
          id={htmlFor}
          name={htmlFor}
          className="bg-bgsecondary rounded-sm mb-3 p-1 h-6 border-x-txtprimary border"
          value={value}
          aria-label={htmlFor}
          autoComplete={autocomplete}
          placeholder={placeholder}
        />
        <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
          {errorText || ""}
        </div>
      </div>
    </>
  );
}

export function FormFieldFloating({
  htmlFor,
  label,
  type = "text",
  value,
  autocomplete,
  onChange = () => {},
  error = "",
  placeholder,
}: FormFieldProps) {
  return (
    <div className="relative">
      <input
        type={type}
        name={htmlFor}
        id={htmlFor}
        aria-label={htmlFor}
        className="block text-lightGrey px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-midGrey rounded-lg border-[1px] border-lightGrey appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-txtprimary peer valid:border-txtprimary "
        placeholder=""
        autoComplete={autocomplete}
        value={value}
        required
      />
      <label
        htmlFor={htmlFor}
        className="absolute text-sm block bg-midGrey text-lightGrey dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500  peer-focus:block peer-focus:text-txtprimary peer-focus:bg-midGrey peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {placeholder}
      </label>
    </div>
  );
}

export function FormTextArea({
  htmlFor,
  label,
  type = "text",
  value,
  autocomplete,
  onChange = () => {},
  error = "",
  placeholder,
}: FormFieldProps) {
  return (
    <div className="relative">
      <textarea
        name={htmlFor}
        id={htmlFor}
        aria-label={htmlFor}
        className="block h-24 resize-none text-lightGrey  px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-midGrey rounded-lg border-[1px] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-txtprimary border-lightGrey  peer valid:border-txtprimary "
        placeholder=""
        autoComplete={autocomplete}
        value={value}
        required
      />
      <label
        htmlFor={htmlFor}
        className="absolute text-sm block bg-midGrey text-lightGrey dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-txtprimary  peer-focus:dark:text-blue-500  peer-focus:block peer-focus:bg-midGrey peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  start-1"
      >
        {placeholder}
      </label>
    </div>
  );
}

export default function FormOptions({
  setShowOptions,
  showOptions,

  dropDownOptions,
  selected,
  setSelected,
}: {
  setShowOptions: any;
  showOptions: any;

  dropDownOptions: ReactNode
  selected: { option: string; id: number; }
  setSelected: Dispatch<SetStateAction<{ option: string; id: number; }>>
}) {
  
  return (
    <>
      <div className="flex items-center">
        <div className=" mt-2 w-fit pb-2 ">
          <Selected
            setShowOptions={setShowOptions}
            selected={selected?.option}
            showOptions={showOptions}
          />
          <div className={showOptions ? "block" : "hidden"}>

            {dropDownOptions}
          </div>
        </div>
      </div>
    </>
  );
}

function Selected({
  selected,
  setShowOptions,
  showOptions,
}: {
  selected: string;
  setShowOptions: Dispatch<SetStateAction<boolean>>;
  showOptions: boolean;
}) {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setShowOptions((preState) => !preState);
    console.log(showOptions);
  }, [toggle]);
  return (
    <button
      type="button"
      className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1  ring-lightGrey focus:outline-none focus:ring-2 focus:ring-txtprimary sm:text-sm sm:leading-6"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
      onClick={() => setToggle((preState) => !preState)}
    >
      <span className="flex items-center">
        <span className="ml-3 block text-lightGrey truncate">{selected}</span>
      </span>
      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <svg
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </button>
  );
}

function Options({
  options,
  setSelected,
  setShowOptions,
  setSelectedOptions,
  selectedOptions,
}: {
  options: { id: number; option: string }[];
  setSelected: Dispatch<SetStateAction<{ id: number; option: string }>>;
  setShowOptions: Dispatch<SetStateAction<boolean>>;
  setSelectedOptions: any;
  selectedOptions: any;
}) {
  const [option, setOption] = useState<{ id: number; option: string }>();
  

  // const selectOption = (option) => {
  //   setSelectedOptions([...selectedOptions, option.tag])
  // }
  useEffect(() => {

    if (option && !selectedOptions.includes(option.option)) {
      setSelectedOptions([...selectedOptions, option!.option]);
      setSelected(option);
    }
  }, [option]);
  console.log(selectedOptions);

  return (
    <>
      <ul
        className="absolute bg-bgprimary z-10 mt-1 max-h-32 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        tabIndex={-1}
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        {options.map((option) => (
          <li
            key={option.id}
            className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-txtprimary"
            id="listbox-option-0"
            role="option"
            onClick={() => {
              setOption(option);
            }}
          >
            <div className="flex items-center">
              <span className="ml-3 block truncate font-normal text-lightGrey">
                {option.option}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

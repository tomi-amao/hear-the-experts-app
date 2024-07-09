import React, {
  MouseEventHandler,
  ReactNode,
  Ref,
  useEffect,
  useState,
} from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { Form, useSubmit } from "@remix-run/react";

interface SelectItemProps {
  children: ReactNode;
  value: string;
}

interface props {
  values: string[];
  action?: (option: string) => {}
}

export const SelectDropdown = (props: props) => {
  const [selection, setSelection] = useState<string>();
  const values = props.values;
  const action = props.action
  const [tag, setTag] = useState<string>();
  const submit = useSubmit();

  const addTag = (option: string) => {
    submit(
      { tag: option },
      { method: "POST", action: "/dashboard/problem/create" }
    );
    return {};
  };

  return (
    <Select.Root
      value={selection}
      onValueChange={setSelection}
      name="selection"
    >
      <Select.Trigger
        className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-6  gap-[5px] bg-white text-jade9  hover:bg-jade9 hover:text-mauve1 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-jade9 outline-none "
        aria-label="Food"
      >
        <Select.Value placeholder="Select" />
        <Select.Icon className="text-jade9">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md ">
          {/* <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-jade9 cursor-default">
          <ChevronUpIcon />
        </Select.ScrollUpButton> */}
          <Select.Viewport className="p-[5px] bg-bgprimary">
            <Select.Group>
              {values.map((option) => (
                <div onClick={() => {action(option)}}>
                  <span className="absolute z-10 w-full text-jade10"> {option}</span>
                  <SelectItem  value={option}> {option} </SelectItem>
                </div>
              ))}
              {/* {values.map(option => {<SelectItem value={option}> {option} </SelectItem>})} */}
            </Select.Group>
          </Select.Viewport>
          {/* <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-jade9 cursor-default">
          <ChevronDownIcon />
        </Select.ScrollDownButton> */}
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = React.forwardRef<Ref, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <div className="opacity-0">
      <Select.Item
        className="text-[13px] leading-none text-jade9  rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-jade9  data-[highlighted]:text-violet1"
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
      </div>
    );
  }
);


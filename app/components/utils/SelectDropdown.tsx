import React, { ReactNode, Ref, useState } from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";


interface SelectItemProps {
  children: ReactNode;
  value: string; 
}



const SelectDropdown = () => {
  const [selection, setSelection] = useState<string>();
//   console.log(selection);

  return (
    <form action="" method="post">
    <Select.Root value={selection} onValueChange={setSelection} name="selection">
      <Select.Trigger
        className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-6  gap-[5px] bg-white text-jade9  hover:bg-jade9 hover:text-mauve1 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-jade9 outline-none "
        aria-label="Food"
      >
        <Select.Value placeholder="Select a fruit…" />
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
              
              <SelectItem value="beef"> Beef </SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="lamb">Lamb</SelectItem>
              <SelectItem value="pork">Pork</SelectItem>
            </Select.Group>
          </Select.Viewport>
          {/* <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-jade9 cursor-default">
          <ChevronDownIcon />
        </Select.ScrollDownButton> */}
        </Select.Content>
      </Select.Portal>
    </Select.Root>
    </form>
  );
};

const SelectItem = React.forwardRef<Ref, SelectItemProps>(({ children, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className="text-[13px] leading-none text-jade9  rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-jade9  data-[highlighted]:text-violet1"
      {...props}
      ref={forwardedRef}    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

export default SelectDropdown;

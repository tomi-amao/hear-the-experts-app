import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import * as Accordion from "@radix-ui/react-accordion";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { ReactNode, forwardRef, useState } from "react";
import { Outlet } from "@remix-run/react";
// import SelectDropdown from "~/components/utils/SelectDropdown";
import {
  CardProps,
  ExpertSuggestionCard,
} from "~/components/cards/ExpertSuggestionCard";

import * as Select from "@radix-ui/react-select";
import React from "react";

// interface Props {
//   children?: ReactNode;
//   value?: string;
//   // ref?: any
// }

export type Ref = any;

export interface AccordionItemProps {}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface SuggestionData {
  detail: string;
  title: string;
  dateCreated: string;
  categories: string[];
}

const SUGGESTION_DATA: SuggestionData[] = [
  {
    detail: "Bandiwth limits need to be increased by 20%",
    title: "High Latency Between User Requests",
    dateCreated: new Date().toDateString(),
    categories: ["Application Support", " Networking"],
  },
  {
    detail: "Bandiwth limits need to be increased by 20%",
    title: "High Latency Between User Requests",
    dateCreated: new Date().toDateString(),
    categories: ["Application Support", " Networking"],
  },
  {
    detail: "Bandiwth limits need to be increased by 20%",
    title: "High Latency Between User Requests",
    dateCreated: new Date().toDateString(),
    categories: ["Application Support", "Pipeline"],
  },
];


// const SUGGESTION_DATA_FILTERED = SUGGESTION_DATA.reduce((accumulator, currrent) => { return accumulator + currrent.key}, 0) 
const SUGGESTION_DATA_FILTERED = SUGGESTION_DATA.filter((suggestion) => suggestion.categories.includes("Pipeline")) 
console.log(SUGGESTION_DATA_FILTERED);

// r



export default function Index() {
  return (
    <>

      <div className="flex h-fit m-4 text-3xl text-jade11 mx-12">
        {" "}
        Expert Suggestions{" "}
      </div>
      <div className="flex ml-12 w-80 md:ml-12">
        {/* <SelectDropdown /> */}
        <SelectDropdown/>
        


      </div>
      <div className="flex gap-4 flex-wrap justify-center md:ml-12 md:justify-start">
          {SUGGESTION_DATA.map((item) => (
            <ExpertSuggestionCard
              title={item.title}
              categories={item.categories}
              dateCreated={item.dateCreated}
              detail={item.detail}
              key={item}
              
            />
          ))}
        </div>
    </>
  );
}


interface SelectItemProps {
  children: ReactNode;
  value: string; 
}



export const SelectDropdown = () => {
  const [selection, setSelection] = useState<string>();
  console.log(selection);

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


// export async function action({request} :ActionFunctionArgs) {
//   const formData = await request.formData()
//   const selectedItem =  Object.fromEntries(formData)
//   console.log(selectedItem);
//   // console.log('hello');

// }

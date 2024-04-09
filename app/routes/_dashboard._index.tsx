import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { forwardRef } from "react";
import { Outlet } from "@remix-run/react";

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

export default function Index() {
  return (
    <>
      <header></header>
      <Outlet />
    </>
  );
}

// export async function action({request} :ActionFunctionArgs) {
//   const formData = await request.formData()
//   const darkToggle =  Object.fromEntries(formData)
//   console.log(darkToggle);
//   console.log('hello');
  
  

// }

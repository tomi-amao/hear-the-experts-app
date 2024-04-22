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
import { PrimaryButton, SecondaryButton } from "~/components/utils/BasicButton";
import { ProfileCard } from "~/components/cards/ProfileCard";

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




export default function Index() {
  return (
    <Outlet/>
  )

}

// export async function action({request} :ActionFunctionArgs) {
//   const data = await request.formData()
//   const formData =  Object.fromEntries(data)
//   console.log(formData);
//   return (
//     formData
    
//   )
//   // console.log('hello');

// }

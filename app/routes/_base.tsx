import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { forwardRef } from "react";
import { Outlet } from "@remix-run/react";
import DarkToggle from "~/components/buttons/DarkModeToggle";
import {
  ExpertSuggestionCard,
  ExpertSuggestionCardDetail,
} from "~/components/cards/ExpertSuggestionCard";
import {
  ProfileCard,
  ProfileCardTooltip,
  ProfileCardWithHover,
} from "~/components/cards/ProfileCard";
import MainHeader from "~/components/navigation/MainHeader";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function IndexLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

// export async function action({request} :ActionFunctionArgs) {
//     const formData = await request.formData()
//     const darkToggle =  Object.fromEntries(formData)
//     console.log(darkToggle);
//     console.log('hello');

//     return {
//       darkToggle
//     }

//   }

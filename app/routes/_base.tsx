import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { forwardRef } from "react";
import { Outlet, redirect, useLoaderData } from "@remix-run/react";
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
import { logout } from "~/services/session.server";
import { requireUserId } from "~/models/user.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function IndexLayout() {
  const userId: string = useLoaderData();

  return (
    <>
      <MainHeader userId={userId} />
      <Outlet />
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("_action");

  switch (action) {
    case "logout": {
      return await logout(request);
    }
    case "signin": {
      return redirect("login");
    }
    default:
      break;
  }
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

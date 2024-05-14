import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { ReactNode, forwardRef, useState } from "react";
import {
  Link,
  Outlet,
  json,
  redirect,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
// import SelectDropdown from "~/components/utils/SelectDropdown";
import {
  CardProps,
  ExpertSuggestionCard,
} from "~/components/cards/ExpertSuggestionCard";

import * as Select from "@radix-ui/react-select";
import React from "react";
import { PrimaryButton, SecondaryButton } from "~/components/utils/BasicButton";
import { ProfileCard } from "~/components/cards/ProfileCard";
import MainHeader from "~/components/navigation/MainHeader";
import { User, requireUserId } from "~/models/user.server";
import { getSession } from "~/services/session.server";
import { authenticator } from "~/services/auth.server";
import { getUserPosts } from "~/models/posts.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Suggest and Complain" },
  ];
};


export default function Dashboard() {
  const actionData = useActionData<typeof action>();
  const loaderData = useLoaderData<typeof loader>();
  const userPosts = loaderData.userPosts
  console.log(userPosts, 'help');
  
  

  return (
    <>
      <MainHeader userId={loaderData.user} /> 

      <div className=" grid grid-cols-[1fr]">
        <div className="flex h-fit md:m-4 text-3xl text-jade11 md:mx-12 justify-center -ml-7 w-full md:w-fit md:ml-12 pb-2">
          {" "}
          Expert Suggestions{" "}
        </div>
        <div className="flex w-full md:w-fit md:ml-12 gap-2 justify-center col-start-1  ">
          {/* <SelectDropdown /> */}
          <SelectDropdown />
          <PrimaryButton />
          <Link to="suggestion/create">
            <SecondaryButton  text="Suggest an Idea"/>
          </Link>
        </div>

        <div className="flex gap-4 flex-wrap md:w-fit h-fit justify-center md:ml-12 md:justify-start py-2  text-txtprimary col-start-1">
          {/* {actionData?.map((item) => (
            <ExpertSuggestionCard
              title={item.title}
              categories={item.categories}
              dateCreated={item.dateCreated}
              detail={item.detail}
              key={item}
            />
          ))} */}
        </div>
        <div className=" hidden md:flex md:flex-row-reverse md:col-start-2 md:pr-4">
          <div className="flex flex-col">
            <h1 className="text-2xl text-txtprimary">Experts</h1>
            <ProfileCard />
            <ProfileCard />
          </div>
          {/* <ProfileCardWithHover/> */}
        </div>
      </div>
      <div className=" grid grid-cols-[1fr]  overflow-scroll">
        <div className="h-fit w-full bg-txtprimary text-bgsecondary md:justify-start rounded-md py-4 ">
          <div className="text-bgprimary m-auto text-3xl w-fit md:ml-12 pr-20 py-2 ">
            {" "}
            Plaguing Problems{" "}
          </div>
          <div className="flex flex-row ml-16 mb-2">
            <SelectDropdown />
            <PrimaryButton />
            <Link to="problem/create">
            <SecondaryButton  text="Highlight a Problem"/>
          </Link>
          </div>

          <div className="flex flex-col md:flex-row md:w-fit gap-4 md:ml-12">
            {userPosts.map((problem) => (
              <div className="bg-bgprimary rounded-md py-2 h-fit w-fit m-auto text-txtprimary">
                <ExpertSuggestionCard
                  title={problem.title}
                  tags={problem.tags}
                  updatedAt={problem.updatedAt}
                  content={problem.content}
                  key={problem.id}
                  status={problem.status}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}

interface SelectItemProps {
  children: ReactNode;
  value: string;
}

export const SelectDropdown = () => {
  const [selection, setSelection] = useState<string>();
  // console.log(selection);

  return (
    <form action="" method="post">
      <Select.Root
        value={selection}
        onValueChange={setSelection}
        name="selection"
      >
        <Select.Trigger
          className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-6  gap-[5px] bg-white text-jade9  hover:bg-jade9 hover:text-mauve1 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-jade9 hover:data-[placeholder]:text-mauve1 outline-none "
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

const SelectItem = React.forwardRef<Ref, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
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
    );
  }
);

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  console.log(formData);

  
  




  return {};
}

export async function loader({ request }: LoaderFunctionArgs) {
  let user = await authenticator.isAuthenticated(request);
  if (user) {
    const userId = await requireUserId(request)
    const userPosts = await getUserPosts(userId!)
    console.log('working');
    
    return json({userPosts, user}, {status: 200})
  } else {
    return redirect("/login");
  }

}

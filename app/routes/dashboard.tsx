import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { ReactNode, forwardRef, useEffect, useId, useState } from "react";
import {
  Link,
  Outlet,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "@remix-run/react";
// import SelectDropdown from "~/components/utils/SelectDropdown";
import {
  CardProps,
  ExpertSuggestionCard,
} from "~/components/cards/ExpertSuggestionCard";
import { Prisma } from "@prisma/client";

import * as Select from "@radix-ui/react-select";
import React from "react";
import { PrimaryButton, SecondaryButton } from "~/components/utils/BasicButton";
import { ProfileCard } from "~/components/cards/ProfileCard";
import MainHeader from "~/components/navigation/MainHeader";
import { User, getUserById, requireUserId } from "~/models/user.server";
import { getSession } from "~/services/session.server";
import { authenticator } from "~/services/auth.server";
import { deletePost, getUserPosts } from "~/models/posts.server";
import { SearchBar } from "~/components/utils/SearchBar";
import {SelectDropdown as CustomSelectDropdown} from "~/components/utils/SelectDropdown";
import { Posts } from "@prisma/client";
import { getUserAvatar } from "~/services/fileUpload.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Suggest and Complain" },
  ];
};



export default function Dashboard() {
  const actionData = useActionData<typeof action>();
  const {user, userDetails, userPosts} = useLoaderData<typeof loader>();
  
  console.log(userPosts, "help");
  const sortOptions = ['date', 'author']
  const filterOptions = ["Pipelines", "Network", "App Support"]
  const [tagFilter, setTagFilter] = useState<string[]>([]) 
  const [tagSort, setTagSort] = useState<string>() 
  


  const submit = useSubmit();
  const navigate = useNavigate()

  const sortCards = (option: string) => {
    setTagSort(option)
    navigate({
      pathname: "/dashboard",
      search: `?sort=${option}`,
    })
    return {};
  };

// useEffect hook with tagFilter as dependency, needed to handle navigate sideeffect when changing url to filter cards

  useEffect(() => {
      //  effect runs whenever tagFilter changes (including initial render)

    if (tagFilter.length > 0) {
      navigate({
        pathname: "/dashboard",
        search: `?filter=${encodeURIComponent(JSON.stringify(tagFilter))}&sort=${tagSort}`,
      });
    }
  }, [tagFilter, tagSort]);

  const filterCards = (option: string) => {
    if (!tagFilter.includes(option)) {

      setTagFilter((prevTagFilter) => [...prevTagFilter, option]);
    console.log(tagFilter, 'tags');

    }


    

    return {};
  };
  return (
    <>
      <MainHeader userId={user} userDetails={userDetails}/>

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
            <SecondaryButton text="Suggest an Idea" />
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
              <SecondaryButton text="Highlight a Problem" />
            </Link>
            <SearchBar/>
            <CustomSelectDropdown values={sortOptions} action={sortCards}/>
            <CustomSelectDropdown values={filterOptions} action={filterCards}/>

          </div>

          <div className="flex flex-col md:flex-row md:w-fit gap-4 md:ml-12">
            {userPosts.map((problem) => (
              <div className="bg-bgprimary rounded-md py-2 h-fit w-fit m-auto text-txtprimary">
                <ExpertSuggestionCard
                  postId={problem.id}
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
  if (formData._action === "deletePost") {
    return await deletePost(formData.postId.toString());
  }

  return {};
}

export async function loader({ request }: LoaderFunctionArgs) {
  let user = await authenticator.isAuthenticated(request);
  if (user) {
    const userId = await requireUserId(request);
    const userDetails = await getUserById(userId!, {profile: true, email: true})
    
    let userPosts = await getUserPosts(userId!, {}, {});
    console.log("working");
    console.log(userDetails, "QUERRYY");
    const url = new URL(request.url)
    const sort = url.searchParams.get('sort')
    
    const tags = url.searchParams.get('filter')
    let filter: string[] = []
    //parse tags in the form of a stringified array into an actual array
    // only parse if there is a filter query
    if (tags) {
      filter = JSON.parse(tags)
      
    }
    console.log(sort, filter);
    
    let sortOptions: Prisma.PostsOrderByWithRelationInput = {}
    if (sort) {
      if (sort === 'date') {
        sortOptions = {createdAt: 'desc'}
      }
      if (sort === 'sender') {
        sortOptions = {author: { profile: {firstName: "desc"}}}
      }
    }
    console.log(url);
    
    let tagFilter: Prisma.PostsWhereInput = {}
    // do not add tag filter if there are no tags
    if (filter && filter.length > 0) {
      tagFilter = {
        tags:{hasSome: filter}
      }
    }
    userPosts = await getUserPosts(userId!, sortOptions, tagFilter )
    const userAvatar = await getUserById(userId!, {profile:{select:{profilePicture:true}}})
    const userAvatarUrl = userAvatar?.profile.profilePicture


    return json({ userPosts, user, userDetails, userAvatarUrl}, { status: 200 });
  } else {
    return redirect("/login");
  }
}

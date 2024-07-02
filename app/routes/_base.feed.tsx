import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { Form, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { DropdownOptions } from "~/components/cards/CreatePostCard";
import PostCard from "~/components/cards/PostCard";
import Header from "~/components/navigation/Header";
import MainHeader from "~/components/navigation/MainHeader";
import FormOptions from "~/components/utils/FormField";
import {
  filterOptionsConstant,
  sortOptionsConstant,
} from "~/components/utils/OptionsForDropdowns";
import { getRecentPosts } from "~/models/posts.server";
import { getUserById, requireUserId } from "~/models/user.server";
import { useSearchParams } from "@remix-run/react";
import { SecondaryButton } from "~/components/utils/BasicButton";
import { Prisma } from "@prisma/client";

export const meta: MetaFunction = () => {
  return [{ title: "Feed" }, { name: "Your feed", content: "List all posts" }];
};

export default function Feed() {
  const { userDetails, userId, allPosts } = useLoaderData<typeof loader>();

  const navigate = useNavigate();
  // manage sort dropdown state
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortSelected, setSortSelected] = useState({ option: "Sort", id: 0 });

  // manage filter dropdown state
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filterSelected, setFilterSelected] = useState({
    option: "Filter",
    id: 0,
  });

  //manage selected filters in an array
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const filterRef = useRef<string[]>([]);

  //manage SearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  const sortAndFilterAction = (selectedOption: {
    id: number;
    option: string;
  }) => {
    
    if (sortOptionsConstant.includes(selectedOption)) {
      // ensure valid sort option
      newSearchParams.set("sort", selectedOption.option);
    } else {
      console.warn(`Invalid sort option: ${selectedOption.option}`);
    }
    if (filterOptionsConstant.includes(selectedOption)) {
      if (!tagFilters.includes(selectedOption.option)) {
        setTagFilters([...tagFilters, selectedOption.option]);
        filterRef.current = [...tagFilters, selectedOption.option];

      }

      const encodedTagFilters = JSON.stringify(filterRef.current);

      newSearchParams.set("filter", encodedTagFilters);
    }

    setSearchParams(newSearchParams, { preventScrollReset: true });
  };

  const clearSearchParams = () => {
    setSearchParams({}, { preventScrollReset: true });
    setTagFilters([]);
    filterRef.current = [...tagFilters];
    return {};
  };

  useEffect(() => {
    setShowSortOptions(false);
    setShowFilterOptions(false);
  }, [searchParams]);

  return (
    <>
      <div className="p-12 w-full ">
        <div className="w-full  text-lightGrey text-2xl">
          <h1 className="pb-4"> Feed</h1>
          <div className="flex md:w-full h-fit  bg-midGrey text-altMidGrey rounded-md mb-4 hover:bg-lightGrey hover:text-darkGrey cursor-pointer">
            <p
              className=" flex gap-4 items-center w-full flex-grow text-sm p-2 px-3"
              onClick={() => {
                navigate("/feed/create/post");
              }}
            >
              Share a problem and/or a solution
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FormOptions
              setShowOptions={setShowSortOptions}
              showOptions={showSortOptions}
              selected={sortSelected}
              setSelected={setSortSelected}
              dropDownOptions={
                <DropdownOptions
                  options={sortOptionsConstant}
                  setSelected={setSortSelected}
                  setShowOptions={setShowSortOptions}
                  optionAction={sortAndFilterAction}
                  selected={sortSelected}
                />
              }
            />
            <FormOptions
              setShowOptions={setShowFilterOptions}
              showOptions={showFilterOptions}
              selected={filterSelected}
              setSelected={setFilterSelected}
              dropDownOptions={
                <DropdownOptions
                  options={filterOptionsConstant}
                  setSelected={setFilterSelected}
                  selected={filterSelected}
                  setShowOptions={setShowFilterOptions}
                  optionAction={sortAndFilterAction}
                />
              }
            />
            <SecondaryButton text="clear" action={clearSearchParams} />
          </div>
          <div className="flex flex-col gap-4">
            {allPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const userDetails = await getUserById(userId!, { profile: true });
  
  // extract url queries sort and filter by constructing a new url and getSearchParams
  const url = new URL(request.url)
  const sort = url.searchParams.get('sort')
  
  let filter = url.searchParams.get('filter')
  
  if (userId) {
    let allPosts = await getRecentPosts({updatedAt: 'desc'}, {});
    
    //apply filters
  
    let sortOptions: Prisma.PostsOrderByWithRelationInput = {}
    if (sort) {
      if (sort === 'date') {
        sortOptions = {createdAt: 'desc'}
      }
      if (sort === 'sender') {
        sortOptions = {author: { profile: {firstName: "desc"}}}
        
      }
    }
    
    let tagFilter: Prisma.PostsWhereInput = {}
    // do not add tag filter if there are no tags
    if (filter && filter.length > 0) {
      const parseFilters: string[] = JSON.parse(filter)
      
      tagFilter = {
        tags:{hasSome: parseFilters}
      }
    }
    if (Object.entries(tagFilter).length || Object.entries(sortOptions).length) {
  
      
      allPosts = await getRecentPosts(sortOptions, tagFilter)
    }
  
    return { userId, userDetails, allPosts };
  } else {
    redirect("/login");
  }
}

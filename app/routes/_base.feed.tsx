import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import PostCard from "~/components/cards/PostCard";
import Header from "~/components/navigation/Header";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserById, requireUserId } from "~/models/user.server";

export const meta: MetaFunction = () => {
  return [{ title: "Feed" }, { name: "Your feed", content: "List all posts" }];
};

export default function Feed() {
  const { userDetails, userId } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="p-12 w-full ">
        <div className="w-full  text-lightGrey text-2xl">
          <h1 className="pb-4"> Feed</h1>
          <div className="flex md:w-full h-fit  bg-midGrey text-altMidGrey rounded-md mb-4 hover:bg-lightGrey hover:text-darkGrey cursor-pointer" >
            <p className=" flex gap-4 items-center w-full flex-grow text-sm p-2 px-3"> Share a problem and/or a solution</p>
          </div>
          <div className="flex flex-col gap-4">
            <PostCard />
            <PostCard />
          </div>
        </div>
        <div className="w-full h-full "> </div>
      </div>
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const userDetails = await getUserById(userId!, { profile: true });
  return { userId, userDetails };
}

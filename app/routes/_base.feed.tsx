import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { Form, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import PostCard from "~/components/cards/PostCard";
import Header from "~/components/navigation/Header";
import MainHeader from "~/components/navigation/MainHeader";
import { getRecentPosts } from "~/models/posts.server";
import { getUserById, requireUserId } from "~/models/user.server";

export const meta: MetaFunction = () => {
  return [{ title: "Feed" }, { name: "Your feed", content: "List all posts" }];
};

export default function Feed() {
  const { userDetails, userId, allPosts } = useLoaderData<typeof loader>();
  console.log(allPosts);
  
  const navigate = useNavigate()

  return (
    <>
      <div className="p-12 w-full ">
        <div className="w-full  text-lightGrey text-2xl">
          <h1 className="pb-4"> Feed</h1>
          <div className="flex md:w-full h-fit  bg-midGrey text-altMidGrey rounded-md mb-4 hover:bg-lightGrey hover:text-darkGrey cursor-pointer" >
            <p className=" flex gap-4 items-center w-full flex-grow text-sm p-2 px-3" onClick={() => {navigate("/feed/create/post")}}> Share a problem and/or a solution</p>
          </div>
          <div className="flex flex-col gap-4">
            {allPosts.map(post => 
              <PostCard post={post} />
            )}
          </div>
        </div>
          <Outlet/>
      </div>
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const userDetails = await getUserById(userId!, { profile: true });
  if (userId) {
    const allPosts = await getRecentPosts()
    console.log(allPosts);
    
    return { userId, userDetails, allPosts };
  } else {
    redirect("/login")
  }
  
}

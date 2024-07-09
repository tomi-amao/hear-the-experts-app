import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { useState, useEffect, useRef, useCallback, LegacyRef } from "react";

import PostCard from "~/components/cards/PostCard";
import { getPosts } from "~/models/posts.server";
import { useInView } from "react-intersection-observer";

export default function InfinitePosts() {
  const { allPosts } = useLoaderData<typeof loader>();
  const morePosts = useActionData<typeof action>();
  const [index, setIndex] = useState<number>(4);
  const {
    ref: loaderRef,
    inView,
    entry,
  } = useInView({
    /* Optional options */
    threshold: 0,
    initialInView: true,
    
  });
  const submit = useSubmit();

  const loadMorePosts = useCallback(() => {
    if (inView) {
      setIndex((prevIndex) => prevIndex + 1);
      submit({ index }, { method: "POST", action: "/infiniteposts" });
    }
  }, [inView]);

  useEffect(() => {
    loadMorePosts();
  }, [inView]);

  

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col gap-4">
          {morePosts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div
          ref={loaderRef}
          className="bg-altMidGrey"
        >{`Header inside viewport ${inView}.`}</div>
      </div>
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const allPosts = await getPosts({ updatedAt: "desc" }, {});

  return json({ allPosts }, { status: 200 });
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const action = (body.get("index")) ;

  if (action) {
    const morePosts = getPosts({ updatedAt: "desc" }, {}, +action)
    return morePosts
  }

}

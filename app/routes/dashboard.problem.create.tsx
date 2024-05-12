import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { FormField } from "~/components/utils/FormField";
import { Modal } from "~/components/utils/Modal";
import SelectDropdown from "~/components/utils/SelectDropdown";
import { createPost } from "~/models/posts.server";
import { getUserById, requireUserId } from "~/models/user.server";

let nextId = 0;

export default function CreateProblem() {
  const dropdownOptions = ["Pipelines", "Network", "App Support"];
  const [postTags, setPostTags] = useState([]);

  const actionData = useActionData<typeof action>();
  const userTag = actionData?.tag;

  useEffect(() => {
    if (userTag !== undefined && !postTags.includes(userTag)) {
      setPostTags([...postTags, userTag]);
    }
  }, [userTag]);

  console.log(postTags[1]);
  const submitTags = [...postTags];

  const filterTags = (tag: string) => {
    console.log(typeof tag);
    console.log(typeof postTags[0]);
    const filterTags = postTags.filter((option) => option !== tag)

    setPostTags(filterTags)
    
    

    
  }

  return (
    <Modal returnTo="/dashboard">
      <div className="w-full">
        <Form action="/dashboard/problem/create" method="post">
          <fieldset className="mb-[15px] flex gap-5">
            <FormField label="Title" type="text" htmlFor="title" />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <FormField label="Description" type="text" htmlFor="content" />
          </fieldset>
          <fieldset>
            <FormField type="hidden" htmlFor="status" value="UNRESOLVED" />
            <FormField type="hidden" htmlFor="type" value="EXPERT" />
          </fieldset>

          <SelectDropdown values={dropdownOptions} />
          <ul className="flex text-mauve12 gap-2 w-fit">
            {postTags.map((tag, n) => (
              <li
                onClick={() => {filterTags(tag)}}
                className="rounded-md bg-txtprimary p-1 px-2 text-xs "
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
          <FormField type="hidden" htmlFor="postTags" value={postTags} />

          <div className="mt-[25px] flex justify-end">
            <button
              type="submit"
              className="bg-txtprimary text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              name="_action"
              value="createProblem"
            >
              Save changes
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  let tag = formData.tag;
  const userId = await requireUserId(request);

  const userTags = formData.postTags;

  if (formData._action === "createProblem") {
    // const userId = await getUserById(session)

    formData.tags = formData.postTags.split(",");
    formData.authorId = userId;


    console.log(formData);

    const newPost = await createPost(formData);
    console.log(newPost);
  }

  // console.log(newPost);

  return { tag };
}

export async function loader({ request }: LoaderFunctionArgs) {
  const emojiMap = {
    THUMBSUP: "👍",
    PARTY: "🎉",
    HANDSUP: "🙌🏻",
  };

  const getOptions = (data: any) =>
    Object.keys(data).reduce((acc: any[], curr) => {
      acc.push({
        name: curr.charAt(0).toUpperCase() + curr.slice(1).toLowerCase(),
        value: curr,
      });
      return acc;
    }, []);

  console.log(emojiMap);
  return {};
}

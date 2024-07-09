import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useRef, useState, useTransition } from "react";
import { FormField } from "~/components/utils/FormField";
import { Modal } from "~/components/utils/Modal";
import { SelectDropdown } from "~/components/utils/SelectDropdown";
import { createPost } from "~/models/posts.server";
import { getUserById, requireUserId } from "~/models/user.server";

const nextId = 0;

export default function CreateProblem() {
  const dropdownOptions = ["Pipelines", "Network", "App Support"];
  const [postTags, setPostTags] = useState([]);

  const actionData = useActionData<typeof action>();
  const userTag = actionData?.tag;
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === "/dashboard/problem/create";

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
    const filterTags = postTags.filter((option) => option !== tag);

    setPostTags(filterTags);
  };

  const submit = useSubmit();

  const addTag = (option: string) => {
    submit(
      { tag: option },
      { method: "POST", action: "/dashboard/problem/create" }
    );
    return {};
  };
  return (
    <Modal
      returnTo="/dashboard"
      dialogTitle="Highlight a Problem"
      dialogDescription="Make changes to your profile here. Click save when you're done."
      setShowProfileManage={() => {}}
      modalWidth="[450px]"
      childrenStyle="flex flex-col w-full items-center"
    >
      <div className="w-full">
        <Form action="/dashboard/problem/create" method="post">
          <fieldset className="mb-[15px] flex gap-5" disabled={isSubmitting}>
            <FormField label="Title" type="text" htmlFor="title" />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <FormField label="Description" type="text" htmlFor="content" />
          </fieldset>
          <fieldset>
            <FormField type="hidden" htmlFor="status" value="UNRESOLVED" />
            {/* <FormField type="hidden" htmlFor="type" value="EXPERT" /> */}
          </fieldset>

          <SelectDropdown values={dropdownOptions} action={addTag} />
          <ul className="flex text-mauve12 gap-2 w-fit mt-2">
            {postTags.map((tag, n) => (
              <li
                onClick={() => {
                  filterTags(tag);
                }}
                className="rounded-md bg-txtprimary p-1 px-2 text-xs "
              >
                {tag}
              </li>
            ))}
          </ul>
          <FormField type="hidden" htmlFor="postTags" value={postTags} />

          <div className="mt-[25px] flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-txtprimary text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              name="_action"
              value="createProblem"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-mauve12 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <p> Creating...</p>
                </>
              ) : (
                "Save"
              )}
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
  const tag = formData.tag;
  const userId = await requireUserId(request);

  const userTags = formData.postTags;

  if (formData._action === "createProblem") {
    // const userId = await getUserById(session)

    formData.tags = formData.postTags.split(",");
    formData.authorId = userId;

    console.log(formData);

    const newPost = await createPost(formData);
    
    return redirect("/dashboard");
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

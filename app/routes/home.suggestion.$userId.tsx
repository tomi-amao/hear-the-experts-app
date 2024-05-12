import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { createPortal } from "react-dom";
import { Modal } from "~/components/utils/Modal";
import { getUserById } from "~/models/user.server";

// 1
export const loader: LoaderFunction = async ({ request, params }) => {
  // 2
  const { userId } = params;
  console.log(userId, "server");
  if (typeof userId !== "string") {
    redirect("/home");
  }
  const recipient = await getUserById(userId!);

  return json({ userId, recipient });
};

export default function KudoModal() {
  // 3
  const loaderData = useLoaderData<typeof loader>();
  console.log(loaderData);




  return (
    <>
      <Modal>
        <Form action="/dashboard" method="post">
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-violet11 w-[90px] text-right text-[15px]"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="name"
              defaultValue="Pedro Duarte"
              name="name"
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-violet11 w-[90px] text-right text-[15px]"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="username"
              defaultValue="@peduarte"
              name="username"
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <button
              type="submit"
              className="bg-txtprimary text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Save changes
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

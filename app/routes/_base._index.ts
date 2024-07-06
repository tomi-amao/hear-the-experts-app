import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { redirect } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
// import SelectDropdown from "~/components/utils/SelectDropdown";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (user) {
    return {};
  } else {
    return redirect("/home");
  }
};

export default function Index() {
  return {}
}

// export async function action({request} :ActionFunctionArgs) {
//   const formData = await request.formData()
//   const selectedItem =  Object.fromEntries(formData)
//   console.log(selectedItem);
//   // console.log('hello');

// }

import { LoaderFunction, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request);
  if (user) {
    return {};
  } else {
    return redirect("/login");
  }
};

export default function Home() {
  return <h2>Home Page</h2>;
}

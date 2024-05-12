import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { UserPanel } from "~/components/navigation/UserPanel";
import { getOtherUser, requireUserId } from "~/models/user.server";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request);
  if (user) {
    const userId = await requireUserId(request);
    const otherUsers = await getOtherUser(userId!);

    return json({ otherUsers });
  } else {
    return redirect("/login");
  }
};

export default function Home() {
  const { otherUsers } = useLoaderData<typeof loader>();

  return (
    <>
      <Outlet />
      <div className="h-full flex">
        <UserPanel users={otherUsers} />
      </div>
      <div className="bg-txtprimary w-6 h-6" onClick={() => {console.log("hello");
      }}></div>
    </>
  );
}

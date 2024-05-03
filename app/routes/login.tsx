import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { useState } from "react";
import MainHeader from "~/components/navigation/MainHeader";
import { FormField } from "~/components/utils/FormField";
import { getSession } from "../services/session.server";
import { authenticator } from "~/services/auth.server";
import { User, register } from "~/models/user.server";
import { sessionStorage } from "../services/session.server";


export default function Login() {
  const [action, setAction] = useState("login");
  const [registerView, setRegisterView] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }));
  };

  const actionData = useActionData<typeof action>();

  return (
    <>
      <MainHeader />
      <div className="bg-bgsecondary flex flex-col  w-fit h-fit p-8 rounded-md mx-auto my-24 ">
        <h1 className="text-txtprimary text-2xl mx-auto">
          {actionData?._action === "login" ? "Sign in" : "Sign up"}
        </h1>
        <p className="text-txtprimary text-xs mx-auto mb-4">
          Start suggesting, or complaining
        </p>
        <Form method="post" action="/login" className="flex flex-col mx-2">
          <FormField
            htmlFor="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, "email")}
          />
          <FormField
            htmlFor="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange(e, "password")}
            autocomplete="current-password"
          />

          {registerView && (
            <>
              <FormField
                htmlFor="firstName"
                label="firstName"
                type="string"
                value={formData.firstname}
                onChange={(e) => handleInputChange(e, "firstname")}
                autocomplete="given-name"
              />
              <FormField
                htmlFor="lastName"
                label="lastName"
                type="string"
                value={formData.lastname}
                onChange={(e) => handleInputChange(e, "lastname")}
                autocomplete="family-name"
              />
            </>
          )}

          <div className="flex gap-4 items-center">
          
              <button
              type="button"
                onClick={() => {
                  setRegisterView((prevalue) => !prevalue);
                }}
                className="text-txtprimary w-fit text-xs"
              >
              {registerView && "Sign in with your account "}
              {!registerView && "Create an Account "}

                
              </button>
            


            <button
              type="submit"
              name="_action"
              value={registerView === true ? "register" : "login"}
              className="w-fit px-2 py-1  rounded-sm text-sm bg-txtprimary"
            >
              {registerView && "Sign up "}
              {!registerView && "Sign in "}
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const userCreds = Object.fromEntries(formData);
  console.log(userCreds);

  if (userCreds._action === "login") {
    
    const user = await authenticator.authenticate("user-pass", request, {
      failureRedirect: "/login",
      context: {formData}
    });
    const session = await getSession(request)
    console.log(user.user.id);
    session.set(authenticator.sessionKey, user.user.id)
    const headers = new Headers({ "Set-Cookie": await sessionStorage.commitSession(session) })


    return redirect('/dashboard', {headers})
  }

  if (userCreds._action === "register") {
    console.log("creating new user");


    return await register(userCreds);
  }

  return {userCreds};
}

// export async function loader({ request }: LoaderFunctionArgs) {
//   const session = await getSession(request.headers.get("Cookie"));

//   if (session.has("userId")) {
//     // Redirect to the home page if they are already signed in.
//     return redirect("/");
//   }

//   const data = { error: session.get("error") };

//   return json(data, {
//     headers: {
//       "Set-Cookie": await commitSession(session),
//     },
//   });
// }

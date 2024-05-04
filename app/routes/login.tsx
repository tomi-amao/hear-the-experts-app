import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import MainHeader from "~/components/navigation/MainHeader";
import { FormField } from "~/components/utils/FormField";
import { getSession, logout } from "../services/session.server";
import { authenticator } from "~/services/auth.server";
import {
  User,
  authError,
  createUserSession,
  register,
  requireUserId,
} from "~/models/user.server";
import { sessionStorage } from "../services/session.server";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "~/services/validators.server";

interface actionFormData {
  errors: string;
}

export default function Login() {
  const [actionState, setActionState] = useState('login')

  const [registerView, setRegisterView] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }));
  };

  const actionData = useActionData<typeof action>();
  console.log(actionData);
  const firstLoad = useRef(true);

  // hold field-specific errors and formError variables which will hold error messages to display form messages
  const [errors, setErrors] = useState(actionData?.errors || {});
  const [formError, setFormError] = useState(actionData?.error || "");
  // updates the formData state variables to default to any values returned by the action function if available
  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || "",
    password: actionData?.fields?.password || "",
    firstName: actionData?.fields?.lastName || "",
    lastName: actionData?.fields?.firstName || "",
  });

  useEffect(() => {
    if (!firstLoad.current) {
      const newState = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      };
      setErrors(newState);
      setFormError("");
      setFormData(newState);
    }
  }, [actionState]);

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError("");
    }
  }, [formData]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);
  
  console.log(actionData);

  const loaderData = useLoaderData<typeof loader>()
  console.log(loaderData, 'syopaops');
  
  

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
        {loaderData?.error && <p className="text-sm text-[#ac374b]"> Incorrect Login</p>}
        <Form method="post" action="/login" className="flex flex-col mx-2">
          <FormField
            htmlFor="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, "email")}
            error={errors?.email}
          />
          <FormField
            htmlFor="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange(e, "password")}
            autocomplete="current-password"
            error={errors?.password}
          />

          {registerView && (
            <>
              <FormField
                htmlFor="firstName"
                label="First name"
                type="string"
                value={formData.firstname}
                onChange={(e) => handleInputChange(e, "firstName")}
                autocomplete="given-name"
                error={errors?.firstName}
              />
              <FormField
                htmlFor="lastName"
                label="Last name"
                type="string"
                value={formData.lastname}
                onChange={(e) => handleInputChange(e, "lastName")}
                autocomplete="family-name"
                error={errors?.lastName}
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
  console.log(userCreds._action);

  switch (userCreds._action as string) {
    case "logout": {
      console.log("logging out");

      return await logout(request);
    }
    case "signin": {
      return redirect("/login");
    }
  }

  if (
    typeof userCreds._action !== "string" ||
    typeof userCreds.email !== "string" ||
    typeof userCreds.password !== "string"
  ) {
    return json(
      { error: "Invalid Form data1", form: userCreds._action },
      { status: 400 }
    );
  }
  if (
    userCreds._action === "register" &&
    (typeof userCreds.firstName !== "string" ||
      typeof userCreds.lastName !== "string")
  ) {
    return json(
      { error: "Invalid Form data2", form: userCreds._action },
      { status: 400 }
    );
  }

  const errors = {
    email: validateEmail(userCreds.email as string),
    password: validatePassword(userCreds.password as string),
    ...(userCreds._action === "register"
      ? {
          firstName: validateName((userCreds.firstName as string) || ""),
          lastName: validateName((userCreds.lastName as string) || ""),
        }
      : {}),
  };
  // returns an error along with  form field values in order to re-populate the form with the user's input and an error message later on if any of those fields are invalid.
  if (Object.values(errors).some(Boolean)) {
    console.log(errors);
        
    return json(
      {
        errors,
        fields: {
          email: userCreds.email,
          password: userCreds.password,
          firstName: userCreds.firstName,
          lastName: userCreds.lastName,
        },
        form: userCreds._action,
      },
      { status: 400 }
    );
  }

  switch (userCreds._action) {
    case "login": {
      const headers = await createUserSession(request, formData);

      return redirect("/dashboard", { headers });
    }
    case "register": {
      const headers = await register(userCreds, request, formData);

      return redirect("/dashboard", { headers });
    }
    default:
      return json({ error: `Invalid Form Data` }, { status: 400 });
  }

  // if (userCreds._action === "login") {

  // const headers = await createUserSession(request, formData)

  //   return redirect('/dashboard', {headers})
  // }

  // if (userCreds._action === "register") {
  //   console.log("creating new user");

  //   const headers = await register(userCreds, request, formData)

  //   return redirect('/dashboard', {headers})

  // }

  // return {userCreds};
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request) ;
  const error = await authError(request) 
  if (error) {
    return json({error}, {status: 401})
  } 
  if (user) {
    return redirect('/dashboard');
  } 
  return null

}

//   const data = { error: session.get("error") };

//   return json(data, {
//     headers: {
//       "Set-Cookie": await commitSession(session),
//     },
//   });
// }

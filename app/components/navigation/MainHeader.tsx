import {
  Form,
  Link,
  NavLink,
  useActionData,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import * as Switch from "@radix-ui/react-switch";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { requireUserId } from "~/models/user.server";
import { logout } from "~/services/session.server";

interface props {
  userId: string
}

function MainHeader(props: props) {

  return (
    <nav className="">
      <ul className="flex items-center  p-2">
        <li className="flex-1">
          <HamburgerMenu />
        </li>
        <li className=" w-32">
          <h1 className="text-jade9 text-sm"> About </h1>
        </li>
        <li className="flex-1">
          <Link to={"/dashboard"} className="text-jade9 text-sm">
            {" "}
            Dashboard{" "}
          </Link>
        </li>
        <Form method="post" action="/login" >
          <li className="w-fit px-2 py-1 rounded-sm mx-3 text-sm bg-txtprimary">
            <button name="_action" value={props.userId ? "logout" : "signin"}>
              {props.userId ? "Sign Out" : "Sign In"}
            </button>
          </li>
        </Form>
        <li>
          <DarkModeToggle />
        </li>
      </ul>
    </nav>
  );
}



export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  const fetcher = useFetcher();
  const mode = useLoaderData();

  const checkChangeHandler = () => {
    if (darkMode) {
      setDarkMode((preValue) => !preValue);
      console.log(darkMode);
    } else if (!darkMode) {
      setDarkMode((preValue) => !preValue);
      console.log(darkMode);
    }
  };

  return (
    <Form method="post" action="/">
      <div className="">
        <Switch.Root
          className=" w-[42px] h-[25px] bg-bgprimary6 dark:bg-txtprimary rounded-full relative shadow-[0_2px_10px] shadow-bgprimary4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
          // style={{ 'WebkitTapHighlightColor': 'rgba(0, 0, 0, 0)' }}
          onCheckedChange={checkChangeHandler}
          name="darkToggle"
          type="submit"
        >
          {/* conditionally render light/dark icon based on the mode */}
          <Switch.Thumb className="flex items-center w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-bgprimary4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]">
            {darkMode ? (
              <SunIcon className="m-1" />
            ) : (
              <MoonIcon className="m-1" />
            )}
          </Switch.Thumb>
        </Switch.Root>
      </div>
    </Form>
  );
}

export function HamburgerMenu() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
        fill="#27B08B"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default MainHeader;

import {
  Form,
  Link,
  NavLink,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "@remix-run/react";
import * as Switch from "@radix-ui/react-switch";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { getUserById, requireUserId } from "~/models/user.server";
import { DisplayPicture } from "../utils/DisplayPicture";
import { DropdownMenus } from "../utils/DropdownMenus";
import ManageProfile from "../cards/ManageProfileCard";

interface props {
  userId: string;
}

const log = () => {
  console.log(4);
};



function MainHeader(props: props) {
  const navigate = useNavigate()
  const submit = useSubmit();
  const [showProfileManage, setShowProfileManage] = useState(false)
  
  const profileAction = () => {
    setShowProfileManage(preValue => !preValue)
  }

  const profileDropdownOptions = [
    { Profile: <ProfileIcon />, action: profileAction },
    { Inbox: <InboxIcon />, action: log },
    { "Create Post": <CreatePostIcon />, action: log },
    { Settings: <SettingsIcon />, action: log },
  ];
  const logout = () => {
    submit({ _action: "logout" }, { method: "POST", action: "/logout" });
  };
  const profileDropdownOptions2 = [
    { "Sign Out": <ExitIcon />, action: logout },
  ];



  return (
    <>
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
        <Form method="post" action="/login">
          <li className="w-fit px-2 py-1 rounded-sm mx-3 text-sm bg-txtprimary">
            <button name="_action" value={props.userId ? "logout" : "signin"}>
              {props.userId ? "Sign Out" : "Sign In"} {}
            </button>
          </li>
        </Form>
        <li>
          <DarkModeToggle />
        </li>
        <li>
          <DropdownMenus
            trigger={
              <DisplayPicture
                imgURL="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?&w=128&h=128&dpr=2&q=80"
                imgSize="45"
                imgFallback=""
              />
            }
            menuItems={profileDropdownOptions}
            menuItems2={profileDropdownOptions2}
          />
        </li>
      </ul>
    </nav>
    {showProfileManage && <ManageProfile setShowProfileManage={setShowProfileManage}></ManageProfile>}
    </>
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

export const DotsVerticalIcon = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
        fill="#27B08B"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const ProfileIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e8eaed"
    >
      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
    </svg>
  );
};
export const InboxIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#7B7B7B"
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-120H640q-30 38-71.5 59T480-240q-47 0-88.5-21T320-320H200v120Zm280-120q38 0 69-22t43-58h168v-360H200v360h168q12 36 43 58t69 22ZM200-200h560-560Z" />
    </svg>
  );
};

export const CreatePostIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e8eaed"
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
    </svg>
  );
};

export const SettingsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e8eaed"
    >
      <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
    </svg>
  );
};
export const ExitIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e8eaed"
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
    </svg>
  );
};

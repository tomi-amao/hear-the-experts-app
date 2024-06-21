import { Form, Outlet, useSubmit } from "@remix-run/react";
import { DisplayPicture } from "../utils/DisplayPicture";
import { LoaderFunctionArgs } from "@remix-run/node";
import { DropdownMenus } from "../utils/DropdownMenus";
import { ExitIcon } from "@radix-ui/react-icons";
import { SettingsIcon } from "../cards/ManageProfileCard";
import { ProfileIcon, InboxIcon, CreatePostIcon, SearchIcon, HamburgerIcon } from "../utils/icons";
import ProfileDropdown from "../utils/ProfileDropdown";
import { Dispatch, SetStateAction } from "react";

interface props {
    userId: string;
    setShowSidebar: Dispatch<SetStateAction<boolean>>;
    userDetails: {
      profile: {
        firstName: string;
        lastName: string;
        username: string | null;
        role: string | null;
        profilePicture: string;
        type: string | null;
      };
      email: string;
    };
}

export default function Header({ userDetails, userId, setShowSidebar }: props) {
  

  return (
    <>
      <nav className="flex w-full items-center border-b-2 border-midGrey">
        <div className="p-4 cursor-pointer" onClick={() => {setShowSidebar(preValue => !preValue)}}>
          <HamburgerIcon />
        </div>
        <Form className="w-full" action="">
          <div className="flex md:w-5/12 h-fit m-auto mt-2 items-center bg-midGrey text-lightGrey rounded-md justify-between">
            <p className=" p-1 flex gap-4 items-center w-full flex-grow">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search posts, tags, users"
                className="w-full flex-grow bg-midGrey"
              />
            </p>
            <div className="h-fit w-fit rounded-md px-2 mr-2 bg-lightGrey text-[13px] text-darkGrey ">
              /
            </div>
          </div>
        </Form>
        <div className="p-2">
            <ProfileDropdown userDetails={userDetails} userId={userId}/>
        </div>
      </nav>
    </>
  );
}



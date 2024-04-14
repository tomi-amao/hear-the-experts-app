import * as Switch from "@radix-ui/react-switch";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Form } from "@remix-run/react";
import { useState } from "react";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(true);
  const checkChangeHandler = () => {
      if (darkMode) {
          setDarkMode(preValue => !preValue)
          console.log(darkMode);
      } else if (!darkMode) {
          setDarkMode(preValue => !preValue)
          console.log(darkMode);
      }
  }

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
            {darkMode ? <SunIcon className="m-1" /> : <MoonIcon className="m-1" />}
            
          </Switch.Thumb>
        </Switch.Root>
      </div>
    </Form>
  );
}

export default DarkModeToggle;

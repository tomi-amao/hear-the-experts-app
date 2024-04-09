import { Form, Link, NavLink, useLoaderData } from "@remix-run/react";

function MainHeader() {
  const userId = useLoaderData();

  return (
    <header className="bg">
        DarkMode
    </header>
  );
}

export default MainHeader;

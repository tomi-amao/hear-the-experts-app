import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useActionData,
} from "@remix-run/react";
import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import stylesheet from "~/styles/tailwind.css?url";
import DarkModeToggle from "./components/buttons/DarkModeToggle";


export const links: LinksFunction = () => {return [
  { rel: "stylesheet", href: stylesheet }
]};

export function Layout({ children }: { children: React.ReactNode }) {
  const actionData = useActionData<typeof action>();

  // console.log(actionData);
  
  
  return (
    <html lang="en" className={actionData?.mode ? '' : 'dark'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-mauve2 dark:bg-bgprimary">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
      
    </html>
  );
}

export async function action({request} :ActionFunctionArgs) {
  const formData = await request.formData()
  const darkToggle =  Object.fromEntries(formData)
  const mode = Boolean(darkToggle.darkToggle)
  console.log(darkToggle);
  
  console.log(mode);
  
  
  return {
    mode
  }

}

export default function App() {
  return <Outlet />;
}

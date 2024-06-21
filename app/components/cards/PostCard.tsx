import type { User } from "@prisma/client";

export default function PostCard(userDetails: User) {
  return (
    <>
      <div className="w-full h-fit bg-midGrey p-3 rounded-md grid grid-cols-[0.1fr_1fr] ">
        <h1 className="w-[45px] h-[45px] rounded-full bg-bgprimary m-2 row-span-2 "></h1>
        <div className="flex items-center pt-2 ">
          <div className="flex flex-col">
            <h2 className="text-base h-fit">Olivia Hayes · Software Engineer</h2>
            <h3 className="text-sm h-fit text-altMidGrey">
              Suggestion · 2 hours ago
            </h3>
          </div>
        </div>
        <div className="flex flex-col col-start-1 col-span-2 pl-2 pt-2">
          <div className="flex items-baseline">
            <h2 className="text-base h-fit pr-4">Network Failover </h2>
            <ul className="flex gap-2 text-xs rounded-md ">
              <li className="bg-darkGrey rounded-md p-1 px-2">Network</li>{" "}
              <li className="bg-darkGrey rounded-md p-1 px-2">
                Infrastructure
              </li>
            </ul>
          </div>
          <p className="text-base text-altMidGrey h-fit">
            Failure across the network is occurring frequently. This often leeds
            to messages not being send to the correct recipient.
          </p>
        </div>
      </div>
    </>
  );
}

export function PostCardTemplate() {
  return (
    <div className="w-full h-fit bg-midGrey p-3 rounded-md grid grid-cols-[0.1fr_1fr] ">
        <h1 className="w-[45px] h-[45px] rounded-full bg-bgprimary m-2 row-span-2 "></h1>
        <div className="flex items-center pt-2 ">
          <div className="flex flex-col">
            <h2 className="text-base h-fit">Olivia Hayes · Software Engineer</h2>
            <h3 className="text-sm h-fit text-altMidGrey">
              Suggestion · 2 hours ago
            </h3>
          </div>
        </div>
      </div>
  )
  
}
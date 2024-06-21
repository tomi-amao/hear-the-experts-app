import { Modal } from "../utils/Modal";
import { PostCardTemplate } from "./PostCard";

export default function CreatePostCard() {
  return (
    <Modal
      returnTo="/feed"
      setShowProfileManage={() => {}}
      modalWidth="w-fit"
      childrenStyle="flex flex-col w-full items-center "
    >
      <div className="w-full h-fit bg-midGrey p-3 rounded-md grid grid-cols-[0.1fr_1fr] ">
        <h1 className="w-[45px] h-[45px] rounded-full bg-bgprimary m-2 row-span-2 "></h1>
        <div className="flex items-center pt-2 text-lightGrey">
          <div className="flex flex-col">
            <h2 className="text-base h-fit">
              Olivia Hayes · Software Engineer
            </h2>
          </div>
        </div>
        <div className="w-ful pt-2 ">
            <textarea placeholder="Share a post"  className="w-full h-40 bg-midGrey resize-none"/>
        </div>
      </div>
    </Modal>
  );
}

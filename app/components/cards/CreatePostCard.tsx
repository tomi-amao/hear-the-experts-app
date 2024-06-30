import { Form, redirect, useNavigate, useNavigation } from "@remix-run/react";
import { Modal } from "../utils/Modal";
import FormOptions, {
  FormField,
  FormFieldFloating,
  FormTextArea,
} from "../utils/FormField";
import { useState } from "react";

export default function CreatePostCard() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const deleteTag = (option: string) => {
    const filteredTags = selectedOptions.filter((tag) => option !== tag);
    setSelectedOptions(filteredTags);
  };

  return (
    <Modal
      returnTo="/feed"
      setShowProfileManage={() => {}}
      childrenStyle="flex flex-col w-full items-center "
    >
      <div
        className="w-full h-fit bg-midGrey p-5 rounded-md grid grid-cols-[0.1fr_1fr]  "
        onClick={() => {
          setShowOptions(false);
        }}
      >
        <h1 className="w-[45px] h-[45px] rounded-full bg-bgprimary m-2 row-span-2 "></h1>
        <div className="flex items-center pt-2 text-lightGrey">
          <div className="flex flex-col">
            <h2 className="text-base h-fit">
              Olivia Hayes · Software Engineer
            </h2>
          </div>
        </div>
        <div className="w-full pt-6">
          <Form action="/manage/post" method="post">
            <fieldset className="grid w-full gap-6 md:grid-cols-2 pb-4">
              <SelectType />
            </fieldset>
            <fieldset className="flex flex-col gap-4 pb-3">
              <FormFieldFloating htmlFor="title" placeholder="Title" />
              
              <FormTextArea
                htmlFor="content"
                placeholder="Share a problem/solution"
              />
            </fieldset>
            <fieldset>
              <FormField
                type="hidden"
                htmlFor="status"
                value="UNRESOLVED"
                placeholder=""
              />
            </fieldset>
            <fieldset>
              <FormOptions
                setShowOptions={setShowOptions}
                showOptions={showOptions}
                setSelectedOptions={setSelectedOptions}
                selectedOptions={selectedOptions}
              />
            </fieldset>
            <ul className="flex text-sm gap-2 w-full flex-wrap">
              {selectedOptions.map((option) => (
                <li
                  onClick={() => {
                    deleteTag(option);
                  }}
                  className="bg-lightGrey rounded-md p-1 px-2 cursor-pointer hover:bg-darkRed "
                >
                  {" "}
                  {option}{" "}
                </li>
              ))}
            </ul>
            <fieldset>
              <FormField
                type="hidden"
                htmlFor="tags"
                placeholder=""
                value={selectedOptions}
              />
            </fieldset>

            <div className="flex flex-row-reverse">
              <SubmitButton value="createPost" />
              <CancelButton />
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

function SubmitButton({ value }: { value: string }) {
  const navigation = useNavigation();

  const isSubmitting = navigation.formAction === "/dashboard/problem/create";

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="bg-txtprimary text-green11 hover:bg-green5 focus:shadow-bgprimary inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
      name="_action"
      value={value}
    >
      {isSubmitting ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-mauve12 "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p> Creating...</p>
        </>
      ) : (
        "Save"
      )}
    </button>
  );
}

function CancelButton() {
  const navigate = useNavigate();
  const cancelPost = () => {
    navigate("/dashboard");
  };
  return (
    <button
      type="submit"
      className=" text-lightGrey hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
      onClick={cancelPost}
    >
      Cancel
    </button>
  );
}

function SelectType() {
  return (
    <>
      <li className="list-none">
        <input
          type="radio"
          id="suggestion"
          name="type"
          value="suggestion"
          className="hidden peer "
          required
        />
        <label
          htmlFor="suggestion"
          className="inline-flex items-center justify-between w-full p-2 text-lightGrey border hover:bg-altMidGrey rounded-lg cursor-pointer peer-checked:border-txtprimary dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="block">
            <div className="w-full text-sm">Suggestion</div>
          </div>
        </label>
      </li>
      <li className="list-none">
        <input
          type="radio"
          id="problem"
          name="type"
          value="problem"
          className="hidden peer list-none"
          required
        />
        <label
          htmlFor="problem"
          className="inline-flex items-center justify-between w-full p-2 text-lightGrey border hover:bg-altMidGrey rounded-lg cursor-pointer peer-checked:border-txtprimary dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="block">
            <div className="w-full text-sm">Problem</div>
          </div>
        </label>
      </li>
    </>
  );
}
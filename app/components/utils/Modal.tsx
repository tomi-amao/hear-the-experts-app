import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Form, Link, useNavigate } from "@remix-run/react";

export function Modal({children, returnTo}: {children: React.ReactNode, returnTo: string}) {

    const navigate = useNavigate();
    const modalCloseHandler = (page: string) => {
      navigate(page);
    };
    return (
    <>
     <Dialog.Root defaultOpen>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content
            className="bg-bgprimary data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] flex flex-col items-baseline max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] focus:outline-none"
            onInteractOutside={() => {
              modalCloseHandler(returnTo);
            }}
          >
            <Dialog.Title className="text-jade9 m-0 text-[17px] font-medium">
              Highlight a Problem
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              Make changes to your profile here. Click save when you're done.
            </Dialog.Description>
            <div className="flex flex-col w-full items-center">
            {children}
            </div>

            <Dialog.Close asChild>
              <Link
                to=".."
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <Cross2Icon />
              </Link>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
)}
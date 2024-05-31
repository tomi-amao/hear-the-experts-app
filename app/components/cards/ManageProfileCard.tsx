import { json } from "@remix-run/node";
import { Dispatch, SetStateAction } from "react";
import { Modal } from "~/components/utils/Modal";

interface props {
    setShowProfileManage: Dispatch<SetStateAction<boolean>>
}

export default function ManageProfile({setShowProfileManage} : props) {
    return (
        <Modal returnTo="." setShowProfileManage={setShowProfileManage}  modalWidth="[450px]">
            <div className="w-[400px] m-auto bg-txtprimary">
                
            </div>
        </Modal>
    )
    
}

export function loader() {
    return {}
}
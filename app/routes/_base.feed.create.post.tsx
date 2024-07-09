import { useActionData } from "@remix-run/react";
import CreatePostCard from "~/components/cards/CreatePostCard";

export default function CreatePost() {

    const actionData = useActionData()
    
    return ( 
        <div>
            <CreatePostCard/>
        </div>
    )
}
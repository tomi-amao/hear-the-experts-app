import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData, useNavigate, useSubmit } from "@remix-run/react";
import { useEffect } from "react";
import { createPost } from "~/models/posts.server";
import { requireUserId } from "~/models/user.server";
import { logout } from "~/services/session.server";



export const action: ActionFunction = async ({ request }) => {
    const userId = await requireUserId(request);
    const data = await request.formData();
    const formData = Object.fromEntries(data);  
    const tag = formData.tag;
    
    switch (formData._action as string) {
        case "createPost":
            formData.tags = formData.tags.split(",");
            formData.authorId = userId;
        
        
            const newPost = await createPost(formData);
            return redirect("/feed");
        case "deletePost":
            return {}
        default:
            break;
    }
    return redirect("/feed")
};
export const loader: LoaderFunction = async () => redirect("/feed");

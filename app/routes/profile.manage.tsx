import {
  ActionFunctionArgs,
  LoaderFunction,
  UploadHandler,
  redirect,
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";
import { Form, Outlet, useActionData, useLoaderData } from "@remix-run/react";
import { UserPanel } from "~/components/navigation/UserPanel";
import { getOtherUser, requireUserId, updateUser } from "~/models/user.server";
import { authenticator } from "~/services/auth.server";
import { getUserAvatar, uploadImage } from "~/services/fileUpload.server";
import cloudinary from "cloudinary";

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);

  // handle upload user image to cloudinary using the custom uploadimage function
  const uploadHandler: UploadHandler = composeUploadHandlers(
    async ({ name, data, contentType, filename }) => {
      if (name !== "avatar") {
        return undefined;
      }
      console.log(data, filename, contentType, name);

      //parse image data to be uploaded asynchronously
      const uploadedImage: cloudinary.UploadApiResponse = await uploadImage(
        data
      );
      await updateUser(userId!, { profilePicture: uploadedImage.secure_url });
      return uploadedImage.secure_url;
    },
    createMemoryUploadHandler()
  );
  const formData = await parseMultipartFormData(request, uploadHandler);

  let role = formData.get("role");
  let username = formData.get("username");
  let avatar = formData.get("avatar");

  console.log(typeof avatar);

  console.log(avatar, "tesint avatar");

  if (typeof username !== "string" || typeof role !== "string") {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }

  // if user uploaded avatar image, perform upload handler
  if (avatar) {
    // parse in the request data to the uploadhandler using parseMultipartFormdata function
    const imgSrc = formData.get("avatar");
    console.log(imgSrc);

    if (!imgSrc) {
      return json({ error: "something wrong", imgSrc: null });
    }
    const updatedUserProfile = await updateUser(userId!, { username, role });

    return json({ error: null, imgSrc, username, role });
  }

  const updatedUserProfile = await updateUser(userId!, { username, role });

  return redirect("/dashboard");
}

export async function loader() {
  return redirect("/dashboard");
}

// parse in the request data to the uploadhandler using parseMultipartFormdata function

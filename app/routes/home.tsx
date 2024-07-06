import { ActionFunctionArgs, LoaderFunction, UploadHandler, redirect,   json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData, } from "@remix-run/node";
import { Form, Outlet, useActionData, useLoaderData } from "@remix-run/react";
import { UserPanel } from "~/components/navigation/UserPanel";
import { getOtherUser, requireUserId } from "~/models/user.server";
import { authenticator } from "~/services/auth.server";
import { uploadImage } from "~/services/fileUpload.server";
import cloudinary from "cloudinary";


export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (user) {
    const userId = await requireUserId(request);
    const otherUsers = await getOtherUser(userId!);

    return json({ otherUsers });
  } else {
    return redirect("/login");
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  // handle upload user image to cloudinary using the custom uploadimage function 
  const uploadHandler: UploadHandler = composeUploadHandlers(
    async ({ name, data, contentType, filename }) => {
      if (name !== "img") {
        return undefined;
      }
      console.log(data, filename, contentType, name);
      
      
      //parse image data to be uploaded asynchronously 
      const uploadedImage: cloudinary.UploadApiResponse = await uploadImage(data);
      return uploadedImage.secure_url;
    },
    createMemoryUploadHandler(),
  );

  // parse in the request data to the uploadhandler using parseMultipartFormdata function
  const formData = await parseMultipartFormData(request, uploadHandler);
  const imgSrc = formData.get("img");
  console.log(imgSrc);
  
  const imgDesc = formData.get("desc");
  if (!imgSrc) {
    return json({ error: "something wrong", imgDesc: null, imgSrc: null });
  }

  return json({ error: null, imgDesc, imgSrc });
};

export default function Home() {
  const { otherUsers } = useLoaderData<typeof loader>();
  const data = useActionData<typeof action>();

  return (
    <>
      <Outlet />
      <div className="h-full flex">
        <UserPanel users={otherUsers} />
      </div>
      <div
        className="bg-txtprimary w-full"
        onClick={() => {
          console.log("hello");
        }}
      ></div>
      <div>
        (
        <>
          <Form method="post" encType="multipart/form-data" action="/home" className="bg-txtprimary">
            <label htmlFor="img-field">Image to upload</label>
            <input id="img-field" type="file" name="img" accept="image/*" />
            <label htmlFor="img-desc">Image description</label>
            <input id="img-desc" type="text" name="desc" />
            <button type="submit">upload to cloudinary</button>
          </Form>
          {data?.error ? <h2>{data.error}</h2> : null}

          {data?.imgSrc ? (
            <>
              <h2>uploaded image</h2>
              <img src={data.imgSrc} alt={data.imgDesc || "Upload result"} />
            </>
          ) : null}
        </>
        );
      </div>
    </>
  );
}

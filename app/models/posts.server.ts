import { prisma } from "~/services/db.server";

import { Posts } from "@prisma/client";

export const createPost = async (postData: Posts) => {
  const post = await prisma.posts.create({
    data: {
      title: postData.title,
      content: postData.content,
      authorId: postData.authorId,
      status: postData.status,
      type: postData.type,
      tags: postData.tags
    },
  });

  console.log(post);
  
};


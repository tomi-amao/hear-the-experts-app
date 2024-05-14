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
      tags: postData.tags,
    },
  });

  console.log(post);
};

export const getUserPosts = async (userId: string) => {
  const userPosts = await prisma.posts.findMany({
    where: {authorId: userId}
  })
  // console.log(userPosts[0].posts);
  // console.log(userPosts);
  
  return userPosts 
};

export const deletePost = async (id: string) => {
  const deletePost = await prisma.posts.delete({where: {id}})
}
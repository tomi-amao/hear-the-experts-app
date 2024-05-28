import { prisma } from "~/services/db.server";

import { Posts, Prisma } from "@prisma/client";

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

export const getUserPosts = async (userId: string, sortFilter: Prisma.PostsOrderByWithRelationInput , whereFilter: Prisma.PostsWhereInput) => {
  const userPosts = await prisma.posts.findMany({
    orderBy: {...sortFilter},
    where: {authorId: userId ,...whereFilter}
  })
  // console.log(userPosts[0].posts);
  // console.log(userPosts);
  
  return userPosts 
};

export const deletePost = async (id: string) => {
  const deletePost = await prisma.posts.delete({where: {id}})
  console.log(deletePost);
  
  return deletePost
}
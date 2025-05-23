import type { Post } from "../types"
import { api } from "./api"

export const postApi = api.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<Post, { content: string }>({
      query: postData => ({
        url: "/posts",
        method: "POST",
        body: postData,
      }),
    }),
    updatePost: builder.mutation<Post, { content: string; id: string }>({
      query: ({ content, id }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: { content },
      }),
    }),
    getAllPosts: builder.query<Post[], void>({
      query: () => ({
        url: "posts",
        method: "GET",
      }),
    }),
    getPostById: builder.query<Post, string>({
      query: id => ({
        url: `posts/${id}`,
        method: "GET",
      }),
    }),
    deletePost: builder.mutation<void, string>({
      query: id => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
  useDeletePostMutation,
} = postApi

export const {
  endpoints: { createPost, updatePost, getAllPosts, getPostById, deletePost },
} = postApi

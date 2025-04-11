import type { Like } from "../types"
import { api } from "./api"

export const likeApi = api.injectEndpoints({
  endpoints: builder => ({
    addLike: builder.mutation<Like, { postId: string }>({
      query: body => ({
        url: "like",
        method: "POST",
        body,
      }),
    }),
    removeLike: builder.mutation<void, string>({
      query: id => ({
        url: `/like/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useAddLikeMutation, useRemoveLikeMutation } = likeApi

export const {
  endpoints: { addLike, removeLike },
} = likeApi

import { api } from "./api"

export const followApi = api.injectEndpoints({
  endpoints: builder => ({
    follow: builder.mutation<void, { followingId: string }>({
      query: body => ({
        url: "/follow",
        method: "POST",
        body,
      }),
    }),
    unFollow: builder.mutation<void, string>({
      query: id => ({
        url: `/unfollow/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useFollowMutation, useUnFollowMutation } = followApi

export const {
  endpoints: { follow, unFollow },
} = followApi

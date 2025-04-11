import type { User } from "../types"
import { api } from "./api"

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<
      { email: string; password: string; name: string },
      { email: string; password: string; name: string }
    >({
      query: userData => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: userData => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
    getUserById: builder.query<User, string>({
      query: id => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
    getUsersByNickname: builder.query<User[], string>({
      query: search => ({
        url: `/users?query=${search}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<User, { userData: FormData; id: string }>({
      query: ({ userData, id }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
    current: builder.query<User, void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
  useCurrentQuery,
  useLazyCurrentQuery,
  useGetUsersByNicknameQuery,
  useLazyGetUsersByNicknameQuery,
} = userApi

export const {
  endpoints: {
    register,
    login,
    getUserById,
    updateUser,
    current,
    getUsersByNickname,
  },
} = userApi

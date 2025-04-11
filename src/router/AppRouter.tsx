import { Layout } from "@components/shared/layout"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Auth } from "./../pages/auth"
import { CurrentPost } from "./../pages/current-post"
import { Followers } from "./../pages/followers"
import { Following } from "./../pages/following"
import { Posts } from "./../pages/posts"
import { Search } from "./../pages/search"
import { UserProfile } from "./../pages/user-profile"

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Posts />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "post/:id",
          element: <CurrentPost />,
        },
        {
          path: "user/:id",
          element: <UserProfile />,
        },
        {
          path: "user/:id/followers",
          element: <Followers />,
        },
        {
          path: "user/:id/following",
          element: <Following />,
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}

export default AppRouter

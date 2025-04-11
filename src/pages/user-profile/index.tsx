import { EditProfile } from "@components/shared/edit-profile"
import { ProfilePosts } from "@components/shared/profile-posts"
import { UserInfo } from "@components/shared/user-info"
import { BackBtn } from "@components/ui/button/back-btn"
import { ErrorMessage } from "@components/ui/error-message"

import { Tab, Tabs, useDisclosure } from "@nextui-org/react"
import { useState } from "react"
import { useParams } from "react-router-dom"

import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "@services/userApi"

import { hasErrorField } from "@utils/has-error-field"

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data } = useGetUserByIdQuery(id || "")
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  const [error, setError] = useState("")
  const [selected, setSelected] = useState("Публикации")

  console.log(data)

  const handleClose = async () => {
    if (id) {
      try {
        await triggerGetUserByIdQuery(id).unwrap()
        await triggerCurrentQuery()
        onClose()
      } catch (error) {
        if (hasErrorField(error)) {
          setError(error.data.error)
        } else {
          console.log(error)
        }
      }
    }
  }

  if (!data) {
    return null
  }

  // const likedPosts = data.likes.map(like => like.post)

  console.log("liked", data.likes)
  // console.log("likedPosts", likedPosts)
  console.log("posts", data.posts)

  return (
    <div>
      <BackBtn />
      <UserInfo data={data} id={id || ""} onOpen={onOpen} posts={data.posts} />
      <ErrorMessage error={error} />

      <Tabs
        className="mt-16 mb-5"
        fullWidth
        size="lg"
        selectedKey={selected}
        onSelectionChange={key => setSelected(key as string)}
      >
        <Tab key="Публикации" title="Публикации" className="h-[100%]">
          <ProfilePosts posts={data.posts} />
        </Tab>
        <Tab key="Понравившиеся" title="Понравившиеся" className="h-[100%]">
          <ProfilePosts posts={data.likedPosts} />
        </Tab>
      </Tabs>

      <EditProfile isOpen={isOpen} onClose={handleClose} user={data} />
    </div>
  )
}

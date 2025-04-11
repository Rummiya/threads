import { selectCurrent } from "@features/user/userSlice"
import { Button, Card, Image } from "@nextui-org/react"
import { useFollowMutation, useUnFollowMutation } from "@services/followApi"
import { useLazyCurrentQuery, useLazyGetUserByIdQuery } from "@services/userApi"
import { formatToClientDate } from "@utils/format-to-client-date"
import { hasErrorField } from "@utils/has-error-field"
import { FC } from "react"
import { CiEdit } from "react-icons/ci"
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md"
import { Link } from "react-router-dom"
import { BASE_URL } from "../../../../constants"
import { useAppSelector } from "../../../hooks"
import { Post, User } from "../../../types"
import { CountInfo } from "../count-info"
import { ProfileInfo } from "../profile-info"

type Props = {
  data: User
  posts: Post[]
  id: string
  onOpen: () => void
}

export const UserInfo: FC<Props> = ({ data, posts, id, onOpen }) => {
  const currentUser = useAppSelector(selectCurrent)

  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const [follow] = useFollowMutation()
  const [unFollow] = useUnFollowMutation()

  const handleFollowClick = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unFollow(id).unwrap()
          : await follow({ followingId: id }).unwrap()
        await triggerGetUserByIdQuery(id).unwrap()
        await triggerCurrentQuery()
      }
    } catch (error) {
      hasErrorField(error)
    }
  }
  return (
    <Card>
      <div className="flex gap-10 max-lg:gap-4 py-5 px-10 max-lg:px-5 max-md:p-3">
        <div className="flex flex-col items-center text-center space-y-4 flex-2">
          <Image
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.name}
            className="size-[200px] max-lg:size-[150px] max-md:size-[120px] max-sm:size-[80px] object-cover block"
          />
          <div className="flex flex-col text-2xl max-sm:text-xl font-bold gap-4 items-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                color={data.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2 max-md:text-xs"
                onClick={handleFollowClick}
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data.isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            ) : (
              <Button
                className="max-md:text-xs max-md:px-3 max-md:h-[30px]"
                onClick={onOpen}
                endContent={<CiEdit />}
              >
                Редактировать
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start space-y-4 flex-1">
          <div className="flex justify-center gap-2">
            <CountInfo count={posts.length} title="Публикации" />
            <Link to={`/user/${id}/followers`}>
              <CountInfo count={data.followers.length} title="Подписчики" />
            </Link>
            <Link to={`/user/${id}/following`}>
              <CountInfo count={data.following.length} title="Подписки" />
            </Link>
          </div>

          <div className="flex-1 p-5">
            {/* <ProfileInfo title="Почта" info={data.email} /> */}
            <ProfileInfo title="Местоположение" info={data.location} />
            <ProfileInfo
              title="Дата Рождения"
              info={formatToClientDate(data.dateOfBirth)}
            />
            <ProfileInfo title="Обо мне" info={data.bio} />
          </div>
        </div>
      </div>
    </Card>
  )
}

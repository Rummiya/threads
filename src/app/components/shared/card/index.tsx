import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { selectCurrent } from "../../../../features/user/userSlice"

import { useAppSelector } from "../../../hooks"
import { useDeleteCommentMutation } from "../../../services/commentApi"
import {
  useAddLikeMutation,
  useRemoveLikeMutation,
} from "../../../services/likeApi"
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "../../../services/postApi"

import { CiEdit } from "react-icons/ci"
import { FaRegComment } from "react-icons/fa"
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md"
import { RiDeleteBinLine } from "react-icons/ri"

import { formatToClientDate } from "../../../../utils/format-to-client-date"
import { hasErrorField } from "../../../../utils/has-error-field"

import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NextUiCard,
  Spinner,
} from "@nextui-org/react"

import { useLazyGetUserByIdQuery } from "@services/userApi"
import { ErrorMessage } from "../../ui/error-message"
import { Typography } from "../../ui/typography"
import { MetaInfo } from "../meta-info"
import { UpdatePost } from "../update-post"
import { User } from "../user"

type Props = {
  avatarUrl: string
  name: string
  authorId: string
  content: string
  commentId?: string
  likesCount?: number
  commentsCount?: number
  createdAt?: Date
  updatedAt?: Date
  id?: string
  cardFor: "comment" | "post" | "current-post" | "user-posts"
  likedByUser?: boolean
}

export const Card: React.FC<Props> = ({
  avatarUrl = "",
  name = "",
  authorId = "",
  content = "",
  commentId = "",
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  updatedAt,
  id = "",
  cardFor = "post",
  likedByUser = false,
}) => {
  const { id: userId } = useParams<{ id?: string }>()

  const [triggerGetAllPost] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()

  const [addLikePost] = useAddLikeMutation()
  const [removeLikePost] = useRemoveLikeMutation()

  const [deletePost, deletePostStatus] = useDeletePostMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()

  const [error, setError] = React.useState("")
  const [editPost, setEditPost] = React.useState(false)

  const navigate = useNavigate()
  const currentUser = useAppSelector(selectCurrent)

  const refetchPosts = async () => {
    switch (cardFor) {
      case "post":
        await triggerGetAllPost().unwrap()
        break
      case "user-posts":
        await triggerGetUserByIdQuery(userId || "").unwrap()
        break
      case "current-post":
        await triggerGetPostById(id).unwrap()
        break
      case "comment":
        await triggerGetPostById(id).unwrap()
        break
      default:
        throw new Error("Неверный аргумент cardFor")
    }
  }

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case "post":
          await deletePost(id).unwrap()
          await refetchPosts()
          break
        case "current-post":
          await deletePost(id).unwrap()
          navigate("/")
          break
        case "comment":
          await deleteComment(commentId).unwrap()
          await refetchPosts()
          break
        default:
          throw new Error("Неверный аргумент cardFor")
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      } else {
        setError(error as string)
      }
    }
  }

  const handleLike = async () => {
    try {
      likedByUser
        ? await removeLikePost(id).unwrap()
        : await addLikePost({ postId: id }).unwrap()
      await refetchPosts()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      } else {
        setError(error as string)
      }
    }
  }

  return (
    <NextUiCard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/user/${authorId}`}>
          <User
            name={name}
            avatarUrl={avatarUrl}
            className="text-small font-semibold leading-none text-default-600"
            description={createdAt && formatToClientDate(createdAt)}
          />
        </Link>
        {!editPost && (
          <div className="flex items-center gap-3">
            {authorId === currentUser?.id && cardFor !== "comment" && (
              <div className="cursor-pointer">
                <CiEdit
                  className="hover:opacity-50 ease-in duration-75"
                  onClick={() => setEditPost(prev => !prev)}
                />
              </div>
            )}
            {authorId === currentUser?.id && (
              <div className="cursor-pointer">
                {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
                  <Spinner />
                ) : (
                  <RiDeleteBinLine
                    className="hover:opacity-50 ease-in duration-75"
                    onClick={() => handleDelete()}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        {editPost ? (
          <UpdatePost
            content={content}
            postId={id}
            setEditPost={() => setEditPost(prev => !prev)}
          />
        ) : (
          <Typography>{content}</Typography>
        )}
      </CardBody>
      {cardFor !== "comment" && !editPost && (
        <CardFooter className="gap-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-5 items-center">
              <div onClick={() => handleLike()}>
                <MetaInfo
                  count={likesCount}
                  Icon={
                    likedByUser ? MdOutlineFavorite : MdOutlineFavoriteBorder
                  }
                />
              </div>
              <Link to={`/post/${id}`}>
                <MetaInfo count={commentsCount} Icon={FaRegComment} />
              </Link>
            </div>
            {updatedAt && updatedAt !== createdAt && (
              <p className="text-xs text-zinc-200">
                Редактировано {new Date(updatedAt).toLocaleDateString()}
              </p>
            )}
          </div>

          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </NextUiCard>
  )
}

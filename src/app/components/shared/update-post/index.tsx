import { Button, Spinner, Textarea } from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form"
import {
  useLazyGetAllPostsQuery,
  useUpdatePostMutation,
} from "../../../services/postApi"
import { Post } from "../../../types"

export const UpdatePost = ({
  content,
  postId,
  setEditPost,
}: {
  content: string
  postId: string
  setEditPost: () => void
}) => {
  const [updatePost, updatePostStatus] = useUpdatePostMutation()
  const [triggerAllPosts] = useLazyGetAllPostsQuery()

  const { control, handleSubmit } = useForm<Post>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      content: content,
    },
  })

  const onSubmit = handleSubmit(async data => {
    try {
      await updatePost({
        content: data.content,
        id: postId,
      }).unwrap()
      await triggerAllPosts().unwrap()
      setEditPost()
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <legend className="mb-5 text-lg font-semibold">
        Редактирование публикации
      </legend>
      <Controller
        name="content"
        control={control}
        rules={{ required: "Обязательное поле" }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="О чем думаете?"
            className="mb-5"
          />
        )}
      />

      <Button
        color="success"
        className="flex-end mr-2"
        type="submit"
        disabled={updatePostStatus.isLoading}
      >
        {updatePostStatus.isLoading ? <Spinner /> : "Сохранить"}
      </Button>

      <Button color="default" onClick={() => setEditPost()}>
        Отмена
      </Button>
    </form>
  )
}

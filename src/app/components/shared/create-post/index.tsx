import { Button, Textarea } from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form"
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../../../services/postApi"
import { ErrorMessage } from "../../ui/error-message"

export const CreatePost = () => {
  const [createPost] = useCreatePostMutation()
  const [triggerAllPosts] = useLazyGetAllPostsQuery()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const error = errors?.post?.message as string

  const onSubmit = handleSubmit(async data => {
    try {
      await createPost({ content: data.post }).unwrap()
      setValue("post", "")
      await triggerAllPosts().unwrap()
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        name="post"
        control={control}
        defaultValue={""}
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

      {errors && <ErrorMessage error={error} />}

      <Button
        color="success"
        className="flex-end text-default-50"
        type="submit"
      >
        Добавить публикацию
      </Button>
    </form>
  )
}

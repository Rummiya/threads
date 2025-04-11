import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@nextui-org/react"
import React, { useContext, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { MdOutlineEmail } from "react-icons/md"
import { useParams } from "react-router-dom"
import { hasErrorField } from "../../../../utils/has-error-field"
import { useUpdateUserMutation } from "../../../services/userApi"
import { User } from "../../../types"
import { Button } from "../../ui/button"
import { ErrorMessage } from "../../ui/error-message"
import { Input } from "../../ui/input"
import AddPhoto from "../add-photo"
import { ThemeContext } from "../theme-provider"

type Props = {
  isOpen: boolean
  onClose: () => void
  user?: User
}

export const EditProfile: React.FC<Props> = ({ isOpen, onClose, user }) => {
  const { theme } = useContext(ThemeContext)
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const [error, setError] = useState("")
  const [photo, setPhoto] = useState<null | File>(null)
  const { id } = useParams<{ id?: string }>()

  // Функция для добавления фото
  const handleAddPhoto = (file: File) => {
    setPhoto(file)
  }

  const { control, handleSubmit } = useForm<User>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      name: user?.name,
      email: user?.email,
      dateOfBirth: user?.dateOfBirth,
      bio: user?.bio,
      location: user?.location,
    },
  })

  const onSubmit = async (data: User) => {
    if (id) {
      try {
        const formData = new FormData()
        data.name && formData.append("name", data.name)
        data.email &&
          data.email !== user?.email &&
          formData.append("email", data.email)
        data.bio && formData.append("bio", data.bio)
        data.dateOfBirth &&
          formData.append(
            "dateOfBirth",
            new Date(data.dateOfBirth).toISOString(),
          )
        data.location && formData.append("location", data.location)
        photo && formData.append("avatar", photo)

        await updateUser({ id, userData: formData })
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${theme} text-foreground overflow-y-auto max-w-[400px] max-sm:w-full max-sm:px-2`}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1 max-sm:text-sm">
              Изменение профиля
            </ModalHeader>
            <ModalBody className="max-sm:gap-2 max-sm:px-3">
              <form
                className="flex flex-col gap-4 max-sm:gap-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <AddPhoto onAdd={file => handleAddPhoto(file)} image={photo} />
                <Input
                  control={control}
                  name="email"
                  label="Email"
                  type="email"
                  endContent={<MdOutlineEmail />}
                  className="max-sm:text-sm"
                />
                <Input
                  control={control}
                  name="name"
                  label="Имя"
                  type="text"
                  className="max-sm:text-sm"
                />
                <Input
                  control={control}
                  name="dateOfBirth"
                  label="Дата рождения"
                  type="date"
                  placeholder="Дата рождения"
                  className="max-sm:text-sm"
                />
                <Controller
                  control={control}
                  name="bio"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="ваша биография"
                      rows={4}
                      className="max-sm:text-sm"
                    />
                  )}
                />
                <Input
                  control={control}
                  name="location"
                  label="Местоположение"
                  type="text"
                  className="max-sm:text-sm"
                />

                <ErrorMessage error={error} />

                <div className="flex gap-2 justify-end max-sm:flex-col">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Обновить
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

import { Button, Link } from "@nextui-org/react"
import React from "react"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "../../app/components/ui/error-message"
import { Input } from "../../app/components/ui/input"
import { useRegisterMutation } from "../../app/services/userApi"
import { hasErrorField } from "../../utils/has-error-field"

type Props = {
  setSelected: (value: string) => void
}

type RegisterProps = {
  email: string
  password: string
  name: string
}

export const Register: React.FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterProps>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const [register, { isLoading }] = useRegisterMutation()
  const [error, setError] = React.useState("")

  const onSubmit = async (data: RegisterProps) => {
    try {
      await register(data).unwrap()
      setSelected("login")
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    <form
      className="flex flex-col justify-between h-[100%] pt-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <Input
          control={control}
          name="name"
          label="name"
          type="text"
          required="Обязательное поле"
        />
        <Input
          control={control}
          name="email"
          label="Email"
          type="email"
          required="Обязательное поле"
        />
        <Input
          control={control}
          name="password"
          label="Password"
          type="password"
          required="Обязательное поле"
        />

        <ErrorMessage error={error} />
      </div>

      <div>
        <p className="text-center text-small">
          Уже есть аккаунт?{" "}
          <Link
            size="sm"
            className="cursor-pointer"
            onPress={() => setSelected("login")}
          >
            Войдите
          </Link>
        </p>
        <div className="mt-2">
          <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </form>
  )
}

import { Button, Link } from "@nextui-org/react"
import React from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { ErrorMessage } from "../../app/components/ui/error-message"
import { Input } from "../../app/components/ui/input"
import { hasErrorField } from "../../utils/has-error-field"

import {
  useLazyCurrentQuery,
  useLoginMutation,
} from "../../app/services/userApi"

type Props = {
  setSelected: (value: string) => void
}

type LoginProps = {
  email: string
  password: string
}

export const Login: React.FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginProps>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const [error, setError] = React.useState("")

  const onSubmit = async (data: LoginProps) => {
    try {
      await login(data).unwrap()
      await triggerCurrentQuery().unwrap()
      navigate("/")
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
      console.log(error)
    }
  }

  return (
    <form
      className="flex justify-between flex-col h-[100%] pt-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
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
          Нет аккаунта?{" "}
          <Link
            size="sm"
            className="cursor-pointer"
            onPress={() => setSelected("sign-up")}
          >
            Зарегистрируйтесь
          </Link>
        </p>
        <div className="flex gap-2 justify-end mt-2">
          <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
            Войти
          </Button>
        </div>
      </div>
    </form>
  )
}

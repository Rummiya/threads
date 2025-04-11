import { Spinner } from "@nextui-org/react"
import { useCurrentQuery } from "../../app/services/userApi"

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return children
}

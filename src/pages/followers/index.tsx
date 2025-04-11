import { User } from "@components/shared/user"
import { BackBtn } from "@components/ui/button/back-btn"
import { Card, CardBody } from "@nextui-org/react"
import { useGetUserByIdQuery } from "@services/userApi"
import { Link, useParams } from "react-router-dom"

export const Followers = () => {
  const { id } = useParams<{ id?: string }>()
  const { data } = useGetUserByIdQuery(id || "")

  if (!data) return null

  return (
    <>
      <BackBtn />
      <h1 className="text-3xl font-semibold mb-5">Подписчики</h1>
      {data.followers.length > 0 ? (
        <div className="flex flex-col gap-5">
          {data.followers.map(user => (
            <Link key={user.id} to={`/user/${user.follower.id}`}>
              <Card>
                <CardBody className="block">
                  <User
                    avatarUrl={user.follower.avatarUrl ?? ""}
                    description={user.follower.email ?? ""}
                    name={user.follower.name ?? ""}
                  />
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <h1>У вас нет подписчиков</h1>
      )}
    </>
  )
}

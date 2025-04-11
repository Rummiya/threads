import { User } from "@components/shared/user"
import { BackBtn } from "@components/ui/button/back-btn"
import { Card, CardBody } from "@nextui-org/react"
import { useGetUserByIdQuery } from "@services/userApi"
import { Link, useParams } from "react-router-dom"

export const Following = () => {
  const { id } = useParams<{ id?: string }>()
  const { data } = useGetUserByIdQuery(id || "")

  if (!data) return null

  return (
    <>
      <BackBtn />
      <h1 className="text-3xl font-semibold mb-5">Подписки</h1>
      {data.following.length > 0 ? (
        <div className="flex flex-col gap-5">
          {data.following.map(user => (
            <Link key={user.id} to={`/user/${user.following.id}`}>
              <Card>
                <CardBody className="block">
                  <User
                    avatarUrl={user.following.avatarUrl ?? ""}
                    description={user.following.email ?? ""}
                    name={user.following.name ?? ""}
                  />
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <h1>
          У <span className="font-semibold">{data.name}</span> нет подписок
        </h1>
      )}
    </>
  )
}

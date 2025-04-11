import { Card, CardBody, CardHeader, Image } from "@nextui-org/react"
import { Link } from "react-router-dom"
import { BASE_URL } from "../../../../../constants"
import { selectCurrent } from "../../../../../features/user/userSlice"
import { useAppSelector } from "../../../../hooks"

export const Profile = () => {
  const current = useAppSelector(selectCurrent)

  if (!current) {
    return null
  }

  const { name, email, avatarUrl, id } = current

  return (
    <Card className="py-4 w-[302px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          className="object-cover rounded-xl"
          src={`${BASE_URL}${avatarUrl}`}
          alt="card-profile"
          width={370}
        />
      </CardHeader>
      <CardBody>
        <Link to={`/user/${id}`}>
          <h4 className="font-bold text-large mb-2">{name}</h4>
        </Link>
        <p className="text-default-500 flex items-end gap-1">
          {/* <MdAlternateEmail /> */}
          {email}
        </p>
      </CardBody>
    </Card>
  )
}

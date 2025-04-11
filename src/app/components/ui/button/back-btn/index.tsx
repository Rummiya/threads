import { FaRegArrowAltCircleLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export const BackBtn = () => {
  const navigate = useNavigate()

  return (
    <div
      className="text-default-500 flex items-center gap-2 mb-10 cursor-pointer"
      onClick={() => navigate(-1)}
    >
      <FaRegArrowAltCircleLeft />
      Назад
    </div>
  )
}

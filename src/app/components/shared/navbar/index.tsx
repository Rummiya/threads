import { FaHome, FaSearch, FaUser } from "react-icons/fa"
import { selectCurrent } from "../../../../../features/user/userSlice"
import { useAppSelector } from "../../../../hooks"
import { NavButton } from "../../../ui/nav-button"

export const Navbar = () => {
  const currentUser = useAppSelector(selectCurrent)

  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton href="/" icon={<FaHome />}>
            Главная
          </NavButton>
        </li>
        <li>
          <NavButton href="search" icon={<FaSearch />}>
            Поиск
          </NavButton>
        </li>
        {/*<li>
          <NavButton href="followers" icon={<FaUsers />}>
            Подписчики
          </NavButton>
        </li> */}
        {currentUser !== null && (
          <li>
            <NavButton href={`user/${currentUser.id}`} icon={<FaUser />}>
              Профиль
            </NavButton>
          </li>
        )}
      </ul>
    </nav>
  )
}

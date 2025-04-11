import { Button } from "@nextui-org/react"
import React from "react"
import { CiLogout } from "react-icons/ci"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import {
  logout,
  selectIsAuthenticated,
} from "../../../../features/user/userSlice"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { ThemeContext } from "../theme-provider"

export const Header = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <div className="z-40 w-full h-auto items-center justify-between inset-x-0 backdrop-blur-xl  backdrop-saturate-150 bg-background/70 flex max-w-screen-xl mx-auto p-5">
      <div>
        <p className="font-serif text-xl italic font-thin">Threads</p>
      </div>

      <ul className="flex justify-end items-center gap-5">
        <li
          className="lg:flex text-3xl cursor-pointer"
          onClick={() => toggleTheme()}
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </li>
        <li>
          {isAuthenticated && (
            <Button
              color="default"
              variant="flat"
              className="gap-2"
              onClick={() => handleLogout()}
            >
              <CiLogout /> Выйти
            </Button>
          )}
        </li>
      </ul>
    </div>
  )
}

import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { selectIsAuthenticated } from "../../../../features/user/userSlice"
import { useAppSelector } from "../../../hooks"
import { Container } from "../container"
import { Header } from "../header"
import { Navbar } from "../navbar"

export const Layout = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [isAuthenticated, navigate])

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4 max-md:hidden">
          <div className="sticky top-4">
            <Navbar />
          </div>
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </Container>
    </>
  )
}

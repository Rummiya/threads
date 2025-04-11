import { Login } from "@features/user/login"
import { Register } from "@features/user/register"
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { useState } from "react"

export const Auth = () => {
  const [selected, setSelected] = useState("login")

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="max-w-full w-[340px] h-[450px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            selectedKey={selected}
            onSelectionChange={key => setSelected(key as string)}
          >
            <Tab key="login" title="Вход" className="h-[100%]">
              <Login setSelected={setSelected} />
            </Tab>
            <Tab key="sign-up" title="Регистрация" className="h-[100%]">
              <Register setSelected={setSelected} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  )
}

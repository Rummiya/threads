import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"

import { NextUIProvider } from "@nextui-org/react"

import { ThemeProvider } from "./app/components/shared/theme-provider"
import { store } from "./app/store"

import { AuthGuard } from "./features/user/authGuard"
import "./index.css"
import AppRouter from "./router/AppRouter"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <ThemeProvider>
            <AuthGuard>
              <AppRouter />
            </AuthGuard>
          </ThemeProvider>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}

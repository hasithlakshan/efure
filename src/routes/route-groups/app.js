import React from "react"
import { Login } from "../../pages/login"
import { Home } from "../../pages/home"
import { Header } from "../../layout"
export default [
  {
    path: "/",
    exact: true,
    main: () => <Login />,
    footer: () => null,
    header: () => null
  },
  {
    path: "/home",
    exact: true,
    main: () => <Home />,
    footer: () => null,
    header: () => <Header />
  }
]

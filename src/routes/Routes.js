import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { Layout } from "antd"
import { MainLayout } from "../layout"
import appRoutes from "./route-groups/app"
import { useSelector } from "react-redux"
import { Login } from "../../src/pages/login"

export default function Routes () {
  const { isAuthenticated } = useSelector((state) => state.login)
  if (!isAuthenticated) {
    return (
        <MainLayout>
            <Layout style={{ width: "100%", display: "flex", flexDirection: "column" }} className="content-layout">
                <Switch>
                        <Route
                            key= "/"
                            path="/"
                            component={() => <Login/>}
                        />
                </Switch>
            </Layout>
            <Redirect to="/" />
        </MainLayout>
    )
  }
  return (
      <MainLayout>
          <Layout style={{ width: "100%", display: "flex", flexDirection: "column" }} className="content-layout">
              <Switch>
                  {appRoutes.map((route, index) => (
                      <Route
                          key={route.path}
                          path={route.path}
                          exact={route.exact}
                          component={route.header}
                              />
                  ))}
              </Switch>
              <Switch>
                  {appRoutes.map((route, index) => (
                      <Route
                          key={route.path}
                          path={route.path}
                          exact={route.exact}
                          component={route.main}
                      />
                  ))}
              </Switch>
          </Layout>
      </MainLayout>
  )
}

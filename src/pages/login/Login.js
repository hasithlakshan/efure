import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actions as loginActions } from "./index"
import { Loading, PasswordInput, TextInput } from "../../components"
import { Button, Layout, Row } from "antd"
import { Link } from "react-router-dom"
import "./login.stylesheet.sass"
import validator from "../../utils/validator"

export default function Login () {
  const [username, setUsername] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.login)

  // functions
  const onClickLogin = () => {
    const errorUsername = validator("loginUsername", username)
    setUsernameError(errorUsername)
    const errorPassword = validator("loginPassword", password)
    setPasswordError(errorPassword)
    if (!errorUsername && !errorPassword) {
      setTimeout(() => {
        dispatch(loginActions.loginRequest({
          username: username,
          password: password
        }))
      }, 1000)
      dispatch((loginActions.isLoading()))
    }
  }

  useEffect(() => {
    if (username) {
      const errorUsername = validator("loginUsername", username)
      setUsernameError(errorUsername)
    }
  }, [username])

  useEffect(() => {
    if (password) {
      const errorPassword = validator("loginPassword", password)
      setPasswordError(errorPassword)
    }
  }, [password])

  return isLoading
    ? <Loading />
    : <Layout className="login-container">
        <Row className="login-container__wrapper">
          <div className="login-container__wrapper__login-title">
            Log in to your account
          </div>
          <Row className="login-container__wrapper__input-fields">
            <TextInput name="loginUsername" onChange={setUsername} isInvalid={usernameError} label={"Username"} errorMsg={usernameError} required value={username}/>
            <PasswordInput name="loginPassword" onChange={setPassword} isInvalid={passwordError} label={"Password"} errorMsg={passwordError} required value={password} />
          </Row>
          <Button className="login-container__wrapper__button" type="primary" onClick={onClickLogin}>
            <Link to="/home" >Login</Link>
          </Button>
        </Row>
      </Layout>
}

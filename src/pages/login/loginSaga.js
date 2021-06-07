import { put } from "redux-saga/effects"
import * as loginPageActions from "./login.actions"
const users = [
  {
    username: "Hasith",
    password: "hasith@123"
  },
  {
    username: "eFuture",
    password: "efuture@456"
  }
]

export default function * loginSaga (action) {
  try {
    const [foundUser] = users.filter(user => (user.username === action.loginCredentials.username && user.password === action.loginCredentials.password))
    if (foundUser) {
      yield put(loginPageActions.loginSuccess(foundUser))
    } else {
      yield put(loginPageActions.loginFailure())
    }
  } catch (e) {
    yield put(loginPageActions.loginFailure())
  }
}

import { takeLatest } from "redux-saga/effects"
import { actions as loginAction, loginSaga } from "../pages/login"
import { actions as homeAction, homeSaga } from "../pages/home"

export function * watcherSaga () {
  yield takeLatest(loginAction.LOGIN_REQUEST, loginSaga)
  yield takeLatest(homeAction.ADD_TASK_REQUEST, homeSaga)
}

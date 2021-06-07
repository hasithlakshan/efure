import { put } from "redux-saga/effects"
import * as homePageActions from "./home.actions"

export default function * homeSaga (action) {
  try {
    yield put(homePageActions.addTask(action.taskObject))
  } catch (e) {
    yield put(homePageActions.addTaskFailure())
  }
}

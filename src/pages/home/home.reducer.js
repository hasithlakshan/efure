import { actions } from "./index"
import { actions as loginActions } from "../login"
const initialState = {
  tasks: []
}
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_TASK_REQUEST:
      return {
        ...state
      }
    case actions.ADD_TASK: {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.taskObject
        ]
      }
    }
    case actions.ADD_TASK_FAILURE:
      return {
        ...state

      }
    case loginActions.LOG_OUT: {
      return {
        ...state,
        tasks: []
      }
    }
    default:
      return state
  }
}
export default homeReducer

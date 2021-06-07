
export const ADD_TASK_REQUEST = "ADD_TASK_REQUEST"
export const ADD_TASK = "ADD_TASK"
export const ADD_TASK_FAILURE = "ADD_TASK_FAILURE"

export const addTaskREQUEST = (taskObject) => ({
  type: ADD_TASK_REQUEST,
  taskObject
})
export const addTask = (taskObject) => ({
  type: ADD_TASK,
  taskObject
})
export const addTaskFailure = () => ({
  type: ADD_TASK_FAILURE
})

import * as api from "../../api/todos.api"

export const ACTION_GET_TODO_STARTED = "ACTION_GET_TODO_STARTED"
export const ACTION_GET_TODO_SUCCESS = "ACTION_GET_TODO_SUCCESS"
export const ACTION_ADD_TODO_SUCCESS = "ACTION_ADD_TODO_SUCCESS"
export const ACTION_UPDATE_TODO_STARTED = "ACTION_UPDATE_TODO_STARTED"
export const ACTION_UPDATE_TODO_SUCCESS = "ACTION_UPDATE_TODO_SUCCESS"
export const ACTION_DELETE_TODO_SUCCESS = "ACTION_DELETE_TODO_SUCCESS"
export const ACTION_DELETE_TODO_ALL_SUCCESS = "ACTION_DELETE_TODO_ALL_SUCCESS"
export const ADD_TODO_FAILURE = "ADD_TODO_FAILURE"

function getTodoStarted() {
  return {
    type: ACTION_GET_TODO_STARTED,
  }
}

function getTodoSuccess(todos: any) {
  return {
    type: ACTION_GET_TODO_SUCCESS,
    payload: todos,
  }
}

function addTodoFailure(error: any) {
  return {
    type: ADD_TODO_FAILURE,
    payload: {
      error
    }
  }
}

function addTodoSuccess(todo: any) {
  return {
    type: ACTION_ADD_TODO_SUCCESS,
    payload: todo
  }
}

function updateTodoStarted() {
  return {
    type: ACTION_UPDATE_TODO_STARTED,
  }
}

function updateTodoSuccess(payload: any) {
  return {
    type: ACTION_UPDATE_TODO_SUCCESS,
    payload
  }
}

function deleteTodoSuccess(id: number) {
  return {
    type: ACTION_DELETE_TODO_SUCCESS,
    payload: id
  }
}

function deleteTodoAllSuccess() {
  return {
    type: ACTION_DELETE_TODO_ALL_SUCCESS
  }
}

export function getTodo() {
  return function (dispatch: any) {
    dispatch(getTodoStarted())
    api.getTodos()
      .then(res => {
        dispatch(getTodoSuccess(res.data))
      })
      .catch(err => {
        dispatch(addTodoFailure(err.message));
      })
  }
}

export function addTodo(formValues: string) {
  return function (dispatch: any) {
    dispatch(updateTodoStarted())
    api.addTodo(formValues)
      .then(res => {
        dispatch(addTodoSuccess(res.data))
    })
  }
}

export function updateTodo(formValues:object) {
  return function (dispatch: any) {
    dispatch(updateTodoStarted())
    api.updateTodo(formValues)
      .then(res => {
        dispatch(updateTodoSuccess(res.data))
      })
  }
}

export function deleteTodo(id: number) {
  return function (dispatch: any) {
    dispatch(updateTodoStarted())
    api.deleteTodo(id)
      .then(res => {
        dispatch(deleteTodoSuccess(res.data))
      })
  }
}

export function deleteTodoAll() {
  return function (dispatch: any) {
    dispatch(updateTodoStarted())
    api.deleteTodoAll()
      .then(res => {
        dispatch(deleteTodoAllSuccess())
      })
  }
}
import { 
    ACTION_GET_TODO_STARTED,
    ACTION_GET_TODO_SUCCESS,
    ACTION_ADD_TODO_SUCCESS,
    ACTION_UPDATE_TODO_STARTED,
    ACTION_UPDATE_TODO_SUCCESS,
    ACTION_DELETE_TODO_SUCCESS,
    ACTION_DELETE_TODO_ALL_SUCCESS,
    ADD_TODO_FAILURE,
} from "./actions"

import { IState } from "./types"

const INITIAL_STATE: IState = {
    loading: false,
    todos: [],
    error: null
}

export default function reducer(state = INITIAL_STATE, {type, payload}:any) {

    switch (type) {
        case ACTION_GET_TODO_STARTED:
            return {
                ...state,
                loading: true
            }
        case ACTION_GET_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                todos: [...payload]
            }
        case ADD_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload.error
            };
        case ACTION_ADD_TODO_SUCCESS:
            console.log(payload)
            return {
                ...state,
                todos: [...state.todos, {...payload}],
                loading: false,
                error: null,
            }
        case ACTION_UPDATE_TODO_STARTED:
            return {
                ...state,
                loading: true
            }
        case ACTION_UPDATE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.map((todo)=>todo?._id === payload._id?payload:todo),
                loading: false,
                error: null,
            }
        case ACTION_DELETE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter((todo)=>todo?._id !== payload._id),
                loading: false,
                error: null,
            }
        case ACTION_DELETE_TODO_ALL_SUCCESS:
            return {
                ...state,
                todos: [],
                loading: false,
                error: null,
            }
        default:
            return state
    }

}
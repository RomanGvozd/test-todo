import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import todosReducer from "./todos/reducer";

const root = combineReducers({
    todos: todosReducer,

});

export const store = createStore(root, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { applyMiddleware, combineReducers, createStore } from "redux";
import autorizetReducer from "./Reducers/autorizetReducer";
import middleware from 'redux-thunk'
import addPostReducer from "./Reducers/addNewPostReducer";

const reducers = combineReducers({autorizetReducer, addPostReducer})
const store = createStore(reducers, applyMiddleware(middleware))
export default store
type properties<T> = T extends {[key: string]: infer U}? U : never
export type ActionTypes<T extends {[key: string]: (...args:any[]) =>any}> = ReturnType<properties<T>>

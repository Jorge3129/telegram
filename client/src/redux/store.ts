import {configureStore, Action } from "@reduxjs/toolkit";
import rootReducer, {RootState} from "./rootReducer";
import {useDispatch} from "react-redux";
import {ThunkAction} from "redux-thunk"


const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch()
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

export default store

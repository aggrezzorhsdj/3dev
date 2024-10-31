import { combineReducers, configureStore, ThunkDispatch } from "@reduxjs/toolkit"
import { listReducer } from "./list.reducers"
import { thunk } from "redux-thunk"

export const store = configureStore({
	reducer: combineReducers({ list: listReducer }),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

type ListDispatch = ReturnType<typeof store.dispatch>
export type RootState = ReturnType<typeof store.getState>
export type ListThunkDispatch = ThunkDispatch<RootState, any, ListDispatch>;

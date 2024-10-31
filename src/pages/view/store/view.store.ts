import { combineReducers, configureStore, ThunkDispatch } from "@reduxjs/toolkit"
import { thunk } from "redux-thunk"
import { viewReducer } from "./view.reducers"

export const store = configureStore({
	reducer: combineReducers({view: viewReducer}),
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
});

type ViewDispatch = ReturnType<typeof store.dispatch>;
export type RootState = ReturnType<typeof store.getState>;
export type ViewThunkDispatch = ThunkDispatch<RootState, any, ViewDispatch>;

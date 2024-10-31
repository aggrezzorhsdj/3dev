import { combineReducers, configureStore, ThunkDispatch } from "@reduxjs/toolkit"
import { editReducer } from "./edit.reducers"
import { thunk } from "redux-thunk"

export const store = configureStore({
	reducer: combineReducers({edit: editReducer}),
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
});

type EditDispatch = ReturnType<typeof store.dispatch>;
export type RootState = ReturnType<typeof store.getState>;
export type EditThunkDispatch = ThunkDispatch<RootState, any, EditDispatch>;

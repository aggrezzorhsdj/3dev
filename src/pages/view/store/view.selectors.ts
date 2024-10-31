import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "./view.store"
import { ViewState } from "./view.reducers"

const editSelector = (state: RootState) => state.view;
export const selectModel = createSelector(
	editSelector,
	(state: ViewState) => {
		return state.model;
	}
);

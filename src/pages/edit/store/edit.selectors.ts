import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "./edit.store"
import { EditState } from "./edit.reducers"

const editSelector = (state: RootState) => state.edit;
export const selectModel = createSelector(
	editSelector,
	(state: EditState) => {
		return state.model;
	}
);

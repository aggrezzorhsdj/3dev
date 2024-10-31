import { useSelector } from "react-redux"
import { RootState } from "./list.store"
import { createSelector } from "@reduxjs/toolkit"
import { ListState } from "./list.reducers"

export const useTypedSelector = useSelector.withTypes<RootState>();

const listSelector = (state: RootState) => state.list;
export const selectList = createSelector(
	listSelector,
	(state: ListState) => {
		return state.models;
	}
);


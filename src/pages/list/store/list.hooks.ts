import { useDispatch, useSelector } from "react-redux"
import { ListThunkDispatch, RootState } from "./list.store"

export const useListSelector = useSelector.withTypes<RootState>()
export const useListDispatch = useDispatch.withTypes<ListThunkDispatch>();

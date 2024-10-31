import { useDispatch, useSelector } from "react-redux"
import { RootState, ViewThunkDispatch } from "./view.store"

export const useViewSelector = useSelector.withTypes<RootState>()
export const useViewDispatch = useDispatch.withTypes<ViewThunkDispatch>();

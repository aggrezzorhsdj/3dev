import { useDispatch, useSelector } from "react-redux"
import { EditThunkDispatch, RootState } from "./edit.store"

export const useEditSelector = useSelector.withTypes<RootState>()
export const useEditDispatch = useDispatch.withTypes<EditThunkDispatch>();

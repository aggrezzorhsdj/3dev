import { BaseState } from "../../../models/store.model"
import { EditActions, EditActionsType } from "./edit.actions"
import { ModelDto } from "../../../models/model.model"

export interface EditState extends BaseState<EditActionsType>{
	model: ModelDto;
}

const initialState: EditState = {
	model: null,
	api: null
}

export const editReducer = (state = initialState, action: EditActions): EditState => {
	switch (action.type) {
		case EditActionsType.GET_MODEL:
		case EditActionsType.UPDATE_MODEL :
			return {...state, model: action.payload};
		case EditActionsType.UPDATE_API :
			return {...state, api: action.payload};
		case EditActionsType.UPDATE_MESH :
			return {
				...state,
				model: {...state.model, mesh: action.payload}
			}
		default:
			return state;
	}
}

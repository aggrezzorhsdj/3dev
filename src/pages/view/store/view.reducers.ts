import { BaseState } from "../../../models/store.model"
import { ModelDto } from "../../../models/model.model"
import { ViewActions, ViewActionsType } from "./view.actions"

export interface ViewState extends BaseState<ViewActionsType>{
	model: ModelDto;
}

const initialState: ViewState = {
	model: null,
	api: null
}

export const viewReducer = (state = initialState, action: ViewActions): ViewState => {
	switch (action.type) {
		case ViewActionsType.GET_MODEL:
			return {...state, model: action.payload};
		case ViewActionsType.UPDATE_API :
			return {...state, api: action.payload};
		default:
			return state;
	}
}

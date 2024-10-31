import { ListActions, ListActionsType } from "./list.actions"
import { ModelDto } from "../../../models/model.model"
import { BaseState } from "../../../models/store.model"

export interface ListState extends BaseState<ListActionsType>{
	models: ModelDto[];
	modelsBackup: ModelDto[];
}

const initialState: ListState = {
	models: [],
	modelsBackup: []
}
export const listReducer = (state: ListState = initialState, action: ListActions): ListState => {
	switch (action.type) {
		case ListActionsType.GET_MODELS:
			return {...state, models: [...action.payload], modelsBackup: [...action.payload]};
		case ListActionsType.ADD_MODEL:
			const models = [...state.models, action.payload];
			return {...state, models};
		case ListActionsType.UPDATE_API:
			return {...state, api: action.payload};
		case ListActionsType.REMOVE_MODEL:
			return {...state, models: state.models.filter(item => item.id !== action.payload)};
		case ListActionsType.SEARCH_MODEL:
			return {
				...state,
				models: action.payload ? state.modelsBackup.filter(item => item.name.toLowerCase().includes(action.payload)) : state.modelsBackup
			};
		default:
			return state;
	}
}

import { Dispatch } from "@reduxjs/toolkit"
import { ModelDto } from "../../../models/model.model"
import { FragmentApi } from "../../../models/fragment.model"
import { ListService } from "../list.page"

export enum ListActionsType {
	GET_MODELS = "GET_MODELS",
	ADD_MODEL = "ADD_MODEL",
	REMOVE_MODEL = "REMOVE_MODEL",
	UPDATE_API = "UPDATE_API",
	SEARCH_MODEL = "SEARCH_MODEL"
}

interface GetModel {
	type: ListActionsType.GET_MODELS;
	payload: ModelDto[];
}

interface SearchModel {
	type: ListActionsType.SEARCH_MODEL;
	payload: string;
}

interface AddModel {
	type: ListActionsType.ADD_MODEL;
	payload: ModelDto;
}

interface RemoveModel {
	type: ListActionsType.REMOVE_MODEL;
	payload: number;
}

interface UpdateApi {
	type: ListActionsType.UPDATE_API;
	payload: FragmentApi<ListActionsType>;
}

export type ListActions = GetModel | AddModel | RemoveModel | UpdateApi | SearchModel;

export const getModels = () => {
	return async (dispatch: Dispatch<ListActions>) => {
		return ListService.request<ModelDto[]>(ListActionsType.GET_MODELS).then((payload) => {
			dispatch({type: ListActionsType.GET_MODELS, payload});
		})
	}
};
export const addModel = (item: FormData) => {
	return async (dispatch: Dispatch<ListActions>) => {
		return ListService.request<ModelDto, FormData>(ListActionsType.ADD_MODEL, null, item, true).then((payload) => {
			dispatch({ type: ListActionsType.ADD_MODEL, payload })
		})
	}
}

export const removeModel = (id: number)  => {
	return async (dispatch: Dispatch<ListActions>) => {
		return ListService.request(ListActionsType.REMOVE_MODEL, {id}).then(() => {
			dispatch({type: ListActionsType.REMOVE_MODEL, payload: id});
		})
	}
}

export const searchModel = (value: string)  => {
	return (dispatch: Dispatch<ListActions>) => {
		dispatch({type: ListActionsType.SEARCH_MODEL, payload: value})
	}
}

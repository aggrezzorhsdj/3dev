import { Dispatch } from "@reduxjs/toolkit"
import { ModelDto, ModelMesh } from "../../../models/model.model"
import { FragmentApi } from "../../../models/fragment.model"
import { ViewService } from "../view.page"

export enum ViewActionsType {
	GET_MODEL = "GET_MODEL",
	UPDATE_MODEL = "UPDATE_MODEL",
	UPDATE_API = "UPDATE_API",
	UPDATE_MESH = "UPDATE_MESH"
}

interface GetModel {
	type: ViewActionsType.GET_MODEL;
	payload: ModelDto;
}

interface UpdateModel {
	type: ViewActionsType.UPDATE_MODEL;
	payload: ModelDto;
}

interface UpdateApi {
	type: ViewActionsType.UPDATE_API;
	payload: FragmentApi<ViewActionsType>;
}

interface UpdateMesh {
	type: ViewActionsType.UPDATE_MESH;
	payload: ModelMesh[];
}

export type ViewActions = GetModel | UpdateModel | UpdateApi | UpdateMesh;

export const getModel = (id: number) => {
	return async (dispatch: Dispatch<ViewActions>) => {
		return ViewService.request<ModelDto>(ViewActionsType.GET_MODEL, {id}).then(data => {
			dispatch({type: ViewActionsType.GET_MODEL, payload: data});
			return data;
		});
	}
}

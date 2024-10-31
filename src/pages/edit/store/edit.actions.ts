import { Dispatch } from "@reduxjs/toolkit"
import { ModelDto, ModelMesh } from "../../../models/model.model"
import { FragmentApi } from "../../../models/fragment.model"
import { EditService } from "../edit.page"

export enum EditActionsType {
	GET_MODEL = "GET_MODEL",
	UPDATE_MODEL = "UPDATE_MODEL",
	UPDATE_API = "UPDATE_API",
	UPDATE_MESH = "UPDATE_MESH"
}

interface GetModel {
	type: EditActionsType.GET_MODEL;
	payload: ModelDto;
}

interface UpdateModel {
	type: EditActionsType.UPDATE_MODEL;
	payload: ModelDto;
}

interface UpdateApi {
	type: EditActionsType.UPDATE_API;
	payload: FragmentApi<EditActionsType>;
}

interface UpdateMesh {
	type: EditActionsType.UPDATE_MESH;
	payload: ModelMesh[];
}

export type EditActions = GetModel | UpdateModel | UpdateApi | UpdateMesh;

export const getModel = (id: number) => {
	return async (dispatch: Dispatch<EditActions>) => {
		return EditService.request<ModelDto>(EditActionsType.GET_MODEL, {id}).then(data => {
			dispatch({type: EditActionsType.GET_MODEL, payload: data});
			return data;
		});
	}
}

export const updateModel = (model: ModelDto) => {
	return async (dispatch: Dispatch<EditActions>) => {
		return EditService.request<ModelDto, ModelDto>(EditActionsType.UPDATE_MODEL, {id: model.id}, model).then(data => {
			dispatch({type: EditActionsType.UPDATE_MODEL, payload: data})
		})
	}
}

import { RouteObject } from "react-router-dom"
import Main from "../pages/main/main.page"
import Edit, { EditWrapper } from "../pages/edit/edit.page"
import View, { ViewWrapper } from "../pages/view/view.page"
import { ListActionsType } from "../pages/list/store/list.actions"
import { ListWrapper } from "../pages/list/list.page"
import { EditActionsType } from "../pages/edit/store/edit.actions"
import { FragmentApi } from "../models/fragment.model"

const editApi: FragmentApi<EditActionsType> = {
	[EditActionsType.GET_MODEL]: {
		url: "/api/getModel/{id}",
		method: "GET",
		params: ["id"],
	},
	[EditActionsType.UPDATE_MODEL]: {
		url: "/api/updateModel/{id}",
		method: "POST",
		params: ["id"],
	}
}

const listApi: FragmentApi<ListActionsType> = {
	[ListActionsType.GET_MODELS]: {
		url: "/api/getModels",
		method: "GET",
	},
}
export const routes: RouteObject[] = [
	{
		path: "/",
		element: <Main />,
		children: [
			{
				path: "/",
				index: true,
				element: <ListWrapper api={listApi} />,
			},
			{
				path: "/edit/:id",
				element: <EditWrapper api={editApi} />,
			},
			{
				path: "/view/:id",
				element: <ViewWrapper api={editApi} />,
			},
		],
	},
]

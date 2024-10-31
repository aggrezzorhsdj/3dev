import React from "react"
import { getBootstrapRemote } from "../../utils/bootstrap.utils"
import List from "./list.page"
import { Wrapper } from "../../components/wrapper.component"
import { store } from "./store/list.store"
import { ListFragment } from "./models/list.model"

export const e3dListFragment = getBootstrapRemote<ListFragment>(({api, actions}) => {
	return <Wrapper node={<List api={api} actions={actions}/>} store={store}/>
});

import React from "react"
import { getBootstrapRemote } from "../../utils/bootstrap.utils"
import { ViewFragment } from "./models/view.model"
import { Wrapper } from "../../components/wrapper.component"
import View from "./view.page"
import { store } from "./store/view.store"


export const e3dViewFragment = getBootstrapRemote<ViewFragment>(({id, api}) => {
	return <Wrapper node={<View api={api} id={id}/>} store={store}/>;
});

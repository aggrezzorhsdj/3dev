import React from "react"
import { getBootstrapRemote } from "../../utils/bootstrap.utils"
import { EditFragment } from "./models/edit.model"
import Edit from "./edit.page"
import { Wrapper } from "../../components/wrapper.component"
import { store } from "./store/edit.store"

/*
* e3dEditFragment - полученный модуль для экспорта. Данное имя использует при вызове фрагмента
 */
export const e3dEditFragment = getBootstrapRemote<EditFragment>(({id, api}) => {
	return <Wrapper node={<Edit id={id} api={api}/>} store={store}/>;
});

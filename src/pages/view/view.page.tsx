import React, { FC, memo, Suspense, useEffect, useState } from "react"
import {useParams} from "react-router-dom";
import {Mesh, MeshStandardMaterial} from "three";
import Model from "../../components/model/model.component";
import Setting from "../../components/setting/setting.component";
import "./view.page.scss";
import { Col, Layout, Row, Spin } from "antd"
import { ViewFragment } from "./models/view.model"
import { HttpService } from "../../services/http.service"
import { getModel, ViewActionsType } from "./store/view.actions"
import { Wrapper } from "../../components/wrapper.component"
import { useViewDispatch, useViewSelector } from "./store/view.hooks"
import { selectModel } from "./store/view.selectors"
import { store } from "./store/view.store"
import { ParamType } from "../../models/edit.model"

export const ViewService: HttpService<ViewActionsType> = new HttpService<ViewActionsType>();

export const ViewWrapper: FC<ViewFragment> = memo(({api}) => {
	return <Wrapper node={<View api={api}/>} store={store}/>
})

const View: FC<ViewFragment> = memo(({id, api}) => {
	const params = useParams(),
		[meshes, setMeshes] = useState<Mesh[]>([]),
		dispatch = useViewDispatch(),
		model = useViewSelector(selectModel);

	useEffect(() => {
		ViewService.updateApi(api);
		dispatch(getModel(id ?? Number(params.id))).then()
	}, [])

	const changeHandler = (value: string | number, item: Mesh, type: ParamType) => {
		const index = meshes.findIndex(m => m.name === item.name);

		if (index !== -1) {
			switch (type) {
				case "color":
					(meshes[index].material as MeshStandardMaterial).color.set(value.toString());
					break;
			}
		}

		setMeshes([...meshes]);
	}

	return (
		<>
			{model ? <Layout className="view">
				<Layout.Sider className="view__toolbar">
					<h4>Customize your model</h4>
					{meshes
						.filter(item => model.mesh?.find(m => m.name === item.name)?.enabled || false)
						.map(item => {
							const mesh = model.mesh?.find(m => m.name === item.name);
							return <Col className="mb-4" lg="3" key={item.name}>
								<h4>{item.name}</h4>
								<Setting
									label="Color"
									type="color"
									value={mesh?.color}
									onChange={(css) => changeHandler(css.toString(), item, "color")}
								/>
							</Col>
						})}
				</Layout.Sider>
				<Layout.Content className="view__body">
					<Suspense fallback={<Spin/>}>
						<Model
							modelDto={model}
							onMeshes={(value: Mesh[]) => value && setMeshes(value)}
						/>
					</Suspense>
				</Layout.Content>
			</Layout> : <Spin/>}
		</>
	);
});

export default View;

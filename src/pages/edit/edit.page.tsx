import React, { FC, memo, Suspense, useEffect, useState } from "react"
import {useParams} from "react-router-dom";
import "./edit.page.scss";
import Setting from "../../components/setting/setting.component";
import {MODELS} from "../../data/models";
import Model from "../../components/model/model.component";
import {Mesh, MeshStandardMaterial} from "three";
import {ParamType} from "../../models/edit.model";
import { Spin, Button, Form, Layout, notification } from "antd"
import "../../index.scss";
import { EditFragment } from "./models/edit.model"
import { HttpService } from "../../services/http.service"
import { EditActionsType, getModel, updateModel } from "./store/edit.actions"
import { ModelMesh } from "../../models/model.model"
import { useEditDispatch, useEditSelector } from "./store/edit.hooks"
import { selectModel } from "./store/edit.selectors"
import { Wrapper } from "../../components/wrapper.component"
import { store } from "./store/edit.store"

export const EditService: HttpService<EditActionsType> = new HttpService<EditActionsType>();

export const EditWrapper: FC<EditFragment> = memo(({api}) => {
	return <Wrapper node={<Edit api={api}/>} store={store}/>
})

const Edit: FC<EditFragment> = memo((props) => {
	const {id, api} = props,
		params = useParams(),
		[modelMeshes, setModelMeshes] = useState<ModelMesh[]>([]),
		[meshes, setMeshes] = useState<Mesh[]>([]),
		[loading, setLoading] = useState<boolean>(false),
		dispatch = useEditDispatch(),
		model = useEditSelector(selectModel);

	const [notificationService, contextHolder] = notification.useNotification({
		getContainer: () => document.querySelector(".edit") as HTMLElement
	});

	useEffect(() => {
		EditService.updateApi(api);

		dispatch(getModel(id ?? Number(params.id))).then(data => {
			setModelMeshes(data.mesh);
		})
	}, [])
	const updateModelInfoMesh = (name: string, params: any): void => {
		const modelMesh = modelMeshes?.find(m => m.name === name);

		if (modelMesh) {
			const nextMeshes = modelMeshes.map((item) => {
				return item.name === name ? {...item, ...params} : item;
			})
			setModelMeshes(nextMeshes);
		} else {
			setModelMeshes([
				...modelMeshes,
				{
					name,
					...params
				}
			])
		}

		console.log(modelMeshes);
	}

	const changeHandler = (value: string | number | boolean, item: Mesh, type: ParamType) => {
		const index = meshes.findIndex(m => m.name === item.name);

		if (index !== -1) {
			switch (type) {
				case "color":
					(meshes[index].material as MeshStandardMaterial).color.set(value.toString());
					updateModelInfoMesh(item.name, {color: value});
				break;
				case "enabled":
					updateModelInfoMesh(item.name, {enabled: value});
			}
		}

		setMeshes([...meshes]);
	}

	const saveModelInfo = (): void => {
		setLoading(true);
		dispatch(updateModel({ ...model, mesh: modelMeshes }))
			.then(() => {
				notificationService.success({
					message: "Model updated",
				})
			})
			.finally(() => setLoading(false));
	};

	return (
		<>
			{contextHolder}
			{model ? <Layout className="edit">
				<Layout.Header className="edit__header">
					<h1 className="edit__title">Edit model {model.name}</h1>
				</Layout.Header>
				<Layout.Content>
					<Layout className="edit__wrapper">
						<Layout.Sider className="edit__sidebar" width={300}>
							<div className="edit__sidebar-inner">

								<div className="edit__sidebar-body">
									<div className="edit__item">
										<h3>Basic</h3>
										{<Setting label="Enable configurator" type="switcher" />}
									</div>
									<div className="edit__item">
										<h3>Components</h3>
										<Form>
											{meshes.map(item => {
												const mesh = modelMeshes?.find(m => m.name === item.name)
												return <div className="mb-4" key={item.name}>
													<h4>{item.name}</h4>

													<Setting
														label="Enable"
														type="switcher"
														value={mesh?.enabled || false}
														onChange={(event) => changeHandler(event, item, "enabled")}
													/>

													<Setting
														label="Color"
														type="color"
														value={mesh?.color || `#${(item.material as MeshStandardMaterial).color.getHexString()}`}
														onChange={(event) => changeHandler(event, item, "color")}
													/>
												</div>
											})}
										</Form>
									</div>
								</div>
								<div className="edit__sidebar-toolbar d-grid">
									<Button style={{width: "100%"}} type="primary" onClick={() => saveModelInfo()} loading={loading}>Save</Button>
								</div>
							</div>
						</Layout.Sider>
						<Layout.Content className="edit__content">
							<Suspense fallback={<Spin/>}>
								<Model
									modelDto={model}
									onMeshes={(value: Mesh[]) => value && setMeshes(value)}
								/>
							</Suspense>
						</Layout.Content>
					</Layout>
				</Layout.Content>
			</Layout> : <Spin/>}
		</>
	);
});

export default Edit;

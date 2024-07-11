import {FC, FormEvent, memo, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, Col, Form, Row} from "react-bootstrap";
import "./edit.page.scss";
import Setting from "../../components/setting/setting.component";
import {MODELS} from "../../data/models";
import Model from "../../components/model/model.component";
import {Canvas} from "@react-three/fiber";
import {Environment, OrbitControls, useGLTF} from "@react-three/drei";
import {Mesh, MeshStandardMaterial} from "three";
import {GLTFResult, ParamType} from "../../models/edit.model";
import {ModelDto} from "../../models/model.model";

const Edit: FC = memo(() => {
	const {name} = useParams(),
		modelIndex = MODELS.findIndex(item => item.name === name),
		[modelInfo, setModelInfo] = useState(MODELS[modelIndex] as ModelDto),
		[meshes, setMeshes] = useState<Mesh[]>([]),
		gltfResult: GLTFResult = useGLTF(modelInfo.url) as GLTFResult;

	useEffect(() => {
		const convertedNodesToMesh: Mesh[] = [];
		for (const key in gltfResult?.nodes) {
			if ("isMesh" in gltfResult.nodes[key] && gltfResult.nodes[key]) {
				const mesh = gltfResult.nodes[key] as Mesh;
				const meshParams = modelInfo.mesh.find(m => m.name === mesh.name);
				if (meshParams?.color) {
					(mesh.material as MeshStandardMaterial).color.set(meshParams.color);
				}

				convertedNodesToMesh.push(gltfResult.nodes[key] as Mesh);
			}
		}

		setMeshes(convertedNodesToMesh);
	}, []);

	const updateModelInfoMesh = (name: string, params: any): void => {
		const paramIndex = modelInfo.mesh?.findIndex(m => m.name === name) as number;

		if (paramIndex !== -1) {
			modelInfo.mesh[paramIndex] = {
				...modelInfo.mesh[paramIndex],
				...params
			}
		} else {
			modelInfo.mesh?.push({
				name,
				...params
			});
		}
	}

	const changeHandler = (event: FormEvent, item: Mesh, type: ParamType) => {
		const index = meshes.findIndex(m => m.name === item.name);

		if (index !== -1) {
			const element = event.target as HTMLInputElement;
			switch (type) {
				case "color":
					(meshes[index].material as MeshStandardMaterial).color.set(element.value);
					updateModelInfoMesh(item.name, {color: element.value});
				break;
				case "enabled":
					updateModelInfoMesh(item.name, {enabled: element.checked});
			}

			setModelInfo({...modelInfo});
		}

		setMeshes([...meshes]);
	}

	const saveModelInfo = (): void => {
		MODELS[modelIndex] = modelInfo;
	};

	return (
		<Row className="edit">
			<Col lg={3}>
				<div className="edit__sidebar">
					<div className="edit__sidebar-body">
						<h2>{name}</h2>
						<div className="edit__item">
							<h3>Basic</h3>
							<Setting label="Enable configurator" type="switcher"/>
						</div>

						<div className="edit__item">
							<h3>Components</h3>
							<Form>
								{meshes.map(item => {
									const mesh = modelInfo.mesh?.find(m => m.name === item.name);
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
						<Button
							variant="secondary"
							size="lg"
							onClick={() => saveModelInfo()}
						>Save</Button>
					</div>
				</div>
			</Col>
			<Col lg={9}>
				<div className="edit__content">
					<Canvas shadows camera={{position: [0, 0, 4], fov: 45}}>
						<ambientLight intensity={0.7}/>
						<spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow/>
						<Model meshes={meshes}/>
						<Environment preset="city"/>
						<OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false}
									   enablePan={false}/>
					</Canvas>
				</div>
			</Col>
		</Row>
	);
});

export default Edit;

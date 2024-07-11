import {FC, FormEvent, memo, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {MODELS} from "../../data/models";
import {ModelDto} from "../../models/model.model";
import {Mesh, MeshStandardMaterial} from "three";
import {GLTFResult, ParamType} from "../../models/edit.model";
import {Environment, OrbitControls, useGLTF} from "@react-three/drei";
import Model from "../../components/model/model.component";
import {Canvas} from "@react-three/fiber";
import Setting from "../../components/setting/setting.component";
import {Col, Row} from "react-bootstrap";
import "./view.page.scss";

const View: FC = memo(() => {
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

		setMeshes([...convertedNodesToMesh]);
	}, []);

	const changeHandler = (event: FormEvent, item: Mesh, type: ParamType) => {
		const index = meshes.findIndex(m => m.name === item.name);
		const paramIndex = modelInfo.mesh?.findIndex(m => m.name === item.name) as number;

		if (index !== -1 && modelInfo.mesh && modelInfo.mesh[paramIndex]) {
			const element = event.target as HTMLInputElement;
			(meshes[index].material as MeshStandardMaterial).color.set(element.value);
		}

		setMeshes([...meshes]);
	}

	return (
		<div className="view">
			<div className="view__body">
				<Canvas shadows camera={{position: [0, 0, 4], fov: 45}}>
					<ambientLight intensity={0.7}/>
					<spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow/>
					<Model meshes={meshes}/>
					<Environment preset="city"/>
					<OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false}
								   enablePan={false}/>
				</Canvas>
			</div>
			<div className="view__toolbar">
				<Row>
					{meshes
						.filter(item => modelInfo.mesh?.find(m => m.name === item.name)?.enabled || false)
						.map(item => {
							const mesh = modelInfo.mesh?.find(m => m.name === item.name);
							return <Col className="mb-4" lg="3" key={item.name}>
								<h4>{item.name}</h4>
								<Setting
									label="Color"
									type="color"
									value={mesh?.color}
									onChange={(event) => changeHandler(event, item, "color")}
								/>
							</Col>
						})}
				</Row>
			</div>
		</div>
	);
});

export default View;

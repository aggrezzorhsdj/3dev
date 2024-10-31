import { FC, memo, useEffect, useState } from "react"
import { Mesh, MeshStandardMaterial } from "three"
import { GLTFResult } from "../../models/edit.model"
import { Environment, OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { ModelDto } from "../../models/model.model"

const Model: FC<{modelDto: ModelDto, onMeshes?: (meshes: Mesh[]) => void}> = memo(({modelDto, onMeshes}) => {
	const [meshes, setMeshes] = useState<Mesh[]>([]),
		gltfResult: GLTFResult = useGLTF(modelDto.url) as GLTFResult;


	useEffect(() => {
		const convertedNodesToMesh: Mesh[] = [];
		for (const key in gltfResult?.nodes) {
			if ("isMesh" in gltfResult.nodes[key] && gltfResult.nodes[key]) {
				const mesh = gltfResult.nodes[key] as Mesh;
				const meshParams = modelDto.mesh.find(m => m.name === mesh.name);
				if (meshParams?.color) {
					(mesh.material as MeshStandardMaterial).color.set(meshParams.color);
				}

				convertedNodesToMesh.push(gltfResult.nodes[key] as Mesh);
			}
		}

		setMeshes(convertedNodesToMesh);
		onMeshes && onMeshes(convertedNodesToMesh);
	}, [])

	return (
		<Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
			<ambientLight intensity={0.7} />
			<spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
			<group>
				{meshes.map(item => {
					return <mesh key={item.name} receiveShadow castShadow geometry={item.geometry}
								 material={item.material} />
				})}
			</group>
			<Environment preset="city" />
			<OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false}
						   enablePan={false} />
		</Canvas>
	)
});

export default Model;

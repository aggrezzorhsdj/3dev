import {FC, memo} from "react";
import {Mesh} from "three";

const Model: FC<{meshes: Mesh[]}> = memo(({meshes}) => {
	return (
		<group>
			{meshes.map(item => {
				return <mesh key={item.name} receiveShadow castShadow geometry={item.geometry} material={item.material}/>
			})}
		</group>)
});

export default Model;

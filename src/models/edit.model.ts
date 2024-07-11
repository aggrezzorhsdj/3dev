import {GLTF} from "three-stdlib";
import {Group, Mesh} from "three";

export type GLTFResult = GLTF & {
	nodes: Record<string, Group | Mesh>;
}

export type ParamType = "enabled" | "color";

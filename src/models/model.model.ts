export interface ModelMesh {
	name: string;
	color?: string;
	enabled?: boolean;
}

export interface ModelDto {
	id: number;
	name: string;
	description?: string;
	url: string;
	mesh: ModelMesh[]
}

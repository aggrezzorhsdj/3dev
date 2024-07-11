export interface ModelDto {
	name: string;
	description?: string;
	url: string;
	mesh: {
		name: string;
		color?: string;
		enabled?: boolean;
	}[]
}

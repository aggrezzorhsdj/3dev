export interface FragmentApiItem {
	url: string;
	method: "GET" | "POST" | "DELETE";
	params?: string[]
}
export type FragmentApi<A extends string> = Partial<Record<A, FragmentApiItem>>;
export interface FragmentAction {
	name: string;
	description: string;
}
export interface Fragment<A extends string> {
	api?: FragmentApi<A>;
	actions?: FragmentAction[];
}

import { FragmentApi } from "./fragment.model"

export interface BaseState<T extends string> {
	api?: FragmentApi<T>;
}

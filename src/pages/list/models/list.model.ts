import { Fragment } from "../../../models/fragment.model"
import { ListActionsType } from "../store/list.actions"

export interface ListFragment extends Fragment<ListActionsType> {
}

export interface ListFormControl {
	name?: string;
	description?: string;
}

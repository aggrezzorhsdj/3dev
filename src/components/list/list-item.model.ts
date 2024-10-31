import { ModelDto } from "../../models/model.model"
import { FragmentAction } from "../../models/fragment.model"
import { NotificationInstance } from "antd/lib/notification/interface"

export interface ListItemModel {
	item: ModelDto;
	actions?: FragmentAction[];
	onRemove?: (id: number) => void;
	onEdit?: (id: number) => void;
	notificationService?: NotificationInstance
}

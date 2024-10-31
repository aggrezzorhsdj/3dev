import { FC, memo } from "react"
import { Button, Card, Col, Dropdown, List, message, Popconfirm, Row, Space } from "antd"
import { ListItemModel } from "./list-item.model"
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons"
import { sendEvent } from "../../utils/event-bus.utils"
import "./list-item.component.scss";

const ListItem: FC<ListItemModel> = memo(({item, actions, notificationService, onRemove, onEdit}) => {
	const extraActions: MenuProps = actions?.length ? {
		items: actions.map(action => ({
			key: action.name,
			label: (<div>{action.name}</div>)
		})),
		onClick: ({key}) => actionHandler(key)
	} : null

	const toolbarActions = [
		<Button
			type="primary"
			onClick={() => onEdit(item.id)}
		>
			Edit
		</Button>,
		<Popconfirm
			title="Delete"
			description="Are you sure to delete this ?"
			okText="Yes"
			cancelText="No"
			onConfirm={() => onRemove(item.id)}
		>
			<Button danger>Delete</Button>
		</Popconfirm>,
		<Dropdown menu={extraActions} trigger={["click"]}>
			<a onClick={(e) => e.preventDefault()}>
				<Space>
					<MoreOutlined />
				</Space>
			</a>
		</Dropdown>
	];

	const actionHandler = (action: string) => {
		sendEvent({
			event: "OnAction",
			data: {
				action,
				payload: {
					id: item.id
				}
			}
		});
		notificationService.open({
			type: "info",
			message: `${action} success`
		});
	};

	return (
		<List.Item className="list-item" actions={toolbarActions}>
			<List.Item.Meta title={item.name} description={item.description}/>
		</List.Item>
	);
})

export default ListItem;

import React, { FC, memo, useEffect, useState } from "react"
import ListItem from "../../components/list/list-item.component";
import "../../index.scss";
import { Empty } from "../../components/empty/not-found.components"
import { Button, Col, Flex, Form, Input, Modal, notification, Row, Upload, UploadFile, UploadProps } from "antd"
import { InboxOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { addModel, getModels, ListActionsType, removeModel, searchModel } from "./store/list.actions"
import { selectList } from "./store/list.selectors"
import { useListDispatch, useListSelector } from "./store/list.hooks"
import { ListFormControl, ListFragment } from "./models/list.model"
import "./list.page.scss";
import { Wrapper } from "../../components/wrapper.component"
import { store } from "./store/list.store"
import { sendEvent } from "../../utils/event-bus.utils"
import { HttpService } from "../../services/http.service"
import {List as ListComponent} from "antd";
import { ModelDto } from "../../models/model.model"


export const ListService: HttpService<ListActionsType> = new HttpService<ListActionsType>();

export const ListWrapper: FC<ListFragment> = memo(({api}) => {
	return <Wrapper node={<List api={api}/>} store={store}/>
})

const List: FC<ListFragment> = memo(({api, actions}) => {
	const [addNewVisible, setAddNewVisible] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const [form] = Form.useForm<ListFormControl>();
	const [notificationService, contextHolder] = notification.useNotification({
		getContainer: () => document.querySelector(".list__page") as HTMLElement
	});

	const list = useListSelector(selectList);
	const dispatch = useListDispatch();

	const props: UploadProps = {
		name: "model",
		listType: "picture",
		beforeUpload: (file) => {
			setFileList([...fileList, file]);
			return false;
		},
		fileList,
		onRemove(file) {
			const files = fileList.filter(item => item.uid !== file.uid);
			setFileList(files);
		}
	};

	useEffect(() => {
		ListService.updateApi(api);
		dispatch(getModels());
	}, [])

	const handleOk = () => {
		setLoading(true);
		const data = new FormData();

		data.append("file", fileList[0] as unknown as File);
		data.append("name", form.getFieldValue("name"));
		data.append("description", form.getFieldValue("description"));

		dispatch(addModel(data))
			.then(() => {
				setAddNewVisible(false);
				notificationService.open({
					message: "Model loading complete",
					type: "success"
				});
			})
			.catch(() => {
				notificationService.open({
					message: "Model loading error",
					type: "error"
				});
			})
			.finally(() => setLoading(false));
	};

	const handleRemove = (id: number) => {
		dispatch(removeModel(id))
			.then(() => {
				notificationService.open({
					message: "Model removing complete",
					duration: 3000,
					type: "success"
				})
			})
			.catch(() => {
				notificationService.open({
					message: "Model removing error",
					duration: 3000,
					type: "error"
				});
			})
	}

	const handleEdit = (id: number) => {
		sendEvent<number>({
			event: "OnEditModel",
			data: id
		});
	};

	const searchHandler = (value: string) => {
		dispatch(searchModel(value));
	}

	return (
		<div className="list__page">
			{contextHolder}
			<Row className="mb-4" align="middle" style={{paddingBottom: 10}}>
				<Col span={12}>
					<h2 className="list__title">Models</h2>
				</Col>
				<Col span={12}>
					<Flex justify="flex-end" gap={10} style={{paddingRight: 10}}>
						<Input placeholder="Search model" onChange={(e) => searchHandler(e.target.value)}/>
						<Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setAddNewVisible(true)}>Add new</Button>
					</Flex>
				</Col>
			</Row>
			<div className="list__inner">
				{
					list?.length ?
						<ListComponent
							dataSource={list}
							renderItem={(item) => (
								<ListItem
									actions={actions}
									item={item}
									notificationService={notificationService}
									onEdit={(id) => handleEdit(id)}
									onRemove={(id) => handleRemove(id)}
								/>
							)}
						/> :
						<Empty />
				}
			</div>
			<Modal
				title="Add new model"
				open={addNewVisible}
				onOk={handleOk}
				onCancel={() => setAddNewVisible(false)}
				okButtonProps={{loading}}
				cancelButtonProps={{loading}}
			>
				<Form
					form={form}
					name="model"
					layout="vertical"
				>
					<Form.Item<ListFormControl> label="Name" name="name" rules={[{required: true}]}>
						<Input placeholder="Model name"/>
					</Form.Item>
					<Form.Item<ListFormControl> label="Description" name="description">
						<Input placeholder="Description for model"/>
					</Form.Item>
				</Form>
				<Upload.Dragger {...props}>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">Click or drag file to this area to upload</p>
					<p className="ant-upload-hint">
						Support for a single or bulk upload. Strictly prohibited from uploading company data or other
						banned files.
					</p>
				</Upload.Dragger>
			</Modal>
		</div>
	);
});

export default List;

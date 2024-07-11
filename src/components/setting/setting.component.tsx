import {FC, FormEventHandler, memo, ReactElement} from "react";
import {Form} from "react-bootstrap";
import "./setting.component.scss";

export type SettingItemType = "switcher" | "dropdown" | "color";

export interface SettingItem {
	label: string;
	type: SettingItemType;
	value?: string | boolean;
	onChange?: FormEventHandler;
	items?: string[];
}

const Setting: FC<SettingItem> = memo((item) => {
	let value: ReactElement<Element>;

	switch (item.type) {
		case "switcher":
			value = <Form.Switch checked={item.value as boolean} onChange={item.onChange}></Form.Switch>;
			break;
		case "dropdown":
			value = <Form.Select onChange={item.onChange}></Form.Select>;
			break;
		case "color":
			value = <Form.Control placeholder={item.label} type="color" value={item.value as string} onChange={item.onChange}></Form.Control>;
			break;
	}
	return (
		<Form.Group className="d-flex justify-content-between align-items-center mb-2">
			<Form.Label>{item.label}</Form.Label>
			{value}
		</Form.Group>
	);
});

export default Setting;

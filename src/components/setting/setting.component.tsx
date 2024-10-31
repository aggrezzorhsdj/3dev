import React, { FC, FormEvent, memo, ReactElement } from "react"
import { ColorPicker, Form, Select, Switch } from "antd"
import "./setting.component.scss";
import type { AggregationColor } from "antd/es/color-picker/color"
import { ColorValueType } from "antd/es/color-picker/interface"

export type SettingItemType = "switcher" | "dropdown" | "color";

export type SettingItem = {
	label: string;
	type: SettingItemType;
	value?: string | boolean;
	onChange?: (event: string | number | boolean) => void;
	items?: string[];
}

export type ColorPickerOnChange = (value: AggregationColor, css: string) => void;

const Setting: FC<SettingItem> = memo((item: SettingItem) => {
	let value: ReactElement<Element>;

	switch (item.type) {
		case "switcher":
			value = <Switch onChange={(checked) => item.onChange && item.onChange(checked)} checked={item.value as boolean}></Switch>;
			break;
		case "dropdown":
			value = <Select onChange={(event: FormEvent) => item.onChange && item.onChange((event.target as HTMLSelectElement).value)}></Select>;
			break;
		case "color":
			value = <ColorPicker
				value={item.value as ColorValueType}
				onChange={(_, css: string) => item.onChange && item.onChange(css)}
			></ColorPicker>;
			break;
	}
	return (
		<Form.Item label={item.label}>
			{value}
		</Form.Item>
	);
});

export default Setting;

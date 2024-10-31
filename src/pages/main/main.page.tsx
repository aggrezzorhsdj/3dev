import {FC, memo} from "react";
import {Outlet} from "react-router-dom";
import "./main.page.scss";
import { Breadcrumb, Layout } from "antd"


const Main: FC = memo(function() {
	return (
		<Layout className="main">
			<Layout.Header>
				<div className="main__logo">3DEV</div>
			</Layout.Header>
			<Layout.Content className="container main__container">
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
				</Breadcrumb>
				<div className="main__wrapper">
					<Outlet />
				</div>
			</Layout.Content>
			<Layout.Footer style={{ textAlign: 'center' }}>
				3DEV ©{new Date().getFullYear()}
			</Layout.Footer>
		</Layout>
	);
});

export default Main;

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/main/main.page";
import List from "./components/list/list.component";
import Edit from "./pages/edit/edit.page";
import View from "./pages/view/view.page";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main/>}>
					<Route index element={<List/>}></Route>
					<Route path="/edit/:name" element={<Edit/>}></Route>
					<Route path="/view/:name" element={<View/>}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

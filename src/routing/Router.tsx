import React, { FC } from "react"
import { createBrowserRouter, createMemoryRouter, RouterProvider } from "react-router-dom"
import { routes } from "./routes"

export const Router: FC = () => {
	const router = createBrowserRouter(routes);
	return (<RouterProvider router={router}/>);
}

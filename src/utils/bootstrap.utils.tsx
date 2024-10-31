import ReactDOM from "react-dom/client"
import { ReactNode } from "react"

export interface BoostrapRemote {
	create: (selector: string | Element) => Promise<void>
}
/*
** Функция создания модуля экспорта компоненты
* @generic T - тип передаваемых данных при вызове
* @params factory: (data?: T) => ReactNode - функция фабрика принимающая данные при вызове компоненты. Вовзращает React компонент
* @return BoostrapRemote - интерфейс с методом создания React компонента и добавления его на страницу
 */
export function getBootstrapRemote<T>(factory: (data?: T) => ReactNode): BoostrapRemote {
	return {
		create: async (selector: string | Element, data?: T): Promise<void> => {
			if (typeof selector === "string") {
				selector = document.querySelector(selector) as Element;
			}
			const root = ReactDOM.createRoot(selector);
			root.render(factory(data));
		}
	}
}

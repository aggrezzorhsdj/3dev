import { FragmentApi } from "../models/fragment.model"

export type RequestParams = Record<string, string | number | boolean>;
export class HttpService<F extends string> {
	private api: FragmentApi<F>;

	public updateApi(api: FragmentApi<F>) {
		this.api = api;
	}

	public request<T, B = void>(action: F, data?: RequestParams, body?: B, isFormData = false): Promise<T> {
		const {url, method, params} = this.api[action];
		const requestUrl = this.resolveUrl(url, data, params);
		switch (method) {
			case "GET":
				return this.get<T>(requestUrl);
			case "POST":
				return this.post<T, B>(requestUrl, body, isFormData);
			case "DELETE":
				return this.delete<T>(requestUrl);
		}
	}
	public get<T>(url: string): Promise<T> {
		return fetch(url, {method: "GET"})
			.then(res => res.json())
	}

	public post<T, B = void>(url: string, body?: B, isFormData = false): Promise<T> {
		const headers = {
			"Content-Type": "application/json"
		}
		return fetch(url, {
			method: "POST",
			body: isFormData ? body as BodyInit : JSON.stringify(body),
			...(!isFormData) && {headers}
		})
			.then(res => res.json())
	}

	public delete<T>(url: string): Promise<T> {
		return fetch(url, {method: "DELETE"})
			.then(res => res.json())
	}

	private resolveUrl(url: string, data?: RequestParams, params?: string[]): string {
		let result: string = url;

		if (!params?.length) {
			return result;
		}

		for (const key of params) {
			const template = `{${key}}`;
			if (url.includes(template)) {
				const value = data[key].toString();
				result = url.replace(template, value);
			}
		}

		return window.location.origin + result;
	}
}

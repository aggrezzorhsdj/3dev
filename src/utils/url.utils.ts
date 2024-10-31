export function resolveUrlParams(url: string, data: Record<string, string | number>, params: string[]): string {
	let result = url;
	for (const key of params) {
		const template = `{${key}}`;
		if (url.includes(template)) {
			const value = data[key].toString();
			result = url.replace(template, value);
		}
	}

	return result;
}

export interface EventBusData<T> {
	event: string,
	data: T
}
export function sendEvent<T>(data: EventBusData<T>): void {
	const event = new CustomEvent<T>(data.event, {detail: data.data});
	window.dispatchEvent(event);
}

import { FC, memo } from "react"

export const Empty: FC<{title?: string}> = memo(({title}) => {
	return (
		<div className="empty">{title ?? "Data is empty"}</div>
	);
})

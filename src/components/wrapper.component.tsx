import { FC, memo, ReactNode } from "react"
import { Provider } from "react-redux"

export const Wrapper: FC<{node: ReactNode, store: any}> = memo(({node, store}) => {
	return (
		<Provider store={store}>
			{node}
		</Provider>
	)
})

'use client'
import type { ComponentProps, FC } from 'react'

const AsyncSelect: FC<
	Omit<ComponentProps<typeof ReactAsyncSelect>, 'styles'>
> = ({ ...properties }) => {
	return <select {...properties} />
}

export default AsyncSelect

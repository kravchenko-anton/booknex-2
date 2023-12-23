'use client'
import type { ComponentProps, FC } from 'react'
import ReactAsyncSelect from 'react-select/async'
import { selectStyle } from '../settings'

const AsyncSelect: FC<
	Omit<ComponentProps<typeof ReactAsyncSelect>, 'styles'>
> = ({ ...properties }) => {
	return <ReactAsyncSelect styles={selectStyle} {...properties} />
}

export default AsyncSelect

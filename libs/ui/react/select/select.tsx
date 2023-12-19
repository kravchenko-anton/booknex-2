'use client'
import type { FC } from 'react'
import { selectStyle } from './select-settings'

const Select: FC<Omit<any, 'styles'>> = ({ ...properties }) => {
	return <select styles={selectStyle} {...properties} />
}

export default Select

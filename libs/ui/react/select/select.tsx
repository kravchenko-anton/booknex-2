'use client'
import type { FC } from 'react'
import type { Props } from 'react-select'
import ReactSelect from 'react-select'
import { selectStyle } from './settings'

const Select: FC<Omit<Props, 'styles'>> = ({ ...properties }) => {
	return <ReactSelect styles={selectStyle} {...properties} />
}

export default Select

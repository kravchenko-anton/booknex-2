'use client'
import type { ComponentProps } from 'react'
import { Toaster as Sonner } from 'sonner'

type ToasterProperties = ComponentProps<typeof Sonner>

const Toaster = ({ ...properties }: ToasterProperties) => {
	return (
		<Sonner
			className='toaster group'
			toastOptions={{
				classNames: {
					toast:
						'group toast group-[.toaster]:bg-background group-[.toaster]:text-white group-[.toaster]:border-white group-[.toaster]:shadow-lg',
					description: 'group-[.toast]:text-gray',
					actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-white',
					cancelButton: 'group-[.toast]:bg-danger group-[.toast]:text-white'
				}
			}}
			{...properties}
		/>
	)
}

export { Toaster }

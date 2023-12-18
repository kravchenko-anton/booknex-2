import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../../../../libs/ui/react/src/button/button'
import Field from '../../../../../../libs/ui/react/src/field/field'

interface NewParserPopupProperties {
	onSubmit: (data: { link: string; page: number }) => void
	defaultValues?: {
		link: string
		page: number
	}
}

const NewParse: FC<NewParserPopupProperties> = ({
	                                                onSubmit,
	                                                defaultValues = {}
                                                }) => {
	const { control, handleSubmit } = useForm<{
		link: string
		page: number
	}>()
	return (
		<div className="w-[250px] p-4">
			<Field
				control={control}
				color="vibrant"
				defaultValue={defaultValues.link}
				name="link"
				placeholder="Link"
			/>
			<Field
				color="vibrant"
				control={control}
				defaultValue={defaultValues.page}
				className="my-2"
				name="page"
				placeholder="Page"
				type="number"
			/>
			<Button
				color="primary"
				className="mx-auto"
				onClick={handleSubmit(onSubmit)}>
				Parse
			</Button>
		</div>
	)
}

export default NewParse

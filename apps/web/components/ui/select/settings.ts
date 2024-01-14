import { Color } from 'global/colors'

export const selectStyle = {
	control: (provided: object) => ({
		...provided,
		backgroundColor: Color.foreground,
		borderColor: Color.gray,
		animationDuration: '2s',
		boxShadow: 'none',
		border: 0,
		cursor: 'pointer'
	}),
	// option: (_: never, state: any) => ({
	// 	backgroundColor: state.isFocused ? Color.primary : Color.shade,
	// 	padding: 6,
	// 	color: Color.white,
	// 	cursor: 'pointer'
	// }),
	menu: (provided: object) => ({
		...provided,
		backgroundColor: Color.shade
	}),
	singleValue: (provided: object) => ({
		...provided,
		color: Color.white
	}),
	placeholder: (provided: object) => ({
		...provided,
		color: Color.white
	}),
	input: (provided: object) => ({
		...provided,
		color: Color.white
	}),
	dropdownIndicator: (provided: object) => ({
		...provided,
		color: Color.white,
		'&:hover': {
			color: Color.white
		}
	}),
	multiValue: (provided: object) => ({
		...provided,
		backgroundColor: Color.gray
	})
}

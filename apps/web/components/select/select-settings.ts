import { Color } from '../../../../libs/ui/colors'

export const selectStyle = {
	control: provided => ({
		...provided,
		backgroundColor: Color.foreground,
		borderColor: Color.gray,
		animationDuration: '2s',
		boxShadow: 'none',
		border: 0,
		cursor: 'pointer'
	}),
	option: (_, state) => ({
		backgroundColor: state.isFocused ? Color.primary : Color.shade,
		padding: 6,
		color: Color.white,
		cursor: 'pointer'
	}),
	menu: provided => ({
		...provided,
		backgroundColor: Color.shade
	}),
	singleValue: provided => ({
		...provided,
		color: Color.white
	}),
	placeholder: provided => ({
		...provided,
		color: Color.white
	}),
	input: provided => ({
		...provided,
		color: Color.white
	}),
	dropdownIndicator: provided => ({
		...provided,
		color: Color.white,
		'&:hover': {
			color: Color.white
		}
	}),
	multiValue: provided => ({
		...provided,
		backgroundColor: Color.gray
	})
}

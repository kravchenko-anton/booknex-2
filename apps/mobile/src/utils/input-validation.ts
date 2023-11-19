export const passwordRules = {
	required: 'Password is required',
	minLength: {
		value: 6,
		message: 'Password must have at least 8 characters'
	},
	maxLength: {
		value: 25,
		message: 'Password must have at most 25 characters'
	}
}

export const emailRules = {
	required: {
		value: true,
		message: 'Email is required'
	},
	pattern: {
		value: /\S+@\S+\.\S+/,
		message: 'Entered value does not match email format'
	}
}

export const nameRules = {
	required: 'Name is required',
	minLength: {
		value: 8,
		message: 'Name must have at least 8 characters'
	}
}

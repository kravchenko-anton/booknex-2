export enum AuthErrors {
	invalidGoogleToken = 'Invalid google token',
	passwordOrEmailInvalid = 'Email or password invalid'
}

export enum GlobalErrorsEnum {
	invalidValue = 'Invalid value provided',
	somethingWrong = 'Something went wrong, please try again later'
}

export enum AdminErrors {
	notEnoughRights = 'Not enough rights',

	// parser
	invalidChapter = 'Invalid chapter',

	//file
	invalidFile = 'Invalid file',
	invalidFolder = 'Invalid folder',

	// collection
	collectionNotFound = 'Collection not found',
	collectionAlreadyExist = 'Collection already exist',
	someBooksNotFound = 'Some books not found'
}

export enum AuthErrors {
  invalidGoogleToken = 'Invalid google token',
  passwordOrEmailInvalid = 'Email or password invalid',
  InvalidRefreshToken = 'Invalid refresh token',
  userExist = 'User already exist',
  userNotFound = 'User not found'
}

export enum BookErrors {
  storedBookNotFound = 'Stored book not found',
  storedBookInvalid = 'Stored book invalid',
  bookNotFound = 'Book not found'
}

export enum UserErrors {}

export enum GlobalErrorsEnum {
  invalidValue = 'Invalid value provided',
  somethingWrong = 'Something went wrong, please try again later',
  unknownError = 'Unknown error, please try again later',
  noValidParameters = 'No valid parameters'
}

export enum AdminErrors {
  notEnoughRights = 'Not enough rights',

  // parser
  invalidChapter = 'Invalid chapter',

  //file
  invalidFile = 'Invalid file',
  invalidFolder = 'Invalid folder',

  //book

  bookAlreadyExist = 'Book already exist',
  //user

  userNotFound = 'User not found'
  //'No valid parameters'
}

export const errorCode = {
  someEnvNotTransmitted: '4056'
};

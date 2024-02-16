import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'
import 'reflect-metadata'

export class SignDto {
	@IsString()
	@ApiProperty({
		example:
			'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVkODA2ZjE4NDJiNTg4MDU0YjE4YjY2OWRkMWEwOWE0ZjM2N2FmYzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzOTA5NDkzMTEyMTQtaHFmcXZpYzdwNDdwdDNlbHBuZTAwZXM1OGs5OW5vbmguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzOTA5NDkzMTEyMTQtaHFmcXZpYzdwNDdwdDNlbHBuZTAwZXM1OGs5OW5vbmguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTM1NjMyMzk0MjAwODcxNDc2MzUiLCJlbWFpbCI6ImFudG9ua3phdmNlbmNvMDVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTcwODA2ODUwOCwibmFtZSI6ItCQ0L3RgtC-0L0g0JrRgNCw0LLRh9C10L3QutC-IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tObFpBdWVuQV9vMEhONDJ3M2k3YmMxaVRRcUZ2a0loZEYzRnFnS21qUng1Zz1zOTYtYyIsImdpdmVuX25hbWUiOiLQkNC90YLQvtC9IiwiZmFtaWx5X25hbWUiOiLQmtGA0LDQstGH0LXQvdC60L4iLCJsb2NhbGUiOiJydSIsImlhdCI6MTcwODA2ODgwOCwiZXhwIjoxNzA4MDcyNDA4LCJqdGkiOiJmNzJmZGMxNDlkNjg2ZmM2ODE2ZTFmMzVmMjNjODA1YTU4MTVmMTc2In0.i7oOu9fd0Z23tp5Efy9edPMlqzr6c-ZXU4JaYP_Vw4eXnjPBKe8A9wZKtrdrUKO0e8-jM80Hbkd659ZVBr_a_WcYqEpveIMBJtigcJZyPybRNrD9fbuaZYo9AmnU3_KXusuyyVq8tF5MBmdYuLkWSP37sO4772OWVqjJLalmmijIKpYAzG1uXU2FLSu3nGsCeU41yV-994kxlUtGAbJ55JR3p6RimG-1YYnqO14sD7-uP7A74JecUCipEOlZeMdH9ibUqUywzAmF1oViV4ZlFblWmcljC0BMhiFDDZAGst2zr0fbnRzrnFEWdxqy3Ii2JqO98kyHODlMH2udD1qMOQ',
		description: 'Social id',
		required: true
	})
	socialId: string
}

export class RefreshDto {
	@IsString()
	refreshToken: string
}

export class AuthDto {
	@ApiProperty({
		example: 'test@gmail.com',
		description: "User's email",
		format: 'email',
		required: true
	})
	@IsEmail()
	email: string

	@MinLength(8, {
		message: 'Password is too short. Minimal length is 8'
	})
	@IsString()
	password: string
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { AuthUser } from './dto/auth.dto';

export class AuthOutput {
  @ApiProperty({
    description: 'Access token',
    example: '1234567890'
  })
  @IsString()
  accessToken: string;
  @ApiProperty({
    description: 'Refresh token',
    example: '1234567890'
  })
  @IsString()
  refreshToken: string;
  @ApiProperty({
    description: 'type of auth',
    example: 'login'
  })
  @IsString()
  type?: string;

  @ApiProperty({
    type: AuthUser,
    description: 'User data'
  })
  @IsObject()
  @ValidateNested()
  @Type(() => AuthUser)
  user: AuthUser;
}

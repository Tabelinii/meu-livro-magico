import { ApiProperty } from '@nestjs/swagger';
import { UserPublicDto } from '../../users/dto/user-public.dto';

export class AuthResponseDto {
    @ApiProperty()
    access_token: string;

    @ApiProperty({ type: UserPublicDto })
    user: UserPublicDto;
}

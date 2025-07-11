import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserPublicDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ required: false })
    firstName?: string;

    @ApiProperty({ required: false })
    lastName?: string;

    @ApiProperty()
    createdAt: Date;

    constructor(user: User) {
        this.id = user.id;
        this.phone = user.phone;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.createdAt = user.createdAt;
    }
}

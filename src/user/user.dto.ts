import { ApiProperty } from '@nestjs/swagger';

export class EnableNotification {
  @ApiProperty({
    example: 'True',
  })
  notificationsEnabled: boolean;
}

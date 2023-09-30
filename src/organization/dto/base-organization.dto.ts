import { ApiProperty } from '@nestjs/swagger';

export class BaseOrganizationDto {
  @ApiProperty({ example: 'string' })
  organizationName: string;
}

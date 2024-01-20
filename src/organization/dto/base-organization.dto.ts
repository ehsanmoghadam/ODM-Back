import { ApiProperty } from '@nestjs/swagger';

export class BaseOrganizationDto {
  @ApiProperty({ example: 'string' })
  organizationName: string;

  @ApiProperty({ example: 'string' })
  organizationDescription: string;

  items: {
    id: string;
    left: number;
    top: number;
    type: string;
    data: any;
  }[];

  integrates: {
    sourceId: string;
    targetId: string;
    description: string;
  }[];
}

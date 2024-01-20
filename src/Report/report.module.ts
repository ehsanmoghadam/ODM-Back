import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { ReportService } from './report.service';
import {
  Organization,
  OrganizationSchema,
} from '../organization/schemas/organization.schema';

@Module({
  providers: [ReportService],
  controllers: [ReportController],
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
    ]),
  ],
})
export class ReportModule {}

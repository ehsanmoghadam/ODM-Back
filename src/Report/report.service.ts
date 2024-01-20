import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import {
  Organization,
  OrganizationDocument,
} from '../organization/schemas/organization.schema';
import { Insight } from './schemas/report.schema';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Organization.name)
    private readonly model: Model<OrganizationDocument>,
  ) {}

  private async getSumOfItemsAndIntegratesForAllOrganizations() {
    const aggregationResult = await this.model.aggregate([
      {
        $group: {
          _id: null,
          items_count: { $sum: { $size: '$items' } },
          integrates_count: { $sum: { $size: '$integrates' } },
        },
      },
    ]);

    if (aggregationResult.length === 0) return [0, 0];

    return [
      aggregationResult[0].items_count,
      aggregationResult[0].integrates_count,
    ];
  }

  async getInsight(): Promise<Insight> {
    const organizationsCount = await this.model.countDocuments().exec();
    const totalRes = await this.getSumOfItemsAndIntegratesForAllOrganizations();
    return {
      organizationsCount: organizationsCount,
      departmentsCount: totalRes[0] - organizationsCount,
      integratesCount: totalRes[1],
    };
  }
}

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

  async getDepartmentsUsage(fieldId: string): Promise<any[]> {
    return this.model.aggregate([
      {
        $unwind: '$items',
      },
      {
        $match: {
          'items.data.type': 'department',
          'items.data.field.id': fieldId,
        },
      },
      {
        $group: {
          _id: { companyId: '$items.data.company.id' },
          count: { $sum: 1 },
          companyName: { $first: '$items.data.company.name' },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $project: {
          _id: 0,
          companyName: '$companyName',
          totalUsage: '$count',
        },
      },
    ]);
  }
}

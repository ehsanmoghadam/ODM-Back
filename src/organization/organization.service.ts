import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Organization,
  OrganizationDocument,
  PaginationOrganization,
} from './schemas/organization.schema';
import { Model } from 'mongoose';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name)
    private readonly model: Model<OrganizationDocument>,
  ) {}

  async getAll({
    pageSize,
    pageNumber,
  }: {
    pageSize: number;
    pageNumber: number;
  }): Promise<PaginationOrganization> {
    const totalCounts = await this.model.countDocuments().exec();
    const totalPages = Math.floor((totalCounts - 1) / pageSize) + 1;
    const source = await this.model
      .find()
      .limit(pageSize)
      .skip(pageNumber * pageSize)
      .exec();

    return {
      source: source,
      totalPages: totalPages,
      totalCounts: totalCounts,
      currentPage: pageNumber,
      pageSize: pageSize,
    };
  }

  async findOne(id: string): Promise<Organization> {
    return await this.model.findById(id).exec();
  }

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    return await new this.model({
      ...createOrganizationDto,
      createdAt: new Date(),
    }).save();
  }

  async update(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    return await this.model.findByIdAndUpdate(id, updateOrganizationDto).exec();
  }
}

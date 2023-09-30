import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Organization,
  OrganizationDocument,
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

  async findAll(): Promise<Organization[]> {
    return await this.model.find().exec();
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

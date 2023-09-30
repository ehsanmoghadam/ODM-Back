import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { BaseOrganizationDto } from './dto/base-organization.dto';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly service: OrganizationService) {}

  @ApiOkResponse({ type: [BaseOrganizationDto] })
  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @ApiOkResponse({ type: BaseOrganizationDto })
  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @ApiOkResponse({ type: CreateOrganizationDto })
  @Post()
  async create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return await this.service.create(createOrganizationDto);
  }

  @ApiOkResponse({ type: UpdateOrganizationDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return await this.service.update(id, updateOrganizationDto);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BaseOrganizationDto } from './dto/base-organization.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@ApiTags('organizations')
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly service: OrganizationService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [BaseOrganizationDto] })
  @Get()
  async getAll(
    @Query()
    { pageSize, pageNumber }: { pageSize?: number; pageNumber?: number },
  ) {
    return await this.service.getAll({
      pageSize: pageSize || 20,
      pageNumber: pageNumber || 1,
    });
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

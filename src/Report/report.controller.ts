import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportController {
  constructor(private readonly service: ReportService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({})
  @Get('insight')
  async getInsight() {
    return await this.service.getInsight();
  }
}

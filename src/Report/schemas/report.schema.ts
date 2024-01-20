import { Prop } from '@nestjs/mongoose';

export class Insight {
  @Prop({ required: true })
  organizationsCount: number;

  @Prop({ required: true })
  departmentsCount: number;

  @Prop({ required: true })
  integratesCount: number;
}

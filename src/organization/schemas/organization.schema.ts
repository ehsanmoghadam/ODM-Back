import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OrganizationDocument = Organization & Document;

class ItemData {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  left: number;

  @Prop({ required: true })
  top: number;

  @Prop({ required: true, type: Object })
  data: object;
}
class IntegrateData {
  @Prop({ required: true })
  sourceId: string;

  @Prop({ required: true })
  targetId: string;

  @Prop()
  description: string;
}

@Schema({
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Organization {
  @Prop({ required: true })
  organizationName: string;

  @Prop({ required: false })
  organizationDescription: string;

  @Prop({ required: true })
  items: ItemData[];

  @Prop()
  integrates: IntegrateData[];
}

export class PaginationOrganization {
  @Prop({ required: true })
  source: Organization[];

  @Prop({ required: true })
  totalCounts: number;

  @Prop({ required: true })
  totalPages: number;

  @Prop({ required: true })
  currentPage: number;

  @Prop({ required: true })
  pageSize: number;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);

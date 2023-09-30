import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OrganizationDocument = Organization & Document;

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
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);

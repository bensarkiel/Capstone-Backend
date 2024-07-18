import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum CustomerState {
  DISABLED = 'disabled',
  INVITED = 'invited',
  ENABLED = 'enabled',
  DECLINED = 'declined',
}

@Schema({ timestamps: true })
export class Address extends Document {
  @Prop({ type: String, required: true })
  address1: string;

  @Prop({ type: String, required: false, default: null })
  address2: string;

  @Prop({ type: String, maxlength: 250, required: true })
  city: string;

  @Prop({ type: String, maxlength: 250, required: true })
  province: string;

  @Prop({ type: String, maxlength: 250, required: true })
  country: string;

  @Prop({ type: String, maxlength: 100, required: false, default: null })
  phone: string;

  @Prop({ type: String, maxlength: 20, required: true })
  zip: string;

  @Prop({ type: String, maxlength: 200, required: true })
  company: string;

  @Prop({ type: Boolean, default: false })
  default: boolean;
  customer: any;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({ timestamps: true })
export class Customer extends Document {
  @Prop({ unique: true })
  id: string;

  @Prop({ type: String, maxlength: 100, required: false, default: null })
  phone: string;

  @Prop({ type: Boolean, default: false })
  verifiedEmail: boolean;

  @Prop({ type: Boolean, default: false })
  sendEmailWelcome: boolean;

  @Prop({ type: String, enum: CustomerState, default: CustomerState.DISABLED })
  state: CustomerState;

  @Prop({ type: String, maxlength: 10, required: true })
  currency: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Address' }])
  addresses: Address[];

  get orderCounts(): number {
    return 0;
  }
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

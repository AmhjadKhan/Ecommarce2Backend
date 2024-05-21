import { Schema, model, Document } from 'mongoose';


export interface IOrder extends Document {
  email: string;
  productId: Schema.Types.ObjectId;
  price: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    productId:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = model<IOrder>('Order', orderSchema);

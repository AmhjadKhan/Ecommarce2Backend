import { Schema, model } from 'mongoose';
import config from '../../config';
import { ProductModel, TProduct, TVariant, TInventory } from './product.interface';

const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true, 
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  inStock: {
    type: Boolean,
    required: true, 
  },
});

const productSchema = new Schema<TProduct, ProductModel>(
  {
    name: {
      type: String,
      required: true, 
      trim: true,
    },
    description: {
      type: String,
      required: true, 
      trim: true,
    },
    price: {
      type: Number,
      required: true, 
      min: 0, 
    },
    category: {
      type: String,
      required: true, 
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    variants: {
      type: [variantSchema],
      default: [],
    },
    inventory: {
      type: inventorySchema,
      required: true, 
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// Virtual field for availability status
productSchema.virtual('availabilityStatus').get(function () {
  return this.inventory.inStock ? 'In Stock' : 'Out of Stock';
});

// Query middleware to exclude deleted products
productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Static method to find a product by name
productSchema.statics.findProductByName = async function (name: string) {
  return this.findOne({ name });
};

export const Product = model<TProduct, ProductModel>('Product', productSchema);

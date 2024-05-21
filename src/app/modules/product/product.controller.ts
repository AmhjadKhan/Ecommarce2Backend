import { Request, Response } from 'express';
import { Product } from './product.model';
import { error } from 'console';

export const ProductControllers = {
  createProduct: async (req: Request, res: Response) => {
    try {
      const { name, description, price, category, tags, variants, inventory } = req.body;

      const newProduct = new Product({
        name,
        description,
        price,
        category,
        tags,
        variants,
        inventory,
      });

      const savedProduct = await newProduct.save();

      res.status(201).json({
        success: true,
        message: 'Product created successfully!',
        data: savedProduct,
      });
    } catch (erro) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while creating the product.',
        error: error,
      });
    }
  },

  getAllProducts: async (_req: Request, res: Response) => {
    try {
      const products = await Product.find();
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while retrieving products.',
        error: error
      });
    }
  },

  getProductById: async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while retrieving the product.',
        error: error
      });
    }
  },

  updateProductById: async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });

      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while updating the product.',
        error: error
      });
    }
  },

  deleteProductById: async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(productId);

      if (!deletedProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: deletedProduct,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while deleting the product.',
        error: error
      });
    }
  },

  searchProducts: async (req: Request, res: Response) => {
    try {
      const { searchTerm } = req.query;
      const products = await Product.find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
          { tags: { $regex: searchTerm, $options: 'i' } },
        ],
      });

      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while searching for products.',
        error: error
      });
    }
  },
};

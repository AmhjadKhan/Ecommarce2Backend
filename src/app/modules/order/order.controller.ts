import { Request, Response } from 'express';
import { TOrder } from './order.interface';
import { OrderServices } from './order.services';
import { orderSchema, orderQuerySchema } from './order.validation';
import { z } from "zod";

export const createOrder = async (req: Request, res: Response) => {
  try {
    // Validate the request body using Zod schema
    const orderData: TOrder = orderSchema.parse(req.body);
    
    const newOrder = await OrderServices.createOrder(orderData);
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: newOrder,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors, // Provides detailed Zod validation errors
      });
    } else {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderServices.getAllOrders();
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

export const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    // Validate the query string using Zod schema
    const { email } = orderQuerySchema.parse(req.query);
    
    const orders = await OrderServices.getOrdersByEmail(email);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully for user email!',
      data: orders,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors,
      });
    } else {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
};

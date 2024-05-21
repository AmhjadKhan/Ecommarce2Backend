import { Request, Response } from 'express';
import { TOrder } from './order.interface';
import { OrderServices } from './order.services';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: TOrder = req.body;
    const newOrder = await OrderServices.createOrderIntoDB(orderData);
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: newOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderServices.getAllOrdersFromDB();
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    });
  }
};

export const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const orders = await OrderServices.getOrdersByEmailFromDB(email);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully for user email!',
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    });
  }
};

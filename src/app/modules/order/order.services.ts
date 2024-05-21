import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  const newOrder = new OrderModel(orderData);
  const result = await newOrder.save();
  return result;
};

const getAllOrdersFromDB = async () => {
  const orders = await OrderModel.find();
  return orders;
};

const getOrdersByEmailFromDB = async (email: string) => {
  const orders = await OrderModel.find({ email });
  return orders;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrdersByEmailFromDB,
};

import { Request, Response } from 'express';
import { mockProductsList } from './mock/mock-details';

export function getProductById(req: Request, res: Response) {
  const productsList = mockProductsList;
  const productId = req.params['productId'];
  const product = productsList.find((p) => p.id === productId);

  console.log('getProductById ..., productId: ', req.params['productId']);

  res.status(200).json(product);
}

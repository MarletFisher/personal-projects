import { Request, Response } from 'express';
import { mockProductsList } from './mock/mock-details';

export function getProducts(req: Request, res: Response) {
  console.log('getProducts ...');

  res.status(200).json({
    page: '1',
    version: '1.00',
    lastUpdated: '2023-02-15',
    payload: mockProductsList,
  });
}

import { createAction, props } from '@ngrx/store';
import { Product } from '../types/Product';
import { User } from '../types/User';

export const setUser = createAction(
  '[SetUser] SetUser',
  props<{ data: User }>()
);

export const setCity = createAction(
  '[SetCity] SetCity',
  props<{ data: string }>()
);

export const reset = createAction('[Reset] Reset');

export const addProducts = createAction(
  '[AddProducts]',
  props<{ data: Product[] }>()
);

export const selectProduct = createAction(
  '[SelectProduct]',
  props<{ data: Product }>()
);

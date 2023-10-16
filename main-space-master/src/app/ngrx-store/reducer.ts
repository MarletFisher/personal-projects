import { MetaReducer, createReducer, on } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import {
  addProducts,
  reset,
  selectProduct,
  setCity,
  setUser
} from 'src/app/ngrx-store/actions';
import { AppState } from './state';

export const initialState: AppState = {
  count: 0,
  user: null,
  products: [],
  selectedProduct: null,
  city: null
};

const environment = {
  production: false
};
export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

export const reducer = createReducer(
  initialState,
  on(setUser, (state, action) => ({
    ...state,
    user: action.data
  })),
  on(setCity, (state, action) => ({
    ...state,
    city: action.data
  })),
  on(reset, state => initialState),
  on(addProducts, (state, action) => ({
    ...state,
    products: action.data
  })),
  on(selectProduct, (state, action) => ({
    ...state,
    selectedProduct: action.data
  }))
);

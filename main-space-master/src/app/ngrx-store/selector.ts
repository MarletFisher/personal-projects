import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './state';

const selectAppState = createFeatureSelector<AppState>('appState');
export const selectUser = createSelector(selectAppState, state => state.user);

export const selectAllProducts = createSelector(
  selectAppState,
  state => state.products
);

export const displayProduct = createSelector(
  selectAppState,
  state => state.selectedProduct
);

export const shopCity = createSelector(selectAppState, state => state.city);

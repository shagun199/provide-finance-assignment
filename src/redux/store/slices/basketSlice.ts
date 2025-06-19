import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  discountPercentage: number;
};

export interface BasketState {
  products: Product[];
}

const initialState: BasketState = {
  products: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (productIndex == -1) {
        state.products = [action.payload, ...state.products];
      } else {
        const products = state.products;
        products[productIndex].quantity += 1;
        state.products = [...products];
      }
    },

    clearAll: (state) => {
      state.products = [];
    },
  },
});

export const { addItem, clearAll } = basketSlice.actions;

export default basketSlice.reducer;

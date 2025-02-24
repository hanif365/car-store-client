import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  allProducts: any[];
  meta: {
    page: number;
    limit: number;
    total: number;
  } | null;
}

const initialState: ProductState = {
  allProducts: [],
  meta: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setAllProducts(
      state,
      action: PayloadAction<{
        data: any[];
        meta: { page: number; limit: number; total: number };
      }>
    ) {
      state.allProducts = action.payload.data;
      state.meta = action.payload.meta;
    },
  },
});

export const { setAllProducts } = productsSlice.actions;

export const selectAllProducts = (state: RootState) =>
  state.products.allProducts;
export const selectProductsMeta = (state: RootState) => state.products.meta;

export default productsSlice.reducer;

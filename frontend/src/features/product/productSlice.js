import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductApi,
  deleteProductApi,
  getAllProductsApi,
  getProductByIdApi,
  getProductsByShopApi,
  updateProductApi,
} from "./productAPI";

export const createProductThunk = createAsyncThunk(
  "product/createProduct",
  async (data, thunkAPI) => {
    try {
      const res = await createProductApi(data);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getProductsByShopThunk = createAsyncThunk(
  "product/getProductsByShop",
  async (_, thunkAPI) => {
    try {
      const res = await getProductsByShopApi();
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const res = await deleteProductApi(id);
      console.log(res);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "product/updateProduct",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await updateProductApi(id, data);
      console.log(res);
      return { id, updatedProduct: res.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllProductsThunk = createAsyncThunk(
  "product/getAllProducts",
  async ({ page, limit }, thunkAPI) => {
    try {
      const res = await getAllProductsApi(page, limit);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getProductByIdThunk = createAsyncThunk(
  "product/getProductById",
  async (id, thunkAPI) => {
    try {
      const res = await getProductByIdApi(id);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  allProducts: [],
  shopProducts: [],
  singleProduct: null,
  isLoading: false,
  error: null,
  success: false,
  totalPages: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.shop = action.payload;
        state.success = true;
        state.shopProducts.push(action.payload);
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(getProductsByShopThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getProductsByShopThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shopProducts = action.payload;
        state.success = true;
      })
      .addCase(getProductsByShopThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(deleteProductThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.shopProducts = state.shopProducts.filter(
          (product) => action.payload !== product._id
        );
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(updateProductThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.shopProducts = state.shopProducts.map((product) => {
          if (product._id === action.payload.id) {
            return {
              ...product,
              ...action.payload.updatedProduct,
            };
          }
          return product;
        });
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(getAllProductsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.allProducts = action.payload;
        state.totalPages = action.totalPages;
      })
      .addCase(getAllProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(getProductByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getProductByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.singleProduct = action.payload;
      })
      .addCase(getProductByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// export const { logout, resetError } = productSlice.actions;
export default productSlice.reducer;

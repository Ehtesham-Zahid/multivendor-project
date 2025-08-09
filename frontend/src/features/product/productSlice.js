import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductApi,
  deleteProductApi,
  getAllProductsApi,
  getProductByIdApi,
  getProductsByCategoryApi,
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
  async ({ page, limit, category, sortBy, search }, thunkAPI) => {
    try {
      const res = await getAllProductsApi({
        page,
        limit,
        category,
        sortBy,
        search,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
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

export const getProductsByCategoryThunk = createAsyncThunk(
  "product/getProductsByCategory",
  async (category, thunkAPI) => {
    try {
      const res = await getProductsByCategoryApi(category);
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
  categoryProducts: [],
  bestSellingProducts: [],
  searchProducts: [],
  singleProduct: null,
  isLoading: false,
  error: null,
  success: false,
  totalPages: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchTermReducer: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
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

        const { sortBy, limit, category, search } = action.meta.arg;

        if (sortBy === "sales") {
          console.log("MAIN CHAL RAHA");
          state.bestSellingProducts = action.payload.products;
          state.totalPages = action.payload.totalPages;
        }
        if (category) {
          state.categoryProducts = action.payload.products;
          state.totalPages = action.payload.totalPages;
        }

        if (search) {
          state.searchProducts = action.payload.products;
          state.totalPages = action.payload.totalPages;
        }

        // This block should be your fallback when no specific filters are passed
        console.log(!category && !(sortBy === "sales"));
        console.log(search);
        if (!category && !(sortBy === "sales") && search === undefined) {
          console.log(action.payload.products);
          state.allProducts = action.payload.products;
          state.totalPages = action.payload.totalPages;
          state.searchProducts = [];
        }
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
    builder
      .addCase(getProductsByCategoryThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getProductsByCategoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.categoryProducts = action.payload;
      })
      .addCase(getProductsByCategoryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setSearchTermReducer } = productSlice.actions;
export default productSlice.reducer;

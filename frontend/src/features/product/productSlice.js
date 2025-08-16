import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductApi,
  deleteProductApi,
  getAllProductsApi,
  getProductByIdApi,
  getProductsByCategoryApi,
  getProductsByShopApi,
  updateProductApi,
  getAllProductsAdminApi,
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
  async ({ page, limit }, thunkAPI) => {
    try {
      const res = await getProductsByShopApi({ page, limit });
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

export const getAllProductsAdminThunk = createAsyncThunk(
  "product/getAllProductsAdmin",
  async ({ page, limit, onlyActive, sortBy }, thunkAPI) => {
    try {
      const res = await getAllProductsAdminApi({
        page,
        limit,
        onlyActive,
        sortBy,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getBestSellingProductsHomepageThunk = createAsyncThunk(
  "product/getBestSellingProductsHomepage",
  async ({ page, limit }, thunkAPI) => {
    try {
      const res = await getAllProductsApi({
        sortBy: "sales",
        limit: 5,
        page,
        limit,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getBestSellingProductsThunk = createAsyncThunk(
  "product/getBestSellingProducts",
  async ({ page, limit }, thunkAPI) => {
    try {
      const res = await getAllProductsApi({
        sortBy: "sales",
        limit,
        page,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getFeaturedProductsThunk = createAsyncThunk(
  "product/getFeaturedProducts",
  async ({ limit }, thunkAPI) => {
    try {
      const res = await getAllProductsApi({
        isFeatured: true,
        limit,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getSearchProductsThunk = createAsyncThunk(
  "product/getSearchProducts",
  async ({ search, limit, page }, thunkAPI) => {
    try {
      const res = await getAllProductsApi({ search, limit, page });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
const initialState = {
  allProducts: [],
  adminProducts: [],
  shopProducts: [],
  categoryProducts: [],
  bestSellingProducts: [],
  bestSellingProductsHomepage: [],
  featuredProducts: [],
  searchProducts: [],
  singleProduct: null,
  isLoading: false,
  error: null,
  success: false,
  totalPages: 0,
  totalProducts: 0,
  totalAdminProducts: 0,
  totalAdminPages: 0,
  bestSellingProductsTotalPages: 0,
  totalSearchPages: 0,
  totalSearchProducts: 0,
  searchTerm: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchTermReducer: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchProductsReducer: (state, action) => {
      state.searchProducts = action.payload;
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
        state.shopProducts = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.totalProducts = action.payload.totalProducts;
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
        state.totalProducts = state.totalProducts - 1;
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
    builder
      .addCase(getAllProductsAdminThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllProductsAdminThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.adminProducts = action.payload.products;
        state.totalAdminProducts = action.payload.totalProducts;
        state.totalAdminPages = action.payload.totalPages;
      })
      .addCase(getAllProductsAdminThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(getBestSellingProductsHomepageThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getBestSellingProductsHomepageThunk.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.bestSellingProductsHomepage = action.payload.products;
        }
      )
      .addCase(
        getBestSellingProductsHomepageThunk.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(getBestSellingProductsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBestSellingProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bestSellingProducts = action.payload.products;
        state.bestSellingProductsTotalPages = action.payload.totalPages;
      })
      .addCase(getBestSellingProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getFeaturedProductsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeaturedProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featuredProducts = action.payload.products;
      })
      .addCase(getFeaturedProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getSearchProductsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSearchProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchProducts = action.payload.products;
        state.totalSearchPages = action.payload.totalPages;
        state.totalSearchProducts = action.payload.totalProducts;
      })
      .addCase(getSearchProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTermReducer, setSearchProductsReducer } =
  productSlice.actions;
export default productSlice.reducer;

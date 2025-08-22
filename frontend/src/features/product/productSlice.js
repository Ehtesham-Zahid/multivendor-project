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
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getProductsByCategoryThunk = createAsyncThunk(
  "product/getProductsByCategory",
  async ({ page, limit, category }, thunkAPI) => {
    try {
      const res = await getAllProductsApi({
        category,
        limit,
        page,
      });
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
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getSearchBarProductsThunk = createAsyncThunk(
  "product/getSearchBarProducts",
  async ({ search, limit, page }, thunkAPI) => {
    try {
      const res = await getAllProductsApi({ search, limit, page });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getSearchPageProductsThunk = createAsyncThunk(
  "product/getSearchPageProducts",
  async ({ search, limit, page }, thunkAPI) => {
    try {
      const res = await getAllProductsApi({ search, limit, page });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
const initialState = {
  error: null,
  searchTerm: "",

  // Search Bar Products
  isSearchBarProductsLoading: false,
  searchBarProducts: [],

  // Search Page Products
  isSearchPageProductsLoading: false,
  searchPageProducts: [],
  totalSearchPages: 0,

  // All Products
  isAllProductsLoading: false,
  allProducts: [],
  totalAllProductsPages: 0,

  // Best Selling Products
  isBestSellingProductsLoading: false,
  bestSellingProducts: [],
  totalBestSellingPages: 0,
  totalBestSellingProducts: 0,

  // Best Selling Products Homepage
  isBestSellingProductsHomePageLoading: false,
  bestSellingProductsHomepage: [],

  // Featured Products
  isFeaturedProductsLoading: false,
  featuredProducts: [],

  // Category Products
  isCategoryProductsLoading: false,
  categoryProducts: [],
  totalCategoryPages: 0,

  // Product By Id
  isSingleProductLoading: false,
  singleProduct: null,

  // Create Product
  isCreateProductLoading: false,

  // Update Product
  isUpdateProductLoading: false,

  // Delete Product
  isDeleteProductLoading: false,

  // Shop Products
  isShopProductsLoading: false,
  shopProducts: [],
  totalShopProductsPages: 0,
  totalShopProducts: 0,

  // All Products Admin
  isAllProductsAdminLoading: false,
  adminProducts: [],
  totalAdminProductsPages: 0,
  totalAdminProducts: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchTermReducer: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchBarProductsReducer: (state, action) => {
      state.searchBarProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.isCreateProductLoading = true;
        state.error = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.isCreateProductLoading = false;
        state.shopProducts.push(action.payload);
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.isCreateProductLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getProductsByShopThunk.pending, (state) => {
        state.isShopProductsLoading = true;
        state.error = null;
      })
      .addCase(getProductsByShopThunk.fulfilled, (state, action) => {
        state.isShopProductsLoading = false;
        state.shopProducts = action.payload.products;
        state.totalShopProductsPages = action.payload.totalPages;
        state.totalShopProducts = action.payload.totalProducts;
      })
      .addCase(getProductsByShopThunk.rejected, (state, action) => {
        state.isShopProductsLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteProductThunk.pending, (state) => {
        state.isDeleteProductLoading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.isDeleteProductLoading = false;
        state.shopProducts = state.shopProducts.filter(
          (product) => action.payload !== product._id
        );
        state.totalProducts = state.totalProducts - 1;
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.isDeleteProductLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateProductThunk.pending, (state) => {
        state.isUpdateProductLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.isUpdateProductLoading = false;
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
        state.isUpdateProductLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(getAllProductsThunk.pending, (state) => {
        state.isAllProductsLoading = true;
        state.error = null;
      })
      .addCase(getAllProductsThunk.fulfilled, (state, action) => {
        state.isAllProductsLoading = false;
        state.allProducts = action.payload.products;
        state.totalAllProductsPages = action.payload.totalPages;

        state.searchBarProducts = [];
        state.searchPageProducts = [];
      })
      .addCase(getAllProductsThunk.rejected, (state, action) => {
        state.isAllProductsLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getProductByIdThunk.pending, (state) => {
        state.isSingleProductLoading = true;
        state.error = null;
      })
      .addCase(getProductByIdThunk.fulfilled, (state, action) => {
        state.isSingleProductLoading = false;
        state.singleProduct = action.payload;
      })
      .addCase(getProductByIdThunk.rejected, (state, action) => {
        state.isSingleProductLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getProductsByCategoryThunk.pending, (state) => {
        state.isCategoryProductsLoading = true;
        state.error = null;
      })
      .addCase(getProductsByCategoryThunk.fulfilled, (state, action) => {
        state.isCategoryProductsLoading = false;
        state.categoryProducts = action.payload.products;
        state.totalCategoryPages = action.payload.totalPages;
      })
      .addCase(getProductsByCategoryThunk.rejected, (state, action) => {
        state.isCategoryProductsLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAllProductsAdminThunk.pending, (state) => {
        state.isAllProductsAdminLoading = true;
        state.error = null;
      })
      .addCase(getAllProductsAdminThunk.fulfilled, (state, action) => {
        state.isAllProductsAdminLoading = false;
        state.adminProducts = action.payload.products;
        state.totalAdminProductsPages = action.payload.totalPages;
        state.totalAdminProducts = action.payload.totalProducts;
      })
      .addCase(getAllProductsAdminThunk.rejected, (state, action) => {
        state.isAllProductsAdminLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getBestSellingProductsHomepageThunk.pending, (state) => {
        state.isBestSellingProductsHomePageLoading = true;
        state.error = null;
      })
      .addCase(
        getBestSellingProductsHomepageThunk.fulfilled,
        (state, action) => {
          state.isBestSellingProductsHomePageLoading = false;
          state.bestSellingProductsHomepage = action.payload.products;
        }
      )
      .addCase(
        getBestSellingProductsHomepageThunk.rejected,
        (state, action) => {
          state.isBestSellingProductsHomePageLoading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(getBestSellingProductsThunk.pending, (state) => {
        state.isBestSellingProductsLoading = true;
        state.error = null;
      })
      .addCase(getBestSellingProductsThunk.fulfilled, (state, action) => {
        state.isBestSellingProductsLoading = false;
        state.bestSellingProducts = action.payload.products;
        state.totalBestSellingPages = action.payload.totalPages;
        state.totalBestSellingProducts = action.payload.totalProducts;
      })
      .addCase(getBestSellingProductsThunk.rejected, (state, action) => {
        state.isBestSellingProductsLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getFeaturedProductsThunk.pending, (state) => {
        state.isFeaturedProductsLoading = true;
        state.error = null;
      })
      .addCase(getFeaturedProductsThunk.fulfilled, (state, action) => {
        state.isFeaturedProductsLoading = false;
        state.featuredProducts = action.payload.products;
      })
      .addCase(getFeaturedProductsThunk.rejected, (state, action) => {
        state.isFeaturedProductsLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getSearchBarProductsThunk.pending, (state) => {
        state.isSearchBarProductsLoading = true;
        state.error = null;
      })
      .addCase(getSearchBarProductsThunk.fulfilled, (state, action) => {
        state.isSearchBarProductsLoading = false;
        state.searchBarProducts = action.payload.products;
      })
      .addCase(getSearchBarProductsThunk.rejected, (state, action) => {
        state.isSearchBarProductsLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getSearchPageProductsThunk.pending, (state) => {
        state.isSearchPageProductsLoading = true;
        state.error = null;
      })
      .addCase(getSearchPageProductsThunk.fulfilled, (state, action) => {
        state.isSearchPageProductsLoading = false;
        state.searchPageProducts = action.payload.products;
        state.totalSearchPages = action.payload.totalPages;
        state.totalSearchProducts = action.payload.totalProducts;
      })
      .addCase(getSearchPageProductsThunk.rejected, (state, action) => {
        state.isSearchPageProductsLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTermReducer, setSearchBarProductsReducer } =
  productSlice.actions;
export default productSlice.reducer;

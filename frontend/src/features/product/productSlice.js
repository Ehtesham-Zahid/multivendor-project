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
  allProducts: [],
  adminProducts: [],
  shopProducts: [],
  categoryProducts: [],
  bestSellingProducts: [],
  bestSellingProductsHomepage: [],
  featuredProducts: [],
  searchBarProducts: [],
  searchPageProducts: [],
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

  isBestSellingProductsHomePageLoading: false,
  isBestSellingProductsLoading: false,
  isFeaturedProductsLoading: false,
  isSearchBarProductsLoading: false,
  isSearchPageProductsLoading: false,
  isProductByIdLoading: false,
  isProductsByCategoryLoading: false,

  totalCategoryPages: 0,
  totalCategoryProducts: 0,
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
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shopProducts.push(action.payload);
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getProductsByShopThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductsByShopThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shopProducts = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(getProductsByShopThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
          state.bestSellingProducts = action.payload.products;
          state.totalPages = action.payload.totalPages;
        }
        if (category) {
          state.categoryProducts = action.payload.products;
          state.totalPages = action.payload.totalPages;
        }

        // if (search) {
        //   state.searchPageProducts = action.payload.products;
        //   state.totalPages = action.payload.totalPages;
        // }

        // This block should be your fallback when no specific filters are passed

        if (!category && !(sortBy === "sales") && search === undefined) {
          state.allProducts = action.payload.products;
          state.totalPages = action.payload.totalPages;
          state.searchBarProducts = [];
          state.searchPageProducts = [];
        }
      })

      .addCase(getAllProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(getProductByIdThunk.pending, (state) => {
        state.isProductByIdLoading = true;
        state.error = null;
      })
      .addCase(getProductByIdThunk.fulfilled, (state, action) => {
        state.isProductByIdLoading = false;
        state.singleProduct = action.payload;
      })
      .addCase(getProductByIdThunk.rejected, (state, action) => {
        state.isProductByIdLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getProductsByCategoryThunk.pending, (state) => {
        state.isProductsByCategoryLoading = true;
        state.error = null;
      })
      .addCase(getProductsByCategoryThunk.fulfilled, (state, action) => {
        state.isProductsByCategoryLoading = false;
        state.categoryProducts = action.payload.products;
        state.totalCategoryPages = action.payload.totalPages;
        state.totalCategoryProducts = action.payload.totalProducts;
      })
      .addCase(getProductsByCategoryThunk.rejected, (state, action) => {
        state.isProductsByCategoryLoading = false;
        state.error = action.payload;
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
        state.bestSellingProductsTotalPages = action.payload.totalPages;
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

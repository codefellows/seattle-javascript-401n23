import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = import.meta.env.VITE_API_URL;
// this sets up a function that will run asynchronously and return something
export const getProducts = createAsyncThunk("GET/products", async () => {
  // this is just a placeholder for making an async request
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  // return [{ name: "dummy product" }];
  // ^^^ demo only
  // REALLY DO THIS
  const response = await fetch(`${url}/products`);
  const json = await response.json();
  return json.results;
});

// update a single product
export const updateProduct = createAsyncThunk(
  "PUT/product/:id",
  async ({ product, amount }) => {
    const updatedProduct = { ...product, inStock: product.inStock + amount };

    const response = await fetch(`${url}/products/${product._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();
    return json;
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [],
    selectProduct: {},
  },
  reducers: {},
  // productSlice.actions.selectProduct
  // dispatch(productSlice.actions.selectProduct(product))
  // product would be the action.payload for a REGULAR reducer action

  // these below are differnt - the action.payload is what the fuflilled promise returns
  // acts like a switch case and listens for that async function to be run
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (p) => p._id === updatedProduct._id
        );
        state.products[index] = updatedProduct;
      });
  },
});

export default productSlice;

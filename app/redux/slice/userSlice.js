import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("user/login", async (data, thunkApi) => {
  try {
    const response = await axios.post("/api/users/login", data);

    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const register = createAsyncThunk(
  "user/register",
  async (data, thunkApi) => {
    try {
      const response = await axios.post("/api/users/signup", data);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkApi) => {
  try {
    const response = await axios.get("/api/users/logout");
    console.log(response);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    LoggedUser: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: false,

    post: { title: "", author: "", content: "", image: "" },
  },
  reducers: {
    RESET_AUTH(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.loggedIn = false;
    },
    Post_Blog(state, action) {
      state.post = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.LoggedUser = action.payload.data;
        state.isError = null;
        state.message = action.payload.message;
        state.isLoading = false;
        // toast.success("Successfully logged in");
      })
      .addCase(login.rejected, (state, action) => {
        state.loggedIn = false;
        state.isError = action.message;
        state.isLoading = false;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loggedIn = false;
        state.LoggedUser = [];
        state.isError = null;
        // toast.success(" successfully logged out");
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isError = action.message;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
      }),
});
export const { RESET_AUTH, Post_Blog } = blogSlice.actions;
export default blogSlice.reducer;

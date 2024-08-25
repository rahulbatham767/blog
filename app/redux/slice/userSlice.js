import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useRouter } from "next/navigation";

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

export const postblog = createAsyncThunk(
  "user/blog",
  async (data, thunkApi) => {
    try {
      const response = await axios.post("http://localhost:3000/post", data);
      console.log(response);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const getBlog = createAsyncThunk("user/getblog", async (_, thunkApi) => {
  try {
    const response = await axios.get("http://localhost:3000/post");
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
    data: [],

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
    SetLoader(state, action) {
      state.isLoading = action.payload;
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
      })
      .addCase(login.rejected, (state, action) => {
        state.loggedIn = false;
        state.isError = action.payload;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loggedIn = false;
        state.LoggedUser = [];
        state.isError = null;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postblog.fulfilled, (state, action) => {
        state.post = action.payload;
        state.isSuccess = true;
        console.log(action.payload);
        state.isLoading = false;
      })
      .addCase(postblog.rejected, (state, action) => {
        state.isError = action.payload || action.error.message;
        state.isLoading = false;
      })
      .addCase(postblog.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.data = action.payload.post;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isError = action.payload || action.error.message;
        state.isLoading = false;
      })
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      }),
});
export const { RESET_AUTH, Post_Blog, SetLoader } = blogSlice.actions;
export default blogSlice.reducer;

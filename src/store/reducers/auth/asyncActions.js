import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/library/http";

const register = createAsyncThunk(
  "auth/register",
  async ({ username, password }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.post("auth/register", {
        username,
        password,
      });
      const data = response.data;

      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data || err);
    }
  }
);

export { register };

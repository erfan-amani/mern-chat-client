import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/library/http";

const getUser = createAsyncThunk(
  "auth/user",
  async (ـ, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.get("user/profile");
      const data = response.data;

      console.log(data);

      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data || err);
    }
  }
);

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

const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.post("auth/login", {
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

export { getUser, register, login };

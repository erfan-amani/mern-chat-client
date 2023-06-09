import { createSlice } from "@reduxjs/toolkit";
import { getUser, register, login } from "./asyncActions";

const initialState = {
  user: null,
  accessToken: null,
  unreadNotifications: 0,
  status: "idle",
  pending: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    newNotification: state => {
      state.unreadNotifications++;
    },
    readNotification: state => {
      state.unreadNotifications--;
    },
    readAllNotifications: state => {
      state.unreadNotifications = 0;
    },
    logout: state => {
      state.status = "idle";
      state.user = null;
      state.error = null;
      state.accessToken = null;
    },
    setReferral: (state, { payload }) => {
      state.referredCode = payload.referredCode;
    },
    resetAuthState: () => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(register.pending, () => {
        const newState = {
          ...initialState,
          pending: true,
          status: "register:pending",
        };

        return newState;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        const { token, user } = payload || {};

        state.pending = false;
        state.error = null;
        state.user = user;
        state.accessToken = token;
        state.status = "register:fulfilled";
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.error = payload;
        state.status = "register:rejected";
        state.pending = false;
      })
      // LOGIN
      .addCase(login.pending, () => {
        const newState = {
          ...initialState,
          pending: true,
          status: "login:pending",
        };

        return newState;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const { token, user } = payload || {};

        state.pending = false;
        state.error = null;
        state.user = user;
        state.accessToken = token;
        state.status = "login:fulfilled";
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.error = payload;
        state.status = "login:rejected";
        state.pending = false;
      })
      .addCase(getUser.pending, state => {
        state.pending = true;
        state.error = null;
        state.status = "user:pending";
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.pending = false;
        state.error = null;
        state.status = "user:fulfilled";
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.status = "user:rejected";
        state.pending = false;
        state.user = null;
        state.accessToken = null;
      });
  },
});

export const {
  newNotification,
  readNotification,
  readAllNotifications,
  logout,
  setReferral,
  resetAuthState,
} = authSlice.actions;

export default authSlice;

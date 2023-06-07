import { createSlice } from "@reduxjs/toolkit";
import { register } from "./asyncActions";

const initialState = {
  user: null,
  accessToken: null,
  notifications: [],
  status: "idle",
  pending: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setNotifications: (state, { payload }) => {
      const newNotif = Array.isArray(payload) ? payload : [payload];

      state.notifications = [...state.notifications, ...newNotif];
    },
    readNotifications: (state, { payload }) => {
      state.notifications = state.notifications.filter(n => n.id !== payload);
    },
    readAllNotifications: state => {
      state.notifications = [];
    },
    logout: state => {
      state.status = "idle";
      state.user = null;
      state.accessToken = null;
      state.logoutError = null;
    },
    setReferral: (state, { payload }) => {
      state.referredCode = payload.referredCode;
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
      });
  },
});

export const {
  setNotifications,
  readAllNotifications,
  readNotifications,
  logout,
  setReferral,
} = authSlice.actions;

export default authSlice;

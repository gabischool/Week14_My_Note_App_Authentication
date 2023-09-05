import { configureStore } from "@reduxjs/toolkit";
import { noteApi } from "./api/NoteSlice";
import { userAuth } from "./api/Auth";
import { UserSlice } from "./api/UserSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [noteApi.reducerPath]: noteApi.reducer,
    [userAuth.reducerPath]: userAuth.reducer,
    [UserSlice.reducerPath]: UserSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(noteApi.middleware)
      .concat(userAuth.middleware)
      .concat(UserSlice.middleware),
});

setupListeners(store.dispatch);

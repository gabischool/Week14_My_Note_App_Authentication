import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {authSlice} from './api/AuthSlice'
import {userSlice} from './api/UserSlice'
import { noteApi } from './api/NoteSlice'

export const store = configureStore({
  reducer: {
    [noteApi.reducerPath]: noteApi.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(noteApi.middleware)
    .concat(authSlice.middleware)
    .concat(userSlice.middleware),
});

setupListeners(store.dispatch);


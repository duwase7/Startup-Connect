import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import startupSlice from './features/startups/startupSlice'
import connectionSlice from './features/connections/connectionSlice'
import messageSlice from './features/messages/messageSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    startups: startupSlice,
    connections: connectionSlice,
    messages: messageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
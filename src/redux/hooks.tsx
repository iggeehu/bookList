import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { getDefaultMiddleware } from '@reduxjs/toolkit';


import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import myListsReducer from './myListsSlice'
import watchedListsReducer from './watchedListsSlice'
import searchSliceReducer from './search'
import profileSliceReducer from './profileSlice'
import axios from "axios"



export const store = configureStore(
    {reducer: {
      auth: authReducer,
      myLists: myListsReducer,
      watchedLists: watchedListsReducer,
      search: searchSliceReducer,
      profile: profileSliceReducer
    }
    // preloadedState: {myLists: preloaded}
    }
 )


    export type AppDispatch = typeof store.dispatch;
    export type RootState = ReturnType<typeof store.getState>
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
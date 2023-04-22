import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import myListsReducer from "./myListsSlice";
import watchedListsReducer from "./watchedListsSlice";
import searchSliceReducer from "./searchSlice";
import profileSliceReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    myLists: myListsReducer,
    watchedLists: watchedListsReducer,
    search: searchSliceReducer,
    profile: profileSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

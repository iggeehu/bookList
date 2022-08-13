import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import {readStatus, rating, ISBNtype, industryIdentifier, img, listItem, listObject, Lists} from "./myListsSlice"


const initialState: Lists = []

const watchedListsSlice = createSlice({
 name: 'watchedListsSlice',
 initialState,
 reducers: {
     add(state, action: PayloadAction<listItem>){},
     delete(state, action: PayloadAction<string>){},
 }
})


export const {add} = watchedListsSlice.actions
export default watchedListsSlice.reducer 
import {createSlice,PayloadAction, createAsyncThunk} from "@reduxjs/toolkit"
import {readStatus, rating, ISBNtype, industryIdentifier, img, listItem, listObject, Lists} from "./myListsSlice"
import axios from "axios"

type initial = {
    commLists: []
    loadCommLists: "idle" | "loading" | "successful" | "failed"
    addToColl: "idle" | "loading" | "successful" | "failed"
}


const initialState: initial = {
    commLists:[],
    loadCommLists:"idle",
    addToColl:"idle"
}




export const getCommLists = createAsyncThunk("watchedLists/getCommLists", async () => {
    try{
    
    const headers = {"authorization":localStorage.getItem('token') as string}
    const response = await axios.get("http://localhost:3020/getCommLists", {headers})
    
    return await response.data.commLists}
    catch(error)
    {console.log(error)}
  })


const watchedListsSlice = createSlice({
    name: 'watchedLists',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
       //--createList extra-reducers
       builder.addCase(getCommLists.pending, (state) => {
      
       });
       builder.addCase(getCommLists.fulfilled, (state, action) => {
           state.commLists = action.payload
       });
       builder.addCase(getCommLists.rejected, (state, action) => {
          });
   
    
    }})


export default watchedListsSlice.reducer 
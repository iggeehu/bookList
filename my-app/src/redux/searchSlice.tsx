import {createSlice, PayloadAction, Action, AnyAction, createAsyncThunk, createAction, } from "@reduxjs/toolkit"
import { SignatureKind, StringLiteralLike } from "typescript"
import axios from 'axios'
import {store} from './store'

// ---types---


  //---end of types --//



// interface bookInfo {
//  volumeInfo: {
//    authors: string[],
//    title: string,
//    subtitle: string
//    publisher: string
//    publishedDate: string
//    description: string
//    imageLinks: 
//          {smallThumbnail: string, thumbnail:string}},
//   id: string,
//   pageCount: number,
//   industryIdentifiers: any
   
// }


export const fetchResults = createAsyncThunk
(
    "search/fetchResults", async (searchTerm: string) => {
       try {
          
          //const response = await fetch(`url`); //where you want to fetch data
          //Your Axios code part.
          const url:string = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + "&key=" + process.env.REACT_APP_MY_API_KEY
          const response = await axios.get(url);//where you want to fetch data
          // console.log(response.data.items)
          return await response.data.items;
        } catch (error) {
          console.log("api call failed")
        }
  });


export const getBook = createAsyncThunk
(
    "search/getBook", async (ID: string) => {
       try {

          const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${ID}?key=${process.env.REACT_APP_MY_API_KEY}`)
          return await response.data;

        } catch (error) {
          console.log("api call failed")
        }
  });

interface searchInterface {
    field: string
    result: any[]
    loading: 'idle' | 'loading' | 'loaded' | 'failed'
    book: object
}

const initialState: searchInterface = {
    field: "",
    result: [],
    loading:"idle",
    book: {}
}

const searchSlice = createSlice({
 name: 'search',
 initialState,
 reducers: {
     fieldChange(state, action: PayloadAction<string>)
     {
         state.field = action.payload
     },
     resetResult(state)
     {
         state.result=[]
     },
    },
     
 extraReducers: (builder) => {
        builder.addCase(fetchResults.pending, (state) => {
          state.result = [];
          state.loading = "loading";
        });
        builder.addCase(fetchResults.fulfilled, (state, action) => {
              state.result = action.payload;
              state.loading = "loaded";
        });
        builder.addCase(
            fetchResults.rejected, (state) => {
              state.loading = "failed";
              
        });
        builder.addCase(getBook.fulfilled, (state, action) => {
          state.book = action.payload;
          state.loading = "loaded";
    });
     }    
 
})

export const {fieldChange, resetResult} = searchSlice.actions

export default searchSlice.reducer 



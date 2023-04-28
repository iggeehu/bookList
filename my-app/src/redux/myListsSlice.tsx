import {
  createSlice,
  PayloadAction,
  current,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { listeners } from "process";
import { useAppDispatch } from "./store";

export enum readStatus {
  notRead = "notRead",
  reading = "reading",
  read = "read",
}
export type rating = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | null;
export type ISBNtype = "ISBN_13" | "ISBN_10";

export interface industryIdentifier {
  type: string;
  ISBNnumber: number;
}
export interface img {
  smallThumb: string;
  Thumb: string;
}
export interface listItem {
  ID: string;
  title: string;
  subtitle: string;
  publisher: string;
  publishedTime: string;
  authors: string[];
  myRating: rating;
  comment: string | null;
  description: string;
  pageCount: number;
  ISBN: any;
  image: any;
}

export interface listObject {
  listID: string;
  listTitle: string;
  listComment: string;
  listMakerID: string | null;
  listMadeTime: string;
  listFolder: string[];
  list: listItem[];
  likedBy: string[];
  collectedBy: string[];
}

export type Lists = listObject[];
type initial = {
  listNameField: string;
  listCommentField: string;
  lists: listObject[];
  addSuccessful: "idle" | "loading" | "successful" | "failed";
  createSuccessful: "idle" | "loading" | "successful" | "failed";
};

var initialState: initial = {
  listNameField: "",
  listCommentField: "",
  lists: [],
  addSuccessful: "idle",
  createSuccessful: "idle",
};

interface modifyListPayloadType {
  book: listItem;
  listID: string;
  listTitle: string;
}

interface deleteFromListPayloadType {
  bookID: string;
  listID: string;
}

interface editListData {
  listID: string;
  listTitle: string;
  listComment: string;
}

export const getLists = createAsyncThunk("myLists/getLists", async () => {
  try {
    const headers = { authorization: localStorage.getItem("token") as string };
    const response = await axios.get("http://localhost:3000/getMyLists", {
      headers,
    });
    return await response.data;
  } catch (error) {
    console.log(error);
  }
});

export const addToList = createAsyncThunk(
  "myLists/addToList",
  async (dataForAdd: modifyListPayloadType) => {
    try {
      const headers = {
        authorization: localStorage.getItem("token") as string,
      };
      const response = await axios.post(
        "http://localhost:3000/addToList",
        dataForAdd,
        { headers }
      );
      console.log("thunk called");
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteFromList = createAsyncThunk(
  "myLists/addToList",
  async (dataForDelete: deleteFromListPayloadType) => {
    try {
      const headers = {
        authorization: localStorage.getItem("token") as string,
      };
      const response = await axios.post(
        "http://localhost:3000/deleteFromList",
        dataForDelete,
        { headers }
      );
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createNewList = createAsyncThunk(
  "myLists/createNewList",
  async (listData: listObject) => {
    try {
      const headers = {
        authorization: localStorage.getItem("token") as string,
      };
      const response = await axios.post(
        "http://localhost:3000/createList",
        { data: listData },
        { headers }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteList = createAsyncThunk(
  "myLists/deleteList",
  async (listTitle: string) => {
    try {
      const headers = {
        authorization: localStorage.getItem("token") as string,
      };
      const response = await axios.post(
        "http://localhost:3000/deleteList",
        { listTitle },
        { headers }
      );
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editList = createAsyncThunk(
  "myLists/editList",
  async (changeData: editListData) => {
    try {
      const headers = {
        authorization: localStorage.getItem("token") as string,
      };
      const response = await axios.post(
        "http://localhost:3000/editList",
        { changeData },
        { headers }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const myListsSlice = createSlice({
  name: "myLists",
  initialState,
  reducers: {
    fieldChange(state, action: PayloadAction<fieldChangePayload>) {
      state[action.payload.name] = action.payload.value;
    },
    editListInfo(state, action: PayloadAction<listObject>) {},
    emptyState(state) {
      state.listNameField = "";
      state.listCommentField = "";
      state.lists = [];
    },
  },
  extraReducers: (builder) => {
    //--createList extra-reducers
    builder.addCase(createNewList.pending, (state) => {
      state.createSuccessful = "loading";
    });
    builder.addCase(createNewList.fulfilled, (state, action) => {
      state.lists = action.payload;
    });
    builder.addCase(createNewList.rejected, (state, action) => {
      state.createSuccessful = "failed";
    });

    //getList cases
    builder.addCase(getLists.pending, (state) => {
      return state;
    });
    builder.addCase(getLists.fulfilled, (state, action) => {
      state.lists = action.payload;
    });
    builder.addCase(getLists.rejected, (state) => {
      return state;
    });
    //addLists cases
    builder.addCase(addToList.pending, (state) => {});
    builder.addCase(addToList.fulfilled, (state, action) => {
      state.lists = action.payload;
    });
    builder.addCase(addToList.rejected, (state) => {});
    //delete list extrareducers
    builder.addCase(deleteList.pending, (state) => {});
    builder.addCase(deleteList.fulfilled, (state, action) => {
      state.lists = action.payload;
    });
    builder.addCase(deleteList.rejected, (state, action) => {});
    //edit list extrareducers
    builder.addCase(editList.fulfilled, (state, action) => {
      state.lists = action.payload;
    });
  },
});

export const { fieldChange, emptyState } = myListsSlice.actions;
export default myListsSlice.reducer;

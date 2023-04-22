import React, { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { BookDetails } from "./bookDetails";
import {
  listForm,
  seeDetails,
} from "./commonFn";
import { getList } from "../redux/watchedListsSlice";



export const OtherListView: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let {listID} = useParams()
  let {userID} = useParams()
  console.log(listID)
  console.log(userID)
  const reqBody = {listID, userID}
  //instead of my lists, this specific list
  useEffect(() => {
    dispatch(getList(reqBody));
  }, []);

  const state = useAppSelector((state) => state);
  console.log(state);
  const lists = state.watchedLists.lists;
 
  
 

 
  const [deleteBookDisplay, toggleDeleteBook] = useState([false, ""]);
  const [deleteDisplay, toggleDelete] = useState([false, ""]);
  const [editDisplay, toggleEdit] = useState([false, ""]);
  const [viewDisplay, toggleView] = useState(false);
  

  if (lists.length === 0) {
    return <div>Something might have happened to the list...</div>;
  } else {
    const list = lists[0];
    const listTitle = list.listTitle;

    const bookDisplay = list.list.map((book) => {
   
        let title = "";
        if (book.bookName) {
          title = book.bookName;
        }
        if (book.title) {
          title = book.title;
        }

        let author = book.authors ? book.authors : "N/A";

        if (viewDisplay) {
          return (
            <li
              key={book.ID}
              id={book.ID}
              className="bg-slate-400 shadow-md hover:bg-slate-300 rounded p-5 font-mono"
            >
              <img
                src={book.image ? book.image.thumbnail : null}
                onClick={() => seeDetails(book.ID, navigate, ":fromList")}
                alt="book image"
              ></img>
              <h4 className="font-bold">{title}</h4>
              <h5>{author}</h5>
            
            </li>
          );
        } else {
          return (
            <li
              key={book.ID}
              id={book.ID}
              className="flex flex-row bg-slate-400 list-decimal rounded shadow-lg p-1"
            >
              <p
                className="basis-2/5 pl-3 hover:underline cursor-pointer ease-in-out duration-300"
                onClick={() => seeDetails(book.ID, navigate, ":fromList")}
              >
                {title}
              </p>
              <p className="basis-2/5">{author}</p>
            </li>
          );
        }
      });

    const bookDisplayWithNoBookOption = () => {
      if (
        list.length === 0
      ) {
        return <h4>This list does not contain any books</h4>;
      } else {
        if (viewDisplay) {
          return (
            <ul className="grid grid-cols-4 gap-2 list-none p-5">
              {bookDisplay}
            </ul>
          );
        } else {
          return <ol className="grid grid-cols-1 gap-1 p-5">{bookDisplay}</ol>;
        }
      }
    };

    return (
      <div id={listID} className="p-10 flex flex-col items-center">
        <h2 className="text-2xl font-mono text-center font-bold">
          {listTitle}
        </h2>
        {/* <h3>About this list: {listComment ? listComment : "N/A"}</h3> */}

        <div className="flex flex-row">
       
          <button
            onClick={() => toggleView(!viewDisplay)}
            className="border font-mono text-md rounded bg-slate-400 hover:bg-slate-300 p-1"
          >
            List/Window View
          </button>
        </div>

  
        <div>
          {listForm(
            editDisplay,
            list,
            change,
            submitChange,
            listNameField,
            listCommentField
          )}
        </div>
        <div className="w-4/5">{bookDisplayWithNoBookOption()}</div>
      </div>
    );
  }
};

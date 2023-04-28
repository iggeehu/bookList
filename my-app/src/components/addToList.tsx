import React, { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import {
  createNewList,
  addToList,
  listObject,
  getLists,
} from "../redux/myListsSlice";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { formBookObject } from "./commonFn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "reactjs-popup/dist/index.css";
// import styles from "./css/addToList.module.css"

type propType = {
  bookId: string;
};

export const AddToList: FC<propType> = (props: propType) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef(null);
  const userID = localStorage.getItem("id");
  const addSuccessful = useAppSelector((state) => state.myLists.addSuccessful);
  const book = useAppSelector((state) =>
    state.search.result.filter((elem) => elem.id === props.bookId)
  )[0];
  const [createOrNot, toggleCreateOrNot] = useState(false);
  const myLists = props.myLists;
  const [duplicate, setDup] = useState([false, ""]);
  const [newListField, setField] = useState("");

  //actions
  const addToListInComponent = (e: React.SyntheticEvent) => {
    
    const listID = (e.target as any).id;
    const listTitle = (e.target as any).innerHTML;
    const payload = {
      book: formBookObject(book),
      listID,
      listTitle,
    };
    dispatch(addToList(payload));
  };

  const changeHandler = (e: React.SyntheticEvent) => {
    setField((e.target as any).value);
  };

  const createList = () => {
    if (newListField !== "") {
      const listData: listObject = {
        listID: uuidv4(),
        listTitle: newListField,
        listComment: "",
        listMakerID: userID,
        listMadeTime: Date(),
        listFolder: [],
        list: [],
      };
      if (
        myLists.filter((list) => list.listTitle === listData.listTitle)
          .length !== 0
      ) {
        setDup([true, listData.listTitle]);
      } else {
        dispatch(createNewList(listData));
      }
      inputRef.current.value = "";
    }
  };

  const createWithKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      createList();
    }
  };

  //components
  const createListPopUp = () => {
    if (createOrNot) {
      return (
        <div onKeyDown={createWithKey}>
          <input
            className=""
            onChange={changeHandler}
            type="text"
            placeholder="Type list name"
            ref={inputRef}
            autoFocus
          />
          <button onClick={createList} className="hover:bg-slate-500 rounded">
            <FontAwesomeIcon icon={solid("check")} />
          </button>
        </div>
      );
    }
  };

  const duplicateListWarning = () => {
    if (duplicate[0] === true) {
      return <p>You cannot create a duplicate list title {duplicate[1]}</p>;
    }
  };

  const listDisplay = myLists.map((elem) => {
    return (
      <li
        className="ease-in-out p-1 duration-300 hover:bg-slate-200 rounded-md cursor-pointer hover:font-bold"
        onClick={addToListInComponent}
        key={elem.listID}
        id={elem.listID}
      >
        {elem.listTitle}
      </li>
    );
  });

  return (
    <div className="bg-slate-400 p-3 rounded-lg transition ease-in-out">
      <div
        className="p-1 ease-in-out duration-300 hover:font-bold cursor-default"
        onClick={() => {
          toggleCreateOrNot(!createOrNot);
        }}
      >
        Create New List
      </div>
      <div className="">{createListPopUp()}</div>
      <ul className="block">
        {myLists.length !== 0 ? (
          listDisplay
        ) : (
          <li>You don't have any list yet</li>
        )}
      </ul>
      <div className="">
        {addSuccessful === "successful" ? (
          <p>The book is added to the list</p>
        ) : null}
      </div>
      <div className="">{duplicateListWarning()}</div>
    </div>
  );
};

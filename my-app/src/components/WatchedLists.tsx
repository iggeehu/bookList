import React, { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { getCommLists } from "../redux/watchedListsSlice";
import { useNavigate } from "react-router-dom";
import { Canvas } from "./Canvas";
import { listObject } from "../redux/myListsSlice";

export const WatchedLists: FC = () => {
  const auth = useAppSelector((state) => state.auth.token);
  const commLists = useAppSelector((state) => {
    return state.watchedLists.commLists;
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth === "" || auth === null) {
      navigate(`/signin`);
    } else {
      dispatch(getCommLists());
    }
  }, []);

  const redirect = (e: React.SyntheticEvent) => {
    const listID = e.target.parentElement.parentElement.id;
    const userID = e.target.id;
    console.log(userID);
    navigate(`/user/${userID}/${listID}`);
  };

  const communityLists = commLists.map((elem) => {
    return (
      <li
        key={elem.currList.listID}
        id={elem.currList.listID}
        className="flex flex-col items-center bg-slate-400 rounded p-3 list-none ease-in-out duration-150 shadow-md shadow-slate-800 hover:bg-slate-300 hover:shadow-lg"
      >
        <div className="" id="listImage">
          <Canvas listObj={elem.currList} />
        </div>
        <div className="font-mono truncate max-w-xs">
          {elem.currList.listTitle} compiled by {elem.listMakerName}
        </div>
        <div>
          <button
            id={elem.userID}
            onClick={redirect}
            className="font-mono p-1 rounded border text-sm hover:bg-slate-400 ease-in-out duration-150"
          >
            View
          </button>
        </div>
      </li>
    );
  });

  const displayList = (commLists: listObject[]) => {
    if (commLists.length === 0) {
      return <p>Please be patient, community readling lists are loading...</p>;
    } else {
      return (
        <div className="grid grid-cols-3 justify-items-center gap-5 p-5 ">
          {communityLists}
        </div>
      );
    }
  };

  return (
    <div>
      <div>{displayList(commLists)}</div>
    </div>
  );
};

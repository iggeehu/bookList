import React, { FC, useEffect} from "react";
import { useAppSelector, useAppDispatch } from '../redux/store'
import {getCommLists} from '../redux/watchedListsSlice'
import { useNavigate, } from "react-router-dom";
import { Canvas } from "./canvas";
// import styles from './css/myLists.module.css'
import { listObject } from "../redux/myListsSlice";


export const WatchedLists: FC = () => {
   const auth = useAppSelector((state)=>state.auth.token)
   const commLists = useAppSelector((state)=>{return state.watchedLists.commLists})

   const navigate=useNavigate()
   const dispatch=useAppDispatch() 

   useEffect(
      ()=>{
      if(auth===""||auth===null)
      {navigate(`/signin`)}
      else{
         dispatch(getCommLists())
      }
   }, [])
   
   const redirect = (e: React.SyntheticEvent) => {
      // const userID=e.target.parentElement.parentElement.childNodes[1].id
      const listID=e.target.parentElement.parentElement.id
      navigate(`/user/${listID}/${listID}`)} 

   const communityLists = commLists.map(elem=>{
      return (
         <li key={elem.currList.listID} id={elem.currList.listID} className={styles.eachList}>
           <div className={styles.canvas} id="listImage" ><Canvas listObj={elem.currList}/></div>
           <div id={elem.userID} className={styles.title} >{elem.currList.listTitle} compiled by {elem.listMakerName}</div>
           <div className={styles.buttons}>
              <button onClick={redirect}>View</button>
           </div>
         
         </li>
     )
   })


   const displayList = (commLists: listObject[]) => {
      if(commLists.length===0)
      {return <p>Please be patient, community readling lists are loading...</p>}
      else{
         
         return <div className={styles.myLists}>
            {communityLists}
            </div>;
      }
   }



   return <div>
      <div>{displayList(commLists)}</div>
   </div>

}
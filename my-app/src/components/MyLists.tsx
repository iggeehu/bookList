import React, { FC, useEffect, useRef} from "react";
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import myListsSlice, {createNewList, addToList, listItem, deleteList, getLists, listObject, editList, fieldChange} from '../redux/myListsSlice'
import {resetResult} from '../redux/search'
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { formBookObject } from "./commonFn";
import { useNavigate, Navigate} from "react-router-dom";
import {confirmDeleteQuestionWindow, showActionWindow, listForm} from "./commonFn"
import { Canvas } from "./Canvas";
import {SignInComponent} from './authComponents/SignIn'
import styles from './css/myLists.module.css'
import { deflateRaw } from "zlib";

export const MyLists: FC = () => {
   const auth = useAppSelector((state)=>state.auth.token)
   const myLists = useAppSelector(state=>{console.log(state); return state.myLists.lists})
   const navigate=useNavigate()
   const dispatch=useAppDispatch() 


   useEffect(
      ()=>{
      if(auth==""||auth==null)
      {navigate(`/signin`)}
      else{
         dispatch(resetResult());
         dispatch(getLists())
      }
   }, [])
  
   
 
   const [deleteDisplay, toggleDelete] = useState([false, ""])
   const [editDisplay, toggleEdit] = useState([false, ""])

   const listNameField = useAppSelector((state) => state.myLists.listNameField)
   const listCommentField = useAppSelector((state) => state.myLists.listCommentField)
   if(auth==""||auth=="null")
   {  console.log("unauthorized block is called")
      return (<SignInComponent />)}


   const redirect = (e: React.SyntheticEvent) => {
      const listID=e.target.parentElement.parentElement.id
      navigate(`/myLists/${listID}`)}
   

   const submitChange = (e: React.SyntheticEvent) => {
       e.preventDefault()
       const listID=(e.target as any).id
       const newTitle = listNameField
       const newComment = listCommentField
       const changeData={listID, listTitle: newTitle, listComment: newComment}
       dispatch(editList(changeData))
   }

   const change = (e: React.SyntheticEvent) => {
      if((e.target as any).name=='listCommentField')
      {dispatch(fieldChange({name: 'listCommentField', value: e.target.value}))}
      if((e.target as any).name=='listNameField')
      {dispatch(fieldChange({name:'listNameField', value: e.target.value}))}
   }

  
   const listDisplay = myLists.map(elem=>{
      const cancelFn = ()=> toggleDelete([false, ""])
      const deleteFn = (item: string) => dispatch(deleteList(item))
      const id=elem.listID

      return (
          <li key={elem.listID} id={elem.listID} className={styles.eachList}>
            <div className={styles.canvas} id="listImage" ><Canvas listObj={elem}/></div>
            <div className={styles.title}>{elem.listTitle}</div>
            <div className={styles.buttons}>
               <button onClick={redirect}>View</button>
               <button onClick={(e)=>showActionWindow(e, 'list', elem.listTitle, deleteDisplay, toggleDelete)}>Delete List</button>
               <button onClick={(e)=>showActionWindow(e, 'list', elem.listTitle, editDisplay, toggleEdit)}>Edit List Details</button>
            </div>
            <div className={styles.windowOne}>
               {listForm(editDisplay, elem, change, submitChange, listNameField, listCommentField)}
            </div> 
            <div className={styles.windowTwo}>
               {confirmDeleteQuestionWindow(deleteDisplay, 'list', elem.listTitle, cancelFn, deleteFn)}
            </div>
          
          </li>
      )
   })
   
   return (<div className={styles.myLists}>
      {listDisplay}
      </div>)
   

}
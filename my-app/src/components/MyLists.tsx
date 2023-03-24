import React, { FC, useEffect} from "react";
import { useAppSelector, useAppDispatch } from '../redux/store'
import {deleteList, getLists, editList, fieldChange} from '../redux/myListsSlice'
import {resetResult} from '../redux/searchSlice'
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import {confirmDeleteQuestionWindow, showActionWindow, listForm} from "./commonFn"
import { Canvas } from "./canvas";
import {SignInComponent} from './authComponents/SignIn'
// import styles from './css/myLists.module.css'


export const MyLists: FC = () => {
   const auth = useAppSelector((state)=>state.auth.token)
   const myLists = useAppSelector(state=>{return state.myLists.lists})
   const navigate=useNavigate()
   const dispatch=useAppDispatch() 


   useEffect(
      ()=>{
      if(auth===""||auth===null)
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
   if(auth===""||auth==="null")
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
      if((e.target as any).name==='listCommentField')
      {dispatch(fieldChange({name: 'listCommentField', value: e.target.value}))}
      if((e.target as any).name==='listNameField')
      {dispatch(fieldChange({name:'listNameField', value: e.target.value}))}
   }

  
   const listDisplay = myLists.map(elem=>{
      const cancelFn = ()=> toggleDelete([false, ""])
      const deleteFn = (item: string) => dispatch(deleteList(item))
      const id=elem.listID

      return (
          <li key={elem.listID} id={elem.listID} className="flex flex-col items-center bg-slate-400 rounded p-3 list-none ease-in-out duration-150 shadow-md shadow-slate-800 hover:bg-slate-300 hover:shadow-lg">
            <div className="" id="listImage" ><Canvas listObj={elem}/></div>
            <div className="font-mono truncate max-w-xs">{elem.listTitle}</div>
            <div className="">
               <button className="font-mono p-1 rounded border text-sm hover:bg-slate-400 ease-in-out duration-150" onClick={redirect}>View</button>
               <button className="font-mono p-1 rounded border text-sm hover:bg-slate-400 ease-in-out duration-150" onClick={(e)=>showActionWindow(e, 'list', elem.listTitle, deleteDisplay, toggleDelete)}>Delete</button>
               <button className="font-mono p-1 rounded border text-sm hover:bg-slate-400 ease-in-out duration-150" onClick={(e)=>showActionWindow(e, 'list', elem.listTitle, editDisplay, toggleEdit)}>Edit</button>
            </div>
            <div className="">
               {listForm(editDisplay, elem, change, submitChange, listNameField, listCommentField)}
            </div> 
            <div className="">
               {confirmDeleteQuestionWindow(deleteDisplay, 'list', elem.listTitle, cancelFn, deleteFn)}
            </div>
          
          </li>
      )
   })
   
   return (
      <div>
         <h1 className="font-mono font-bold text-3xl text-center pt-10">My Reading Lists</h1>
         <div className="grid grid-cols-3 justify-items-center gap-5 p-5 ">
         {listDisplay}
         </div>
      </div>
      )
   

}
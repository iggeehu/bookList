import React, { FC, useEffect} from "react";
import { useAppSelector, useAppDispatch } from '../redux/store'
import { deleteFromList, deleteList, getLists, editList, fieldChange} from '../redux/myListsSlice'
import { useState } from "react";
import { useParams, useNavigate, } from "react-router-dom";
import {confirmDeleteQuestionWindow, showActionWindow, listForm, seeDetails} from "./commonFn"


export const ListView: FC = () => {
   

   const dispatch=useAppDispatch()
   const navigate = useNavigate()
   
   useEffect(()=>{dispatch(getLists())}, [])
   const state=useAppSelector(state=>state)
   console.log(state)
   const myLists = useAppSelector(state=>state.myLists.lists)
   const listNameField = useAppSelector((state) => state.myLists.listNameField)
   const listCommentField = useAppSelector((state) => state.myLists.listCommentField)
   let {listID} = useParams()
   const thisList = myLists.filter(elem=>elem.listID===listID)[0]
   const listComment = thisList? thisList["listComment"]:""
   const [deleteBookDisplay, toggleDeleteBook] = useState([false,""])
   const [deleteDisplay, toggleDelete] = useState([false, ""])
   const [editDisplay, toggleEdit] = useState([false, ""])
   const [viewDisplay, toggleView] = useState(false)
   const cancelFn = ()=> toggleDelete([false, ""])
   const deleteFn = (item: string) => {dispatch(deleteList(item)); navigate(`/myLists/`)}

   if(myLists.length===0)
   {return <div>The list of books is loading</div>}

   else{
    
    const list=myLists.filter(elem=>elem.listID===listID)[0]
    const listTitle=myLists.filter(elem=>elem.listID===listID)[0].listTitle


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


    const bookDisplay = myLists.filter(list => list.listID === listID)[0].list.map(book=>{
        
        const dataForDelete = {
            bookID: book.ID,
            listID: listID }
        const deleteFn = () => dispatch(deleteFromList(dataForDelete))
        const cancelFn = ()=>toggleDeleteBook([false, ""])
        let title=""
        if(book.bookName){title = book.bookName}
        if(book.title){title=book.title}
    
       if(viewDisplay)
       {    return(
                <li key={book.ID} id={book.ID} className="bg-slate-400 hover:bg-slate-300 rounded p-5 font-mono">
                <img src={book.image?book.image.thumbnail:null} alt="book image"></img>
                <h4>{title}</h4>
                <button 
                className="border hover:bg-slate-400 rounded p-1"
                onClick = {()=>seeDetails(book.ID, navigate, ":fromList" )}>book details</button>
                <button 
                className="border hover:bg-slate-400 rounded p-1"
                onClick = {(e)=>showActionWindow(e, 'book', title, deleteBookDisplay, toggleDeleteBook)}>delete</button>
                <div>{confirmDeleteQuestionWindow(deleteBookDisplay, 'book', title, cancelFn, deleteFn)}</div>
                </li>
            )
        }
         else {
            return(
                <li key={book.ID} id={book.ID} className="flex flex-row bg-slate-400 list-decimal rounded p-3">
                    <h4 className="basis-4/5 hover:underline cursor-pointer ease-in-out duration-300" 
                    onClick = {()=>seeDetails(book.ID, navigate, ":fromList" )}>{title}</h4>
                    <button 
                    className="border hover:bg-slate-400 rounded p-1"
                    onClick = {(e)=>showActionWindow(e, 'book', title, deleteBookDisplay, toggleDeleteBook)}>delete</button>
                    <div>{confirmDeleteQuestionWindow(deleteBookDisplay, 'book', title, cancelFn, deleteFn)}</div>
                </li>
                )

       }
    })

   const bookDisplayWithNoBookOption = () =>{
    if(myLists.filter(elem=>elem.listID === listID)[0].list.length===0)
        {   return <h4>This list does not contain any books</h4>}
    else{
            if(viewDisplay)
            {return <ul className="grid grid-cols-4 gap-2 list-none p-5">{bookDisplay}</ul>}
            else{
             return <ol className="grid grid-cols-1 gap-1 p-5">{bookDisplay}</ol>
            }
        }
   }

   
   return(
        
            <div id={listID} className="p-10 flex flex-col items-center">
            <h2 className="text-2xl font-mono text-center font-bold">{listTitle}</h2>
            <h3>About this list: {listComment? listComment: "N/A"}</h3>
            
            <div className="flex flex-row">
                <button onClick={(e)=>showActionWindow(e, 'list', listTitle, deleteDisplay, toggleDelete)}
                        className="border font-mono text-md rounded bg-slate-400 hover:bg-slate-300 p-1">Delete</button>
                <button onClick={(e)=>showActionWindow(e, 'list', listTitle, editDisplay, toggleEdit)}
                        className="border font-mono text-md rounded bg-slate-400 hover:bg-slate-300 p-1">Edit</button>
                <button onClick={()=>toggleView(!viewDisplay)}
                        className="border font-mono text-md rounded bg-slate-400 hover:bg-slate-300 p-1">List/Window View</button>
            </div>

            <div>{confirmDeleteQuestionWindow(deleteDisplay, 'list', listTitle, cancelFn, deleteFn)}</div>
            <div>{listForm(editDisplay, list, change, submitChange, listNameField, listCommentField)}</div>
            <div className="w-4/5">{bookDisplayWithNoBookOption()}</div>
            </div>
         )
    }

}
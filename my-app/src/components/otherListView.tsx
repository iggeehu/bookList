import React, { FC, useEffect} from "react";
import { useAppSelector, useAppDispatch } from '../redux/store'
import {createNewList, addToList, deleteFromList, deleteList, getLists, listObject, editList, fieldChange} from '../redux/myListsSlice'
import { useState } from "react";
import { useParams, useLocation, useNavigate, } from "react-router-dom";
import { BookDetails } from "./bookDetails";
import { listeners } from "process";
import {confirmDeleteQuestionWindow, showActionWindow, listForm, seeDetails} from "./commonFn"
import styles from "./css/listView.module.css"

export const OtherListView: FC = () => {
       console.log("otherlistview")
//    const dispatch=useAppDispatch()
//    const navigate = useNavigate()
   
//    useEffect(()=>{dispatch(getLists())}, [])
//    const myLists = useAppSelector(state=>state.myLists.lists)
//    const listNameField = useAppSelector((state) => state.myLists.listNameField)
//    const listCommentField = useAppSelector((state) => state.myLists.listCommentField)

//    let {listID} = useParams()
//    const [deleteBookDisplay, toggleDeleteBook] = useState([false,""])
//    const [deleteDisplay, toggleDelete] = useState([false, ""])
//    const [editDisplay, toggleEdit] = useState([false, ""])
//    const cancelFn = ()=> toggleDelete([false, ""])
//    const deleteFn = (item: string) => {dispatch(deleteList(item)); navigate(`/myLists/`)}

//    if(myLists.length==0)
//    {return <div>The list of books is loading</div>}
// //    const books = myLists.filter(list => list.listID == listID)[0].list
//    else{
    
//     const list=myLists.filter(elem=>elem.listID==listID)[0]
//     const listTitle=myLists.filter(elem=>elem.listID==listID)[0].listTitle


//     const submitChange = (e: React.SyntheticEvent) => {
//         e.preventDefault()
//         console.log(e)
//         const listID=(e.target as any).id
//         const newTitle = listNameField
//         const newComment = listCommentField
//         const changeData={listID, listTitle: newTitle, listComment: newComment}
//         dispatch(editList(changeData))
//     }
 
//     const change = (e: React.SyntheticEvent) => {
//        console.log("change called")
//        if((e.target as any).name=='listCommentField')
//        {dispatch(fieldChange({name: 'listCommentField', value: e.target.value}))}
//        if((e.target as any).name=='listNameField')
//        {dispatch(fieldChange({name:'listNameField', value: e.target.value}))}
//        // console.log(listNameField)
//        // console.log(listCommentField)
//     }


//     const bookDisplay = myLists.filter(list => list.listID == listID)[0].list.map(book=>{
        
//         const dataForDelete = {
//             bookID: book.ID,
//             listID: listID }
//         const deleteFn = () => dispatch(deleteFromList(dataForDelete))
//         const cancelFn = ()=>toggleDeleteBook([false, ""])

//         var title
//         if(book.bookName){title = book.bookName}
//         if(book.title){title=book.title}
        
//        return(
//            <li key={book.ID} id={book.ID}>
//            <img src={book.image?book.image.thumbnail:null}></img>
//            <h4>{title}</h4>
//            <button onClick = {()=>seeDetails(book.ID, navigate, ":fromList" )}>book details</button>
//            <button onClick = {(e)=>showActionWindow(e, 'book', title, deleteBookDisplay, toggleDeleteBook)}>delete from list</button>
//            <div>{confirmDeleteQuestionWindow(deleteBookDisplay, 'book', title, cancelFn, deleteFn)}</div>
//            </li>
//     )})

//    const bookDisplayWithNoBookOption = () =>{
//     if(myLists.filter(elem=>elem.listID == listID)[0].list.length==0)
//     {   return <h4>This list does not contain any books</h4>}
//         else{return <div className={styles.listOfBooks}>{bookDisplay}</div>}
//    }

   

  

//    return(
//             //  <div>{bookDisplayWithNoBookOption()}</div>
//             <div id={listID} className={styles.listView}>
//             <h2>{listTitle}</h2>
//             <h3>About this list: {myLists.filter(elem=>elem.listID==listID)[0].listComment}</h3>
            
//             <button onClick={(e)=>showActionWindow(e, 'list', listTitle, deleteDisplay, toggleDelete)}>Delete List</button>
//             <button onClick={(e)=>showActionWindow(e, 'list', listTitle, editDisplay, toggleEdit)}>Edit List Details</button>
//             {/* <div>{listForm(editDisplay, myLists.filter(elem=>elem.listID==listID)[0], change, submitChange, listNameField, listCommentField)}</div>
//            */}
//             <div>{confirmDeleteQuestionWindow(deleteDisplay, 'list', listTitle, cancelFn, deleteFn)}</div>
//             <div>{listForm(editDisplay, list, change, submitChange, listNameField, listCommentField)}</div>
//             <div>{bookDisplayWithNoBookOption()}</div>
//             </div>
//          )
//     }

    return <div>heyyyyy</div>

}
import React, { FC, useEffect} from "react";
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import {createNewList, addToList, listItem, listObject, getLists} from '../redux/myListsSlice'
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { formBookObject } from "./commonFn";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import 'reactjs-popup/dist/index.css';
import { createListenerEntry } from "@reduxjs/toolkit/dist/listenerMiddleware";
import styles from "./css/addToList.module.css"

type propType = {
    bookId: string
}

export const AddToList: FC<propType> = (props:propType) => {

const dispatch=useAppDispatch()
const [createListClicked, setCLC] = useState(0)
const userID=localStorage.getItem("id")
const addSuccessful=useAppSelector(state=>state.myLists.addSuccessful)
const book = useAppSelector(state => state.search.result.filter(elem=>elem.id==props.bookId))[0]
const [createOrNot, toggleCreateOrNot]= useState(false)
const myLists=useAppSelector((state)=>state.myLists.lists)
const [duplicate, setDup]=useState([false, ""])

const addToListInComponent=(e:React.SyntheticEvent)=>{

    const listID = (e.target as any).parentElement.id
    const listTitle = (e.target as any).innerHTML

    const payload = {
        book: formBookObject(book),
        listID,
        listTitle}
    dispatch(addToList(payload))}
    

 const listDisplay = myLists.map(elem=>{
     return (
         <li className={styles.singleList} key={elem.listID} id={elem.listID}>
            <div onClick={addToListInComponent} className={styles.listTitle}>{elem.listTitle}</div>
         </li>
     )
    })    


 const CreateListPopUp = () => {
     if(createOrNot){
         return(
            <form onSubmit={createList}>
            <input className={styles.createListInput} type='text' placeholder='Type list name' />
            <button type='submit'><FontAwesomeIcon icon={solid('check')} /></button>
            </form>
         )}};

 const duplicateListWarning = () => {
     if(duplicate[0] == true)
     {
         return(<p>You cannot create a duplicate list title {duplicate[1]}</p>)
     }
 }

const createList = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log((e.target as any)[0].value)
    const listData: listObject=
        {listID: uuidv4(),
        listTitle: (e.target as any)[0].value,
        listComment: "",
        listMakerID: userID,
        listMadeTime: Date(),
        listFolder: [],
        list: []}
    if (myLists.filter(list=>list.listTitle==listData.listTitle).length!=0)
    {setDup([true, listData.listTitle])}
    else{
    dispatch(createNewList(listData))}
}
 
    useEffect(()=>{dispatch(getLists())}, [])
 
return (
    <div className={styles.addToList}>
         <button className = {styles.button} onClick={()=>{console.log("created");toggleCreateOrNot(!createOrNot)}}>Create New List</button>
            <div className={styles.createList}>{CreateListPopUp()}</div>
            <ul className={styles.listOfLists}>{myLists.length!=0? listDisplay: <li>You don't have any list yet</li>}</ul>
            <div className={styles.successful}>{addSuccessful=='successful'? <p>The book is added to the list</p>:null}</div>
            <div className={styles.duplicateWarning}>{duplicateListWarning()}</div>
    </div>

)

}
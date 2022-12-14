import { ObjectTypeDeclaration } from "typescript"
import { listItem } from "../redux/myListsSlice"
import { listObject } from "../redux/myListsSlice"
import { useNavigate } from "react-router-dom"
import styles from "./css/commonFn.module.css"
        



export const formBookObject=(book:any)=>
{const id=book.id
    const imgLink = book.volumeInfo.imageLinks
    const title=book.volumeInfo.title
    const subtitle = book.volumeInfo.subtitle
    const authors = book.volumeInfo.authors
    const publisher = book.volumeInfo.publisher
    const publishedTime=book.volumeInfo.publishedDate
    const description = book.volumeInfo.description
    const pageCount = book.volumeInfo.pageCount
    const ISBN = book.volumeInfo.industryIdentifiers
    const bookItem: listItem = {
        ID: id,
        title,
        subtitle,
        publisher,
        publishedTime,
        authors,
        myRating: null,
        comment: null,
        description,
        pageCount,
        ISBN,
        image: imgLink
    }
    return bookItem}

export const showActionWindow = (e: React.SyntheticEvent, type:string, title:string, displayState:any[], toggleDisplay:React.Dispatch<React.SetStateAction<(string | boolean)[]>>) =>
{ 
    if(displayState[0]==false)
            {toggleDisplay([true, title])}
        else{
                toggleDisplay([false, ""])
                if(displayState[1]!=title)
                {toggleDisplay([true, title])}
        }
}

export const confirmDeleteQuestionWindow = (condition: any, deleteType: string, title:string, cancelFn: Function, deleteFn: Function) =>{
if(condition[0] && condition[1] == title)
{
    return(
    <div>
    <p>Are you sure you want to delete the {deleteType} "{title}" ?</p>
    <button onClick={()=>deleteFn(title)}>confirm delete</button>
    <button onClick={()=>{cancelFn()}}>I'll think about it</button>
    </div>
    )
}}


export const listForm = (condition: any, list:listObject, changeFunc: Function, actionFunc: Function, value1, value2) => {

if(condition[0] && condition[1] == list.listTitle)
return(
    <form id={list.listID} onSubmit={actionFunc} className={styles.listForm}>
            <div className={styles.listName}>
            <label>List Name</label>
            <input className={styles.input} onChange={changeFunc} type='text' name='listNameField' value={value1} placeholder={list.listTitle}></input>
            </div>

            <div className={styles.listComment}>
            <label>List Comment</label>
            <input className={styles.input} onChange={changeFunc} type='text' name='listCommentField' value={value2} placeholder={list.listComment}></input>
            </div>

            <button className={styles.button} type='submit'>Submit</button>
    </form>
)}  
    
export const convertCamelToNormal = (word: string) => {
    function isUpperCase(str: string) {
        return str == str.toUpperCase() && str != str.toLowerCase();
    }
    const indexes: number[] = []
    const argArray: string[] = word.split("")
    for(let i = 0; i<word.length; i++)
    {
        if(i==0)
        {argArray[i]=argArray[i].toUpperCase()}
        else if(isUpperCase(argArray[i]))
        { 
          indexes.push(i)}
    }
    var amountToAdd=0
    console.log(indexes)
    for(let i=0; i<indexes.length; i++)
    {
        
        indexes[i]=indexes[i]+amountToAdd
        amountToAdd ++;
    }
    console.log(indexes)
   for(let i=0; i<indexes.length; i++)
   {
       argArray.splice(indexes[i], 0, " ")
   }
   return argArray.join("")
}

export const turnVarToString = (variableObj: object)=> {
    console.log(Object.keys(variableObj)[0])
    return Object.keys(variableObj)[0]
}

export const seeDetails = (id: string, navigate, searchOrList:":fromSearch"|":fromList") =>{
    
    navigate(`/bookDetails/${id}/${searchOrList}`)
    
}
import React, { FC } from "react";
import { useAppSelector, useAppDispatch } from '../redux/store'
import {fieldChange} from '../redux/searchSlice'
import {fetchResults} from '../redux/searchSlice'
import { getLists } from "../redux/myListsSlice";
import { NewActivity } from "./NewActivity";
import {ButtonRendering} from "./buttonRendering"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
// import styles from "./css/home.module.css"
import {seeDetails} from "./commonFn"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const Home: FC = () => {
    useEffect(()=>{dispatch(getLists())}, [])
    const dispatch = useAppDispatch()
    const field = useAppSelector((state) => state.search.field)
    const myLists = useAppSelector((state)=>state.myLists.lists) 
    const navigate = useNavigate();
    const result = useAppSelector((state) => state.search.result)
    console.log(myLists)
  
    //actions
    const change:React.ChangeEventHandler<HTMLInputElement>=(e)=>{
        dispatch(fieldChange(e.target.value))
    }

    const search = () => {
        dispatch(fetchResults(field))
    }

    const keySearch = (event) => {
        if(event.key === 'Enter'){
            search()
        }
    }
 
    //components
    const booklist = () => result.map(elem=>{  
        return(
            
        <li className="grid grid-cols-4 min-h-96 rounded-md transition ease-in-out hover:bg-slate-400 border-slate-50 p-2" key={elem.id}> 
            <div className="" onClick = {()=>seeDetails(elem.id, navigate, ":fromSearch")}><img className="" src={elem.volumeInfo.imageLinks?elem.volumeInfo.imageLinks.smallThumbnail:undefined} alt={elem.volumeInfo.title} />
            </div>
            <p className="" onClick = {()=>seeDetails(elem.id, navigate, ":fromSearch")}>{elem.volumeInfo.title}{elem.volumeInfo.subtitle? ":"+elem.volumeInfo.subtitle:""}</p>
            <p className="">Authors: {elem.volumeInfo.authors}{elem.volumeInfo.authors? ":"+elem.volumeInfo.authors:""}</p>
            <div className=""><ButtonRendering className="" idElem={elem.id} myLists={myLists}/></div>
            
        </li>     
        )})

    const displayList = () => {
            
            if(result===undefined)
            {return(<div className="">Can't find any title matching the keywords.</div>)}
            else if(result.length!==0)
            {   
                return(
            
            <ol className="">
                <li className="grid grid-cols-4 py-5 font-bold"> 
                <p> Image</p>
                <p className="">Title</p>
                <p className="">Authors</p>
                <p className="">Options</p>
                </li> 
                {booklist()}
            </ol>)
        } 
    }
    
    

   return (
   <div className="flex bg-inherit h-full justify-center p-10 h-auto" onKeyDown={keySearch}>
        <div className="displayList">
            <div className="flex flex-col justify-center w-full">
                <h2 className="font-mono">Type in the name or author of the book:</h2>
                <div className="flex p-3">
                    <input autoFocus className="bg-gray-50 w-4/5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={change} type="text" value = {field} placeholder="Search.." />
                    <button className="p-2 bg-inherit rounded hover:bg-gray-200" onClick={search}><FontAwesomeIcon size="lg" beat icon={solid('magnifying-glass')} /></button>
                </div>
            </div>
            <div className="">{displayList()}</div>
        </div>
        {/* <div className="{styles.newActivity}"><NewActivity /></div> */}
   </div>)

}
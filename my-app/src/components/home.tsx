import React, { FC, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import {fieldChange} from '../redux/search'
import {fetchResults} from '../redux/search'
import { NewActivity } from "./NewActivity";
import {ButtonRendering} from "./buttonRendering"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import styles from "./css/home.module.css"
import {seeDetails} from "./commonFn"
import { useNavigate, useLocation } from "react-router-dom";


export const Home: FC = () => {
    const dispatch = useAppDispatch()
    const field = useAppSelector((state) => state.search.field)
    const result = useAppSelector((state) => state.search.result)
    const auth = useAppSelector((state)=>state.auth.token)
    const navigate = useNavigate();
    const {pathname} = useLocation()
    
    const change:React.ChangeEventHandler<HTMLInputElement>=(e)=>{
        dispatch(fieldChange(e.target.value))
    }
    const search = () => {
        dispatch(fetchResults(field))
    }
 
    const booklist = () => result.map(elem=>{  
        return(
            
        <li className={styles.book} key={elem.id}> 
            <div className={styles.image} onClick = {()=>seeDetails(elem.id, navigate, ":fromSearch")}><img className={styles.imageArea} src={elem.volumeInfo.imageLinks?elem.volumeInfo.imageLinks.smallThumbnail:undefined} alt={elem.volumeInfo.title} />
            </div>
            <p className={styles.title} onClick = {()=>seeDetails(elem.id, navigate, ":fromSearch")}>Title: {elem.volumeInfo.title}{elem.volumeInfo.subtitle? ":"+elem.volumeInfo.subtitle:""}</p>
            <p className={styles.author}>Authors: {elem.volumeInfo.authors}{elem.volumeInfo.authors? ":"+elem.volumeInfo.authors:""}</p>
            <div className={styles.buttons}><ButtonRendering className={styles.buttonRendering} idElem={elem.id}/></div>
            
        </li>     
        )})

    const displayList = () => {
            
            if(result==undefined)
            {return(<div className={styles.cantFind}>Can't find any title matching the keywords.</div>)}
            else if(result.length!=0)
            {   
                return(
            
            <ol className={styles.displayOl}>
                <li className={styles.book}> 
                <p>Image</p>
                <p className={styles.titleHead}>Title</p>
                <p className={styles.authorHead}>Authors</p>
                <p className={styles.buttons}>Options</p>
                </li> 
                {booklist()}
            </ol>)
        } 
    }
    
    

   return (
   <div className={styles.homepage}>
        <div className={styles.search}>
            <div className={styles.searchBar}>
                <h2>Type in the name or author of the book:</h2>
                <input className={styles.input} onChange={change} type="text" value = {field} placeholder="Search.." />
                <button className={styles.searchButton} onClick={search}><FontAwesomeIcon size="lg" beat icon={solid('magnifying-glass')} /></button>
            </div>
            <div className={styles.displayList}>{displayList()}</div>
        </div>
        <div className={styles.newActivity}><NewActivity /></div>
   </div>)

}
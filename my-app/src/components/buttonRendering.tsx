import { FC, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {AddToList} from './addToList'
import {useAppDispatch, useAppSelector} from "../redux/hooks"
import {getLists} from '../redux/myListsSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import styles from "./css/buttonRendering.module.css"
import { Link } from "react-router-dom";
import {seeDetails} from "./commonFn"

type props = {
   
   idElem: string
   
}

export const ButtonRendering: FC<props> = (props) => {
    const myLists=useAppSelector((state)=>state.myLists)
    const dispatch=useAppDispatch();
    const auth = useAppSelector(state=>state.auth.token);
    let navigate = useNavigate()

    

    const [toggleDisplay, setToggle] = useState(false);
    
    const dropDownOfLists = () => {
          if(auth==null||auth=="")
          {
            return <div>Please <Link to='/signup'>sign up</Link> to see your lists</div>
          }
          else{return <AddToList bookId={props.idElem} />}}
            
          

    return(
        <div className={styles.buttonRendering} onMouseLeave = {()=>{setToggle(!toggleDisplay)}}>
            <button onClick = {()=>seeDetails(props.idElem, navigate, ":fromSearch")}><FontAwesomeIcon icon={solid('magnifying-glass')} /></button>
            <div onMouseEnter = {()=>{setToggle(!toggleDisplay)}} >
                <button><FontAwesomeIcon icon={solid('plus')} /></button>
            </div>
            <div className={styles.AddToList}>{toggleDisplay? dropDownOfLists():""}</div>
            
        </div>
    )

}
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {AddToList} from './addToList'
import {useAppSelector} from "../redux/store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import styles from "./css/buttonRendering.module.css"
import { Link } from "react-router-dom";
import {seeDetails} from "./commonFn"

type props = {
   idElem: string
   myLists: Array<any>
}

export const ButtonRendering: FC<props> = (props) => {
    let navigate = useNavigate()
    const auth = useAppSelector(state=>state.auth.token);
    const myLists = props.myLists
    const [toggleDisplay, setToggle] = useState(false);
    
    const dropDownOfLists = () => {
          if(auth===null||auth==="")
          {
            return <div>Please <Link to='/signup'>sign up</Link> to see your lists</div>
          }
          else{return <AddToList bookId={props.idElem} myLists={myLists} />}}
             

    return(
        <div className="h-full" onMouseLeave = {()=>{setToggle(false)}}>

                <button className="m-auto ease-in-out hover:bg-slate-500" onClick = {()=>seeDetails(props.idElem, navigate, ":fromSearch")}>
                    <FontAwesomeIcon icon={solid('magnifying-glass')} border size="lg"/>
                </button>

                <div className="">
                    <button onMouseEnter = {()=>{setToggle(true)}} className="m-auto ease-in-out hover:bg-slate-500" >
                        <FontAwesomeIcon icon={solid('plus')} border size="lg"/>
                    </button>
                    <div className="inline absolute mt-10 p-2">{toggleDisplay? dropDownOfLists():""}</div>
                </div>
        </div>
    )

}
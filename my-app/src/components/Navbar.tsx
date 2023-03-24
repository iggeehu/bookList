import React, {FC} from "react";
import { AuthHeader } from "./authHeader";
import { Link } from "react-router-dom";
import { Profile } from "./Profile";
import { useAppSelector, useAppDispatch } from '../redux/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
// import styles from "./css/navbar.module.css"
import { SigninRedirect } from "./authComponents/signinRedirect";
import { useNavigate } from "react-router-dom";

export const Navbar: FC = () => {
    const navigate = useNavigate();
    const userName=useAppSelector((state)=>state.profile.currentProfile.userName)

    return (<div className="lg:h-20 md:h-25 sm:h-30 bg-slate-400 flex flex-row items-center px-8 overflow-scroll shadow-2xl font-kanit font-extra-bold">
          <div className="basis-4/5 flex flex-row justify-start items-end space-x-4">
            <div className="text-2xl" onClick={()=>{navigate('/')}} >BookList  <div className="sm: hidden">- Your Reading Home</div></div>
            <div className="hover:underline decoration-1" id=""><Link to='/'><h2>Home</h2></Link></div>
            <div className="hover:underline decoration-1" id=""><Link to='/mylists'><h2 className="drop-shadow-lg">My Lists</h2></Link></div>
            <div className="hover:underline decoration-1" id=""><Link to='/watchedlists'><h2>Collected Lists</h2></Link></div>
            <div className="hover:underline decoration-1 " id=""><Link to='/watchedlists'><h2>Reading rooms</h2></Link></div>
        
          </div>

          <div className="basis-1/5 sm: basis-2/5 flex flex-row justify-end space-x-4">
            <div className="" id=""><Link to='/profile'><FontAwesomeIcon icon={solid('user')} />{userName}</Link></div>
            <div className="" id=""><AuthHeader /></div>
          </div>
          
          <div className="md:hidden flex items-center">
              <button className="outline-none mobile-menu-button">
                <svg
                  className="w-6 h-6 text-gray-500"
                  x-show="!showMenu"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
		            </svg>
            </button>
          </div>
       

        </div>)
 
 }
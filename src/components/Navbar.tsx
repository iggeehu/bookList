import React, {FC} from "react";
import { AuthHeader } from "./authHeader";
import { Link } from "react-router-dom";
import { Profile } from "./Profile";
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import styles from "./css/navbar.module.css"
import { SigninRedirect } from "./authComponents/signinRedirect";
import { useNavigate } from "react-router-dom";

export const Navbar: FC = () => {
    const navigate = useNavigate();
    const userName=useAppSelector((state)=>state.profile.currentProfile.userName)

    return (<div className={styles.navBarDiv}>
         <div onClick={()=>{navigate('/')}}className={styles.navBarHeader}>BookList - Home for your reading lists</div>
     
         
          <div className={styles.leftMenu}>
          <div className={styles.leftItem} id={styles.navHome}><Link to='/'><FontAwesomeIcon icon={solid('house')} />Home</Link></div>
          <div className={styles.leftItem} id={styles.myLists}><Link to='/mylists'>My Lists</Link></div>
          <div className={styles.leftItem} id={styles.collectedLists}><Link to='/watchedlists'>Collected Lists</Link></div>
          </div>

          <div className={styles.rightMenu}>
          <div className={styles.rightItem} id={styles.authHeader}><AuthHeader /></div>
          <div className={styles.rightItem} id={styles.profile}><Link to='/profile'><FontAwesomeIcon icon={solid('user')} />{userName}</Link></div>
          </div>
       

    </div>)
 
 }
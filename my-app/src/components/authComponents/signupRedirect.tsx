import { useLocation } from "react-router-dom"
import React, {FC, useEffect} from "react";
import { useAppSelector, useAppDispatch } from '../../redux/store'


export const SignupRedirect: FC = () => {
    const signUpStatus = useAppSelector(state=>state.auth.signUpStatus)
    const msg = useAppSelector(state=>state.auth.confirmEmailMsg)
    
   
    const location=useLocation()
    const [state, updateState] = React.useState(0);
    useEffect(()=>{console.log('useEffect called'); {updateState(state+1)}}, [signUpStatus])

    if(signUpStatus=='loading'||signUpStatus=='idle')
    {   
        return (<div>Sign-up in process...</div>)
    }
    if(signUpStatus=='success')
    {   
        return(
        <div>Sign-up is successful and an email has been sent to your email {location.state.email}
        <div>{msg}</div>
        </div>
    )}
    return(<div>Signup redirect page</div>)
}
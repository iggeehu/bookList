import React, {FC} from "react";
import { useAppSelector, useAppDispatch } from '../../redux/store'
import { Navigate, useNavigate } from "react-router-dom";
import { signUp} from "../../redux/authSlice";


 export const SignUpComponent: FC = () => {
    const navigate=useNavigate();
    const dispatch = useAppDispatch()
    const signUpStatus = useAppSelector(state=>state.auth.signUpStatus)
    const auth = useAppSelector(state=>state.auth.token)
    console.log(signUpStatus)

    const toSignin = () => {
         navigate(`/signin`)
    }
    
    
    const reduxSignUp=(e: React.SyntheticEvent)=>{
        e.preventDefault()
        

        const target=e.target as any
        const data = {
        email: target[1].value,
        password: target[3].value ,
        confirmpassword: target[5].value}
        dispatch(signUp(data))
        
            navigate(`/signupRedirect`,{state:{email: data.email}})
    }
       

    return (<div>
        <h2>Sign up to Booklist</h2>
        <form onSubmit={reduxSignUp}>
        <fieldset>
            <label>Your Email:</label>
            <input type='text' name='email' />
        </fieldset>
        <fieldset>
            <label>Password:</label>
            <input type='password' name='password' />
        </fieldset>
        <fieldset>
            <label>Confirm Password:</label>
            <input type='password' name='password' />
        </fieldset>
        <button type='submit'>Sign Up</button>
        </form>
        <h3>Already have an account? Click <button onClick={toSignin}>here</button> to sign in.</h3>

    </div>)
 }
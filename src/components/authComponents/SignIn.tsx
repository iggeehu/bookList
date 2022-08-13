import React, {FC} from "react";
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { Navigate, useNavigate } from "react-router-dom";
import { signIn } from "../../redux/authSlice";

export const SignInComponent: FC = () => {
    const navigate=useNavigate();
    const toSignUp = () => {
         navigate(`/signup`)
    }
    const signInStatus = useAppSelector(state=>state.auth.signInStatus)
    const auth = useAppSelector(state=>state.auth)

    const dispatch = useAppDispatch()
    const reduxSignIn = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const target=e.target as any
        const data = {
        email: target[1].value,
        password: target[3].value}
        dispatch(signIn(data))

        navigate(`/signInRedirect`)
    }

    return (<div>
        <h2>Sign in to Booklist</h2>
        <form onSubmit={reduxSignIn}>
        <fieldset>
            <label>Your Email:</label>
            <input type='text' name='email' />
        </fieldset>
        <fieldset>
            <label>Password:</label>
            <input type='password' name='password' />
        </fieldset>
        <button type='submit'>Sign In</button>
        </form>
        <h3>Don't have an account? Click <button onClick={toSignUp}>here</button> to create new account.</h3>

    </div>)
 }
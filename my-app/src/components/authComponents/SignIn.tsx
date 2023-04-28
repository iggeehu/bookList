import React, { FC } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { Navigate, useNavigate } from "react-router-dom";
import { signIn } from "../../redux/authSlice";

export const SignInComponent: FC = () => {
  const navigate = useNavigate();
  const toSignUp = () => {
    navigate(`/signup`);
  };
  const signInStatus = useAppSelector((state) => state.auth.signInStatus);
  const auth = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const reduxSignIn = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as any;
    const data = {
      email: target[1].value,
      password: target[3].value,
    };
    dispatch(signIn(data));

    navigate(`/signInRedirect`);
  };

  return (
    <div className="p-20 grid justify-items-center">
      <h2 className="text-bold text-3xl p-10">Sign in to Booklist</h2>
      <form className="grid justify-items-center"  onSubmit={reduxSignIn}>
        <fieldset className="p-4" >
          <label className="px-2">Your Email:</label>
          <input className="rounded hover:border" type="text" name="email" autoFocus/>
        </fieldset>
        <fieldset className="p-4" >
          <label className='px-2'>Password:</label>
          <input className="rounded hover:border" type="password" name="password" />
        </fieldset>
        <button type="submit" className="border font-mono text-md rounded bg-slate-400 hover:bg-slate-300 p-1"  >Sign In</button>
      </form>
      <h3>
        Don't have an account? Click <button className="border font-mono text-md rounded bg-slate-400 hover:bg-slate-300 p-1"  onClick={toSignUp}>here</button> to
        create new account.
      </h3>
    </div>
  );
};

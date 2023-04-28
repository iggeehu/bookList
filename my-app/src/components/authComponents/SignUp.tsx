import React, { FC } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { Navigate, useNavigate } from "react-router-dom";
import { signUp } from "../../redux/authSlice";

export const SignUpComponent: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signUpStatus = useAppSelector((state) => state.auth.signUpStatus);
  const auth = useAppSelector((state) => state.auth.token);
  const passwordDontMatch = useAppSelector((state) => state.auth.passwordDontMatch);
  console.log(passwordDontMatch);

  const toSignin = () => {
    navigate(`/signin`);
  };

  const reduxSignUp = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as any;
    const data = {
      email: target[1].value,
      password: target[3].value,
      confirmpassword: target[5].value,
    };
    dispatch(signUp(data));

    if(state.passwordDontMatch==false)
    {
    navigate(`/signupRedirect`, { state: { email: data.email } });
    }
  }

  const PasswordMatchWarning = () => {
    if(passwordDontMatch)
    {return <div className="text-red-500">Your passwords don't match, please try again</div>}
  }

  return (
    <div className="p-20 grid justify-items-center">
      <h2 className="text-bold text-3xl p-10">Sign up to Booklist</h2>
      <form className="grid justify-items-center" onSubmit={reduxSignUp}>
        <fieldset className="p-4">
          <label className="px-2">Your Email:</label>
          <input className="rounded hover:border" type="text" name="email" autoFocus/>
        </fieldset>
        <fieldset className="p-4">
          <label className="px-2">Password:</label>
          <input className="rounded hover:border" type="password" name="password" />
        </fieldset>
        <fieldset className="p-4">
          <label className="px-2">Confirm Password:</label>
          <input className="rounded hover:border" type="password" name="password" />
        </fieldset>
        <div>
          <button type="submit" className="border font-mono text-md rounded bg-slate-400 hover:bg-slate-300 p-1">Sign Up</button>
        </div>
        <div>{PasswordMatchWarning()}</div>
      </form>
      <h3>
        Already have an account? Click 
        <button  className="border font-mono text-md rounded bg-slate-400 hover:bg-slate-300 p-1" onClick={toSignin}>here</button>{" "}
        to sign in.
      </h3>
    </div>
  );
};

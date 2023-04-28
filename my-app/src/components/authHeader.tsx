import { FC } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { Link } from "react-router-dom";
import { signOut } from "../redux/authSlice";
import { emptyState } from "../redux/myListsSlice";
import { useNavigate } from "react-router-dom";

export const AuthHeader: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth.token);
  //    const signUpStatus = useAppSelector((state)=>state.auth.signUpStatus)
  const signOutInComponent = () => {
    dispatch(signOut());
    dispatch(emptyState());
    navigate(`/`);
  };

  if (auth === "undefined" || auth === "" || auth === null) {
    return (
      <div>
        <Link to="/signin">sign in </Link>
        <Link to="/signup">sign up</Link>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={signOutInComponent}>sign out</button>
      </div>
    );
  }
};

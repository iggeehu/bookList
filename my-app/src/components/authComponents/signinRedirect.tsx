import { useLocation } from "react-router-dom";
import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/store";

export const SigninRedirect: FC = () => {
  const navigate = useNavigate();
  const signInStatus = useAppSelector((state) => state.auth.signInStatus);
  const auth = useAppSelector((state) => state.auth.token);
  console.log(signInStatus);
  console.log(auth);
  const location = useLocation();
  const [state, updateState] = React.useState(0);
  useEffect(() => {
    console.log("useEffect called");
    {
      updateState(state + 1);
    }
  }, [signInStatus]);

  if (signInStatus == "loading") {
    return <div>Sign-in in process...</div>;
  }
  if (signInStatus == "account is not activated.") {
    return (
      <div>
        Your account is not activated. Please click the link on the email sent
        to you to activate your account.
      </div>
    );
  }
  if (signInStatus == "success" || signInStatus == "idle") {
    navigate(`/`);
  }
  return <div>Signin redirect page</div>;
};

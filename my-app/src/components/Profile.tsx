import React, {
  FC,
  ReactEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import {
  getProfile,
  getPfp,
  updateProfile,
  updatePfp,
  uploadPfp,
} from "../redux/profileSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import FormData from "form-data";

export const Profile: FC = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth.token);
  const profile = useAppSelector((state) => state.profile.currentProfile);
  const updateStatus = useAppSelector(
    (state) => state.profile.profileUpdateStatus
  );
  const dispatch = useAppDispatch();
  const [editStatus, toggle] = useState(false);
  const [pendingDisplayBool, togglePending] = useState(false);
  const [pfpSubmitCount, togglePfpSubmit] = useState(0);
  const [updateSuccessBool, toggleSuccess] = useState(false);
  const [whichTypeEdit, toggleType] = useState("none");
  const [imageHolder, changeImage] = useState("");
  const [state, editState] = useState({
    userName: "",
    age: 30,
    gender: "",
    followedBy: [],
    following: [],
    aboutMe: "",
  });

  useEffect(() => {
    if (auth == "" || auth == null) {
      navigate(`/signin`);
    } else {
      dispatch(getProfile());
    }
  }, []);

  useEffect(() => {
    console.log("useEffect w pfpSubmitCount called");
    dispatch(getProfile());
  }, [pfpSubmitCount]);

  useEffect(() => {
    dispatch(getProfile());
    if (updateStatus == "pending") {
      console.log("togglepending true");
      togglePending(true);
    }
    if (updateStatus == "success") {
      togglePending(false);
      toggle(false);
      toggleSuccess(true);
      setTimeout(() => {
        toggleSuccess(false);
        console.log("timeout running");
      }, 5000);
    }
    console.log(updateStatus);
  }, [updateStatus]);

  const imageHandler = (e: SyntheticEvent) => {
    console.log(e);
    if ((e.target as any).name == "pfpUpload") {
      const file = (e.target as any).files[0];
      let form = new FormData();
      form.append("pfpUpload", file);
      changeImage(form);
    }

    if ((e.target as any).name == "pfpUrl") {
      const url = (e.target as any).value;
      changeImage(url);
    }
  };

  const submitPfp = (e: SyntheticEvent) => {
    e.preventDefault();
    togglePfpSubmit(pfpSubmitCount + 1);
    console.log(pfpSubmitCount);
    const type = (e.target as any).name
      ? (e.target as any).name
      : e.target[0].name;
    console.log(type);

    const data = { type, payload: imageHolder };
    if (type == "pfpUrlSubmit") {
      dispatch(updatePfp(data));
    }
    if (type == "pfpUpload") {
      console.log(imageHolder);
      dispatch(uploadPfp(data.payload));
    }
  };

  const editProfileDisplay = () => {
    if (whichTypeEdit == "url") {
      return (
        <div>
          <input
            type="text"
            name="pfpUrl"
            onChange={imageHandler}
            placeholder="profile URL"
          />
          <button name="pfpUrlSubmit" onClick={submitPfp}>
            Save
          </button>
        </div>
      );
    }
    if (whichTypeEdit == "upload") {
      return (
        <div>
          <form onSubmit={submitPfp} encType="multipart/form-data">
            <input
              type="file"
              onChange={imageHandler}
              id="img"
              name="pfpUpload"
              accept="image/*"
            ></input>
            <button type="submit" name="pfpUploadSubmit">
              Save
            </button>
          </form>
        </div>
      );
    }
  };

  const pfpDisplay = () => {
    return (
      <div className="profilePic">
        <div className="my-2">
          <img
            src={profile.imageSrc}
            className="border rounded"
            width="120"
            height="100"
          />
        </div>
        <FontAwesomeIcon
          onClick={() => {
            if (whichTypeEdit != "none") {
              toggleType("none");
            } else {
              toggleType("upload");
            }
          }}
          icon={solid("upload")}
          className="p-2 rounded border text-sm hover:bg-slate-400 ease-in-out duration-150"
        />
        <FontAwesomeIcon
          onClick={() => {
            if (whichTypeEdit != "none") {
              toggleType("none");
            } else {
              toggleType("url");
            }
          }}
          icon={solid("paperclip")}
          className="p-2 rounded border text-sm hover:bg-slate-400 ease-in-out duration-150"
        />
        <div>{editProfileDisplay()}</div>
      </div>
    );
  };

  const changeHandler = (e: SyntheticEvent) => {
    editState({ ...state, [(e.target as any).name]: (e.target as any).value });
  };

  const submitUpdate = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateProfile(state));

    // if(updateStatus=="success")
    // {   togglePending(false);
    //     toggle(false);}
    // if(updateStatus=="failed")
  };

  const updateStatusDisplay = () => {
    if (pendingDisplayBool == true) {
      return <div>Your profile is being updated...</div>;
    }
  };

  const updateSuccessDisplay = () => {
    if (updateSuccessBool == true) {
      return <div>Your profile has been updated</div>;
    }
  };

  const display = () => {
    if (editStatus) {
      return (
        <div className="p-10">
          <p className="px-8 font-mono font-bold text-3xl">
            {profile.userName ? profile.userName + "'s profile" : "My Profile"}{" "}
          </p>
          <form className="p-10 grid grid-cols-4" onSubmit={submitUpdate}>
            <div className="p-5 col-span-1">{pfpDisplay()}</div>

            <div className="p-5 col-span-3">
              <label>Username:</label>
              <input
                type="text"
                name="userName"
                value={state.userName}
                onChange={changeHandler}
              />
              <br />
              <label>Age:</label>
              <input
                type="text"
                name="age"
                value={state.age}
                onChange={changeHandler}
              />
              <br />
              <label>Gender:</label>
              <input
                type="radio"
                id="html"
                name="gender"
                value="female"
                onChange={changeHandler}
              />
              <label htmlFor="female">Female</label>
              <br />
              <input
                type="radio"
                id="css"
                name="gender"
                value="male"
                onChange={changeHandler}
              />
              <label htmlFor="css">Male</label>
              <br />
              <input
                type="radio"
                id="javascript"
                name="gender"
                value="other"
                onChange={changeHandler}
              />
              <label htmlFor="javascript">Other</label>
              <label>
                Followed by: {profile.followedBy ? profile.followedBy : "None"}
              </label>
              <br />
              <label>
                Following: {profile.following ? profile.following : "None"}
              </label>
              <br />

              <label>About Me:</label>
              <input
                type="text"
                value={state.aboutMe}
                name="aboutMe"
                onChange={changeHandler}
              />
              <br />
              <button type="submit">Save updates</button>
              <br />
            </div>
          </form>
          <div>{updateStatusDisplay()}</div>
        </div>
      );
    }
    if (!editStatus) {
      return (
        <div className="p-10">
          <p className="px-8 font-mono font-bold text-3xl">
            {profile.userName ? profile.userName + "'s profile" : "My Profile"}{" "}
          </p>
          <div className="p-10 grid grid-cols-4">
            <div className="p-5 col-span-1">{pfpDisplay()}</div>
            <div className="p-5 col-span-3">
              <div>
                <label>Username:</label>
                <label> {profile.userName}</label>
              </div>
              <br />
              <div>
                <label>Age:</label> <label> {profile.age}</label>
              </div>
              <br />
              <div>
                <label>Gender:</label> <label> {profile.gender}</label>
              </div>
              <br />
              <div>
                <label>Followed by:</label>{" "}
                <label>
                  {profile.followedBy.length == 0 ? profile.followedBy : "None"}
                </label>
              </div>
              <br />
              <div>
                <label>Following:</label>{" "}
                <label>
                  {" "}
                  {profile.followedBy.length == 0 ? profile.followedBy : "None"}
                </label>
              </div>
              <br />
              <div>
                <label>About Me:</label> <label> {profile.aboutMe}</label>
              </div>
              <br />
              <button
                className="font-mono p-1 rounded border text-sm hover:bg-slate-400 ease-in-out duration-150"
                onClick={() => toggle(!editStatus)}
              >
                Edit Profile
              </button>
              <div>{updateSuccessDisplay()}</div>
            </div>
          </div>
        </div>
      );
    }
  };

  const { userName, age, gender, followedBy, following, aboutMe } = profile;
  const propertyArray = [userName, age, gender, followedBy, following, aboutMe];

  return <div className="flex flex-col items-center">{display()}</div>;
};

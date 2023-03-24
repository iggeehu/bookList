import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

interface signinData {
    email: string
    password:string    
}

interface signupData extends signinData {
confirmpassword:string
}


interface authState {
    token: string|null,
    id: string|null,
    userName: string|null,
    signUpStatus: "idle"| "loading" | "success" | "error",
    signInStatus:"idle"| "loading" | "success" | "error" | "account is not activated.",
    confirmEmailMsg: string|null
}

const initialState: authState = {
    token: localStorage.getItem("token"),
    id: localStorage.getItem("id"), 
    userName: localStorage.getItem("userName"),
    signUpStatus:"idle",
    signInStatus:"idle",
    confirmEmailMsg: ""
}

export const signUp = createAsyncThunk("auth/signUp", async(user:signupData)=>{
    try{
    if(user.password !== user.confirmpassword)
    {console.log("Please type in the same passwords")}
    if(user.password === user.confirmpassword)
    {   
            const response = await axios.post("http://localhost:3020/signup", {
            email: user.email,
            password: user.password})
        return response.data 
        
    }   }
    catch(error){console.error(error)}}
)

export const signIn= createAsyncThunk("auth/signIn", async(user:signinData)=>{
    
    const response = await axios.post("http://localhost:3020/signin", {
        email: user.email,
        password: user.password})
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("id", response.data.id)
        localStorage.setItem("userName", response.data.userName)
        return response.data
    })


const authSlice = createSlice({
 name: 'auth',
 initialState,
 reducers: {
     signOut(state){
         state.token="";
         state.signUpStatus= "idle";
         state.signInStatus= "idle";
         state.id="";
         state.userName= "";
         localStorage.clear();
     }},
extraReducers:(builder) => {
    //--signup extra-reducers
    builder.addCase(signUp.pending, (state) => {
      state.signUpStatus = "loading";
      state.token=""
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
          console.log(action.payload)
          state.confirmEmailMsg = action.payload
          state.signUpStatus='success'
    });
    builder.addCase(
        signUp.rejected, (state) => {
        state.token=""
        state.signUpStatus = "error"; 
    });
    //--- signin extra-reducers
    builder.addCase(signIn.pending, (state) => {
        state.signInStatus = "loading";
      });
      builder.addCase(signIn.fulfilled, (state, action) => {
            if(action.payload.token)
            {state.token = action.payload.token;
             state.userName = action.payload.userName
            state.signInStatus='success'}
            if(action.payload==='inactive') 
            {   
                state.signInStatus='account is not activated.'}
      });
      builder.addCase(
          signIn.rejected, (state) => {
          state.signInStatus = "error"; 
      });
 }  
     
 
})

export const {signOut} = authSlice.actions
export default authSlice.reducer 

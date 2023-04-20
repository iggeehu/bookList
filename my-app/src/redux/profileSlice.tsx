import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit"
import { SignatureKind } from "typescript"
import axios from "axios"


interface profile {
    currentProfile:{
    imageSrc: string,
    profilePicture: string,
    userName: string,
    age: number,
    gender: string,
    followedBy: string[],
    following: string[],
    aboutMe: string}
    profileUpdateStatus: "idle" | "pending"| "success" | "failed"
    
}

const initialState: profile = {
    currentProfile: {
    imageSrc: "https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
    profilePicture: "",
    userName: "",
    age: 30,
    gender: "",
    followedBy: [],
    following: [],
    aboutMe: ""},
    profileUpdateStatus: "idle"
}

export const getProfile = createAsyncThunk("profile/getProfile", async()=>{
    try{
        const headers = {"authorization":localStorage.getItem('token') as string}
        const response = await axios.get("http://localhost:3000/getProfile", {headers})
        return response.data   
     }
    catch(error){console.error(error)}})


export const updateProfile = createAsyncThunk("profile/updateProfile", async(data:profile)=>{
    try{
            const headers = {"authorization":localStorage.getItem('token') as string, 'Content-Type': 'application/json'}
            const response = await axios.post("http://localhost:3000/updateProfile", data, {headers} )
            return response.data   
        }
    catch(error){console.error(error)}})

export const updatePfp = createAsyncThunk("profile/updatePfp", async(data: object )=> {
    try{
        const headers = {"authorization":localStorage.getItem('token') as string}
        const response = await axios.post("http://localhost:3000/updatePfp", data, {headers} )
        return response.data   
    }
    catch(error){}
})


export const uploadPfp = createAsyncThunk("profile/uploadPfp", async(form: FormData )=> {
    try{
        const headers = {"authorization":localStorage.getItem('token') as string}
        const response = await axios.post("http://localhost:3000/uploadPfp", form, {headers} )
        
    }
    catch(error){}
})



const profileSlice = createSlice({
 name: 'profile',
 initialState,
 reducers: {
     
 },
extraReducers:(builder) => {
    //--signup extra-reducers
    builder.addCase(getProfile.pending, (state) => {
      
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
        // console.log(action.payload)
         state.currentProfile.userName=action.payload.userName;
         state.currentProfile.age=action.payload.age;
         state.currentProfile.gender=action.payload.gender;
         state.currentProfile.followedBy=action.payload.followedBy;
         state.currentProfile.following=action.payload.following;
         state.currentProfile.profilePicture=action.payload.profilePicture;
         state.currentProfile.aboutMe=action.payload.aboutMe;
         state.currentProfile.imageSrc=action.payload.url
         
    });

    builder.addCase(
        getProfile.rejected, (state) => {});
    builder.addCase(updateProfile.pending, (state, action)=>{
        state.profileUpdateStatus='pending'});
    builder.addCase(updateProfile.fulfilled, (state, action)=>{
        state.profileUpdateStatus='success'});
    builder.addCase(updateProfile.rejected, (state, action)=>{
        state.profileUpdateStatus='failed'})
        
    
    //--- signin extra-reducers
 }  
     
 
})

export const {} = profileSlice.actions
export default profileSlice.reducer 


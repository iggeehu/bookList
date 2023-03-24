import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useParams} from "react-router-dom";
import {Navbar} from "./components/Navbar"
import {MyLists} from "./components/MyLists"
import {User} from "./components/user"
import {WatchedLists} from "./components/WatchedLists"
import {ListView} from "./components/listView"
import {OtherListView} from "./components/otherListView"
import {Home} from './components/home'
import {BookDetails} from './components/bookDetails'
import { useAppSelector } from './redux/store'
import {SignUpComponent} from './components/authComponents/SignUp'
import {SignInComponent} from './components/authComponents/SignIn'
import {Profile} from './components/Profile'
import {SignupRedirect} from './components/authComponents/signupRedirect'
import {SigninRedirect} from './components/authComponents/signinRedirect'
// import styles from "../css/navbar.module.css"

function App() {

  const result=useAppSelector((state)=>state.search.result)
  const auth = useAppSelector((state)=>state.auth.token)
  return (
    <div className="App">
      
      
      <Router>
        <Navbar/>
        <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/signup' element={<SignUpComponent />} />
      <Route path='/signin' element={<SignInComponent />} />
      <Route path='/signupRedirect' element={<SignupRedirect />} />
      <Route path='/signinRedirect' element={<SigninRedirect />} />
      <Route path='/mylists'>
              <Route index element={<MyLists />} /> 
              <Route path=':listID' element={<ListView />} />
      </Route>
      <Route path='/user'>
              <Route index element={<Home />} /> 
              <Route path=':userID'>
                <Route index element={<User />} /> 
                <Route path=':listID' element ={<OtherListView />} />
              </Route>
       
      </Route>
      
      <Route path='/bookDetails/:bookID'>
              <Route path=':fromSearch' element={<BookDetails />} />
              <Route path=':fromList' element={<BookDetails />} />
      </Route>
            

      <Route path='/watchedlists'>
             <Route index element={<WatchedLists />} />
             {/* <Route path=':listID' element={<List />} /> */}
      </Route>


      </Routes></Router>

    </div>
  );
}

export default App;

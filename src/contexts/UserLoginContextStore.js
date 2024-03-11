import React,{useState} from 'react'
import {loginContext} from './LoginContext'
import axios from 'axios';

function UserLoginContextStore({children}) {

    let [currentUser,setCurrentUser] = useState({});
    let [error,setError] = useState("");
    let [userLoginStatus,setUserLoginStatus] = useState(false);

    //user login
    const loginUser = (userCred) =>{
        axios.post('http://localhost:4000/user-api/login-user',userCred)
        .then(response=>{
            if(response.data.message === 'success'){
                //update current user state
                setCurrentUser(response.data.user)
                //update user login status
                setUserLoginStatus(true)
                //update error status
                setError("")
                //store jwt token in Browser Storage at loacl or session storage
                localStorage.setItem("token",response.data.token)
                //navigate
            }else{
                setError(response.data.message)
            }
        })
        .catch(err=>{
            setError(err)
        })
    }
    //user logout
    const logoutUser = ()=>{
        //clear local or session storage
        localStorage.clear();
        //update user login status
        setUserLoginStatus(false);
    }


  return (
    <loginContext.Provider value={[currentUser,error,userLoginStatus,loginUser,logoutUser]}>
        {children}
    </loginContext.Provider>
  )
}

export default UserLoginContextStore
import React,{ useContext, useState } from 'react'
import './UserProfile.css'
import {loginContext} from '../../contexts/LoginContext';
import axios from 'axios';

function UserProfile() {

  let [currentUser] = useContext(loginContext)
  //console.log(currentUser)

  //error state
  let [error,setErr] = useState("")
  //protected data state
  let [data,setData] = useState("")

  //get data from protected route
  const getProtectedData= ()=>{
    //get token from local storage
    let token =localStorage.getItem("token")
    axios.get('http://localhost:4000/user-api/test',{headers:{"Authorization" : "Bearer "+token}})
    .then(response=>{
      setData(response.data.message)
    })
    .catch(err=>{
      setErr(err.message)
    })
  }

  return (
    <div>
      <p className='display-4 text-end text-primary'>Welcome, {currentUser.username}</p>
      <img src={currentUser.image} width='60px' className='float-end' alt="not found" />

      <button className='btn btn-danger mx-auto' onClick={getProtectedData}>Get Protected Data</button>

      <h1>{data}</h1>
    </div>
  )
}

export default UserProfile
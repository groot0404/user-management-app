import './Register.css'
import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  let [error,setError] = useState("")
  let {register,handleSubmit,formState:{errors}}= useForm();
  const navigate = useNavigate()
  //image file
  let [selectedFile,setSelectedFile] = useState(null)


  //form submit
  let addNewUser = (newUser)=>{
    //console.log(newUser)

    let fd = new FormData();
    //append newUser to form data
    fd.append("user",JSON.stringify(newUser));
    //append selected file to form data
    fd.append("photo",selectedFile)
    
    //make http post request to save the newUser to database
    axios.post('http://localhost:4000/user-api/register-user', fd)
    .then((response)=>{
      if(response.status===201){
        //navigate to login component
        navigate('/signin')
      }else{
        setError(response.data.message)
      }
    })
    .catch((err)=>{
      //console.log("err is ",err)
      //the client was given an error response 5xx,4xx
      //console.log(err)
      if(err.response){
        setError("client error"+err.message)
      }
      else if(err.request){
        setError("client didn't received"+err.message)
      }
      else{
        setError("other error"+err.message)
      }
        //setError(err.message)
    })
  }

  //on input of user image
  const onFileSelect =(eventObj)=>{
    //console.log(eventObj.target.files[0])
    setSelectedFile(eventObj.target.files[0]) 
  }

  return (
    <div className=''>
        <p className='display-2 text-info text-center'>Register</p>
        {/* error in http request handling */}
        {
          error?.length!==0 && <p className='display-4 text-danger text-center'>{error}</p>
        }
        {/* form */}
        <div className='row'>
          <div className='col-11 col-sm-8 col-md-6 mx-auto mt-3'>
            <form className='mx-auto' onSubmit={handleSubmit(addNewUser)}>
              {/* username */}
              <div className='mb-3'>
                <label htmlFor='username'>Username</label>
                <input type="text" id='username' className='form-control' {...register('username',{required:true})}/>
                {/* validation error message */}
                {errors.username?.type==='required' && <p className='text-danger'>*Username required</p>}
              </div>
              {/* password */}
              <div className='mb-3'>
                <label htmlFor='password'>Password</label>
                <input type="password" id='password' className='form-control' {...register('password',{required:true})}/>
                {/* validation error message */}
                {errors.password?.type==='required' && <p className='text-danger'>*Password required</p>}
              </div>
              {/* email */}
              <div className='mb-3'>
                <label htmlFor='email'>Email</label>
                <input type="email" id='email' className='form-control' {...register('email',{required:true})}/>
                {/* validation error message */}
                {errors.email?.type==='required' && <p className='text-danger'>*Email required</p>}
              </div>
              {/* date of birth */}
              <div className='mb-3'>
                <label htmlFor='dob'>Date of Birth</label>
                <input type="date" id='dob' className='form-control' {...register('dob',{required:true})}/>
                {/* validation error message */}
                {errors.dob?.type==='required' && <p className='text-danger'>*Date of Birth required</p>}
              </div>
              {/* user image */}
              <div className='mb-3'>
                <label htmlFor='image'>Select profile pic</label>
                <input type="file" id='image' className='form-control' onInput={onFileSelect} {...register('image',{required:true})}/>
                {/* validation error message */}
                {errors.image?.type==='required' && <p className='text-danger'>*User Image required</p>}
              </div>
              {/* Submit button */}
              <button type='submit' className='btn btn-success mx-auto'>Register</button>
            </form>
          </div>
        </div>
    </div>
  ) 
}

export default Register
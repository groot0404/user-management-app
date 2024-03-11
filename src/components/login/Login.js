import React,{useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useContext} from 'react'; 
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../../contexts/LoginContext';

function Login() {
  //
  let [currentUser,error,userLoginStatus,loginUser,logoutUser] = useContext(loginContext)
  //error state
  //let [err,setErr] = useState("")
  //userform hook
  let {register,handleSubmit,formState:{errors}}= useForm();
  //navigate 
  const navigate = useNavigate()
  //form submit
  const loginUserSubmit = (userCred)=>{
    //console.log(userCred)
    loginUser(userCred)
  }

  useEffect(()=>{
    if(userLoginStatus===true){
      navigate("/user-profile")
    }
  },[userLoginStatus,navigate])

  return (
    <div className=''>
        <p className='display-2 text-info text-center'>Login</p>
        {/* error in http request handling */}
        {
          error.length!==0 && <p className='display-4 text-danger text-center'>{error}</p>
        }
        <div className='row'>
          <div className='col-11 col-sm-8 col-md-6 mx-auto mt-3'>
            <form className='mx-auto' onSubmit={handleSubmit(loginUserSubmit)}>
              {/* username */}
              <div className='mb-3'>
                <label htmlFor='username'>Username</label>
                <input type="text" id='username' className='form-control' {...register('username',{required:true})} />
                {/* validation error message */}
                {errors.username?.type==='required' && <p className='text-danger'>*Username required</p>}
              </div>
              {/* password */}
              <div className='mb-3'>
                <label htmlFor='password'>Password</label>
                <input type="password" id='password' className='form-control' {...register('password',{required:true})} />
                {/* validation error message */}
                {errors.password?.type==='required' && <p className='text-danger'>*Password required</p>}
              </div>
              {/* login button */}
              <button type='submit' className='btn btn-success'>Login</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Login
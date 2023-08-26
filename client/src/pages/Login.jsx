import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from '../images/login.png'

const Login = () => {

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
      });
    
      const { loading, error, dispatch } = useContext(AuthContext);
    
      const navigate = useNavigate()
    
      const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };
    
      const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
          const res = await axios.post("/auth/login", credentials);
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          navigate("/")
        } catch (err) {
          dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
      };

  return (
    <div className='text-center'>
        <p className='m-24 mt-8 text-3xl font-bold'>JetSetGo-Booking Application</p>
      <div className='border m-24 mt-5 mb-5 flex gap-5 text-center'>
        <div className='border'>
          <img className='w-96 h-96' src={img} alt="NO" />
        </div>
        <div className='p-16'>
          <div className='mt-6 mb-6'>
            <input className='border border-cyan-500 w-80 h-10 ps-4' type="text" id='username' onChange={handleChange} placeholder='UserName: ' />
          </div>
          <div className='mt-6 mb-6'>
            <input className='border border-cyan-500 w-80 h-10 ps-4' type="password" id='password' onChange={handleChange} placeholder='Password: ' />
          </div>
          <div className='mt-6 mb-6'>
            <button className='border bg-cyan-500 text-xl text-white w-80 h-10' disabled={loading} onClick={handleClick}>Submit</button>
          </div>
            {error && <span>{error.message}</span>}
        </div>
      </div>
    </div>
  )
}

export default Login
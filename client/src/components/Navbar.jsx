import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.js'

const Navbar = () => {

  const { user }  = useContext(AuthContext);
  return (
    <div className='bg-white pb-2'>
    <div className='text-black flex justify-between p-3'>
      <Link to="/">
        <p className='ms-5 me-5 text-xl font-semibold self-center'>JetSetGo</p>
      </Link>
      {
        user ? (
          <div className='font-semibold ms-5 me-5 border bg-yellow-400 ps-4 pe-4 p-1 rounded-full'>
            @<span className='underline'>{user.username}</span>
          </div>
        ) : (
          <div className='ms-5 me-5 flex gap-5 text-sm'>
            <button className='border bg-yellow-400 text-black ps-2 pe-2 p-1'>Register</button>
            <Link to="/login"><button className='border bg-yellow-400 text-black ps-2 pe-2 p-1'>Login</button></Link>
          </div>
        )
      }
    </div>
    <div className='border ms-16 me-16 m-1 border-black' />
    <div className='text-black ms-48 me-48'>
      <div className='flex gap-7 p-5 '>
        <p className='border bg-yellow-400 text-black border-white rounded-2xl ps-3 pe-3 p-1'>Stays</p>
        <p className='border border-black rounded-2xl ps-3 pe-3 p-1'>Flights</p>
        <p className='border border-black rounded-2xl ps-3 pe-3 p-1'>Car rentals</p>
        <p className='border border-black rounded-2xl ps-3 pe-3 p-1'>Attractions</p>
        <p className='border border-black rounded-2xl ps-3 pe-3 p-1'>Airport taxis</p>
      </div>
    </div>
    </div>
  )
}

export default Navbar
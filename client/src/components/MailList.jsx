import React from 'react'

const MailList = () => {
  return (
    <div className='bg-blue-900 text-center p-10 text-white'>
      <p className='text-2xl font-bold p-1'>Save time, Save money.</p>
      <p className='text-sm p-1'>Sign up for the latest and best deals.</p>
      <div className='p-4 flex gap-4 justify-center'>
        <input className='ps-2 pe-3 border border-none' type="text" placeholder='Enter Email : ' />
        <button className='bg-yellow-300 text-blue-900 border ps-2 pe-2'>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList
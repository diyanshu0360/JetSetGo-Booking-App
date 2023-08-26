import React from 'react'
import imgdemo from '../images/2.jpg'
import useFetch from '../hooks/useFetch'
const Featured = () => {

  const { data, loading, error } = useFetch("hotels/countByCity?cities=berlin,london,germany");
  return (
    <div className='ms-48 me-48 flex justify-between m-10 z-10'>
      {loading ? ("Loading...") :
        (<><div className='w-60 h-40'>
          <div className='absolute w-60 h-40'>
            <img className='rounded-xl' src={imgdemo} alt="No" />
          </div>
          <div className='relative m-5 mt-20'>
            <p className='text-white font-bold text-2xl'>Berlin</p>
            <p className='text-white font-bold'>{data[0]} properties</p>
          </div>
        </div>
          <div className='w-60 h-40'>
            <div className='absolute w-60 h-40'>
              <img className='rounded-xl' src={imgdemo} alt="No" />
            </div>
            <div className='relative m-5 mt-20'>
              <p className='text-white font-bold text-2xl'>London</p>
              <p className='text-white font-bold'>{data[1]} properties</p>
            </div>
          </div>
          <div className='border w-60 h-40'>
            <div className='absolute w-60 h-40'>
              <img className='rounded-xl' src={imgdemo} alt="No" />
            </div>
            <div className='relative m-5 mt-20'>
              <p className='text-white font-bold text-2xl'>Germany</p>
              <p className='text-white font-bold'>{data[2]} properties</p>
            </div>
          </div></>)
      }
    </div>
  )
}

export default Featured
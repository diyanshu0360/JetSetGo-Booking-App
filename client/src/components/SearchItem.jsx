import React from 'react'
import imgdemo from '../images/2.jpg'
import { Link } from 'react-router-dom'

const SearchItem = ({item}) => {
  return (
    <div className='border flex gap-6 p-16 pt-5 pb-5 mb-4'>
      <div className='self-center'>
        <img className='w-40 h-40' src={item.photos[0] || imgdemo} alt="" />
      </div>
      <div className='p-3 self-center'>
        <p className='text-xl font-bold text-blue-900 mb-1'>{item.name}</p>
        <p className='text-sm text-slate-600 mt-1 mb-1'>{item.distance}km from center</p>
        <p className='bg-green-600 text-white w-max p-1 pt-0 pb-0 rounded-md text-sm mt-1 mb-1'>free airpot taxi</p>
        <p className='text-sm font-bold mt-1 mb-1'>Double Room - Disability Access</p>
        <p className='text-sm text-slate-600 mt-1 mb-1'>{item.desc}</p>
        <p className='text-sm text-green-600 font-bold mt-1'>Free cancellation</p>
      </div>
      <div className='self-center'>
        <div className='flex justify-around mb-5'>
          {
            item.rating &&
            <>
              <p className='text-sm font-bold self-center'>Excellent</p>
              <p className='bg-blue-900 text-white p-1 text-sm self-center'>{item.rating}</p>
            </>
          }
        </div>
        <p className='font-bold text-2xl mt-1 mb-1'>${item.cheapestPrice}</p>
        <p className='text-sm text-slate-600 mt-1 mb-3'>includes taxes and fees</p>
        <Link to={`/hotel/${item._id}`}>
          <button className='bg-blue-500 text-white p-1 ps-4 pe-4 rounded-md mt-3 mb-1'>see availability</button>
        </Link>
      </div>
    </div>
  )
}

export default SearchItem
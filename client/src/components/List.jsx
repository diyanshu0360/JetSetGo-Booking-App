import React, { useState } from 'react'
import SearchItem from './SearchItem'
import { DateRange } from 'react-date-range';
import { useLocation } from 'react-router-dom';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import format from 'date-fns/format';
import useFetch from '../hooks/useFetch.js';

const List = () => {

  const location = useLocation();
  const [openDate, setOpenDate] = useState(false)
  
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates)
  const [options, setOptions] = useState(location.state.options)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const { data, loading, error, reFetch } = useFetch(`hotels?city=${destination}&min=${min||1}&max=${max||999}`);

  const handleClick = () => {
    reFetch();
  }

  return (
    <div className='flex justify-evenly'>
      <div>
        <div className='bg-yellow-500 w-72 p-8 m-10'>
          <p className='font-bold text-2xl m-2'>Search</p>
          <div className='m-2'>
            <p className='m-1 ms-0 me-0'>Destination</p>
            <input className='w-full text-sm p-1 ps-3' type="text" placeholder={destination} />
          </div>
          <div className='m-2'>
            <p className='m-1 ms-0 me-0'>Date Range</p>
            <span className='text-slate-500 cursor-pointer bg-white text-sm ps-6 pe-5 p-1 relative' onClick={() => setOpenDate(!openDate)}>{format(dates[0].startDate, "dd/MM/yyyy")} to {format(dates[0].endDate, "dd/MM/yyyy")}</span>
            {
              openDate && <DateRange className='absolute border border-black left-[335px]' minDate={new Date()} onChange={item => setDates([item.selection])} />
            }
          </div>
          <div className='m-2 mt-5'>
            <div className='flex justify-between m-2 ms-0 me-0'>
              <p className='self-center'>Min price</p>
              <input type="number" onChange={(e) => setMin(e.target.value)} className='border w-12 self-center text-center' />
            </div>
            <div className='flex justify-between m-2 ms-0 me-0'>
              <p className='self-center'>Max price</p>
              <input type="number" onChange={(e) => setMax(e.target.value)} className='border w-12 self-center text-center' />
            </div>
            <div className='flex justify-between m-2 ms-0 me-0'>
              <p className='self-center'>Adult</p>
              <input type="number" min={1} className='border w-12 self-center text-center' value={options.adult} />
            </div>
            <div className='flex justify-between m-2 ms-0 me-0'>
              <p className='self-center'>Children</p>
              <input type="number" min={0} className='border w-12 self-center text-center' value={options.children} />
            </div>
            <div className='flex justify-between m-2 ms-0 me-0'>
              <p className='self-center'>Room</p>
              <input type="number" min={1} className='border w-12 self-center text-center' value={options.room} />
            </div>
          </div>
          <div className='m-2 ms-0 me-0'>
            <button className='bg-blue-900 text-white p-2 w-full mt-5' onClick={handleClick}>Search</button>
          </div>
        </div>
      </div>
      <div className='p-10'>
        {
          loading ? ("loading...") : (
            data.map((item) => (
              <SearchItem key={item._id} item={item} />
            ))
          )
        }
      </div>
    </div>
  )
}

export default List
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import format from 'date-fns/format';
import imagebg from '../images/5.jpg'
import { SearchContext } from '../context/SearchContext';

const Header = () => {
  const [openDate, setOpenDate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [openOptions, setOpenOptions] = useState(false)
  const [options, setOptions] = useState({
    adult:1,
    children:0,
    room:1
  })

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return{
        ...prev, [name] : operation==='i' ? options[name]+1 : options[name]-1
      }
    })
  }
  
  
  // --Options Box Starts--
  const OptionBox = () => {
    return (
      <div className='border absolute bg-white top-10 z-20 p-4'>
        <div className='flex justify-between p-2 ps-3 pe-3 gap-4'>
          <p className='self-center font-bold'>Adult</p>
          <button disabled={options.adult<=1} className='bg-blue-900 text-white w-6 font-bold text-lg' onClick={() => handleOption('adult', 'd')}>-</button>
          <p className='self-center'>{options.adult}</p>
          <button className='bg-blue-900 text-white w-6 font-bold text-lg' onClick={() => handleOption('adult', 'i')}>+</button>
        </div>
        <div className='flex justify-between p-2 ps-3 pe-3 gap-4'>
          <p className='self-center font-bold'>Children</p>
          <button disabled={options.children<=0} className='bg-blue-900 text-white w-6 font-bold text-lg' onClick={() => handleOption('children', 'd')}>-</button>
          <p className='self-center'>{options.children}</p>
          <button className='bg-blue-900 text-white w-6 font-bold text-lg' onClick={() => handleOption('children', 'i')}>+</button>
        </div>
        <div className='flex justify-between p-2 ps-3 pe-3 gap-4'>
          <p className='self-center font-bold'>Room</p>
          <button disabled={options.room<=1} className='bg-blue-900 text-white w-6 font-bold text-lg' onClick={() => handleOption('room', 'd')}>-</button>
          <p className='self-center'>{options.room}</p>
          <button className='bg-blue-900 text-white w-6 font-bold text-lg' onClick={() => handleOption('room', 'i')}>+</button>
        </div>
      </div>
    )
  }
  // --Options Box Ends--
  
  const nav = useNavigate()
  const [destination, setDestination] = useState("")
  
  
  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    nav('/hotels', { state : {destination, dates, options}})
  }
  
  return (
    <div className='bg-white pb-10 pt-8' style={{backgroundImage:`url(${imagebg})`, backgroundRepeat:'no-repeat', backgroundPositionX:'100px'}}>
    <div className='ms-44 me-44'>
      <div className='p-5 pt-0 h-32'>
        <p className='text-3xl font-bold p-2 w-[400px] float-right'>Discover and enjoy your new places and experiences</p>
        <p className='p-2 text-slate-600 float-right w-[400px]'>Explore destinations, places and unforgettable experiences</p>
      </div>
      <div className='mt-20 mb-2 bg-white text-slate-400 text-sm flex justify-between '>
        <div className='self-center w-full'>
          <input onChange={(e) => setDestination(e.target.value)} className='text-sm p-3 pe-16 border-2 border-e-0 border-black' type="text" placeholder='Where are you going?' />
        </div>
        <div className='self-center relative p-3 border-2 border-e-0 border-black w-full text-center'>
          <span className='cursor-pointer' onClick={() => setOpenDate(!openDate)}>{format(dates[0].startDate, "dd/MM/yyyy")} to {format(dates[0].endDate, "dd/MM/yyyy")}</span>
          {
            openDate && <DateRange minDate={new Date()} className='absolute top-10 right-0 z-20 border' editableDateInputs={true} onChange={item => setDates([item.selection])} moveRangeOnFirstSelection={false} ranges={dates} />
          }
        </div>
        <div className='self-center relative w-full border-2 border-black p-3 text-center'>
          <span className='cursor-pointer' onClick={() => setOpenOptions(!openOptions)}>{options.adult} adult : {options.children} children : {options.room} room</span>
          {
            openOptions && <OptionBox className='absolute' />
          }
        </div>
        <button className='self-center bg-blue-500 text-white border-2 border-blue-500 p-3 ps-3 pe-3' onClick={handleSearch}>Search</button>
      </div>
    </div>
    </div>
  )
}

export default Header
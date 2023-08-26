import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import MailList from '../components/MailList'
import Footer from '../components/Footer'
import imgdemo from '../images/1.jpg'
import useFetch from '../hooks/useFetch.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../context/SearchContext'
import { AuthContext } from '../context/AuthContext'
import ReserveModal from '../components/ReserveModal'

const InfoHotel = () => {

  const location = useLocation().pathname;
  const hotelID = location.split("/");
  const { data, loading, error } = useFetch(`/hotels/find/${hotelID[2]}`);
  
  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const handleClicked = () => {
    if(user){
      setOpenModal(true);

    } else {
      navigate("/login");
    }
  }
 
  return (
    <div>
      <div>
      <Navbar />
      {
        loading ? ("Loading...") : (
        <div className='ms-48 me-48'>
          <div className='flex justify-between'>
            <div className='p-5'>
              <p className='text-2xl font-bold m-1 mb-0'>{data.name}</p>
              <p className='text-sm text-slate-800 mt-0 m-1'>{data.address}</p>
              <p className='text-blue-900 m-1'>Excellent Location - {data.distance}m from center</p>
              <p className='text-green-500 font-bold m-1'>Book a stay over ${data.cheapestPrice}</p>
            </div>
            <div className='p-5'>
              <button className='bg-blue-900 text-white p-2 ps-3 pe-3' onClick={handleClicked}>Reserve or Book Now!</button>
            </div>
          </div>
          <div className='flex flex-wrap justify-between gap-2'>
            {
              data.photos?.map((item) => (
                <div>
                  <img className='h-40 w-64' src={item} alt="No" />
                </div>
              ))
            }
          </div>
          <div className='p-5 flex justify-between gap-3'>
            <div className='w-[200%] p-3'>
              <p className='text-lg font-bold'>{data.title}</p>
              <p className='text-sm'>{data.desc}</p>
            </div>
            <div className='bg-blue-100 p-5 text-lg'>
              <p className='font-bold m-1 mb-0'>Perfect for a {days}-night stay!</p>
              <p className='text-sm m-1 mt-0'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit accusantium nisi alias sint nemo corrupti modi, voluptates reiciendis?</p>
              <p className='font-bold text-2xl m-1 mt-4 mb-2'>${days * data.cheapestPrice * options.room} ({days} nights)</p>
              <button className='bg-blue-900 text-white p-1 ps-3 pe-3 text-sm m-1'>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        )
      }
      <MailList />
      <Footer />
      </div>
      {
        openModal && <ReserveModal setOpenModal={setOpenModal} hotelID={hotelID[2]} />
      }
    </div>
  )
}

export default InfoHotel
import React, { useContext, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { SearchContext } from '../context/SearchContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ReserveModal = ({ setOpenModal, hotelID }) => {

    const { data, loading, error } = useFetch(`/hotels/room/${hotelID}`)
    const [selectedRooms, setSelectedRooms] = useState([])
    const { dates } = useContext(SearchContext);
    const navigate = useNavigate();

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate)
        const date = new Date(start.getTime());
        const dates = [];
        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }
        return dates;
    };

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            alldates.includes(new Date(date).getTime())
        );
        return !isFound;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item != value))
    }

    const handleClick = async () => {
        try {
          await Promise.all(
            selectedRooms.map((roomId) => {
              const res = axios.put(`/rooms/availability/${roomId}`, {
                dates: alldates,
              });
              return res.data;
            })
          );
          setOpenModal(false);
          navigate("/");
        } catch (err) {}
      };

    return (
        <div className='border fixed w-96 top-10 left-96 bg-yellow-400 flex flex-wrap justify-center'>
            <div className='font-bold text-3xl w-80 text-right'>
                <button className='text-red-600' onClick={() => setOpenModal(false)}>&times;</button>
            </div>
            <div className='w-full p-3 ps-6 pe-6'>
                <p className='text-lg font-semibold'>Select Your Rooms : </p>
                {
                    data.map((item) => (
                        <div className='border flex m-5'>
                            <div className='w-56 p-2'>
                                <p className='font-semibold'>{item.title}</p>
                                <p className='text-sm text-slate-600'>{item.desc}</p>
                                <p className='text-sm'>MaxPeople : {item.maxPeople}</p>
                                <p className='text-md text-red-500'><b>Price : {item.price}</b></p>
                            </div>
                            <div className='flex gap-4 p-5'>
                                {
                                    item.roomNumbers.map((roomNumber) => (
                                        <div className='text-sm flex gap-1'>
                                            <p className='self-center'>{roomNumber.number}</p>
                                            <input className='self-center' disabled={!isAvailable(roomNumber)} type="checkbox" onChange={handleSelect} value={roomNumber._id} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
                <button className='text-sm text-center border text-white w-full h-10 bg-blue-900' onClick={handleClick}>Book Now!</button>
            </div>
        </div>
    )
}

export default ReserveModal
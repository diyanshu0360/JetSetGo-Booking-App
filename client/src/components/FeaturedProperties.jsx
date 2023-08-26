import React from 'react'
import imgdemo from '../images/3.jpg'
import useFetch from '../hooks/useFetch'

const FeaturedProperties = () => {

    const { data, loading, error } = useFetch("/hotels?featured=true&limit=4")

    return (
        <div className='ms-48 me-48 pb-5'>
            <p className='font-bold text-slate-600'>Featured Stays</p>
            <div className='flex justify-between mt-3 mb-3'>
                {
                    loading ? ("loading...") : (
                        data.map((item) => (
                            <div key={item._id}>
                                <img className='m-1 rounded-md w-44 h-60' src={imgdemo} alt="No" />
                                <div className='m-1'>
                                    <p className='font-bold capitalize'>{item.name}</p>
                                    <p className='text-sm text-slate-600 capitalize'>{item.city}</p>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default FeaturedProperties
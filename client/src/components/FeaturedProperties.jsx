import React from 'react'
import useFetch from '../hooks/useFetch.js'

const FeaturedProperties = () => {

    const { data, loading, error } = useFetch("hotels?featured=true&limit=4")

    return (
        <div className='ms-48 me-48 pb-5'>
            <p className='font-bold text-slate-600'>Featured Stays</p>
            <div className='flex justify-between mt-3 mb-3'>
                {
                    loading ? ("loading...") : (
                        data.map((item) => (
                            <div key={item._id}>
                                <img className='m-1 rounded-md w-44 h-60' src={item.photos[0]} alt="No" />
                                <div className='m-1 w-44'>
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
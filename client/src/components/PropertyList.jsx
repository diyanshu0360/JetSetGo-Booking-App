import React from 'react'
import imgdemo from '../images/1.jpg'
import useFetch from '../hooks/useFetch'
    
    const PropertyList = () => {

    const { data, loading, error } = useFetch("/hotels/countByType")
    const img = [imgdemo, imgdemo, imgdemo, imgdemo, imgdemo]
      return (
        <div className='ms-48 me-48'>
            <p className='font-bold text-slate-600'>Browse by property type</p>
            <div className='flex justify-between mt-3 mb-3'>
                {
                    loading ? ("Loading...") : 
                    (
                        data && img.map((item, i) => (
                            <div key={i}>
                                <img className='m-1 rounded-md w-36 h-24' src={item} alt="No" />
                                <div className='m-1'>
                                    <p className='font-bold capitalize'>{data[i]?.type}</p>
                                    <p className='text-sm text-slate-600 capitalize'>{data[i]?.count} {data[i]?.type}</p>
                                </div>
                            </div>
                            )
                        )
                    )
                }
            </div>
        </div>
      )
    }
    
    export default PropertyList
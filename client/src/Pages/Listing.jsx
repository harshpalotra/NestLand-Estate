import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaBath, FaBed, FaMapMarkerAlt } from 'react-icons/fa'
import { useSelector } from "react-redux"
import { set } from 'mongoose'
import Contact from '../components/Contact'

export const Listing = () => {
    SwiperCore.use([Navigation]);
    const {currentUser} = useSelector((state) => state.user);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contact, setContact] = useState(false);
    const params = useParams();
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await response.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                setError(true);
            }
        };
        fetchListing();
    }, [params.listingId]);
    return (
        <main>
            {loading && <p className='text-2xl text-center text-red-500'>loading...</p>}
            {error && <p className='text-2xl text-center text-red-500'>An error occurred</p>}
            {listing && !loading && !error && (
                <div>
                    <Swiper navigation>
                        {listing.imageUrls.map((url,index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className='h-[550px]'
                                    style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}  >


                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className='flex flex-col max-w-4xl mx-auto p-3  gap-4'>
                        <p>
                            {listing.name} - ₹{''}
                            {listing.offer ? listing.discountedPrice.toLocaleString('en-IN') 
                            : listing.regularPrice.toLocaleString('en-IN')}
                            {listing.type === 'rent' && '/month'}
                        </p>
                        <p className='flex items-center mt-6 gap-2 text-slate-600 my-2 '>
                            <FaMapMarkerAlt className='text-blue-700'/>
                            {listing.address}
                            </p>
                            <div className='flex gap-4'>
                                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>{listing.type === 'rent' ? 'For Rent' : 'For Sale'}  
                                </p>
                                {
                                    listing.offer && (
                                        <p className='bg-green-800 w-full max-w-[200px] text-white text-center p-1 rounded-md'>${+listing.regularPrice - +listing.discountedPrice}</p>
                               ) }
                            </div>
                            <p className='text-slate-800'>
                                <span className='font-semibold text-black '>Description - </span>
                                {listing.description}
                                </p>
                         <ul className='text-blue-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 '>
                            <li className='flex items-center gap-1 whitespace-nowrap'>
                                <FaBed className='text-lg'/>
                                {listing.bedrooms >1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap'>
                                <FaBath className='text-lg'/>
                                {listing.bathrooms >1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
                            </li>
                            <li className='flex items-center gap-1'>
                                <FaBed className='text-lg'/>
                                {listing.parking ? 'Parking' : 'No Parking'}
                            </li>
                            <li className='flex items-center gap-1'>
                                <FaBed className='text-lg'/>
                                {listing.furnished ? 'Furnished' : 'Unfurnished'}
                            </li>
                         </ul>
                         {currentUser && listing.userRef !== currentUser._id &&
                         !contact  && (
                         <button onClick={()=>setContact(true)}
                         className='bg-slate-700 text-slate-200 rounded-lg uppercase hover:opacity-95 p-3'>Contact landlord  </button>
    
                         )}
                         {contact && <Contact listing={listing}/>}
                    </div>
                </div>
                
            )}

        </main>
    )
}


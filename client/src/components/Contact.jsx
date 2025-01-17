import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
const Contact = ({listing}) => {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    const onChange = (e) => {
        setMessage(e.target.value);
      };

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.useRef}`);

                const data = await res.json();
                setLandlord(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchLandlord();
        }, [listing.useRef]);



  return (
    <>
    {landlord && (
      <div className='flex flex-col gap-4'>
        <p>
            Contact <span className='font-semibold'>
                {landlord.username}
            </span> {' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
        </p>
        <textarea
        name='message'
        id='message'
        rows='2'
        value={message}
        onChange={onChange}
        placeholder='Enter your message here...'
        className='w-full border p-3 rounded-lg'>  
        </textarea>

        <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message} `}
        className='bg-blue-500 text-white p-3 rounded-lg w-full text-center hover:opacity-95' >
            Send Message
        </Link>
        
      </div>
    )}
    </>
  )
}

export default Contact
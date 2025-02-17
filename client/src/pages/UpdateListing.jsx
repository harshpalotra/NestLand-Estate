import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate , useParams} from 'react-router-dom';
import { use } from 'react';

const UpdateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
 const [formData, setFormData] = useState({
  imageUrls: [],
  name: '',
  description: '',
  address: '',
  type: "rent" ,
  bedrooms:1,
  bathrooms:1,
  regularPrice:50,
  discountPrice:0,
  offer:false,
  parking:false,
  furnished:false,
 });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
   const navigate = useNavigate();
   const params = useParams();

useEffect(() => {
    const fetchListing = async () =>{
        const listingId = params.listingId;
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if(data.success === false){
            console.log(data.message);
            return;
        }
        setFormData(data);
    }
    fetchListing();
}, []);


  const handleImageSubmit = async (e) => {
    if(files.length > 0 && files.length < 7 + formData.imageUrls.length){
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for(let i = 0; i < files.length; i++){
        promises.push(storeImage(files[i]));
      }
      try {
        const urls = await Promise.all(promises);
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
      } catch (err) {
        setImageUploadError('Image upload failed (2 MB max per image)');
      } finally {
        setUploading(false);
      }
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };
  const storeImage = async (file) =>{
    return new Promise(async (resolve, reject) =>{
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'my_NestLand');
        formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        resolve(response.data.secure_url);
      } catch (error) {
        reject(error);
      }
    });
  }
  
  const handleRemoveImage = (index) =>{
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });

  };

  // advance way of handling form data
  // const handleChange = (e) => {
  //   const {id, value, checked, type} = e.target;
  //   if(id === 'sale' || id === 'rent'){
  //     setFormData({...formData, type: id});
  //   } else if(id === 'parking' || id === 'furnished' || id === 'offer'){
  //     setFormData({...formData, [id]: checked});
  //   } else if(type === 'number' || type === 'text' || type === 'textarea'){
  //     setFormData({...formData, [id]: value});
  //   }
    
  // };


  const handleChange = (e) => {
    if(e.target.id === 'sale' || e.target.id === 'rent'){
      setFormData({...formData, type: e.target.id});
    }
    else if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
      setFormData({...formData, [e.target.id]: e.target.checked});
    }
    else if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
      setFormData({...formData, [e.target.id]: e.target.value});
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    if(formData.imageUrls.length < 1) return setError('You must upload at least one image');
    if(+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than regular price');
    setLoading(true);
    setError(false);
     const res = await fetch(`/api/listing/update/${params.listingId}`, {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({...formData, userRef: currentUser._id}),

      });
        const data = await res.json();
        setLoading(false);
        if(data.success === false){
          setError(data.message);
        }
        console.log(data._id);
        navigate(`/listing/${data._id}`);


   } catch (error) {
    setError(error.message);
    setLoading(false);
   }
  };
  return (
   <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Update a Listing</h1>
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
            <input type='text' placeholder='Name' className='border p-3'
            rounded-lg id='name' maxLength='60' minLength='10' required onChange={handleChange} value={formData.name}/>
            <textarea type='text' placeholder='Description' className='border p-3'
            rounded-lg id='description' required onChange={handleChange} value={formData.description} />
            <input type='text' placeholder='Address' className='border p-3'
            rounded-lg id='address' required onChange={handleChange} value={formData.address} />
        
        <div className='flex gap-6 flex-wrap'>
        <div className='flex gap-2'>
            <input type='checkbox' id='sale' className='w-5' 
            onChange={handleChange} checked={formData.type === 'sale'} />
            <span>Sale</span>
        </div>
        <div className='flex gap-2'>
            <input type='checkbox' id='rent' className='w-5'
            onChange={handleChange} checked={formData.type === "rent"} />
            <span>Rent</span>
        </div> <div className='flex gap-2'>
            <input type='checkbox' id='parking' className='w-5' 
            onChange={handleChange} checked={formData.parking} />
            <span>parking</span>
        </div> 
        <div className='flex gap-2'>
            <input type='checkbox' id='furnished' className='w-5' 
            onChange={handleChange} checked={formData.furnished}/>
            <span>furnished</span>
        </div>
        <div className='flex gap-2'>
            <input type='checkbox' id='offer' className='w-5' 
            onChange={handleChange} checked={formData.offer} />
            <span>Offer</span>
        </div>
        </div>
        <div className='flex flex-wrap gap-6'>
        <div  className='flex items-center gap-2'>
                <input type='number' id='bedrooms'  min='1' max='10' required
                className='p-3 border border-gray-300 rounded-lg'  onChange={handleChange} value={formData.bedrooms} />
                 <p>Beds</p>                                                            
            </div>
            <div  className='flex items-center gap-2'>
                <input type='number' id='bathrooms'  min='1' max='10' required
                className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.bathrooms} />
                 <p>Baths</p>                                                            
            </div>
            <div  className='flex items-center gap-2'>
                <input type='number' id='regularPrice'  min='50' max='10000000' required
                className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.regularPrice} />
                 <div className=''>
                 <p>Regular Price</p>                                                            
                 {formData.type === 'rent' && (
                    <span className='text-xs'>(₹ / month)</span>
                  )}
                </div>                                                          
            </div>
              {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>
                  {formData.type === 'rent' && (
                    <span className='text-xs'>(₹ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
        <p className='font-semibold'>Images:
            <span className='font-normal text-grey-600 ml-2'> The first image will be the cover (max 6)</span>

        </p>
        <div className='flex gap-4'>
            <input className='p-3 border border-gray-300 rounded-w-full'
             type='file' id='images' accept='image/*'
              multiple 
             onChange={(e) => setFiles(Array.from(e.target.files))}/>
            <button type='button'
            disabled={uploading}
             onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled::opacity-80'>{uploading ? 'uploading...' : 'Upload'}</button>
        </div>
        <p className='text-red-700'>{imageUploadError && imageUploadError}</p>
        {
           formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
              <button type='button' onClick={()=>handleRemoveImage(index)} className='p-3 text-blue-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
           </div>
            ))}
        <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80' disabled={loading || uploading } >{loading ? 'Updating...' : 'Update Listing'}</button>
        </div>
   
    </form>
    {error && <p className='text-red-400'>{error}</p>}
   </main>
  )
}

export default UpdateListing




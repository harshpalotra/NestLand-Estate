import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
 const [formData, setFormData] = useState({
  imageUrls: [],
 });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

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

  }
  return (
   <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
    <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
            <input type='text' placeholder='Name' className='border p-3'
            rounded-lg id='name' maxLength='60' minLength='10' required />
            <textarea type='text' placeholder='Description' className='border p-3'
            rounded-lg id='description' required />
            <input type='text' placeholder='Address' className='border p-3'
            rounded-lg id='address' required />
        
        <div className='flex gap-6 flex-wrap'>
        <div className='flex gap-2'>
            <input type='checkbox' id='sell' className='w-5' />
            <span>Sell</span>
        </div>
        <div className='flex gap-2'>
            <input type='checkbox' id='rent' className='w-5' />
            <span>Rent</span>
        </div> <div className='flex gap-2'>
            <input type='checkbox' id='parking' className='w-5' />
            <span>parking</span>
        </div> <div className='flex gap-2'>
            <input type='checkbox' id='furnished' className='w-5' />
            <span>furnished</span>
        </div>
        <div className='flex gap-2'>
            <input type='checkbox' id='offer' className='w-5' />
            <span>Offer</span>
        </div>
        </div>
        <div className='flex flex-wrap gap-6'>
        <div  className='flex items-center gap-2'>
                <input type='number' id='bedrooms'  min='1' max='10' required
                className='p-3 border border-gray-300 rounded-lg' />
                 <p>Beds</p>                                                            
            </div>
            <div  className='flex items-center gap-2'>
                <input type='number' id='bathrooms'  min='1' max='10' required
                className='p-3 border border-gray-300 rounded-lg' />
                 <p>Baths</p>                                                            
            </div>
            <div  className='flex items-center gap-2'>
                <input type='number' id='regularPrice'  min='1' max='10' required
                className='p-3 border border-gray-300 rounded-lg' />
                 <div className=''>
                 <p>Regular Price</p>                                                            
                <span>($ / month)</span>
                </div>                                                          
            </div>
            <div  className='flex items-center gap-2'>
                <input type='number' id='discountedprice'  min='1' max='10' required
                className='p-3 border border-gray-300 rounded-lg' />
                <div className=''>
                 <p>Discounted price</p>                                                            
                <span>($ / month)</span>
                </div>
            </div>
        </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
        <p className='font-semibold'>Images:
            <span className='font-normal text-grey-600 ml-2'> The first image will be the cover (max 6)</span>

        </p>
        <div className='flex gap-4'>
            <input className='p-3 border border-gray-300 rounded-w-full'
             type='file' id='images' accept='image/*'
              multiple required 
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
        <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80' > Create Listing</button>
        </div>
    </form>
   </main>
  )
}

export default CreateListing
// import { useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';


// export default function CreateListing() {
//   const { currentUser } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [files, setFiles] = useState([]);
//   const [formData, setFormData] = useState({
//     imageUrls: [],
//     name: '',
//     description: '',
//     address: '',
//     type: 'rent',
//     bedrooms: 1,
//     bathrooms: 1,
//     regularPrice: 50,
//     discountPrice: 0,
//     offer: false,
//     parking: false,
//     furnished: false,
//   });
//   const [imageUploadError, setImageUploadError] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);

//   console.log(formData);

//   const handleImageSubmit = async (e) => {
//     if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
//       setUploading(true);
//       setImageUploadError(false);
//       const promises = [];
//       for (let i = 0; i < files.length; i++) {
//         promises.push(storeImage(files[i]));
//       }
  //     try {
  //       const urls = await Promise.all(promises);
  //       setFormData({
  //         ...formData,
  //         imageUrls: formData.imageUrls.concat(urls),
  //       });
  //       setImageUploadError(false);
  //     } catch (err) {
  //       setImageUploadError('Image upload failed (2 MB max per image)');
  //     } finally {
  //       setUploading(false);
  //     }
  //   } else {
  //     setImageUploadError('You can only upload 6 images per listing');
  //   }
  // };

//   const storeImage = async (file) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', 'my_NestLand'); // Using your preset name
//         formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
  
//         const response = await axios.post(
//           `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
//           formData
//         );
//         resolve(response.data.secure_url); // The URL of the uploaded image
//       } catch (error) {
//         reject(error);
//       }
//     });
//   };
  

//   const handleRemoveImage = async (index) => {
//     try {
//       const newImageUrls = formData.imageUrls.filter((_, i) => i !== index);
//       setFormData({ ...formData, imageUrls: newImageUrls });
//     } catch (error) {
//       console.error('Error removing image:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { id, value, checked, type } = e.target;
//     if (id === 'sale' || id === 'rent') {
//       setFormData({ ...formData, type: id });
//     } else if (id === 'parking' || id === 'furnished' || id === 'offer') {
//       setFormData({ ...formData, [id]: checked });
//     } else if (type === 'number' || type === 'text' || type === 'textarea') {
//       setFormData({ ...formData, [id]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (formData.imageUrls.length < 1) {
//         return setError('You must upload at least one image');
//       }
//       if (+formData.regularPrice < +formData.discountPrice) {
//         return setError('Discount price must be lower than regular price');
//       }
//       setLoading(true);
//       setError(false);
//       const res = await fetch('/api/listing/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...formData, userRef: currentUser._id }),
//       });
//       const data = await res.json();
//       setLoading(false);
//       if (!data.success) {
//         setError(data.message);
//       } else {
//         navigate(`/listing/${data._id}`);
//       }
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <main className='p-3 max-w-4xl mx-auto'>
//       <h1 className='text-3xl font-semibold text-center my-7'>
//         Create a Listing
//       </h1>
//       <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
//         <div className='flex flex-col gap-4 flex-1'>
//           <input
//             type='text'
//             placeholder='Name'
//             className='border p-3 rounded-lg'
//             id='name'
//             maxLength='62'
//             minLength='10'
//             required
//             onChange={handleChange}
//             value={formData.name}
//           />
//           <textarea
//             type='text'
//             placeholder='Description'
//             className='border p-3 rounded-lg'
//             id='description'
//             required
//             onChange={handleChange}
//             value={formData.description}
//           />
//           <input
//             type='text'
//             placeholder='Address'
//             className='border p-3 rounded-lg'
//             id='address'
//             required
//             onChange={handleChange}
//             value={formData.address}
//           />
//           <div className='flex gap-6 flex-wrap'>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='sale'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={formData.type === 'sale'}
//               />
//               <span>Sell</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='rent'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={formData.type === 'rent'}
//               />
//               <span>Rent</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='parking'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={formData.parking}
//               />
//               <span>Parking spot</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='furnished'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={formData.furnished}
//               />
//               <span>Furnished</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='offer'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={formData.offer}
//               />
//               <span>Offer</span>
//             </div>
//           </div>
//           <div className='flex flex-wrap gap-6'>
//             <div className='flex items-center gap-2'>
//               <input
//                 type='number'
//                 id='bedrooms'
//                 min='1'
//                 max='10'
//                 required
//                 className='p-3 border border-gray-300 rounded-lg'
//                 onChange={handleChange}
//                 value={formData.bedrooms}
//               />
//               <p>Beds</p>
//             </div>
//             <div className='flex items-center gap-2'>
//               <input
//                 type='number'
//                 id='bathrooms'
//                 min='1'
//                 max='10'
//                 required
//                 className='p-3 border border-gray-300 rounded-lg'
//                 onChange={handleChange}
//                 value={formData.bathrooms}
//               />
//               <p>Baths</p>
//             </div>
//             <div className='flex items-center gap-2'>
//               <input
//                 type='number'
//                 id='regularPrice'
//                 min='50'
//                 max='10000000'
//                 required
//                 className='p-3 border border-gray-300 rounded-lg'
//                 onChange={handleChange}
//                 value={formData.regularPrice}
//               />
//               <div className='flex flex-col items-center'>
//                 <p>Regular price</p>
//                 {formData.type === 'rent' && (
//                   <span className='text-xs'>($ / month)</span>
//                 )}
//               </div>
//             </div>
//             {formData.offer && (
//               <div className='flex items-center gap-2'>
//                 <input
//                   type='number'
//                   id='discountPrice'
//                   min='0'
//                   max='10000000'
//                   required
//                   className='p-3 border border-gray-300 rounded-lg'
//                   onChange={handleChange}
//                   value={formData.discountPrice}
//                 />
//                 <div className='flex flex-col items-center'>
//                   <p>Discounted price</p>
//                   {formData.type === 'rent' && (
//                     <span className='text-xs'>($ / month)</span>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className='flex flex-col flex-1 gap-4'>
//           <div className='flex flex-wrap gap-4'>
//             {formData.imageUrls.map((url, index) => (
//               <div key={index} className='relative'>
//                 <button
//                   type='button'
//                   className='absolute -top-3 -right-2 text-white text-lg p-1 bg-red-400 rounded-full'
//                   onClick={() => handleRemoveImage(index)}
//                 >
//                   X
//                 </button>
//                 <img
//                   src={url}
//                   alt='listing'
//                   className='max-w-[110px] max-h-[110px] object-cover border-2'
//                 />
//               </div>
//             ))}
//           </div>
//           <div>
//             <input
//               type='file'
//               id='files'
//               accept='.jpg,.jpeg,.png'
//               multiple
//               onChange={(e) => setFiles(Array.from(e.target.files))}
//             />
//             <button
//               type='button'
//               className='w-fit p-2 bg-orange-400 rounded-lg shadow-lg text-white text-sm'
//               onClick={handleImageSubmit}
//               disabled={uploading}
//             >
//               {uploading ? 'Uploading...' : 'Upload'}
//             </button>
//           </div>
//           {imageUploadError && (
//             <p className='text-red-400 text-sm'>{imageUploadError}</p>
//           )}
//           <button
//             className='p-3 w-full bg-green-400 text-white rounded-lg shadow-lg'
//             disabled={loading}
//           >
//             {loading ? 'Creating...' : 'Create'}
//           </button>
//         </div>
//       </form>
//       {error && <p className='text-red-400'>{error}</p>}
//     </main>
//   );
// }
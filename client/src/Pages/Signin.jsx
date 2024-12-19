import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(null); // Reset error state on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic client-side validation
    if ( !formData.email || !formData.password) {
      setLoading(false);
      setError('All fields are required!');
      return;
    }

   try {
       const res = await fetch('/api/auth/signup',{
         method:'POST',
         headers:{
           'Content-Type' : 'application/json',
   
         },
         body:JSON.stringify(formData),
       });
       const data = await res.json();
       console.log(data);
       if(data.success === false){
         setLoading(false);
         setError(data.message);
         return;
       }
     setLoading(false);
     setError(null);
     navigate('/sign-in');
  
   
   } catch (error) {
    setLoading(false);
    setError(error.message)
   }
  };


  return (
    <div className="p-3 max-w-lg mx-auto">
    <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input
        type="email"
        placeholder="Email"
        className="border p-3 rounded-lg"
        id="email"
        onChange={handleChange}
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-3 rounded-lg"
        id="password"
        onChange={handleChange}
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-slate-700 text-white p-3 rounded-lg uppercase"
      >
        {loading ? 'Loading...' : 'Sign Up'}
      </button>
    </form>
    <div className="flex gap-2 mt-5">
      <p>Have an account?</p>
      <Link to="/sign-up">
        <span className="text-blue-700">Sign Up</span>
      </Link>
    </div>
    {error && <p className="text-red-400 mt-4">{error}</p>}
  </div>
  );
}

export default Signin
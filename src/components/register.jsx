import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/store';

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const setUserData = useStore((state) => state.setUserData);

  const handleRegister = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const responseData = await response.json();
      const { newUser } = responseData;
      setUserData(newUser);
      console.log("userdata", newUser);
      navigate('/roomCreate');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://i.pinimg.com/736x/fa/f3/7d/faf37db5afe35eea16a36d54f2cc048a.jpg")' }}>
      {/* Overlay with opacity */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Register form container */}
      <div className="z-10 max-w-lg p-16 rounded-lg text-center text-white border-2 border-white border-opacity-50 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
        <h2 className="text-2xl mb-5">Create Account</h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          
          <div className="mb-5">
            <input
              id='email'
              type="email"
              placeholder="Email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email address'
                }
              })}
              className="w-full p-4 rounded-lg border border-white border-opacity-50 bg-transparent text-white text-lg box-border"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mb-5">
            <input
              id='username'
              type="text"
              placeholder="Username"
              {...register('username', { required: 'Username is required' })}
              className="w-full p-4 rounded-lg border border-white border-opacity-50 bg-transparent text-white text-lg box-border"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          <div className="mb-5">
            <input
              id='password'
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              className="w-full p-4 rounded-lg border border-white border-opacity-50 bg-transparent text-white text-lg box-border"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button type="submit" className="bg-green-600 bg-opacity-70 text-white p-4 rounded-lg w-full text-lg transition-colors duration-300 hover:bg-green-700 hover:shadow-lg mb-4">
            Register
          </button>

          <span className="block text-white mt-2 text-lg">
            Already have an account? 
            <a onClick={() => navigate('/login')} className="underline cursor-pointer text-white">
              Login
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;

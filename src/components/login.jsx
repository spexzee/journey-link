import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/store';

const Login = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = async (data) => {
    // Implement login functionality here
    console.log('Logging in with:', data);
    navigate('/dashboard'); // Example redirect after login
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://i.pinimg.com/736x/fa/f3/7d/faf37db5afe35eea16a36d54f2cc048a.jpg")' }}>
      {/* Overlay with opacity */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Login form container */}
      <div className="z-10 max-w-lg p-16 rounded-lg text-center text-white bg-transparent border-2 border-white border-opacity-50 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
        <h2 className="text-2xl mb-5">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-5">
            <input
              id='username'
              type="text"
              placeholder="Username"
              {...register('username', { required: 'Username is required' })}
              className="w-full p-4 rounded-lg border border-white border-opacity-50 bg-transparent text-white text-lg box-border"
            />
            {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
          </div>

          <div className="mb-5">
            <input
              id='password'
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              className="w-full p-4 rounded-lg border border-white border-opacity-50 bg-transparent text-white text-lg box-border"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <button type="submit" className="bg-green-600 bg-opacity-70 text-white p-4 rounded-lg border-none cursor-pointer w-full text-lg transition-colors duration-300 mb-4 shadow-md hover:bg-green-700 hover:shadow-lg">
            Login
          </button>

          <span className="block mt-2 text-lg">
            Don't have an account? 
            <a onClick={() => navigate('/register')} className="underline cursor-pointer text-white">
              Register
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;

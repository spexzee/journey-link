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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundImage: 'url("https://i.pinimg.com/736x/fa/f3/7d/faf37db5afe35eea16a36d54f2cc048a.jpg")',  // Use the same bike image for consistency
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      fontFamily: 'Arial, sans-serif',
    }}>
      {/* Overlay with opacity */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Black overlay with opacity
      }}></div>

      {/* Register form container */}
      <div style={{
        zIndex: 1,  // Ensure the form is on top of the background and overlay
        maxWidth: '700px',
        padding: '60px',
        borderRadius: '15px',
        textAlign: 'center',
        color: '#fff',  // White text to stand out on dark background
        background: 'transparent',  // Fully transparent background
        border: '2px solid rgba(255, 255, 255, 0.5)',  // Optional border for better visibility
        boxShadow: '0 4px 30px rgba(255, 255, 255, 0.2)',  // White shadow effect
        transition: 'box-shadow 0.3s ease',  // Transition for hover effect
      }}
      onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 8px 40px rgba(255, 255, 255, 0.6)'}
      onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 4px 30px rgba(255, 255, 255, 0.2)'}
      >
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Create Account</h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          
          <div style={{ marginBottom: '20px' }}>
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
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.5)',  // Lighter border for inputs
                background: 'transparent',  // Transparent input background
                color: '#fff',  // White text for inputs
                fontSize: '18px',
                boxSizing: 'border-box',
              }}
            />
            {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</p>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              id='username'
              type="text"
              placeholder="Username"
              {...register('username', { required: 'Username is required' })}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.5)',  // Lighter border for inputs
                background: 'transparent',  // Transparent input background
                color: '#fff',  // White text for inputs
                fontSize: '18px',
                boxSizing: 'border-box',
              }}
            />
            {errors.username && <p style={{ color: 'red', fontSize: '12px' }}>{errors.username.message}</p>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              id='password'
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.5)',  // Lighter border for inputs
                background: 'transparent',  // Transparent input background
                color: '#fff',  // White text for inputs
                fontSize: '18px',
                boxSizing: 'border-box',
              }}
            />
            {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password.message}</p>}
          </div>

          <button type="submit" style={{
            backgroundColor: 'rgba(76, 175, 80, 0.7)',  // Slightly transparent green button
            color: 'white',
            padding: '15px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            fontSize: '18px',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',  // Add box-shadow transition
            marginBottom: '15px',
            boxShadow: '0 4px 20px rgba(255, 255, 255, 0.2)',  // Initial box-shadow
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(69, 160, 73, 0.9)';
            e.target.style.boxShadow = '0 8px 40px rgba(255, 255, 255, 0.4)';  // Hover box-shadow
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'rgba(76, 175, 80, 0.7)';
            e.target.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.2)';  // Reset box-shadow
          }}
          >
            Register
          </button>

          <span style={{ display: 'block', color: '#fff', marginTop: '10px', fontSize: '16px' }}>
            Already have an account? 
            <a onClick={() => navigate('/login')} style={{ textDecoration: 'underline', cursor: 'pointer', color: '#fff' }}>
              Login
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;

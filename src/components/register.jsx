import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/store';

const Register = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  
  const setUserData = useStore((state) => state.setUserData);

//   console.log("register->",register)


  const handleRegister = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        body: JSON.stringify({
          username: data.username,
          password: data.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const responseData = await response.json(); // Renamed variable to avoid conflict
      const { newUser } = responseData; // Destructure newUser from responseData
      setUserData(newUser); // Set user data directly
      console.log("userdata", newUser); // Log the newUser object
      navigate('/roomCreate'); // Redirect to room creation page
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'black' }}>
      <div style={{ maxWidth: '400px', padding: '80px', borderRadius: '10px',background: '#f0f0f3' }}>
        <h2 style={{textAlign:'center'}}>Register</h2>
        <br />
        <form onSubmit={handleSubmit(handleRegister)}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor='username'>Username:</label>
            <input
              id='username'
              type="text"
              {...register('username', { required: 'Username is required' })}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor='password'>Password:</label>
            <input
              id='password'
              type="password"
              {...register('password', { required: 'Password is required' })}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
          </div>

          <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', borderRadius: '5px', width: '100%' }}>
            Register
          </button>
        <span style={{ marginTop: '10px', display: 'inline-block', color: 'black' }}>Already have an account? <a onClick={() => navigate('/login')} style={{ textDecoration: 'underline', cursor: 'pointer', color:'#4CAF50' }}>Login</a></span>
        </form>
      </div>
    </div>
  );
};

export default Register;

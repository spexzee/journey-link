import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/store';

const Login = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const setUserData = useStore((state)=>state.setUserData)

  const onSubmit = (data) => {
    const userData = {
      username: data.username,
      password: data.password
    };
    
    console.log('User Data:', userData);
    setUserData(userData)
    navigate('/roomCreate')
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'black' }}>
      <div style={{ maxWidth: '400px', padding: '80px', borderRadius: '10px',background: '#f0f0f3' }}>
        <h2 style={{textAlign:'center'}}>Login</h2>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

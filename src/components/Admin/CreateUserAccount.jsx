import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Common/Navbar';
import Sidebar from '../Common/Sidebar';
import { TextField, MenuItem, Button, Container, Grid, Typography } from '@mui/material';
import '../../styles/CreateUserAccount.css';

const CreateUserAccount = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (!token) {
      console.log('No token found');
      navigate('/');
    }
  }, [token, navigate]);

  const onSubmit = async (data) => {
    const requestPayload = {
      eventID: '1001',
      addInfo: {
        name: data.name,
        email: data.email,
        role: data.role,
        password: data.password,
      },
    };

    try {
      const response = await axios.post('http://localhost:5164/usernewaccount', requestPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.rData.rMessage === 'CREATE ACCOUNT SUCCESSFULLY!') {
        alert('CREATE ACCOUNT SUCCESSFULLY!');
        if (data.role === 'manager') {
          navigate('/admin/user-management/view-manager');
          localStorage.setItem('email', data.email);
        } else if (data.role === 'supplier') {
          navigate('/admin/user-management/view-supplier');
        }
      } else {
        alert('Something went wrong: ' + response.data.rData.rMessage);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user: ' + error.message);
    }
  };

  return (
    <div className="create-user-account-container">
      <Navbar />
      <div className="create-user-account-content">
        <Sidebar className="sidebar" /> {/* Add class name to Sidebar */}
        <main className="main-content">
          <Container>
            <Typography variant="h4" gutterBottom>
              Create User Account
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="user-form">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    className="text-field-name"
                    label="Name"
                    {...register('name', { required: 'Name is required' })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    className="text-field-email"
                    label="Email"
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    className="text-field-role"
                    select
                    label="Role"
                    {...register('role', { required: 'Role is required' })}
                    error={!!errors.role}
                    helperText={errors.role?.message}
                  >
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="supplier">Supplier</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    className="text-field-password"
                    label="Password"
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" className="submit-button">
                    Create User
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </main>
      </div>
    </div>
  );
};

export default CreateUserAccount;

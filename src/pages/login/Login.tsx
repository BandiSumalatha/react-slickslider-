import  { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { TextField, Link, Grid, Modal, Box } from '@mui/material';
import OTPInput from '../otp/Otp';
import { FormContainer, TitleBox, InnerContainer, ButtonComponent } from './loginStyles';
import { useAuth } from '../../hooks/AuthProvider';
import { TypographyTitle } from '../security/securityStyles';

const Login = () => {
  const { setUserData } = useAuth();
  
  const [formData, setFormData] = useState({ email: '', password: '', emailError: '', passwordError: '' });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (event:any) => {
    const { name, value } = event.target;
    let error = '';
  
    if (name === 'email') {
      error = validateEmail(value) ? '' : 'Please enter a valid email address';
    }
  
    setFormData({ ...formData, [name]: value, [`${name}Error`]: error });
  };
  

  const validateEmail = (email:any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      // Show error message for empty fields
      if (!formData.email.trim()) {
        setFormData((prevData) => ({
          ...prevData,
          emailError: "Please enter your email"
        }));
      }
      if (!formData.password.trim()) {
        setFormData((prevData) => ({
          ...prevData,
          passwordError: "Please enter your password"
        }));
      }
      return; // Exit early if fields are empty
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      const data = await response.json();
      localStorage.setItem('userData', JSON.stringify(data));
      setUserData(data);
      setShowModal(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <FormContainer  maxWidth="md">
      <TitleBox>
        <TypographyTitle  variant="h5" >
          Login Form
        </TypographyTitle>
      </TitleBox>
      <InnerContainer>
        <form onSubmit={handleSubmit}>
        <TextField
  variant="outlined"
  margin="normal"
   
  size="small"
  fullWidth
  id="email"
  label="Email Address"
  placeholder="Enter your email address"
  name="email"
  autoComplete="email"
  autoFocus
  value={formData.email}
  onChange={handleChange}
  error={!!formData.emailError}
  helperText={formData.emailError}
/>
    <TextField
  variant="outlined"
  margin="normal"
  size="small"
   
  fullWidth
  name="password"
  label="Password"
  placeholder="Enter your password"
  type="password"
  id="password"
  autoComplete="current-password"
  value={formData.password}
  onChange={handleChange}
  error={!!formData.passwordError}
  helperText={formData.passwordError}
/>
          <ButtonComponent
            type="submit"
            fullWidth
            style={{marginTop:"30px"}}
            variant="contained"
            color="primary"
          >
            Sign In
          </ButtonComponent>
          <Grid container>
            <Grid item xs mt={3}>
              <Link component={RouterLink} to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item mt={3}>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </InnerContainer>
      <Modal open={showModal} onClose={closeModal}>
      <Box>
          <OTPInput />
      </Box>
      </Modal>
    </FormContainer>
  );
};

export default Login;

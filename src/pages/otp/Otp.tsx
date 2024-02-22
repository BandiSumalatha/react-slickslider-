import { useState, useRef } from 'react';
import { TextField, Grid, Typography } from '@mui/material';
import { GridContainer, GridButtonContainer } from './otpStyles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../login/loginStyles';

const OTPInput = ({ length = 6 }) => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState(Array(length).fill(''));
  const inputRefs = useRef(Array(length).fill(null));
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (index:any, value:any) => {
    if (isNaN(Number(value))) return;
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    if (value !== '' && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e:any, index:any) => {
    if (e.key === 'Backspace' && index !== 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmitOTP = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/otp', { otp: otp.join('') });
      console.log('Response:', response);
      if (response.status === 200) {
        setErrorMessage('');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error validating OTP:', error);
      setErrorMessage('Failed to validate OTP');
    }
  };

  return (
    <GridContainer container spacing={1} direction="column" alignItems="center" minHeight={300}>
      <form onSubmit={handleSubmitOTP}>
        <Typography variant="h6" style={{ color: "#570987", textAlign: "center", paddingBottom: '20px' }}>Enter OTP code</Typography>
        <Typography variant='body2'>
          We have sent you SMS with 6 digit verification code (OTP) on your Register Email address
        </Typography>
        <Grid item>
          <Grid container spacing={1} justifyContent="center" padding={2} pt={5}>
            {otp.map((digit, index) => (
              <Grid item key={index}>
                <TextField
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  variant="outlined"
                  type="text"
                  size="small"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      width: '1rem',
                      borderRadius: '45px',
                      textAlign: 'center',
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        {errorMessage && (
          <Typography variant="body2" style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
            {errorMessage}
          </Typography>
        )}
        <GridButtonContainer>
          <ButtonComponent variant="contained" type="submit" fullWidth style={{ borderRadius: '50px', background: "green" }}>
            Validate
          </ButtonComponent>
        </GridButtonContainer>
      </form>
    </GridContainer>
  );
};

export default OTPInput;

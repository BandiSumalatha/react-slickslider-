import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { FormControlLabel, Radio, RadioGroup, InputAdornment, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ButtonGrid, CustomButton, StyledFormGroup ,OuterContainer,Horizantal} from "../signup/signupStyles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PasswordValidation {
    lowercase: boolean;
    uppercase: boolean;
    number: boolean;
    specialChar: boolean;
    length: boolean;
    match: boolean;
    showValidation?: boolean;
}

interface FormValues {
    fname: string;
    lname: string;
    phonenumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    dob: string;
    gender: string;
}

const EditProfile: React.FC = () => {
    const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
    console.log(passwordFocused)
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const navigate=useNavigate()
    const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false,
        length: false,
        match: false,
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [form, setForm] = useState<FormValues>({
        fname: '',
        lname: '',
        phonenumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        dob: '',
        gender: '',
    });

    const [errors, setErrors] = useState<FormValues>({
        fname: '',
        lname: '',
        phonenumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        dob: '',
        gender: '',
    });
    const populateFormData = () => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        setForm({
          fname: userData.user.fname,
          lname: userData.user.lname,
          phonenumber: userData.user.phonenumber,
          email: userData.user.email,
          password: userData.user.password, 
          confirmPassword: userData.user.ConfirmPassword,
          address: userData.user.address,
          dob: userData.user.dob,
          gender: userData.user.gender,
          
        });
      };
    
      useEffect(() => {
      
        populateFormData();
      }, []);
    
    const handlePasswordFocus = () => {
        setPasswordFocused(true);
        if (!passwordValidation.match) {
            setPasswordValidation(prevState => ({ ...prevState, showValidation: true }));
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
    

        try {
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            const userId = userData.user.id;
            console.log(userId,"useriD")
            const response = await fetch(`http://localhost:3000/api/users/update-user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            if (!response.ok) {
                throw new Error('failed to Submit form');
            }
            setForm({
                fname: '',
                lname: '',
                phonenumber: '',
                email: '',
                password: '',
                confirmPassword: '',
                address: '',
                dob: '', // Reset dob
                gender: '',
            });
            setErrors({
                fname: '',
                lname: '',
                phonenumber: '',
                email: '',
                password: '',
                confirmPassword: '',
                address: '',
                dob: '',
                gender: '',
            });
            console.log('Form submitted successfully');
            toast.success('Registration successful!');
            navigate("/");
        } catch (err) {
            toast.error('User registration failed.');
            console.log(err);
        }
    };


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let isValid = true;
        switch (name) {
            case 'fname':
            case 'lname':
            case 'address':
                isValid = value !== '';
                break;
            case 'email':
                isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/.test(value); // Check if it's a valid email format
                setEmailValid(isValid);
                break;
            case 'password':
                isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
                setPasswordValidation(prevState => ({ ...prevState, lowercase: /[a-z]/.test(value), uppercase: /[A-Z]/.test(value), number: /\d/.test(value), specialChar: /[@$!%*?&]/.test(value), length: value.length >= 8 }));
                setErrors(prevState => ({
                    ...prevState,
                    password: isValid ? '' : "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long."
                }));
                break;
            case 'confirmPassword':
                isValid = value === form.password;
                setErrors(prevState => ({
                    ...prevState,
                    confirmPassword: isValid ? '' : "Passwords do not match"
                }));
                break;
            case 'dob':
                break;
            default:
                break;
        }

        setForm({ ...form, [name]: value });
        if (name !== 'email' && name !== 'password' && name !== 'confirmPassword') {
            setPasswordValidation(prevState => ({ ...prevState, [name]: isValid }));
        }
        setErrors(prevState => ({
            ...prevState,
            [name]: isValid ? '' : `Please enter ${name === 'dob' ? 'Date of Birth' : name}`
        }));
    };


    const handlePasswordBlur = () => {
        setPasswordFocused(false);
    };

    return (
        <>
            <ToastContainer />
            <OuterContainer maxWidth="lg">
                <Horizantal>
                    <Typography  variant="h4" textAlign={"center"} p={4}>Edit Profile</Typography>
                </Horizantal>
                <form onSubmit={handleSubmit} style={{ height: 'auto', padding: "30px" }}>

                    <Grid container spacing={2} mb={2}   >
                        <Grid item xs={12} lg={6} >
                            <TextField type="text" size="small" fullWidth placeholder="First Name" name='fname' value={form.fname} onChange={handleChange} error={!!errors.fname} helperText={errors.fname} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField type="text" size="small" fullWidth name='lname' placeholder="Last Name" value={form.lname} onChange={handleChange} error={!!errors.lname} helperText={errors.lname} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} mb={2}   >
                        <Grid item xs={12} lg={6}>
                            <TextField type="text" size="small" fullWidth name='phonenumber' placeholder='Middle Name' value={form.phonenumber} onChange={handleChange} error={!!errors.phonenumber} helperText={errors.phonenumber} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField type="email"
                                size="small"

                                fullWidth
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => {
                                    const { name, value } = e.target;
                                    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                                    setForm({ ...form, [name]: value });
                                    setEmailValid(isValidEmail);
                                }}
                                error={!emailValid || !!errors.email}
                                helperText={!emailValid ? 'Invalid email format' : errors.email} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} mb={2}   >
                        <Grid item xs={12} lg={6}>
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                size="small"
                                placeholder="Password"
                                fullWidth
                                name="password"
                                value={form.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleTogglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={handleChange}
                                onFocus={handlePasswordFocus}
                                onBlur={handlePasswordBlur}
                                error={!!errors.password}
                                helperText={errors.password}
                            />

                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                type="password"
                                size="small"
                                fullWidth
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                error={!!errors.confirmPassword} // Ensure error prop is set based on the existence of confirmPassword error
                                helperText={errors.confirmPassword} // Display confirmPassword error message as helper text
                            />

                        </Grid>
                    </Grid>
                    <Grid container spacing={2} mb={2}   >
                        <Grid item xs={12} lg={6}>
                            <TextField type="text" size="small" fullWidth name="address" placeholder='Address' value={form.address} onChange={handleChange} error={!!errors.address} helperText={errors.address} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField type="date" size="small" fullWidth name="dob" placeholder='Date of Birth' value={form.dob} onChange={handleChange} error={!!errors.dob} helperText={errors.dob} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} mb={2}   >
                        <Grid item xs={12}   >
                            <Typography style={{ paddingTop: '10px' }}> Select Gender</Typography>
                            <RadioGroup
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}>
                                <StyledFormGroup>
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio checked={form.gender === "male"} />}
                                        label="Male"
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio checked={form.gender === "female"} />}
                                        label="Female"
                                    />                                    </StyledFormGroup>
                            </RadioGroup>
                            {!!errors.gender && <Typography variant="body2" color="error">{errors.gender}</Typography>}
                        </Grid>
                    </Grid>
                    <ButtonGrid >
                        <CustomButton type="submit" variant='contained'>Submit</CustomButton>
                    </ButtonGrid>

                </form>
            </OuterContainer>
        </>
    );
};

export default EditProfile;

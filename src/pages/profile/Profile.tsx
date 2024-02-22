import { useEffect, useState } from 'react';
import userimage from "../../assets/profile.png";
import Skeleton from '@mui/material/Skeleton';
import { Box, Grid, Button } from "@mui/material";
import { Edit } from '@mui/icons-material'; 
import { InnerContainer, profileImageStyle, StyleTypography,StyleTypographyName} from './profileStyles';
import { useAuth } from '../../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate=useNavigate()

  useEffect(() => {
    setIsLoading(false);
  }, [userData]);

  if (!userData || isLoading) {
    return <Box className="profile-container no-user-data">No user data found</Box>;
  }
  const handleEdit=()=>{
    navigate("/editprofile")
  }

  return (
    <InnerContainer>
      <Grid container spacing={2}>
        <Grid item lg={4} >
          {isLoading ? (
            <Skeleton width={200} height={200} animation="wave" />
          ) : (
            <img src={userimage} alt="Profile" style={profileImageStyle}  />
          )}
        </Grid>
        <Grid item lg={6} sm={6}>
          <StyleTypographyName variant='h1'>
            Welcome, {userData.user?.fname.charAt(0).toUpperCase() + userData.user?.fname.slice(1)} {userData.user?.lname.charAt(0).toUpperCase() + userData.user?.lname.slice(1)}!
          </StyleTypographyName>
          <StyleTypography variant='h6'>Email: {userData.user?.email}</StyleTypography>
          <StyleTypography>Phone Number: {userData.user?.phonenumber}</StyleTypography>
          <StyleTypography>Address: {userData.user?.address}</StyleTypography>
          <StyleTypography>Date of Birth: {userData.user?.dob}</StyleTypography>
        </Grid>
        <Grid item lg={2}>
         <Button onClick={handleEdit}>
         <Edit /> Edit Profile
         </Button>
                   
        </Grid>
      </Grid>
    </InnerContainer>
  );
};

export default Profile;

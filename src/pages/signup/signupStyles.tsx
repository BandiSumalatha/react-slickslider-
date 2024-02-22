import { styled } from '@mui/system';
import { FormGroup } from '@mui/material';
import {Button,Box} from '@mui/material';

export const StyledFormGroup = styled(FormGroup)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const OuterContainer = styled(Box)({
  border: "1px solid black", 
  padding: "0px", 
  margin: '30px auto', 
  marginBottom: '20px' ,
  maxHeight:'900px',
  borderRadius:'15px'
});

export const Horizantal=styled(Box)({
  borderRadius:'15px 15px 0 0',
  color:'white',
  background:'linear-gradient(to right, #8B008B, #FF007F)',
  width: "100%",
   borderBottom: '1px solid black',
   padding:"0px"
})

export const CustomButton = styled(Button) ({
  padding:'10px',
   width:'500px',
   borderRadius:'50px',
   background:'linear-gradient(to right, #8B008B, #FF007F)'
});

export const ButtonGrid=styled(Box)({
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: "center"
})


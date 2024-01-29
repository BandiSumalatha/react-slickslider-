import React from 'react';
import facebook from "../../assets/footer-images/facebook.svg";
import twitter from "../../assets/footer-images/twitter.svg";
import { Container, Grid, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(() => ({
  root: {
    padding: '20px',
    marginTop: '20px',
    position:'relative',
    bottom:"0px",
  
  },
  paper: {
        padding: '10px',
    backgroundColor: 'transparent',
  },
  title: {
    color: 'black',
    marginBottom: '10px',
    textAlign:'left',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
  
  },
  centerText: {
   textAlign:'left',
   lineHeight:'30px'
  },
  socialIcon: {
    width: '40px', 
    height: '40px', 
    marginRight: '10px',
    cursor: 'pointer',
    textAlign:'left'
  },
  neoStackContainer: {
    background: 'black',
       width: '100%',
    padding: '10px',
    textAlign: 'center', 
    position:'relative',
    bottom:"0px"
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <>
    <Container component="footer" >
      <Grid container spacing={0} justifyContent="space-between" className={classes.root} alignItems="flex-start">
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>
            <Typography variant="h6" className={classes.title}>Company</Typography>
            <ul style={{ listStyle: 'none', padding: 0 }} className={classes.centerText}>
              <li>Community</li>
              <li>Blog</li>
              <li>Events</li>
            </ul>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>
            <Typography variant="h6" className={classes.title}>Open Source</Typography>
            <ul style={{ listStyle: 'none', padding: 0 }} className={classes.centerText}>
              <li>react-slick</li>
              <li>react-highlight</li>
            </ul>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>
            <Typography variant="h6" className={classes.title}>Meetups</Typography>
            <ul style={{ listStyle: 'none', padding: 0 }} className={classes.centerText}>
              <li>ReactJS Bangalore</li>
              <li>Blockchain Bangalore</li>
            </ul>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>
            <Typography variant="h6" className={classes.title}>Social</Typography>
            <Link to="/twitter" target="_blank" className={classes.link}>
          <img src={twitter} alt="Twitter" className={classes.socialIcon} />
        </Link>
        <Link to="/facebook" target="_blank" className={classes.link}>
          <img src={facebook} alt="Facebook" className={classes.socialIcon} />
        </Link>
          </Paper>
        </Grid>
      </Grid>
    </Container>
          <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={`${classes.centerText} ${classes.neoStackContainer}`}
  
        >        <Typography variant="h6" sx={{color:'white'}}className={classes.title}>@NeoStack</Typography>
        </Grid>
        </>
  );
};

export default Footer;

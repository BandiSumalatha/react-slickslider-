import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import logo from "../../assets/digitelescope_logo.jpeg";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: "#f8f8f8",
        display: "flex",
        alignItems: "center",
      },
      logo: {
        width: 100,
        height: 50,
        mixBlendMode: "multiply",
      },
      headerText: {
        flexGrow: 1,
        color: "red",
        textAlign: "center",
      },
    }));

const Header: React.FC = () => {

  const classes = useStyles();

  return (
    <AppBar position="sticky" >
      <Toolbar className={classes.root}>
        <Box>
          <img src={logo} alt="Logo" className={classes.logo} />
        </Box>
      
      </Toolbar>
    </AppBar>
  );
};

export default Header;

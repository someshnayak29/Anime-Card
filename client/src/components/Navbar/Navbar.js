// move Appbar from App.js to here, as this .js file is dedicated specifically for Navigation bar
// typography component = {Link}, as it has to point to home page, to = "/"
// If user exists, we will display it in toolbar as avatar

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Avatar, Button } from "@mui/material";
import { deepPurple } from '@mui/material/colors';
import OnePiece from "../../images/OnePiece.png";
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); //fetching user from localStorage immediately
    console.log(user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
      dispatch({ type : 'LOGOUT'});
      navigate('/'); // when user logouts it should redirect back to home page and set user as null
      setUser(null);
    };

    // we want to call this useEffect when url changes from '/auth' to '/', therefore we use useLocation hook
    useEffect(() => {
      const token = user?.token;

      if(token) {
        const decodedToken = jwtDecode(token);
        
        // compare in milli sec and if token expired, then logout the user
        if(decodedToken.exp * 1000 < new Date().getTime())
          logout();
      }

      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]); // when location changes set the user

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        borderRadius: 15,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          component={Link}
          to="/"
          variant="h2"
          align="center"
          sx={{
            color: "rgba(0,183,255, 1)",
            textDecoration : "none"
          }}
        >
          Anime Planet
        </Typography>
        <img
          src={OnePiece}
          alt="Anime"
          height="60"
          sx={{ marginLeft: "15px" }}
        />
      </div>
      <Toolbar
        sx={{ display: "flex", justifyContent: "flex-end", width: "400px" }}
      >
        {user ? (
            <div style={{ display: "flex", justifyContent: "space-between", width: "400px" }}>
                <Avatar sx = {{ color: (theme) => theme.palette.getContrastText(deepPurple[500]) ,backgroundColor: deepPurple[500] }} alt = {user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography sx = {{ display: "flex", alignItems: "center" }} variant = "h6">{user.result.name}</Typography>
                <Button variant = "contained" sx = {{ marginLeft : '20px' }} color = "secondary" onClick={logout}>Logout</Button>
            </div>
        ) : (
            <Button component={Link} to="/auth" variant = "contained" color = "primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

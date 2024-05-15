import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
//InputProps is for showing icons on right side of input e.g show password
//The InputAdornment helps to add a prefix, a suffix, or an action to an input field.
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField 
        name = {name}
        onChange={handleChange}
        variant = "outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type = {type}
        InputProps={name === 'password' ? {
            endAdornment : (
                <InputAdornment position="end">
                    <IconButton onClick = {handleShowPassword}>
                        {type === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                </InputAdornment>
            ),
        } : null}
      />
    </Grid>
  );
};

export default Input;

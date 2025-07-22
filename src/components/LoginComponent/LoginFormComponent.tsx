
import React from 'react'
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from '@mui/material/Grid2'
import "./loginform.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, selectToken } from "../../app/features/auth/authSlice";
import { useLoginMutation } from "../../services/mainApiSlice";
import { CopyrightComp } from "../common/CopyrightComp";
import { CustomButtonComp } from '../common/Button';
import snackBarUtil from '../../utils/snackbar';


const btnprops = {
  text: "Log in",
  width: "100%",
  mt: "20px",
  fontsize: "16px",
  fontfamily: "Poppins, sans-serif",
  lineheight: "24px",
  height: "46px",
  color: "text.main",
};


const props = {
  position: "absolute",
};

const LoginFormComp = () => {
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [check, setChecked] = useState(false);
  const [errormsg, setError] = useState({
    user_name: "user name is empty",
    password: "password is empty",
    user_type: "user is required"
  })
  const [authcred, setAuthCred] = useState({
    user_name: "",
    password: "",
    user_type:""
  });

  const [trigger, { data: logindata, isLoading, isError, isSuccess, error: err }] =
    useLoginMutation();

  const handleChange = (event: SelectChangeEvent) => {
    setAuthCred({...authcred,user_type:event.target.value});
  };
  const handlerChange = (e: any) => {
    const { name, value } = e.target;

    setAuthCred((previousValue) => {
      return {
        ...previousValue,
        [name]: value,
      };
    });
  };

  const handlerChangeCheckbox = (e: any) => {
    setChecked(e.target.checked);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError({ user_name: '', password: '', user_type: '' })

    let hasError = false;

    let newErrors = { user_name: '', password: '',user_type: '' };

    if (!authcred?.user_name?.trim()) {
      newErrors.user_name = "username is required"
      hasError = true;
      snackBarUtil.error(newErrors.user_name)
    }

    if (!authcred?.user_name && authcred?.password) {
      newErrors.user_name = "username is required";
      hasError = true;
      snackBarUtil.error(newErrors.user_name)

    }

    if (!authcred?.password && authcred?.user_name) {
      newErrors.password = "password is required";
      hasError = true;
      snackBarUtil.error(newErrors.password)

    }

    if (!authcred?.user_name?.trim()) {
      newErrors.password = "password is required";
      hasError = true;
      snackBarUtil.error(newErrors.password)
    }

    if (!authcred?.user_name?.trim()) {
      newErrors.user_type = "user type is required";
      hasError = true;
      snackBarUtil.error(newErrors.user_type)
    }

      if (!authcred?.user_type && authcred?.user_name) {
      newErrors.user_type = "user type is required";
      hasError = true;
      snackBarUtil.error(newErrors.user_type)
      }  

    if (hasError) {
      setError(newErrors);
      return;
    }

    if (authcred?.password.length < 5) {
      return
    }

    try {
      const res = await trigger(authcred).unwrap();
      dispatch(login(res));
      if (res?.token) {
        localStorage.setItem('token', res?.token)
        localStorage.setItem('username', res?.data?.user_name)
        navigate('/home')
      }
      snackBarUtil.success(logindata?.message)
    } catch (error: any) {
      console.log(`something went wrong ${error}`);

      if (error?.data?.message) {
        let apiErrors = { user_name: '', password: '',user_type: '' };

        if (error.data.message.includes('user_name')) {
          apiErrors.user_name = 'Invalid username';
        }

        if (error.data.message.includes('password')) {
          apiErrors.password = 'Invalid password'
        }

        if (error.data.message.includes('user_ype')) {
          apiErrors.password = 'Please Select User Type'
        }
        setError(apiErrors)
      }

    }
  };
  // console.log(token, 'alskdjflaksdjf')
  // useEffect(() => {
  //   if (logindata?.token) {
  //     if (localStorage.getItem("token")) {
  //       navigate("/home");
  //     } else {
  //       navigate('/login')
  //     }
  //   }

  // }, [token])

  return (
    <Box
      className="form-parent"
      sx={{
        backgroundColor: "primary.main",
        width: "100dvw",
        height: "100dvh",
        overflow: "hidden",
      }}
    >

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100dvh",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            maxWidth: "423px",
            maxHeight: "500px",
            height: "100%",
            position: "relative",
          }}
        >
          <Grid
            size={{ xs: 12 }}
            sx={{
              width: "100%",
              backgroundColor: "formbg.main",
              height: "100%",
              borderRadius: "10px",
              padding: "60px 0",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "info.main",
                lineHeight: "1.3",
                fontWeight: "600",
                fontSize: "27px",
                width: "100%",
                minWidth: "264px",
                textAlign: "center",
                p: "0px 60px",
                pb: "20px",
              }}
            >
              Login with your Alfallawah Account
            </Typography>

            <form className="login-form" onSubmit={handleSubmit}>
              <TextField
                onChange={handlerChange}
                fullWidth
                id="email"
                label="Email Address"
                variant="filled"
                type="text"
                name="user_name"
                // helperText={
                //   <Typography sx={{
                //     fontSize: '11px',
                //     color: errormsg.user_name ? 'red' : ''
                //   }}>
                //     {errormsg.user_name}
                //   </Typography>
                // }
                value={authcred?.user_name}
                sx={{
                  "& .MuiInputBase-root": {
                    height: "46px",
                    fontFamily: "Poppins, sans-serif",
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    top: "6px",
                  },

                  "& .MuiInputBase-input": {
                    fontSize: "9px",
                    fontFamily: "Poppins, sans-serif",
                  },
                  "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after":
                  {
                    display: "none",
                  },
                  "MuiInputBase-input-MuiOutlinedInput-input": {
                    fontSize: "9px",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#181818",
                    fontSize: "11px",
                    fontWeight: "bold",
                    lineHeight: "16.5px",
                  },

                  "& .MuiOutlinedInput-notchedOutline legend": {
                    fontSize: "11px",
                    fontWeight: "bold",
                    top: "40px",
                  },
                  width: "351px",
                  height: "46px",
                  paddingY: "0",
                  mt: 0,
                  backgroundColor: "white",
                  borderRadius: "3px",
                }}
              />

              <TextField
                onChange={handlerChange}
                fullWidth
                name="password"
                id="password"
                label="Password"
                variant="filled"
                type="password"
                value={authcred?.password}
                // helperText={
                //   <Typography sx={{
                //     fontSize: '11px',
                //     color: errormsg.password ? 'red' : ''
                //   }}>
                //     {errormsg.password}
                //   </Typography>
                // }
                sx={{
                  "& .MuiInputBase-root": {
                    height: "46px",
                    fontFamily: "Poppins, sans-serif",
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    top: "6px",
                  },

                  "& .MuiInputBase-input": {
                    fontSize: "9px",
                    fontFamily: "Poppins, sans-serif",
                  },
                  "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after":
                  {
                    display: "none",
                  },
                  "MuiInputBase-input-MuiOutlinedInput-input": {
                    fontSize: "9px",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#181818",
                    fontSize: "11px",
                    fontWeight: "bold",
                    lineHeight: "16.5px",
                  },
                  "& .MuiOutlinedInput-notchedOutline legend": {
                    fontSize: "11px",
                    fontWeight: "bold",
                    top: "40px",
                  },
                  width: "351px",
                  height: "46px",
                  paddingY: "0",
                  mt: 3,
                  backgroundColor: "white",
                  borderRadius: "3px",
                }}
              />



              <FormControl variant="filled"
                sx={{
                  minWidth: 350,
                  height: '50px',
                  backgroundColor: '#fff',
                  mt: 3,
                  borderRadius: '3px',
                  borderBottom: '0px',
                }}>
                <InputLabel id="demo-simple-select-filled-label"
                  sx={{
                    fontSize: '12px',
                    color: '#121212'
                  }}
                >User Type</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={authcred.user_type}
                  onChange={handleChange}
                  sx={{
                    borderBottom: '0px', "::before":{
                      border: 'none',
                    },
                    ":hover:before":{
                      borderBottom:'none !important'
                    }
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={2}>User</MenuItem>
                </Select>
              </FormControl>



              {/* checkbox here */}



              <FormControlLabel
                // value={authcred.keepsigned}
                onChange={handlerChangeCheckbox}
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      p: 0,
                      mt: 3,
                      "&.Mui-checked": {
                        color: "#34BE66",
                      },
                    }}
                    defaultChecked
                  />
                }
                label="Keep me signed"
                sx={{
                  m: 0,
                  display: "flex",
                  alignItems: "flex-end",
                  "& .MuiTypography-root": {
                    fontSize: "11px",
                    fontWeight: "500",
                    color: "#fff",
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
              />

              <CustomButtonComp props={btnprops} type={"submit"} />
            </form>
          </Grid>
        </Grid>
      </Container>

      <CopyrightComp props={props} />
    </Box>
  );
};

export default LoginFormComp;

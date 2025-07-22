import { Box, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const LoginFormComp = () => {
  const theme = useTheme();
  return (
    <Box
      className="form-parent"
      sx={{ backgroundColor: "primary.main", width: "100dvw", height: "100dvh", overflow: "hidden" }}
    >
      <Container maxWidth="lg" sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'100dvh'
      }}>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            maxWidth: "423px",
            maxHeight: "414px",
            height: "100%",
          }}
        >
          <Grid
          xs={12}
            sx={{width:'100%',p:'20px 60px', backgroundColor:"formbg.main", height:'100%', 
            borderRadius:'10px'
            }}
          >
            <Typography
              sx={{ fontFamily:'Poppins, sans-serif', color: "info.main", 
                lineHeight:'1.3',fontWeight:'600', fontSize: '27px',
                 width:'100%', minWidth:'264px', textAlign:'center',  }}
            >
              Login with your Alfallawah Account
            </Typography>
          </Grid>
        </Grid>
        <form></form>
      </Container>
    </Box>
  );
};

export default LoginFormComp;

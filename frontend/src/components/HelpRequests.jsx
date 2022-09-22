import { Container, Grid, Snackbar, Typography, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MuiAlert from "@mui/material/Alert";
import React, { useState, useEffect } from "react";
import HelpRequestService from "../services/helpRequests";
import HelpRequest from "./HelpRequest";
const HelpRequests = ({ user }) => {
  const [requests, setRequests] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const OpenSnackbar = (text) => {
    setSnackbarText(text);
    setSnackbarOpen(true);
  };

  const Update = () => {
    HelpRequestService.GetHelpRequests()
      .then((response) => {
        setRequests(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    Update();
  }, []);

  return (
    <Container>
      <Typography sx={{ textAlign: "center", marginTop: 3 }} variant='h2'>
        Help Requests
      </Typography>
      <Typography
        sx={{ textAlign: "center", marginTop: 3 }}
        variant='h5'
        color='text.secondary'
      >
        Welcome to the Help request page! Manage help requests here.
      </Typography>

      <Typography sx={{ textAlign: "center", marginTop: 3 }} variant='h4'>
        Pending Requests
      </Typography>

      <Grid container padding={2} spacing={5} justifyContent='center'>
        {requests
          ?.filter((r) => r.volunteer === null && !r.finished)
          .map((r) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={r.id}>
              <HelpRequest
                user={user}
                helpRequest={r}
                update={Update}
                OpenSnackbar={OpenSnackbar}
              />
            </Grid>
          ))}
      </Grid>

      <Typography sx={{ textAlign: "center", marginTop: 3 }} variant='h4'>
        Active Requests
      </Typography>

      <Grid container padding={2} spacing={5} justifyContent='center'>
        {requests
          ?.filter((r) => r.volunteer !== null && !r.finished)
          .map((r) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={r.id}>
              <HelpRequest
                user={user}
                helpRequest={r}
                update={Update}
                OpenSnackbar={OpenSnackbar}
              />
            </Grid>
          ))}
      </Grid>

      <Typography sx={{ textAlign: "center", marginTop: 3 }} variant='h4'>
        Finished Requests
      </Typography>

      <Grid container padding={2} spacing={5} justifyContent='center'>
        {requests
          ?.filter((r) => r.finished)
          .map((r) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={r.id}>
              <HelpRequest
                user={user}
                helpRequest={r}
                update={Update}
                OpenSnackbar={OpenSnackbar}
              />
            </Grid>
          ))}
      </Grid>

      <Fab
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        variant='extended'
        color='primary'
        aria-label='add'
        // onClick={handleOpen}
      >
        New Request
        {<AddIcon sx={{ ml: 1 }} />}
      </Fab>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          {snackbarText}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HelpRequests;

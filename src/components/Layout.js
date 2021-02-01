
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Footer from "../containers/Layout/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import AsyncReqAlerts from "../ui/AsyncReqAlerts";
import { makeStyles } from "@material-ui/core";
import BasicTable from "./BasicTable";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function Layout() {
  const classes = useStyles();
  return (
    <Container component="main" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <FontAwesomeIcon icon={faChartPie} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Main Layout
        </Typography>
        <form className={classes.form} noValidate>
          <AsyncReqAlerts />
          <BasicTable />
        </form>
      </div>
      <Footer sx={{ mt: 8}} />
    </Container>
  );
}

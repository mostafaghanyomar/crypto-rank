import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import { usePageAlerts } from '../hooks/ui';
import * as actions from "../store/actions/index";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function AsyncReqAlerts(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pageAlerts = usePageAlerts(props.pageSection != null ? props.pageSection : null);

  return pageAlerts.map(al => 
    <React.Fragment>
    <div key={'child_'+al.id} className={classes.root}>
        <Alert
        severity={al.alertType}
        variant="filled"
        action={
            <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => dispatch(actions.requestFailureAcknowledged(al.id))}
            >
            <CloseIcon fontSize="inherit" />
            </IconButton>
        }
        >
        {al.message}
        </Alert>
    </div>
    </React.Fragment>
    );

}
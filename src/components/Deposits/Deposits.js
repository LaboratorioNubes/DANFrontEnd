import { React } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title/Title';
import PropTypes from "prop-types";
import { connect } from "react-redux";


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const Deposits = (props) => {
  const classes = useStyles();
    let date = new Date();
  if (props.payments && props.payments.length > 0) {
      date =  new Date(props.payments[props.payments.length-1].fechaPago);
  }

  
  return (
    <>
      <Title>Recent Payments</Title>
      <Typography component="p" variant="h4">
        ${props.payments && props.payments.length > 0 ? props.payments[props.payments.length-1].monto : 0}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
      {props.payments && props.payments.length > 0 ? props.payments[props.payments.length-1].fechaPago.substr(0,10) : "No date available"}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </>
  );
}

Deposits.propTypes = {
  payments: PropTypes.array,
  microserviceActions: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    payments: state.payments.payments.sort((a, b) => b.date - a.date),
  };
};

export default connect(mapStateToProps)(Deposits);
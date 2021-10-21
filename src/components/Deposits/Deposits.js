import { React, useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title/Title';
import axios from "axios";
import PropTypes from "prop-types";
import * as microserviceActions from "../../actions/microserviceActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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
  useEffect(() => {
    axios
      .get(`http://localhost:9003/api/pago/cliente/1`)
      .then((resp) => {
        console.log(resp.data);
        props.microserviceActions.setPayments(resp.data);
      }).catch(error => console.log(error));
  });
  
  return (
    <>
      <Title>Recent Payments</Title>
      <Typography component="p" variant="h4">
        ${props.payments && props.payments.length > 0 ? props.payments[0].monto : 0}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
      {props.payments && props.payments.length > 0 ? props.payments[0].fechaPago : "on 15 October, 2021"}
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

const mapDispatchToProps = (dispatch) => {
  return {
    microserviceActions: bindActionCreators(microserviceActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deposits);
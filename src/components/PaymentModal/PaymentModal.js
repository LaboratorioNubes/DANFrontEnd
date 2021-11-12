import { React, useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import {
  TextField,
  Grid,
  Button,
  makeStyles,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { bindActionCreators } from "redux";
import * as microserviceActions from "../../actions/microserviceActions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: "40rem",
  },
  closeButton: {
    position: "flex",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const PaymentModal = (props) => {
  useEffect(() => {
    // axios
    //   .get(`http://localhost:9003/api/pago/cliente/1`)
    //   .then((resp) => {
    //     console.log(resp.data);
    //     props.microserviceActions.setPayments(resp.data);
    //   });
  });
  const classes = useStyles();
  const { open } = props;
  let dateC = new Date();

  let day = dateC.getDate();
  let month = dateC.getMonth() + 1;
  let year = dateC.getFullYear();

  let initialDate;

  if (month < 10) {
    initialDate = `${day}-0${month}-${year}`;
  } else {
    initialDate = `${day}-${month}-${year}`;
  }

  const [paymentForm, setPaymentForm] = useState({
    method: "",
    date: initialDate,
    value: 0.0,
    billNum: "",
    checkNum: "",
    checkDate: initialDate,
    bank: "",
    transferCode: "",
    originCbu: "",
    destinationCbu: "",
    alertSucced: false,
  });

  /*const handleOpen = () => {
    setOpen(true);
  };*/
  const setDate = (e) => {
    debugger;
    let checkdate;

    let dayC = e.getDate();
    let monthC = e.getMonth() + 1;
    let yearC = e.getFullYear();

    if (monthC < 10) {
      checkdate = `${dayC}-0${monthC}-${yearC}`;
    } else {
      checkdate = `${dayC}-${monthC}-${yearC}`;
    }
    setPaymentForm({
      ...paymentForm,
      checkDate: checkdate,
    });
  };

  const handleClose = () => {
    props.handlePaymentModalClose();
  };

  const handleMethodChange = (e) => {
    setPaymentForm({ ...paymentForm, method: e.target.value });
  };

  const handleSubmit = (e) => {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    e.preventDefault();

    let payment;
    if (paymentForm.method === "Check") {
      payment = {
        cliente: 1,
        fechaPago: paymentForm.date,
        monto: paymentForm.value,
        efectivo: null,
        transferencia: null,
        cheque: {
          nroCheque: paymentForm.checkNum,
          fechaCobro: paymentForm.checkDate,
          banco: paymentForm.bank,
        },
      };
    } else if (paymentForm.method === "Cash") {
      payment = {
        cliente: 1,
        fechaPago: paymentForm.date,
        monto: paymentForm.value,
        efectivo: {
          nroRecibo: paymentForm.billNum,
        },
        transferencia: null,
        cheque: null,
      };
    } else if (paymentForm.method === "Transfer") {
      payment = {
        cliente: 1,
        fechaPago: paymentForm.date,
        monto: paymentForm.value,
        efectivo: null,
        transferencia: {
          cbuOrigen: paymentForm.originCbu,
          cbuDestino: paymentForm.destinationCbu,
          codigoTransferencia: paymentForm.transferCode,
        },
        cheque: null,
      };
    }
    console.log(payment);
    axios
      .post(`http://localhost:1000/cta/pago`, payment, axiosConfig)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        props.handlePopUp();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        //onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.modalHeader}>
              <h2 id="transition-modal-title">Payment</h2>
              <div>
                <IconButton
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disabled
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      id="date"
                      label="Date"
                      helperText=""
                      error={false}
                      inputValue={paymentForm.date}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          date: e,
                        })
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-method-native-simple">
                      Method
                    </InputLabel>
                    <Select
                      native
                      value={paymentForm.method}
                      onChange={handleMethodChange}
                      label="Method"
                      inputProps={{
                        name: "method",
                        id: "outlined-method-native-simple",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={"Cash"}>Cash</option>
                      <option value={"Check"}>Check</option>
                      <option value={"Transfer"}>Transfer</option>
                    </Select>
                  </FormControl>
                </Grid>
                {paymentForm.method === "Cash" && (
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="billNum"
                      label="Bill Number"
                      name="billNum"
                      autoComplete="Bill Number"
                      value={paymentForm.billNum}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          billNum: e.target.value,
                        })
                      }
                    />
                  </Grid>
                )}
                {paymentForm.method === "Check" && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="checkNum"
                        label="Check Number"
                        name="checkNum"
                        autoComplete="Check Number"
                        value={paymentForm.checkNum}
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            checkNum: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="bank"
                        label="Bank"
                        name="bank"
                        autoComplete="Bank"
                        value={paymentForm.bank}
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            bank: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          id="date-check"
                          label="Check Datee"
                          helperText=""
                          error={false}
                          inputValue={paymentForm.date}
                          onChange={setDate}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  </>
                )}
                {paymentForm.method === "Transfer" && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="transferCode"
                        label="Transfer Code"
                        name="transferCode"
                        autoComplete="Transfer Code"
                        type="number"
                        value={paymentForm.transferCode}
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            transferCode: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="originCbu"
                        label="Origin Cbu"
                        name="originCbu"
                        autoComplete="Origin Cbu"
                        value={paymentForm.originCbu}
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            originCbu: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="destinationCbu"
                        label="Destination Cbu"
                        name="destinationCbu"
                        autoComplete="Destination Cbu"
                        value={paymentForm.destinationCbu}
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            destinationCbu: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="value"
                    label="$ Value"
                    type="number"
                    id="value"
                    autoComplete="current-value"
                    value={paymentForm.value}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        value: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Grid container justifyContent="flex-end"></Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

PaymentModal.propTypes = {
  open: PropTypes.bool,
  handlePaymentModalClose: PropTypes.func,
  handlePopUp: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    payments: state.payments.payments.sort((a, b) => a.date - b.date),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    microserviceActions: bindActionCreators(microserviceActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);

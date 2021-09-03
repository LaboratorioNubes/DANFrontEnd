import { React, useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import {
  TextField,
  FormControlLabel,
  Checkbox,
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
    //color: theme.palette.grey[500],
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  formControl: {
    //margin: theme.spacing(1),
    //minWidth: 200,
  },
}));

const PaymentModal = (props) => {
  const classes = useStyles();
  const { open } = props;
  const [paymentForm, setPaymentForm] = useState({
    method: "",
    date: new Date(),
    value: null,
    billNum: "",
    checkNum: "",
    checkDate: new Date(),
    bank: "",
    transferCode: "",
    originCbu: "",
    destinationCbu: "",
  });

  /*const handleOpen = () => {
    setOpen(true);
  };*/

  const handleClose = () => {
    props.handlePaymentModalClose();
  };

  const handleMethodChange = (e) => {
    setPaymentForm({ ...paymentForm, method: e.target.value });
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
                <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      id="date"
                      label="Date"
                      value={paymentForm.date}
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
                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
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
                          format="MM/dd/yyyy"
                          id="date-check"
                          label="Check Datee"
                          value={paymentForm.checkDate}
                          onChange={(e) =>
                            setPaymentForm({
                              ...paymentForm,
                              checkDate: e,
                            })
                          }
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
                        type="number"
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
                        type="number"
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
                //onClick={validateForm}
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
};

export default PaymentModal;

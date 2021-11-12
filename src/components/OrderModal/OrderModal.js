import { React, useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import productsList from "./products.json";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
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
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import * as microserviceActions from "../../actions/microserviceActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const useStyles = makeStyles((theme) => ({
  modalOrder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& div": {
      //overflow: "scroll",
    },
    overflow: "scroll",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: "60rem",
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
  constructionSelect: {
    display: "flex",
    flexDirection: "column",
  },
  sectionTitle: {
    marginBottom: "0",
    display: "flex",
  },
  itemHeight: {
    height: "2.5rem",
  },
  itemTextFieldHeight: {
    "& input": {
      height: "0.2rem!important",
    },
  },
  productsSelect: {
    display: "flex",
    flexDirection: "column",
  },
  addIcon: {
    marginLeft: "0.5rem",
    cursor: "pointer",
  },
  deleteIconGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  deleteIcon: {
    cursor: "pointer",
    height: "2.5rem",
  },
}));

const OrderModal = (props) => {
  // useEffect(() => {
  //   console.log("LLama obrass");
  //   axios
  //     .get(`http://localhost:9005/api/obra/obras/1`)
  //     .then((resp) => {
  //       console.log(resp.data);
  //       props.microserviceActions.setBuildings(resp.data);
  //     });
  // });

  const classes = useStyles();

  const { open } = props;
  const [orderForm, setOrderForm] = useState({
    construction: "",
    date: new Date(),
    items: [
      {
        quantity: 0,
        product: "",
        amount: 0,
        price: 0,
      },
    ],
    total: 0,
  });

  /*const handleOpen = () => {
    setOpen(true);
  };*/

  const handleClose = () => {
    props.handleOrderModalClose();
  };

  const handleContructionChange = (e) => {
    setOrderForm({ ...orderForm, construction: e.target.value });
  };

  const handleItemProductChange = (e, index) => {
    let currentItems = orderForm.items;
    productsList.forEach((product) => {
      if (product.id == e.target.value) {
        currentItems[index].product = product.name;
        currentItems[index].price = product.price;
      }
    });
    setOrderForm({ ...orderForm, items: currentItems });
  };

  const handleItemQuantityChange = (e, index) => {
    let currentItems = orderForm.items;
    //let currentTotal = orderForm.total;
    currentItems[index].quantity = e.target.value;
    let newTotal = orderForm.total - currentItems[index].amount;
    currentItems[index].amount = e.target.value * currentItems[index].price;
    newTotal = newTotal + currentItems[index].amount;
    /*  let currentTotal = orderForm.total;
    currentTotal = currentTotal - orderForm[index].amount;
    currentTotal = currentTotal + e.target.value; */
    setOrderForm({ ...orderForm, items: currentItems, total: newTotal });
  };

  const AddItem = () => {
    let currentItems = orderForm.items;
    currentItems.push({
      quantity: 0,
      product: "",
      amount: 0,
      price: 0,
    });
    setOrderForm({ ...orderForm, items: currentItems });
  };

  const DeleteItem = (item, index) => {
    let currentItems = orderForm.items;
    let newTotal = orderForm.total - item.amount;
    let deletedItem = currentItems.splice(index, 1);
    setOrderForm({
      ...orderForm,
      items: currentItems,
      total: newTotal,
    });
  };

  const handleAmountChange = (e, index) => {
    let currentTotal = orderForm.total;
    currentTotal = currentTotal - orderForm[index].amount;
    currentTotal = currentTotal + e.target.value;
    setOrderForm({ ...orderForm, total: currentTotal });
  };

  const handleSaveOrder = (e) => {
    e.preventDefault();
    let detalles = [];
    orderForm.items.forEach((item) => {
      detalles.push({
        cantidad: item.quantity,
        producto: item.product,
        monto: item.amount,
        precio: item.price,
      });
    });

    let order = {
      cliente: 1,
      obra: orderForm.construction,
      fechaPedido: orderForm.date,
      items: detalles,
      total: orderForm.total,
    };
    console.log(order);
    axios.post(`http://localhost:1000/pedido/pedido`, order).then((res) => {
      console.log(res);
      console.log(res.data);
    });
    handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modalOrder}
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
              <h2 id="transition-modal-title">Order</h2>
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
                <Grid item xs={12}>
                  <h3
                    id="transition-modal-section"
                    className={classes.sectionTitle}
                  >
                    Destination
                  </h3>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.constructionSelect}
                  >
                    <InputLabel htmlFor="outlined-method-native-simple">
                      Building/Construction
                    </InputLabel>
                    <Select
                      //className={classes.itemHeight}
                      native
                      required
                      value={orderForm.construction}
                      onChange={handleContructionChange}
                      label="Building/Construction"
                      inputProps={{
                        name: "construction",
                        id: "outlined-construction-native-simple",
                      }}
                    >
                      <option aria-label="None" value="" />{" "}
                      {props.buildings.buildings &&
                        props.buildings.buildings.map((b) => (
                          <option value={b}>{b}</option>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <h3
                    id="transition-modal-section"
                    className={classes.sectionTitle}
                  >
                    Items
                    <AddCircleOutlineIcon
                      className={classes.addIcon}
                      onClick={AddItem}
                    />
                  </h3>
                </Grid>
                {orderForm.items &&
                  orderForm.items.map((item, index) => {
                    return (
                      <>
                        <Grid
                          item
                          xs={6}
                          sm={1}
                          className={classes.deleteIconGrid}
                        >
                          <DeleteIcon
                            className={classes.deleteIcon}
                            onClick={(e) => {
                              DeleteItem(item, index);
                            }}
                          />
                        </Grid>
                        <Grid item xs={6} sm={5}>
                          <FormControl
                            variant="outlined"
                            className={classes.productsSelect}
                          >
                            <InputLabel
                              htmlFor="outlined-construction-native-simple"
                              className={classes.productsSelectLabel}
                            >
                              Product
                            </InputLabel>
                            <Select
                              className={classes.itemHeight}
                              //labelWidth=""
                              autoWidth
                              native
                              required
                              value={item.name}
                              onChange={(e) => {
                                handleItemProductChange(e, index);
                              }}
                              label="Product"
                              inputProps={{
                                name: "product",
                                id: "outlined-construction-native-simple",
                              }}
                            >
                              <option aria-label="None" value="" />
                              {productsList &&
                                productsList.map((product) => {
                                  return (
                                    <option key={product.id} value={product.id}>
                                      {product.name}
                                    </option>
                                  );
                                })}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                          <TextField
                            className={classes.itemTextFieldHeight}
                            variant="outlined"
                            InputProps={{ inputProps: { min: 0 } }}
                            disabled={item.product !== "" ? false : true}
                            required
                            fullWidth
                            name="quantity"
                            label="Quantity"
                            type="number"
                            id="quantity"
                            //autoComplete="current-value"
                            value={item.quantity}
                            onChange={(e) => {
                              handleItemQuantityChange(e, index);
                            }}
                          />
                        </Grid>
                        <Grid item xs={6} sm={2}>
                          <TextField
                            className={classes.itemTextFieldHeight}
                            variant="outlined"
                            disabled
                            fullWidth
                            name="price"
                            label="$ Price"
                            type="number"
                            id="price"
                            //autoComplete="current-value"
                            value={item.price}
                          />
                        </Grid>
                        <Grid item xs={6} sm={2}>
                          <TextField
                            className={classes.itemTextFieldHeight}
                            variant="outlined"
                            disabled
                            fullWidth
                            name="amount"
                            label="$ Amount"
                            type="number"
                            id="amount"
                            //autoComplete="current-value"
                            value={item.amount}
                            //onChange={handleAmountChange}
                          />
                        </Grid>
                      </>
                    );
                  })}
                <Grid item xs={12}>
                  <h3
                    id="transition-modal-section"
                    className={classes.sectionTitle}
                  >
                    Total
                  </h3>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.itemTextFieldHeight}
                    variant="outlined"
                    disabled
                    fullWidth
                    name="total"
                    label="$"
                    type="number"
                    id="total"
                    //autoComplete="current-value"
                    value={orderForm.total}
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
                onClick={handleSaveOrder}
              >
                Shop
              </Button>
              <Grid container justifyContent="flex-end"></Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

OrderModal.propTypes = {
  open: PropTypes.bool,
  handleOrderModalClose: PropTypes.func,
  microserviceActions: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    buildings: state.buildings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    microserviceActions: bindActionCreators(microserviceActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderModal);

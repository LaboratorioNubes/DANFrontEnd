import {React, useEffect, useState} from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//import Link from '@material-ui/core/Link';
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {
  MainListItems,
  secondaryListItems,
} from "../../components/ListItems/ListItems";
import Chart from "../../components/Chart/Chart";
import Deposits from "../../components/Deposits/Deposits";
import Orders from "../../components/Orders/Orders";
import PaymentModal from "../../components/PaymentModal/PaymentModal";
import OrderModal from "../../components/OrderModal/OrderModal";
import BuildingModal from "../../components/BuildingModal/BuildingModal";
import { Modal } from "@material-ui/core";
import buildings from '../../images/green-building-1.jpg';
import axios from "axios";
import * as microserviceActions from "../../actions/microserviceActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import {Alert} from "@mui/material";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 180,
  },  
  imageBck: {
    backgroundImage: `url(${buildings})`,
    backgroundSize: "cover",
  }
}));

const Dashboard = (props) => {
  useEffect(() => {
    console.log("LLama obrass");
    axios
        .get(`http://localhost:9005/api/obra/obras/1`)
        .then((resp) => {
          console.log(resp.data);
          props.microserviceActions.setBuildings(resp.data);
        });
    axios
        .get(`http://localhost:9003/api/pago/cliente/1`)
        .then((resp) => {
          console.log(resp.data);
          props.microserviceActions.setPayments(resp.data);
        });
  });

  const classes = useStyles();
  const [dashboard, setDashboard] = useState({
    open: true,
    paymentModal: false,
    orderModal: false,
    buildingModal: false,
    paymentAlert: false,
  });
  const handleDrawerOpen = () => {
    setDashboard({ ...dashboard, open: true });
  };
  const handleDrawerClose = () => {
    setDashboard({ ...dashboard, open: false });
  };

  const handleNewPayment = () => {
    setDashboard({ ...dashboard, paymentModal: true });
  };

  const handlePaymentModalClose = () => {
    setDashboard({ ...dashboard, paymentModal: false });
  }

  const handleNewOrder = () => {
    setDashboard({ ...dashboard, orderModal: true });
  };

  const handleOrderModalClose = () => {
    setDashboard({ ...dashboard, orderModal: false });
  }

  const handleNewBuildingSite = () => {
    setDashboard({ ...dashboard, buildingModal: true });
  };

  const handleBuildingSiteModalClose = () => {
    setDashboard({ ...dashboard, buildingModal: false });
  }

  const handlePopUp = () => {
    setDashboard({ ...dashboard, paymentAlert: true });
  }
  
  const fixedHeightPaperWelcome = clsx(classes.paper, classes.fixedHeight, classes.imageBck);
  const fixedHeightPaperPayment = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, dashboard.open && classes.appBarShift)}
      >
        {dashboard.paymentAlert && <Alert onClose={() => { setDashboard({ ...dashboard, paymentAlert: false });}}>The payment has been successfully added — check it out!</Alert>}
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              dashboard.open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !dashboard.open && classes.drawerPaperClose),
        }}
        open={dashboard.open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <MainListItems handleNewPayment={handleNewPayment} handleNewOrder={handleNewOrder} handleNewBuildingSite={handleNewBuildingSite}/>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaperWelcome}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaperPayment}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
      <Modal></Modal>
      <PaymentModal open={dashboard.paymentModal} handlePaymentModalClose={handlePaymentModalClose} handlePopUp={handlePopUp} />
      <OrderModal open={dashboard.orderModal} handleOrderModalClose={handleOrderModalClose} />
      <BuildingModal open={dashboard.buildingModal} handleBuildingSiteModalClose={handleBuildingSiteModalClose}/>
    </div>
  );
};

Dashboard.propTypes = {
  microserviceActions: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    microserviceActions: bindActionCreators(microserviceActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);

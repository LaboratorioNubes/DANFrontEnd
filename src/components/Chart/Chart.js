import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "../Title/Title";
import { makeStyles } from "@material-ui/core";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";

// Generate Sales Data
/* function createData(time, amount) {
  return { time, amount };
} */

const useStyles = makeStyles((theme) => ({
  signInTitleElements: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
  },
  signInTitle: {
    color: "white",
    marginBottom: "0rem",
    marginTop: "0rem",
  },
  signInSubTitle: {
    display: "flex",
    justifyContent: "left",
    marginTop: "0rem",
    color: "white",
    fontSize: "1rem!important",
    marginBottom: "0rem",
    //fontFamily: "Times New Roman",
    fontWeight: "100"
  },
  signInSubTitle2: {
    display: "flex",
    justifyContent: "left",
    marginTop: "0rem",
    color: "white",
    fontSize: "1rem!important",
    marginTop: "0rem",
    fontWeight: "100"
  },
  buildIcon: {
    paddingLeft: "1rem",
    color: "white",
    fontSize: "2.5rem!important",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Chart = () => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <React.Fragment>
        <div className={classes.signInTitleElements}>
          <h2 className={classes.signInTitle}>NEXO</h2>
          <ConstructionRoundedIcon className={classes.buildIcon} />
        </div>
        <h3 className={classes.signInSubTitle}> CONSTRUCTION </h3>
        <h3 className={classes.signInSubTitle2}>MATERIALS</h3>
      {/* <Title>Welcome!</Title> */}
    </React.Fragment>
  );
};

export default Chart;

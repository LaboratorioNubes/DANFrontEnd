import { React, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { TextareaAutosize } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import {
  TextField,
  Grid,
  Button,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

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
  sectionTitle: {
    display: "flex",
  },
  sectionTitle2: {
    display: "flex",
    marginTop: "1rem",
    marginBottom: "0"
  },
}));

const BuildingModal = (props) => {
  const classes = useStyles();

  const { open } = props;
  const [buildingForm, setBuildingForm] = useState({
    name: "",
    address: "",
    phone: "",
    description: "",
  });

  const handleClose = () => {
    props.handleBuildingSiteModalClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let building = {
      cliente: 1,
      nombre: buildingForm.name,
      direccion: buildingForm.address,
      telefono: buildingForm.phone,
      descripcion: buildingForm.description,
    };
    axios.post(`http://localhost:9003/api/obra`, building).then((res) => {
      console.log(res);
      console.log(res.data);
    });
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
              <h2 id="transition-modal-title">Building Site</h2>
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
              <Grid item xs={12}>
                <h3
                  id="transition-modal-section"
                  className={classes.sectionTitle}
                >
                  Basic Info
                </h3>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="buildingName"
                    label="Name"
                    name="buildingName"
                    autoComplete="Name"
                    value={buildingForm.name}
                    onChange={(e) =>
                      setBuildingForm({
                        ...buildingForm,
                        name: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="buildingPhone"
                    label="Contact Phone"
                    name="buildingPhone"
                    autoComplete="phone"
                    value={buildingForm.phone}
                    onChange={(e) =>
                      setBuildingForm({
                        ...buildingForm,
                        phone: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="buildingAddress"
                    label="Address"
                    name="buildingAddress"
                    autoComplete="address"
                    value={buildingForm.address}
                    onChange={(e) =>
                      setBuildingForm({
                        ...buildingForm,
                        address: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                <h3
                  id="transition-modal-section"
                  className={classes.sectionTitle2}
                >
                  Description
                </h3>
              </Grid>
                <Grid item xs={12}>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={5}
                    style={{
                      display: "block",
                      width: "100%",
                      overflow: "hidden",
                      resize: "both",
                    }}
                    value={buildingForm.description}
                    onChange={(e) =>
                      setBuildingForm({
                        ...buildingForm,
                        description: e.target.value,
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

BuildingModal.propTypes = {
  open: PropTypes.bool,
  handleBuildingSiteModalClose: PropTypes.func,
};

export default BuildingModal;

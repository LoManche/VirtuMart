// Programmer: Ng Tiffany 1155158907
// Date: 2024-04-11
// Purpose:
//    This is the page for users to view or update their profile details, and change their passwords

import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  Snackbar,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import Api from "../api";
import { useAppContext } from "../contexts/appContext";
import handleError from "../components/handleError";
import ProfileSetup from "../components/profileSetup";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    address: "",
  });
  const [reloadFlag, setReloadFlag] = useState(0);
  const { user } = useAppContext();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [passwordData, setPasswordData] = useState({
    originalPs: "",
    newPs: "",
    confirmPs: "",
  });

  const [selectedIndex, setSelectedIndex] = useState(user.role === "customer" ? 0 : 1);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const onUpdateField = (e) => {
    const { name, value } = e.target;
    if (selectedIndex === 0) {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      if (document.getElementById("newPs").value !== document.getElementById("confirmPs").value) {
        setDisableButton(true);
      } else {
        setDisableButton(false);
        setOpen(false);
      }
      setPasswordData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  //load profile data
  useEffect(() => {
    const loadData = async () => {
      try {
        const userProfile = await Api.getProfile({ customer_id: user.userId });
        setProfileData({ ...userProfile[0] });
      } catch (err) {
        handleError(err, () => {}, true);
        throw err;
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadFlag]);

  async function handleProfileUpdate({ profileData }) {
    try {
      const res = await Api.updateProfile({
        customer_id: profileData.customer_id,
        username: profileData.username,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        city: profileData.city,
        state: profileData.state,
        password: profileData.password,
        email: profileData.email,
        address: profileData.address,
      });
      setAlertMessage("Update " + res);
      setOpen(true);
      setReloadFlag(Math.random());
    } catch (err) {
      handleError(err, "");
    }
  }

  async function handlePasswordUpdate({ passwordData }) {
    if (user.role === "customer") {
      try {
        await Api.updatePassword({
          oldpassword: passwordData.originalPs,
          newpassword: passwordData.newPs,
          customer_id: user.userId,
        });
        setAlertMessage("Password Changed Successful");
        setOpen(true);
        setReloadFlag(Math.random());
      } catch (err) {
        setAlertMessage("Incorrect Original Password");
        setOpen(true);
        handleError(err, "");
      }
    } else {
      try {
        await Api.adminChangePassword({
          oldpassword: passwordData.originalPs,
          newpassword: passwordData.newPs,
          admin_id: user.userId,
        });
        setAlertMessage("Password Changed Successful");
        setOpen(true);
        setReloadFlag(Math.random());
      } catch (err) {
        setAlertMessage("Incorrect Original Password");
        setOpen(true);
        handleError(err, "");
      }
    }
  }

  const onSubmit = (e, type) => {
    e.preventDefault();
    if (type === "profile") {
      handleProfileUpdate({ profileData: profileData });
    } else {
      // change password api not yet finished
      handlePasswordUpdate({ passwordData: passwordData });
    }
    console.log("Profile data:", profileData);
    console.log("password data", passwordData);

    setPasswordData({ originalPs: "", newPs: "", confirmPs: "" });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={alertMessage}
        action={action}
      />
      <Grid
        height={"100%"}
        container
        mx={3}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        columns={{ xs: 4, sm: 4, md: 8 }}>
        <Grid
          minWidth={"160px"}
          item
          xs={1}
          sm={1}
          md={2}
          borderRight={1}
          borderColor={"lightgray"}>
          <List>
            {user.role === "customer" ? (
              <ListItem disablePadding>
                <ListItemButton
                  selected={selectedIndex === 0}
                  onClick={(e) => {
                    handleListItemClick(e, 0);
                  }}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit Profile" />
                </ListItemButton>
              </ListItem>
            ) : (
              <></>
            )}

            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(e) => {
                  handleListItemClick(e, 1);
                }}>
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3} sm={3} md={6}>
          <Box p={4}>
            {selectedIndex === 0 ? (
              <>
                <Typography variant="h4" align="left" mb={2}>
                  Edit Profile
                </Typography>
                <form
                  onSubmit={(e) => {
                    onSubmit(e, "profile");
                  }}>
                  <ProfileSetup profileData={profileData} onUpdateField={onUpdateField} />
                  <Button type="submit" variant="contained" color="info" size="large">
                    Save
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Typography variant="h4" align="left" mb={2}>
                  Change Password
                </Typography>
                <form
                  onSubmit={(e) => {
                    onSubmit(e, "password");
                  }}>
                  <TextField
                    id="originalPs"
                    name="originalPs"
                    label="Original Password"
                    value={passwordData.originalPs}
                    onChange={onUpdateField}
                    variant="outlined"
                    fullWidth
                    type="password"
                    margin="normal"
                    required
                  />
                  <TextField
                    id="newPs"
                    name="newPs"
                    label="New Password"
                    value={passwordData.newPs}
                    onChange={onUpdateField}
                    variant="outlined"
                    fullWidth
                    type="password"
                    margin="normal"
                    required
                  />
                  <TextField
                    id="confirmPs"
                    name="confirmPs"
                    label="Confirm Password"
                    value={passwordData.confirmPs}
                    onChange={onUpdateField}
                    variant="outlined"
                    fullWidth
                    type="password"
                    margin="normal"
                    required
                    helperText={
                      passwordData.confirmPs !== "" && disableButton ? "Password didn't match" : ""
                    }
                    error={passwordData.confirmPs !== "" && disableButton}
                  />
                  <Box pb={3}></Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="info"
                    size="large"
                    disabled={disableButton}>
                    Save
                  </Button>
                </form>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;

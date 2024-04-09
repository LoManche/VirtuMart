import { useEffect, useState } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import Api from "../api";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    city: "",
    state: "",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    originalPs: "",
    newPs: "",
    confirmPs: "",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const onUpdateField = (e) => {
    const { name, value } = e.target;
    selectedIndex === 0
      ? setProfileData((prevData) => ({
          ...prevData,
          [name]: value,
        }))
      : setPasswordData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
  };

  const onSubmit = (e, type) => {
    e.preventDefault();

    console.log("Profile data:", profileData);
    console.log("password data", passwordData);

    setProfileData({
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      city: "",
      state: "",
      address: "",
    });
    setPasswordData({ originalPs: "", newPs: "", confirmPs: "" });
  };

  return (
    <Grid
      height={"100%"}
      container
      mx={3}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      columns={{ xs: 4, sm: 4, md: 8 }}>
      <Grid minWidth={"160px"} item xs={1} sm={1} md={2} borderRight={1} borderColor={"lightgray"}>
        <List>
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
                <Grid
                  container
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  columns={{ xs: 4, sm: 4, md: 8 }}>
                  <Grid item xs={4} sm={4} md={4}>
                    <TextField
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      value={profileData.firstName}
                      onChange={onUpdateField}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4}>
                    <TextField
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      value={profileData.lastName}
                      onChange={onUpdateField}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                    />
                  </Grid>
                </Grid>

                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  value={profileData.email}
                  onChange={onUpdateField}
                  variant="outlined"
                  fullWidth
                  type="email"
                  margin="normal"
                  required
                />
                <TextField
                  id="contactNumber"
                  name="contactNumber"
                  label="Contact Number"
                  value={profileData.contactNumber}
                  onChange={onUpdateField}
                  variant="outlined"
                  fullWidth
                  type="text"
                  margin="normal"
                  required
                />
                <TextField
                  id="address"
                  name="address"
                  label="Address"
                  value={profileData.address}
                  onChange={onUpdateField}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                />
                <Grid
                  container
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  columns={{ xs: 4, sm: 4, md: 8 }}
                  pb={3}>
                  <Grid item xs={4} sm={4} md={4}>
                    <TextField
                      id="city"
                      name="city"
                      label="City"
                      value={profileData.city}
                      onChange={onUpdateField}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4}>
                    <TextField
                      id="state"
                      name="state"
                      label="State"
                      value={profileData.state}
                      onChange={onUpdateField}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                    />
                  </Grid>
                </Grid>
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
                />
                <Box pb={3}></Box>
                <Button type="submit" variant="contained" color="info" size="large">
                  Save
                </Button>
              </form>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;

// const [userFormData, setUserFormData] = useState({
//   id: "",
//   name: "",
//   lastname: "",
//   email: "",
//   phone: "",
//   address: "",
//   password: "",
// });
// //   const navigate = useNavigate();

// const getUserData = async () => {
//   //try {
//   const response = {
//     name: "userName",
//     lastname: "user",
//     email: "email",
//     phone: "12345678",
//     address: "address",
//     password: "password",
//   }; //await axios(`http://localhost:8080/user/${id}`);
//   const data = response.data;
//   setUserFormData({
//     name: data.name,
//     lastname: data.lastname,
//     email: data.email,
//     phone: data.phone,
//     address: data.address,
//     password: data.password,
//   });
//   // } catch (error) {
//   //   toast.error("Error: ", error.response);
//   // }
// };

// useEffect(() => {
//   getUserData();
//   // if (loginState) {
//   //   getUserData();
//   // } else {
//   //   toast.error("You must be logged in to access this page");
//   //   navigate("/");
//   // }
// }, []);

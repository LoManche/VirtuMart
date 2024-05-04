// Programmer: Ng Tiffany 1155158907
// Date: 2024-04-11
// Purpose:
//    This is the module for showing the input fields for the profile page

/* eslint-disable react/prop-types */

import { Grid, TextField } from "@mui/material";

export default function ProfileSetup({ profileData, onUpdateField, additionalFields }) {
  return (
    <>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 8 }}>
        <Grid item xs={4} sm={4} md={4}>
          <TextField
            id="username"
            name="username"
            label="Username"
            value={profileData.username}
            onChange={onUpdateField}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <TextField
            id="phone"
            name="phone"
            label="Phone Number"
            value={profileData.phone}
            onChange={onUpdateField}
            variant="outlined"
            fullWidth
            type="text"
            margin="normal"
            required
          />
        </Grid>
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
        {additionalFields ? (
          additionalFields.map((field, key) => {
            return (
              <Grid key={key} item xs={4} sm={4} md={4}>
                <TextField
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  value={profileData[field.name]}
                  onChange={onUpdateField}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  {...field.props}
                />
              </Grid>
            );
          })
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
}

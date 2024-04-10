/* eslint-disable react/prop-types */
import { Snackbar, IconButton, Button, Box, Grid, TextField, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Api from "../../api";
import handleError from "../../components/handleError";

export default function Action({ type, actionType, initialData, setPage, setReloadFlag }) {
  const [form, setForm] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
  const fields = {
    category: [
      { name: "category_id", label: "Category ID", read: true },
      { name: "category_name", label: "Category Name" },
    ],
    product: [
      { name: "asin", label: "Product ID", read: true },
      { name: "title", label: "Product Name" },
      { name: "price", label: "Price" },
      { name: "discount", label: "Discount" },
      { name: "stock", label: "Stock" },
      { name: "description", label: "Description" },
    ],
    customer: [
      { name: "customer_id", label: "Customer ID", read: true },
      { name: "username", label: "Username" },
      { name: "firstName", label: "First Name" },
      { name: "lastName", label: "Last Name" },
      { name: "email", label: "Email" },
      { name: "phone", label: "Phone" },
      { name: "city", label: "City" },
      { name: "state", label: "State" },
      { name: "address", label: "Address" },
      { name: "password", label: "Password", props: { type: "password" } },
    ],
    admin: [
      { name: "admin_id", label: "Admin ID", read: true },
      { name: "adminname", label: "Admin Name" },
      { name: "password", label: "Password" },
    ],
  };

  const onUpdateField = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const apiResponse = () => {
    return {
      category: {
        add: Api.adminAddCategory({ category_name: form.category_name }),
        edit: Api.adminUpdateCategory({
          category_id: form.category_id,
          category_name: form.category_name,
        }),
        delete: Api.adminDeleteCategory({ category_id: form.category_id }),
      },
      admin: {
        add: Api.adminAddAdmin({ adminname: form.adminname, password: form.password }),
        edit: Api.adminUpdateAdmin({
          admin_id: form.admin_id,
          adminname: form.adminname,
          password: form.password,
        }),
        delete: Api.adminDeleteAdmin({ admin_id: form.admin_id }),
      },
      customer: {
        edit: Api.adminUpdateUser({
          customer_id: form.customer_id,
          username: form.username,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          city: form.city,
          state: form.state,
          password: form.password,
          email: form.email,
        }),
        delete: Api.adminDeleteUser({ customer_id: form.customer_id }),
      },
    }[type][actionType];
  };

  async function onSubmit(e) {
    e.preventDefault();
    console.log(form);
    try {
      const res = await apiResponse();
      setAlertMessage(res);
      setOpen(true);
      setReloadFlag(Math.random());
    } catch (err) {
      setAlertMessage("Failed");
      setOpen(true);
      handleError(err, "");
    }
  }
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
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}>
        <Box
          height="100%"
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
          width="100%">
          <Box width="80%" pb={2}>
            <Box display="flex" justifyContent={"space-between"}>
              <Typography variant="h3" align="center">
                {type[0].toUpperCase() + type.slice(1)} Information
              </Typography>
              <Button
                onClick={(e) => {
                  setPage("table");
                  localStorage.setItem("admin", "table");
                }}
                color="info"
                variant="contained">
                Back
              </Button>
            </Box>
            <Grid
              container
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              columns={{ xs: 4, sm: 4, md: 8 }}>
              {fields[type].map((field, key) => {
                return actionType === "add" && field.read === true ? (
                  <></>
                ) : (
                  <Grid key={key} item xs={4} sm={4} md={4}>
                    <TextField
                      id={field.name}
                      name={field.name}
                      label={field.label}
                      value={form[field.name]}
                      onChange={onUpdateField}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                      disabled={field.read}
                      {...field.props}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Button type="submit" variant="contained" color="info" size="large">
            Save
          </Button>
        </Box>
      </form>
    </>
  );
}

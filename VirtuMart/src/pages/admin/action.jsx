/* eslint-disable react/prop-types */
import {
  Snackbar,
  IconButton,
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Fragment, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Api from "../../api";
import handleError from "../../components/handleError";

export default function Action({
  type,
  actionType,
  initialData,
  categories,
  setPage,
  setReloadFlag,
}) {
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
      { name: "asin", label: "Product ID" },
      { name: "title", label: "Product Name" },
      { name: "price", label: "Price" },
      { name: "discount", label: "Discount" },
      { name: "stock", label: "Stock" },
      { name: "category_id", label: "Category" },
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
      { name: "password", label: "Password", props: { type: "password" } },
    ],
  };

  const onUpdateField = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const binaryString = event.target.result;
      const base64String = btoa(binaryString);

      setForm((prevData) => ({
        ...prevData,
        ["imgURL"]: `data:${file.type};base64,${base64String}`,
      }));

      reader.onload = null;
      event.target.value = null;
    };

    reader.readAsBinaryString(file);
  }
  const apiResponse = () => {
    return {
      category: {
        add: () => {
          return Api.adminAddCategory({ category_name: form.category_name });
        },
        edit: () => {
          return Api.adminUpdateCategory({
            category_id: form.category_id,
            category_name: form.category_name,
          });
        },
        delete: () => {
          return Api.adminDeleteCategory({ category_id: form.category_id });
        },
      },
      admin: {
        add: () => {
          return Api.adminAddAdmin({ adminname: form.adminname, password: form.password });
        },
        edit: () => {
          return Api.adminUpdateAdmin({
            admin_id: form.admin_id,
            adminname: form.adminname,
            password: form.password,
          });
        },
        delete: () => {
          return Api.adminDeleteAdmin({ admin_id: form.admin_id });
        },
      },
      customer: {
        edit: () => {
          return Api.adminUpdateUser({
            customer_id: form.customer_id,
            username: form.username,
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            city: form.city,
            state: form.state,
            password: form.password,
            email: form.email,
            address: form.address,
          });
        },
        delete: () => {
          return Api.adminDeleteUser({ customer_id: form.customer_id });
        },
      },
      product: {
        add: () => {
          const { asin, title, imgURL, price, discount, category_id, description, stock } = form;
          return Api.adminAddProduct({
            asin,
            title,
            imgURL,
            price,
            discount,
            category_id,
            description,
            stock,
          });
        },
        edit: () => {
          const { asin, title, imgURL, price, discount, category_id, description, stock } = form;
          return Api.adminUpdateProduct({
            asin,
            title,
            imgURL,
            price,
            discount,
            category_id,
            description,
            stock,
          });
        },
        delete: () => {
          const { asin } = form;
          return Api.adminDeleteProduct({ asin });
        },
      },
    }[type][actionType];
  };

  async function onSubmit(e) {
    e.preventDefault();
    console.log(form);
    try {
      const res = await apiResponse();
      console.log(type, actionType);
      setAlertMessage(res);
      setOpen(true);
      setReloadFlag(Math.random());
      setTimeout(setPage("table"), 1000);
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
                {actionType[0].toUpperCase() +
                  actionType.slice(1) +
                  " " +
                  type[0].toUpperCase() +
                  type.slice(1)}{" "}
                Information
              </Typography>
              <Button
                onClick={(e) => {
                  e.preventDefault();
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
                ) : type === "product" && field.name === "category_id" ? (
                  <Grid key={key} item xs={4} sm={4} md={4}>
                    <TextField
                      id={field.name}
                      name={field.name}
                      label={field.label}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setForm((prevData) => ({
                          ...prevData,
                          [name]: value,
                        }));
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      select
                      disabled={field.read || actionType === "delete"}
                      defaultValue={form[field.name] ? form[field.name] : ""}
                      {...field.props}>
                      {categories?.map((option) => {
                        return (
                          <MenuItem key={option["category_id"]} value={option["category_id"]}>
                            {option.category_name}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>
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
                      disabled={field.read || actionType === "delete"}
                      {...field.props}
                    />
                  </Grid>
                );
              })}
              {type === "product" ? (
                <>
                  {/* description */}
                  <Grid item xs={4} sm={4} md={8}>
                    <TextField
                      id={"description"}
                      name={"description"}
                      label={"Description"}
                      value={form["description"]}
                      onChange={onUpdateField}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                      disabled={actionType === "delete"}
                      multiline
                      rows={6}
                    />
                  </Grid>
                  {/* imgURL */}
                  <Grid item xs={4} sm={4} md={8}>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems="center"
                      py={1}>
                      <Typography variant="h5">Product Image</Typography>
                      {actionType === "delete" ? (
                        <></>
                      ) : (
                        <Button variant="contained" component="label" color="info">
                          Upload
                          <input type="file" hidden onChange={handleFileChange} />
                        </Button>
                      )}
                    </Box>

                    <Box border={1} borderRadius={1} color={"#C5C5C5"}>
                      <Box m={1} display={"flex"} justifyContent={"end"}>
                        {form.imgURL ? (
                          <IconButton
                            variant="contained"
                            color="info"
                            onClick={(e) => {
                              e.preventDefault();
                              setForm({ ...form, imgURL: "" });
                            }}>
                            <CloseIcon />
                          </IconButton>
                        ) : (
                          <></>
                        )}
                      </Box>
                      <Box height={"400px"} mb={1}>
                        {form.imgURL ? (
                          <img
                            src={form["imgURL"]}
                            style={{ height: "100%", width: "100%", objectFit: "contain" }}
                          />
                        ) : (
                          <></>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Box>
          <Button type="submit" variant="contained" color="info" size="large">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
}

import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Tooltip,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Api from "../../api";
import handleError from "../../components/handleError";
import Table from "../../components/table";

import { green, blue, red, orange } from "@mui/material/colors";
const categoryColumns = [
  { field: "category_id", headerName: "Category ID", width: 100 },
  {
    field: "category_name",
    headerName: "Category Name",
    flex: 1.5,
    minWidth: 250,
  },
  {
    field: "sold",
    headerName: "No Of Products Sold",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "stock",
    headerName: "Stock",
    flex: 1,
  },
  {
    field: "action",
    headerName: "Action",
    disableColumnMenu: true,
    sortable: false,
    width: 100,
    align: "center",
    renderCell: (params) => (
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Tooltip title="Edit User Information" placement="top">
          <Avatar sx={{ bgcolor: green[300], width: 30, height: 30 }}>
            <IconButton sx={{ color: green[50] }} onClick={(e) => {}}>
              <EditIcon />
            </IconButton>
          </Avatar>
        </Tooltip>

        <Box width="10px" />
        <Tooltip title="Delete User" placement="top">
          <Avatar sx={{ bgcolor: red[300], width: 30, height: 30 }}>
            <IconButton sx={{ color: green[50] }} onClick={(e) => {}}>
              <ClearIcon />
            </IconButton>
          </Avatar>
        </Tooltip>
      </Box>
    ),
  },
];

const productColumns = [
  { field: "asin", headerName: "Product ID", width: 130 },
  {
    field: "title",
    headerName: "Product Name",
    minWidth: 250,
    flex: 4,
  },
  {
    field: "price",
    headerName: "Price",
    valueGetter: (value, row) => `${row.price ? "$ " : ""} ${row.price || ""}`,
    minWidth: 100,
    flex: 1,
  },
  {
    field: "discount",
    headerName: "Discount",
    valueGetter: (value, row) => `${row.discount ? "$ " : ""} ${row.discount || ""}`,
    minWidth: 100,
    flex: 1,
  },
  {
    field: "stock",
    headerName: "Stock",
    minWidth: 100,
    flex: 1,
  },
  {
    field: "action",
    headerName: "Action",
    disableColumnMenu: true,
    sortable: false,
    width: 100,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box width="10px" />
        <Tooltip title="Edit User Information" placement="top">
          <Avatar sx={{ bgcolor: green[300], width: 30, height: 30 }}>
            <IconButton sx={{ color: green[50] }} onClick={(e) => {}}>
              <EditIcon />
            </IconButton>
          </Avatar>
        </Tooltip>

        <Box width="10px" />
        <Tooltip title="Delete User" placement="top">
          <Avatar sx={{ bgcolor: red[300], width: 30, height: 30 }}>
            <IconButton sx={{ color: green[50] }} onClick={(e) => {}}>
              <ClearIcon />
            </IconButton>
          </Avatar>
        </Tooltip>
      </Box>
    ),
  },
];

const customerColumns = [
  { field: "customer_id", headerName: "Customer ID", flex: 1, minWidth: 100 },
  {
    field: "firstName",
    headerName: "First name",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "lastName",
    headerName: "Last name",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 2,
    minWidth: 200,
  },
  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "created_at",
    headerName: "Create At",
    flex: 1,
    minWidth: 160,
    valueGetter: (value, row) =>
      `${row.created_at ? new Date(row.created_at).toLocaleString() : ""}`,
  },
  {
    field: "action",
    headerName: "Action",
    disableColumnMenu: true,
    sortable: false,
    width: 100,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box width="10px" />
        <Tooltip title="Edit User Information" placement="top">
          <Avatar sx={{ bgcolor: green[300], width: 30, height: 30 }}>
            <IconButton sx={{ color: green[50] }} onClick={(e) => {}}>
              <EditIcon />
            </IconButton>
          </Avatar>
        </Tooltip>

        <Box width="10px" />
        <Tooltip title="Delete User" placement="top">
          <Avatar sx={{ bgcolor: red[300], width: 30, height: 30 }}>
            <IconButton sx={{ color: green[50] }} onClick={(e) => {}}>
              <ClearIcon />
            </IconButton>
          </Avatar>
        </Tooltip>
      </Box>
    ),
  },
];

const Admin = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categories, products, users] = await Promise.all([
          Api.allCategory(),
          Api.allProduct(),
          Api.allUser(),
        ]);

        setCategories(categories);
        setProducts(products);
        setUsers(users);
      } catch (err) {
        handleError(err, () => {}, true);
        throw err;
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid
      height={"100%"}
      container
      mx={3}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      columns={{ xs: 4, sm: 4, md: 8 }}>
      {/* List */}
      <Grid
        minWidth={"160px"}
        maxWidth={"200px"}
        item
        xs={1}
        sm={1}
        md={2}
        borderRight={1}
        borderColor={"lightgray"}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(e) => {
                handleListItemClick(e, 0);
              }}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Category List" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(e) => {
                handleListItemClick(e, 1);
              }}>
              <ListItemIcon>
                <LocalMallIcon />
              </ListItemIcon>
              <ListItemText primary="Product List" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(e) => {
                handleListItemClick(e, 2);
              }}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Customer List" />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>

      {/* Table */}
      <Grid item xs={3} sm={3} md={6}>
        <Box px={3}>
          {selectedIndex === 0 ? (
            <>
              <Typography variant="h4" align="left" mb={2}>
                All Category
              </Typography>
              <Table columns={categoryColumns} rows={categories} idField={"category_id"} />
            </>
          ) : selectedIndex === 1 ? (
            <>
              <Typography variant="h4" align="left" mb={2}>
                All Product
              </Typography>
              <Table columns={productColumns} rows={products} idField={"asin"} />
            </>
          ) : (
            <>
              <Typography variant="h4" align="left" mb={2}>
                All Customser
              </Typography>
              <Table columns={customerColumns} rows={users} idField={"customer_id"} />
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Admin;

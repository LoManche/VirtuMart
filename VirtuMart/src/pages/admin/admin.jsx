import { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import { green, red } from "@mui/material/colors";
import Action from "./action";

const Admin = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);

  const [reloadFlag, setReloadFlag] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const [page, setPage] = useState(
    localStorage.getItem("admin") ? localStorage.getItem("admin") : "table",
  );

  const [type, setType] = useState("category");
  const [actionType, setActionType] = useState("add");
  const [initialData, setInitialData] = useState({});
  // sampleUser@example.com
  // password123

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
          <Tooltip title="Edit Details" placement="top">
            <Avatar sx={{ bgcolor: green[300], width: 30, height: 30 }}>
              <IconButton
                sx={{ color: green[50] }}
                onClick={(e) => {
                  setType("category");
                  setActionType("edit");
                  setInitialData(params.row);
                  setPage("action");
                  localStorage.setItem("admin", "action");
                }}>
                <EditIcon />
              </IconButton>
            </Avatar>
          </Tooltip>

          <Box width="10px" />
          <Tooltip title="Delete" placement="top">
            <Avatar sx={{ bgcolor: red[300], width: 30, height: 30 }}>
              <IconButton
                sx={{ color: green[50] }}
                onClick={(e) => {
                  setType("category");
                  setActionType("delete");
                  setInitialData(params.row);
                  setPage("action");
                  localStorage.setItem("admin", "action");
                }}>
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
          <Tooltip title="Edit Details" placement="top">
            <Avatar sx={{ bgcolor: green[300], width: 30, height: 30 }}>
              <IconButton
                sx={{ color: green[50] }}
                onClick={(e) => {
                  setType("product");
                  setActionType("edit");
                  setInitialData(params.row);
                  setPage("action");
                  localStorage.setItem("admin", "action");
                }}>
                <EditIcon />
              </IconButton>
            </Avatar>
          </Tooltip>

          <Box width="10px" />
          <Tooltip title="Delete" placement="top">
            <Avatar sx={{ bgcolor: red[300], width: 30, height: 30 }}>
              <IconButton
                sx={{ color: green[50] }}
                onClick={(e) => {
                  setType("product");
                  setActionType("delete");
                  setInitialData(params.row);
                  setPage("action");
                  localStorage.setItem("admin", "action");
                }}>
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
          <Tooltip title="Edit Details" placement="top">
            <Avatar sx={{ bgcolor: green[300], width: 30, height: 30 }}>
              <IconButton
                sx={{ color: green[50] }}
                onClick={(e) => {
                  setType("customer");
                  setActionType("edit");
                  setInitialData(params.row);
                  setPage("action");
                  localStorage.setItem("admin", "action");
                }}>
                <EditIcon />
              </IconButton>
            </Avatar>
          </Tooltip>

          <Box width="10px" />
          <Tooltip title="Delete" placement="top">
            <Avatar sx={{ bgcolor: red[300], width: 30, height: 30 }}>
              <IconButton
                sx={{ color: green[50] }}
                onClick={(e) => {
                  setType("customer");
                  setActionType("delete");
                  setInitialData(params.row);
                  setPage("action");
                  localStorage.setItem("admin", "action");
                }}>
                <ClearIcon />
              </IconButton>
            </Avatar>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const adminColumns = [
    { field: "admin_id", headerName: "Admin ID", flex: 1, minWidth: 100 },
    {
      field: "adminname",
      headerName: "Admin name",
      flex: 1,
      minWidth: 100,
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
          <Tooltip title="Edit Details" placement="top">
            <Avatar sx={{ bgcolor: green[300], width: 30, height: 30 }}>
              <IconButton
                sx={{ color: green[50] }}
                onClick={(e) => {
                  setType("admin");
                  setActionType("edit");
                  setInitialData(params.row);
                  setPage("action");
                  localStorage.setItem("admin", "action");
                }}>
                <EditIcon />
              </IconButton>
            </Avatar>
          </Tooltip>

          <Box width="10px" />
          <Tooltip title="Delete" placement="top">
            <Avatar sx={{ bgcolor: red[300], width: 30, height: 30 }}>
              <IconButton
                sx={{ color: green[50] }}
                onClick={(e) => {
                  setType("admin");
                  setActionType("edit");
                  setInitialData(params.row);
                  setPage("action");
                  localStorage.setItem("admin", "action");
                }}>
                <ClearIcon />
              </IconButton>
            </Avatar>
          </Tooltip>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categories, products, users, admins] = await Promise.all([
          Api.allCategory(),
          Api.allProduct(),
          Api.allUser(),
          Api.allAdmin(),
        ]);

        setCategories(categories);
        setProducts(products);
        setUsers(users);
        setAdmins(admins);
      } catch (err) {
        handleError(err, () => {}, true);
        throw err;
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadFlag]);

  return (
    <>
      {page === "table" ? (
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
              <ListItem disablePadding>
                <ListItemButton
                  selected={selectedIndex === 3}
                  onClick={(e) => {
                    handleListItemClick(e, 3);
                  }}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admin List" />
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>

          {/* Table */}
          <Grid item xs={3} sm={3} md={6}>
            <Box px={3}>
              {selectedIndex === 0 ? (
                <>
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    pb={1}>
                    <Typography variant="h4" align="left">
                      All Categories
                    </Typography>

                    <Button
                      onClick={(e) => {
                        setType("category");
                        setActionType("add");
                        setPage("action");
                        localStorage.setItem("admin", "action");
                        setInitialData({});
                      }}
                      color="info"
                      variant="contained">
                      Add
                    </Button>
                  </Box>
                  <Table columns={categoryColumns} rows={categories} idField={"category_id"} />
                </>
              ) : selectedIndex === 1 ? (
                <>
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    pb={1}>
                    <Typography variant="h4" align="left">
                      All Products
                    </Typography>
                    <Button
                      onClick={(e) => {
                        setType("product");
                        setActionType("add");
                        setPage("action");
                        localStorage.setItem("admin", "action");
                        setInitialData({});
                      }}
                      color="info"
                      variant="contained">
                      Add
                    </Button>
                  </Box>
                  <Table columns={productColumns} rows={products} idField={"asin"} />
                </>
              ) : selectedIndex === 2 ? (
                <>
                  <Typography variant="h4" align="left" mb={1}>
                    All Customsers
                  </Typography>
                  <Table columns={customerColumns} rows={users} idField={"customer_id"} />
                </>
              ) : (
                <>
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    pb={1}>
                    <Typography variant="h4" align="left">
                      All Admins
                    </Typography>
                    <Button
                      onClick={(e) => {
                        setType("admin");
                        setActionType("add");
                        setPage("action");
                        localStorage.setItem("admin", "action");
                        setInitialData({});
                      }}
                      color="info"
                      variant="contained">
                      Add
                    </Button>
                  </Box>
                  <Table columns={adminColumns} rows={admins} idField={"admin_id"} />
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Action
          type={type}
          actionType={actionType}
          initialData={initialData}
          setPage={setPage}
          setReloadFlag={setReloadFlag}
        />
      )}
    </>
  );
};

export default Admin;

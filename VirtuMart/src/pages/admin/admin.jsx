import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Api from "../../api";
import handleError from "../../components/handleError";
import Table from "../../components/table";

const productColumns = [
  { field: "asin", headerName: "Product ID" },
  {
    field: "title",
    headerName: "Product Name",
  },
  {
    field: "price",
    headerName: "Price",

    valueGetter: (value, row) => `${row.price ? "$ " : ""} ${row.price || ""}`,
  },
  {
    field: "discount",
    headerName: "Discount",
    valueGetter: (value, row) => `${row.discount ? "$ " : ""} ${row.discount || ""}`,
  },
  {
    field: "stock",
    headerName: "Stock",
  },
  {
    field: "action",
    headerName: "Action",
  },
];

const userColumns = [
  { field: "id", headerName: "User ID" },
  {
    field: "firstName",
    headerName: "First name",
  },
  {
    field: "lastName",
    headerName: "Last name",
  },
  {
    field: "email",
    headerName: "Email",
  },
  {
    field: "createAt",
    headerName: "Create At",
  },
  {
    field: "role",
    headerName: "Role",
  },
  {
    field: "action",
    headerName: "Action",
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const Admin = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [products, setProducts] = useState(undefined);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const onLoadProducts = async () => {
    try {
      const products = await Api.allProduct();
      setProducts(products);
    } catch (err) {
      handleError(err, () => {}, true);
      throw err;
    }
  };

  useEffect(() => {
    onLoadProducts();
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
      <Grid minWidth={"160px"} item xs={1} sm={1} md={2} borderRight={1} borderColor={"lightgray"}>
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
              <ListItemText primary="User List" />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>

      {/* Table */}
      <Grid item xs={3} sm={3} md={6}>
        <Box p={4}>
          {selectedIndex === 0 ? (
            <>
              <Typography variant="h4" align="left" mb={2}>
                All Category
              </Typography>
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
                All User
              </Typography>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Admin;

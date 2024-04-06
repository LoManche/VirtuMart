/* eslint-disable react/prop-types */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Button, InputAdornment, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import virtumartLogo from "../assets/VirtuMartLogo.png";

export default function Topbar() {
  const navigate = useNavigate();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const badgeContent = 0;
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  function ICONBUTTON({ icon, props, navigateTo }) {
    return (
      <IconButton size="large" color="inherit" {...props} onClick={() => navigate(navigateTo)}>
        {icon}
      </IconButton>
    );
  }

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <ICONBUTTON icon={<ShoppingCartIcon />} navigateTo={"/shoppingCart"} />
        <p>Shopping Cart</p>
      </MenuItem>

      <MenuItem>
        <ICONBUTTON icon={<AccountCircle />} navigateTo={"/account"} />
        <p>Account</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <ICONBUTTON icon={<MenuIcon />} />
          <Button
            onClick={() => navigate("/")}
            variant="text"
            color="inherit"
            sx={{ minWidth: "182px" }}>
            <img src={virtumartLogo} onClick={() => navigate("")} height={"50px"} width={"100%"} />
          </Button>
          <Box sx={{ display: "flex", justifyContent: "end", flexGrow: 1 }}>
            <Box width="100%" maxWidth={"600px"} minWidth={"130px"}>
              <TextField
                label={"Search"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                position="relative"
                size="small"></TextField>
            </Box>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}>
            <IconButton size="large" color="inherit" onClick={() => {}}>
              {badgeContent === 0 ? (
                <NotificationsIcon />
              ) : (
                <Badge badgeContent={badgeContent} color="error">
                  <NotificationsIcon />
                </Badge>
              )}
            </IconButton>
            <ICONBUTTON icon={<ShoppingCartIcon />} navigateTo={"/shoppingCart"} />
            <ICONBUTTON icon={<AccountCircle />} navigateTo={"/account"} />
          </Box>
          <Box sx={{ display: { xs: "flex", sm: "none", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}

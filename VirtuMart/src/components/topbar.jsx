/* eslint-disable react/prop-types */
import * as React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Badge,
  Button,
  InputAdornment,
  TextField,
  ListItemIcon,
} from "@mui/material";
import { useNavigate } from "react-router";
import virtumartLogo from "../assets/VirtuMartLogo.png";
import Api from "../api";
import { useAppContext } from "../contexts/appContext";

export default function Topbar({ type }) {
  const navigate = useNavigate();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const badgeContent = 0;
  const { isLogin, setIsLogin, user, setUser } = useAppContext();
  const role = user?.role;

  const logout = async () => {
    const res = await Api.logout();
    setIsLogin(false);
    setUser(undefined);
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");

    handleCloseUserMenu();
    handleMobileMenuClose();
    navigate("/");
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
      onClose={handleMobileMenuClose}
      sx={{
        display: { xs: "block", md: "none" },
      }}>
      <MenuItem
        onClick={() => {
          handleMobileMenuClose();
          navigate("/shoppingCart");
        }}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <p>Shopping Cart</p>
      </MenuItem>

      {role === "admin" ? (
        <MenuItem
          onClick={() => {
            handleMobileMenuClose();
            navigate("/admin");
          }}>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <p>Management</p>
        </MenuItem>
      ) : (
        <></>
      )}
      <MenuItem
        onClick={() => {
          handleMobileMenuClose();
          navigate(isLogin ? "/profile" : "/account");
        }}>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        <p>{isLogin ? "Profile" : "Sign In / Sign Up"}</p>
      </MenuItem>
      {isLogin ? (
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <p>Sign Out</p>
        </MenuItem>
      ) : (
        <></>
      )}
    </Menu>
  );

  if (type === "account") {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: "#FFFFFF" }}>
          <Toolbar>
            <Button
              onClick={() => navigate("/")}
              variant="text"
              color="inherit"
              sx={{ minWidth: "182px", "&:hover": { backgroundColor: "#FFFFFF" } }}>
              <img src={virtumartLogo} height={"50px"} width={"100%"} />
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: "#FFFFFF" }}>
          <Toolbar>
            <ICONBUTTON icon={<MenuIcon />} />
            <Button
              onClick={() => navigate("/")}
              variant="text"
              color="inherit"
              sx={{ minWidth: "182px", "&:hover": { backgroundColor: "#FFFFFF" } }}>
              <img src={virtumartLogo} height={"50px"} width={"100%"} />
            </Button>
            <Box sx={{ display: "flex", justifyContent: "end", flexGrow: 1 }}>
              <Box
                component="form"
                display="flex"
                alignItems={"center"}
                width="100%"
                maxWidth={"600px"}
                minWidth={"130px"}
                height={"100px"}>
                <TextField
                  label={"Search"}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  position="relative"
                  size="small"
                  sx={{ zIndex: 1 }}></TextField>
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
              <IconButton size="large" color="inherit" onClick={handleOpenUserMenu}>
                <AccountCircle />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {role === "admin" ? (
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/admin");
                    }}>
                    <ListItemIcon>
                      <ManageAccountsIcon />
                    </ListItemIcon>
                    <p>Management</p>
                  </MenuItem>
                ) : (
                  <></>
                )}
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate(isLogin ? "/profile" : "/account");
                  }}>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <p>{isLogin ? "Profile" : "Sign In / Sign Up"}</p>
                </MenuItem>
                {isLogin ? (
                  <MenuItem onClick={logout}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <p>Sign Out</p>
                  </MenuItem>
                ) : (
                  <></>
                )}
              </Menu>
              {/*               
              
              <ICONBUTTON icon={<AccountCircle />} navigateTo={isLogin ? "/profile" : "/account"} /> */}
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
}

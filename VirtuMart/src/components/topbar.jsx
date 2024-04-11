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
  Divider,
  Badge,
  Button,
  InputAdornment,
  TextField,
  ListItemIcon,
  Modal,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import virtumartLogo from "../assets/VirtuMartLogo.png";
import Api from "../api";
import { useAppContext } from "../contexts/appContext";
import handleError from "./handleError";

export default function Topbar({ type }) {
  const navigate = useNavigate();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [alert, setAlert] = React.useState([
    // { dateOfNotification: "11/4/2024", message: "You have ordered a product." },
    // { dateOfNotification: "11/4/2024", message: "You have ordered a product." },
  ]);

  const badgeContent = alert.length;
  const { isLogin, setIsLogin, user, setUser } = useAppContext();
  const role = user?.role;
  const [searchInput, setSearchInput] = React.useState(localStorage.getItem("searchInput"));

  const [alertMenu, setAlertMenu] = React.useState(null);
  const open = Boolean(alertMenu);
  const onSubmit = (e) => {
    if (e.key === "Enter") {
      localStorage.setItem("searchInput", searchInput);
      navigate("/result");
    }
  };

  const handleAlertMenuClose = () => {
    setAlertMenu(null);
    setAlert([]);
  };

  const handleAlertMenuOpen = (event) => {
    setAlertMenu(event.currentTarget);
  };

  const logout = async () => {
    await Api.logout();
    setIsLogin(false);
    setUser(undefined);
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userid");
    localStorage.removeItem("role");

    handleCloseUserMenu();
    handleMobileMenuClose();
    navigate("/");
  };
  React.useEffect(() => {
    const loadData = async () => {
      if (user) {
        try {
          const alert = await Api.notification({ customer_id: user.userId });
          setAlert(alert);
        } catch (err) {
          handleError(err, () => {}, true);
          throw err;
        }
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setAlert([]);
  };

  //  <Button onClick={handleOpen}>Open modal</Button>

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
      {isLogin && role === "customer" ? (
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            handleOpenModal(e);
          }}>
          <ListItemIcon>
            {badgeContent === 0 ? (
              <NotificationsIcon />
            ) : (
              <Badge badgeContent={badgeContent} color="error">
                <NotificationsIcon />
              </Badge>
            )}
          </ListItemIcon>
          <p>Notification</p>
        </MenuItem>
      ) : (
        <></>
      )}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          {alert.length > 0 ? (
            alert.map((alert, key) => {
              return (
                <>
                  <Typography id="modal-modal-title" variant="h6" component="h2" mt={1}>
                    {alert.dateOfNotification}
                  </Typography>
                  <Typography id="modal-modal-description" mb={1}>
                    {alert.message}
                  </Typography>
                  <Divider />
                </>
              );
            })
          ) : (
            <Typography>No Notification</Typography>
          )}
        </Box>
      </Modal>
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
                        <IconButton
                          onClick={(e) => {
                            onSubmit(e);
                          }}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={searchInput}
                  onChange={(e) => {
                    e.preventDefault();
                    setSearchInput(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    onSubmit(e);
                  }}
                  fullWidth
                  position="relative"
                  size="small"
                  sx={{ zIndex: 1 }}></TextField>
              </Box>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}>
              {isLogin && role === "customer" ? (
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAlertMenuOpen(e);
                  }}>
                  {badgeContent === 0 ? (
                    <NotificationsIcon />
                  ) : (
                    <Badge badgeContent={badgeContent} color="error">
                      <NotificationsIcon />
                    </Badge>
                  )}
                </IconButton>
              ) : (
                <></>
              )}
              <Menu
                anchorEl={alertMenu}
                id="account-menu"
                open={open}
                onClose={handleAlertMenuClose}
                onClick={handleAlertMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                {alert.length > 0 ? (
                  alert.map((alert, key) => {
                    return (
                      <>
                        <MenuItem key={key} disabled>
                          <Typography>
                            {alert.dateOfNotification + " "} {alert.message}
                          </Typography>
                        </MenuItem>
                        <Divider />
                      </>
                    );
                  })
                ) : (
                  <MenuItem disabled>
                    <Typography>No Notification</Typography>
                  </MenuItem>
                )}
              </Menu>
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

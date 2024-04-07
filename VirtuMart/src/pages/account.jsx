import { Box, Button, Grid, Typography, Checkbox, FormControlLabel } from "@mui/material";
// import { useNavigate } from "react-router";
import authImage from "../assets/auth.png";
import { useState } from "react";
import { Email, Password } from "../components/textfields";

export default function Account() {
  // const navigate = useNavigate();
  const [page, setPage] = useState("enterNewPs");
  const [loginForm, setLoginForm] = useState({ email: "", password: "", rememberMe: false });
  const [registerForm, setRegisterForm] = useState({ email: "", password: "", confirmPs: "" });
  const [forgetPsForm, setForgetPsForm] = useState({ email: "" });
  const [enterNewPsForm, setEnterNewPsForm] = useState({ password: "", confirmPs: "" });
  const onUpdateField = ({ e, form, setForm }) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setForm({
      ...form,
      [name]: inputValue,
    });
  };

  const onSubmit = (e, type, form) => {
    e.preventDefault();
    console.log(type, form);
  };

  function Login() {
    return (
      <>
        <Box p={2}>
          <Typography variant="h3" fontWeight={"bold"}>
            Sign In
          </Typography>
        </Box>
        <Typography variant="h5" color="grey">
          Welcome back~
        </Typography>
        <Typography variant="h5" color="grey">
          Please enter your account details
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => {
            onSubmit(e, "login", loginForm);
          }}
          display="flex"
          flexDirection={"column"}
          width="100%"
          maxWidth={"400px"}
          pt={3}
          sx={{
            "& .MuiTextField-root": { my: 1 },
          }}>
          <Email
            id={"email"}
            name={"email"}
            value={loginForm.email}
            onChange={(e) => {
              onUpdateField({ e: e, form: loginForm, setForm: setLoginForm });
            }}
          />
          <Password
            id={"password"}
            name={"password"}
            value={loginForm.password}
            onChange={(e) => {
              onUpdateField({ e: e, form: loginForm, setForm: setLoginForm });
            }}
          />

          <Box width="100%" display="flex" justifyContent={"space-between"} alignItems={"center"}>
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  color="info"
                  checked={loginForm.rememberMe}
                  onChange={(e) => {
                    onUpdateField({ e: e, form: loginForm, setForm: setLoginForm });
                  }}
                />
              }
              label="Remember Me"
            />
            <Button
              variant="text"
              onClick={() => {
                setPage("forgetPassword");
              }}
              color="info"
              sx={{ "&:hover": { backgroundColor: "#FFFFFF" } }}>
              Forget Password
            </Button>
          </Box>
          <Button variant="contained" color="info" type={"Submit"}>
            Sign In
          </Button>
        </Box>
        <Box pt={3} width="100%" display="flex" justifyContent={"center"} alignItems={"center"}>
          <Typography>{"Don't have an account?"} </Typography>
          <Button
            variant="text"
            onClick={() => {
              setPage("register");
            }}
            color="info"
            sx={{ "&:hover": { backgroundColor: "#FFFFFF" } }}>
            Sign Up Now
          </Button>
        </Box>
      </>
    );
  }

  function Register() {
    return (
      <>
        <Box p={2}>
          <Typography variant="h3" fontWeight={"bold"}>
            Sign Up
          </Typography>
        </Box>
        <Typography variant="h5" color="grey">
          {"Let's create your account and"}
        </Typography>
        <Typography variant="h5" color="grey">
          Shop like a pro and save money
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            onSubmit(e, "register", registerForm);
          }}
          display="flex"
          flexDirection={"column"}
          width="100%"
          maxWidth={"400px"}
          pt={3}
          sx={{
            "& .MuiTextField-root": { my: 1 },
          }}>
          <Email
            id={"email"}
            name={"email"}
            value={registerForm.email}
            onChange={(e) => {
              onUpdateField({ e: e, form: registerForm, setForm: setRegisterForm });
            }}
          />
          <Password
            id={"password"}
            name={"password"}
            value={registerForm.password}
            onChange={(e) => {
              onUpdateField({ e: e, form: registerForm, setForm: setRegisterForm });
            }}
          />
          <Password
            id={"confirmPs"}
            name={"confirmPs"}
            value={registerForm.confirmPs}
            onChange={(e) => {
              onUpdateField({ e: e, form: registerForm, setForm: setRegisterForm });
            }}
            props={{ label: "Confirm Password" }}
          />
          <Box pt={3}></Box>
          <Button variant="contained" color="info" type={"Submit"}>
            Sign Up
          </Button>
        </Box>
        <Box pt={3} width="100%" display="flex" justifyContent={"center"} alignItems={"center"}>
          <Typography>Already have an account? </Typography>
          <Button
            variant="text"
            onClick={() => {
              setPage("login");
            }}
            color="info"
            sx={{ "&:hover": { backgroundColor: "#FFFFFF" } }}>
            Sign In
          </Button>
        </Box>
      </>
    );
  }

  function ForgetPassword() {
    return (
      <>
        <Box p={2}>
          <Typography variant="h3" fontWeight={"bold"}>
            Forget Password
          </Typography>
        </Box>
        <Typography variant="h5" color="grey">
          A password reset link will be sent to your email address
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => {
            onSubmit(e, "forgetPassword", forgetPsForm);
          }}
          display="flex"
          flexDirection={"column"}
          width="100%"
          maxWidth={"400px"}
          sx={{
            "& .MuiTextField-root": { my: 3 },
          }}>
          <Email
            id={"email"}
            name={"email"}
            value={forgetPsForm.email}
            onChange={(e) => {
              onUpdateField({ e: e, form: forgetPsForm, setForm: setForgetPsForm });
            }}
            props={{ autoFocus: true }}
          />
          <Button variant="contained" color="info" type={"Submit"}>
            Send Password Reset Link
          </Button>
          <Box pt={3} width="100%" display="flex" justifyContent={"center"} alignItems={"center"}>
            <Typography>{"Don't have an account?"} </Typography>
            <Button
              variant="text"
              onClick={() => {
                setPage("register");
              }}
              color="info"
              sx={{ "&:hover": { backgroundColor: "#FFFFFF" } }}>
              Sign Up Now
            </Button>
          </Box>
        </Box>
      </>
    );
  }

  function EnterNewPs() {
    return (
      <>
        <Box p={2}>
          <Typography variant="h3" fontWeight={"bold"}>
            Enter Your New Password
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              onSubmit(e, "enterNewPs", enterNewPsForm);
            }}
            display="flex"
            flexDirection={"column"}
            width="100%"
            maxWidth={"400px"}
            pt={3}
            sx={{
              "& .MuiTextField-root": { my: 1 },
            }}>
            <Password
              id={"password"}
              name={"password"}
              value={enterNewPsForm.password}
              onChange={(e) => {
                onUpdateField({ e: e, form: enterNewPsForm, setForm: setEnterNewPsForm });
              }}
            />
            <Password
              id={"confirmPs"}
              name={"confirmPs"}
              value={enterNewPsForm.confirmPs}
              onChange={(e) => {
                onUpdateField({ e: e, form: enterNewPsForm, setForm: setEnterNewPsForm });
              }}
              props={{ label: "Confirm Password" }}
            />
            <Box pt={3}></Box>
            <Button variant="contained" color="info" type={"Submit"}>
              Submit
            </Button>
          </Box>
        </Box>
      </>
    );
  }

  function PageContent(page) {
    return {
      login: <Login />,
      register: <Register />,
      forgetPassword: <ForgetPassword />,
      enterNewPs: <EnterNewPs />,
    }[page];
  }

  return (
    <Grid
      container
      mx={3}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      columns={{ xs: 4, sm: 4, md: 8 }}>
      <Grid
        item
        xs={4}
        sm={4}
        md={4}
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}>
        {PageContent(page)}
      </Grid>
      <Grid
        item
        xs={0}
        sm={4}
        md={4}
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}>
        <img src={authImage} style={{ width: "100%", height: "80%", objectFit: "contain" }} />
      </Grid>
    </Grid>
  );
}

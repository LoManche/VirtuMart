import { Box, Button, Grid, Typography, Checkbox, FormControlLabel } from "@mui/material";
// import { useNavigate } from "react-router";
import authImage from "../assets/auth.png";
import { useState } from "react";
import { Email, Password } from "../components/textfields";

export default function Account() {
  // const navigate = useNavigate();
  const [page, setPage] = useState("login");
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

  const Form = {
    login: { form: loginForm, setForm: setLoginForm },
    register: { form: registerForm, setForm: setRegisterForm },
    forgetPassword: { form: forgetPsForm, setForm: setForgetPsForm },
    enterNewPs: { form: enterNewPsForm, setForm: setEnterNewPsForm },
  };

  const Header = {
    login: "Sign In",
    register: "Sign Up",
    forgetPassword: "Forget Password",
    enterNewPs: "Enter Your New Password",
  };

  const Description = {
    login: { 1: "Welcome back~", 2: "Please enter your account details" },
    register: { 1: "Let's create your account and", 2: "Shop like a pro and save money" },
    forgetPassword: { 1: "A password reset link will be sent to your email address" },
    enterNewPs: { 1: "" },
  };

  const Reminder = {
    login: { text: "Don't have an account?", link: "register", buttonText: "Sign Up Now" },
    register: { text: "Already have an account?", link: "login", buttonText: "Sign In" },
    forgetPassword: { text: "Don't have an account?", link: "register", buttonText: "Sign Up Now" },
    enterNewPs: false,
  };

  const SubmitButtonText = {
    login: "Sign In",
    register: "Sign Up",
    forgetPassword: "Send Password Reset Link",
    enterNewPs: "Submit",
  };

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
        {/* Header and description */}
        <Box p={2}>
          <Typography variant="h3" fontWeight={"bold"}>
            {Header[page]}
          </Typography>
        </Box>
        <Typography variant="h5" color="grey">
          {Description[page][1]}
        </Typography>
        <Typography variant="h5" color="grey">
          {Description[page][2]}
        </Typography>

        {/* Input */}
        <Box
          component="form"
          onSubmit={(e) => {
            onSubmit(e, page, Form[page].form);
          }}
          display="flex"
          flexDirection={"column"}
          width="100%"
          maxWidth={"400px"}
          pt={3}
          sx={{
            "& .MuiTextField-root": { my: 1 },
          }}>
          {page === "login" ? (
            <>
              <Email
                id={"email"}
                name={"email"}
                value={loginForm.email}
                onChange={(e) => {
                  onUpdateField({ e: e, form: loginForm, setForm: setLoginForm });
                }}
                props={{ autoFocus: true }}
              />
              <Password
                id={"password"}
                name={"password"}
                value={loginForm.password}
                onChange={(e) => {
                  onUpdateField({ e: e, form: loginForm, setForm: setLoginForm });
                }}
              />
              <Box
                width="100%"
                display="flex"
                justifyContent={"space-between"}
                alignItems={"center"}>
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
            </>
          ) : page === "register" ? (
            <>
              <Email
                id={"email"}
                name={"email"}
                value={registerForm.email}
                onChange={(e) => {
                  onUpdateField({ e: e, form: registerForm, setForm: setRegisterForm });
                }}
                props={{ autoFocus: true }}
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
            </>
          ) : page === "forgetPassword" ? (
            <Email
              id={"email"}
              name={"email"}
              value={forgetPsForm.email}
              onChange={(e) => {
                onUpdateField({ e: e, form: forgetPsForm, setForm: setForgetPsForm });
              }}
              props={{ autoFocus: true }}
            />
          ) : page === "enterNewPs" ? (
            <>
              {" "}
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
            </>
          ) : (
            <></>
          )}

          <Button variant="contained" color="info" type={"Submit"} fullWidth>
            {SubmitButtonText[page]}
          </Button>
        </Box>

        {/* Reminder to other page */}
        <Box pt={3} width="100%" display="flex" justifyContent={"center"} alignItems={"center"}>
          <Typography>{Reminder[page] ? Reminder[page].text : ""} </Typography>
          {Reminder[page] ? (
            <Button
              variant="text"
              onClick={() => {
                setPage(Reminder[page].link);
              }}
              color="info"
              sx={{ "&:hover": { backgroundColor: "#FFFFFF" } }}>
              {Reminder[page].buttonText}
            </Button>
          ) : (
            <></>
          )}
        </Box>
      </Grid>

      {/* Image */}
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

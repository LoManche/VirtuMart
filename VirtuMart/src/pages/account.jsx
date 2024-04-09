import {
  Box,
  Button,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router";
import authImage from "../assets/auth.png";
import { useEffect, useState } from "react";
import { Email, Password } from "../components/textfields";
import Api from "../api";
import handleError from "../components/handleError";
import { useAppContext } from "../contexts/appContext";
import ProfileSetup from "../components/profileSetup";

export default function Account() {
  const navigate = useNavigate();
  const [page, setPage] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "", rememberMe: false });
  const [registerForm, setRegisterForm] = useState({ email: "", password: "", confirmPs: "" });
  const [forgetPsForm, setForgetPsForm] = useState({ email: "" });
  const [resetPsForm, setResetPsForm] = useState({ password: "", confirmPs: "" });
  const [otpForm, setOtpForm] = useState({ email: "", otp: "" });
  const [setupForm, setSetupForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    address: "",
    password: "",
    confirmPs: "",
  });
  const [disableButton, setDisableButton] = useState(false);
  const onUpdateField = ({ e, form, setForm }) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setForm({
      ...form,
      [name]: inputValue,
    });
    if (
      document.getElementById("password") !== null &&
      document.getElementById("confirmPs") !== null &&
      document.getElementById("password").value !== document.getElementById("confirmPs").value
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  };
  const { isLogin, setIsLogin, user, setUser } = useAppContext();

  async function handleLoginSubmit({ input }) {
    try {
      const res = await Api.login({
        email: input.email,
        password: input.password,
        rememberMe: input.rememberMe,
      });
      document.cookie = "userId=" + res.userid;
      document.cookie = "role=" + res.role;
      console.log("login", res);

      localStorage.setItem("isLogin", true);
      localStorage.setItem("userid", res.userid);
      localStorage.setItem("role", res.role);
      setIsLogin(true);
      setUser({ userId: res.userid, role: res.role });

      navigate("/");
    } catch (err) {
      handleError(err, "");
    }
  }

  async function handleRegisterSubmit({ input }) {
    try {
      const res = await Api.signUp({
        email: input.email,
      });
      setPage("otp");
      setOtpForm({ email: input.email, otp: "" });
      localStorage.setItem("tempEmail", input.email);
    } catch (err) {
      handleError(err, "");
    }
  }

  async function handleOTPSubmit({ input }) {
    try {
      console.log(input);
      const res = await Api.signUpOTP({
        email: input.email,
        otp: input.otp,
      });
      console.log("otp res", res);
      setSetupForm({ ...setupForm, email: input.email });
      setPage("setup");
    } catch (err) {
      setPage("register");
      localStorage.removeItem("tempEmail");
      handleError(err, "");
    }
  }

  async function handleSetupSubmit({ input }) {
    try {
      console.log({
        username: input.username,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        city: input.city,
        state: input.state,
        password: input.password,
        email: input.email,
        address: input.address,
      });
      const res = await Api.signUpSetup({
        username: input.username,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        city: input.city,
        state: input.state,
        password: input.password,
        email: input.email,
        address: input.address,
      });

      console.log("setup res", res);
      localStorage.removeItem("tempEmail");
      setPage("login");
    } catch (err) {
      console.log(err);
      handleError(err, "");
    }
  }

  useEffect(() => {}, [isLogin, user]);

  const onSubmit = (e, type, form) => {
    e.preventDefault();
    if (type === "login") {
      handleLoginSubmit({ input: form });
    } else if (type === "register") {
      handleRegisterSubmit({ input: form });
    } else if (type === "otp") {
      handleOTPSubmit({ input: form });
    } else if (type === "setup") {
      handleSetupSubmit({ input: form });
    } else if (type === "forgetPassword") {
      //
    } else if (type === "resetPs") {
      //
    }
  };

  const Form = {
    login: { form: loginForm, setForm: setLoginForm },
    register: { form: registerForm, setForm: setRegisterForm },
    forgetPassword: { form: forgetPsForm, setForm: setForgetPsForm },
    otp: { form: otpForm, setForm: setOtpForm },
    resetPs: { form: resetPsForm, setForm: setResetPsForm },
    setup: { form: setupForm, setForm: setSetupForm },
  };

  const Header = {
    login: "Sign In",
    register: "Sign Up",
    forgetPassword: "Forget Password",
    otp: "OTP Verification",
    resetPs: "Enter Your New Password",
    setup: "Personal Information",
  };

  const Description = {
    login: { 1: "Welcome back~", 2: "Please enter your account details" },
    register: { 1: "Let's create your account and", 2: "Shop like a pro and save money" },
    forgetPassword: { 1: "A password reset link will be sent to your email address" },
    otp: {
      1: "One Time Password (OTP) has been sent via Email to " + localStorage.getItem("tempEmail"),
      2: "Enter the OTP below to verify it.",
    },
    resetPs: { 1: "" },
    setup: { 1: "Please enter your personal information to set up your account~" },
  };

  const Reminder = {
    login: { text: "Don't have an account?", link: "register", buttonText: "Sign Up Now" },
    register: { text: "Already have an account?", link: "login", buttonText: "Sign In" },
    forgetPassword: { text: "Don't have an account?", link: "register", buttonText: "Sign Up Now" },
    otp: { text: "Wanna change the email address?", link: "register", buttonText: "Retry" },
    resetPs: false,
    setup: false,
  };

  const SubmitButtonText = {
    login: "Sign In",
    register: "Sign Up",
    forgetPassword: "Send Password Reset Link",
    otp: "Submit",
    resetPs: "Submit",
    setup: "Submit",
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
                props={{ type: "text", autoFocus: true, required: true }}
              />
              <Password
                id={"password"}
                name={"password"}
                value={loginForm.password}
                onChange={(e) => {
                  onUpdateField({ e: e, form: loginForm, setForm: setLoginForm });
                }}
                props={{ required: true }}
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
                props={{ autoFocus: true, required: true }}
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
          ) : page === "resetPs" ? (
            <>
              <Password
                id={"password"}
                name={"password"}
                value={resetPsForm.password}
                onChange={(e) => {
                  onUpdateField({ e: e, form: resetPsForm, setForm: setResetPsForm });
                }}
              />
              <Password
                id={"confirmPs"}
                name={"confirmPs"}
                value={resetPsForm.confirmPs}
                onChange={(e) => {
                  onUpdateField({ e: e, form: resetPsForm, setForm: setResetPsForm });
                }}
                props={{ label: "Confirm Password" }}
              />
              <Box pt={3}></Box>
            </>
          ) : page === "otp" ? (
            <>
              <TextField
                id={"otp"}
                name={"otp"}
                value={otpForm.otp}
                onChange={(e) => {
                  onUpdateField({ e: e, form: otpForm, setForm: setOtpForm });
                }}
                label={"OTP"}
                autoFocus
                required
              />
              <Box pt={3}></Box>
            </>
          ) : page === "setup" ? (
            <>
              <ProfileSetup
                profileData={setupForm}
                onUpdateField={(e) => {
                  onUpdateField({ e: e, form: setupForm, setForm: setSetupForm });
                }}
                additionalFields={[
                  { name: "password", label: "Password", props: { type: "password" } },
                  {
                    name: "confirmPs",
                    label: "Confirm Password",
                    props: {
                      type: "password",
                      helperText:
                        setupForm["confirmPs"] !== "" && disableButton
                          ? "Password didn't match"
                          : "",
                      error: setupForm["confirmPs"] !== "" && disableButton,
                    },
                  },
                ]}
              />
            </>
          ) : (
            <></>
          )}

          <Button
            variant="contained"
            color="info"
            type={"Submit"}
            fullWidth
            disabled={disableButton}>
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

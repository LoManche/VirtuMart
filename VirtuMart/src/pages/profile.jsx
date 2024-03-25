import { Button } from "@mui/material";
import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userFormData, setUserFormData] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  //   const navigate = useNavigate();

  const getUserData = async () => {
    //try {
    const response = {
      name: "userName",
      lastname: "user",
      email: "email",
      phone: "12345678",
      address: "address",
      password: "password",
    }; //await axios(`http://localhost:8080/user/${id}`);
    const data = response.data;
    setUserFormData({
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      address: data.address,
      password: data.password,
    });
    // } catch (error) {
    //   toast.error("Error: ", error.response);
    // }
  };

  useEffect(() => {
    getUserData();
    // if (loginState) {
    //   getUserData();
    // } else {
    //   toast.error("You must be logged in to access this page");
    //   navigate("/");
    // }
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h2 title="User Profile" path="Home | User Profile" />
      <form className="max-w-7xl mx-auto text-center px-10" onSubmit={updateProfile}>
        <div className="grid grid-cols-3 max-lg:grid-cols-1">
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.name}
              onChange={(e) => {
                setUserFormData({ ...userFormData, name: e.target.value });
              }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Lastname</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.lastname}
              onChange={(e) => {
                setUserFormData({ ...userFormData, lastname: e.target.value });
              }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.email}
              onChange={(e) => {
                setUserFormData({ ...userFormData, email: e.target.value });
              }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Phone</span>
            </label>
            <input
              type="tel"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.phone}
              onChange={(e) => {
                setUserFormData({ ...userFormData, phone: e.target.value });
              }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Address</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.address}
              onChange={(e) => {
                setUserFormData({ ...userFormData, address: e.target.value });
              }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.password}
              onChange={(e) => {
                setUserFormData({ ...userFormData, password: e.target.value });
              }}
            />
          </div>
        </div>
        <Button type="submit">Update Profile</Button>
      </form>
    </>
  );
};

export default Profile;

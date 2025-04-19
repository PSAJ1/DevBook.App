import React from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../utils/userSlice";
const Boday = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  async function fetchUser() {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(updateUser(res.data.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  }
  React.useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);
  if (user) {
    return (
      <div className="h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex justify-center items-center">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  }
  return <div className="h-screen flex justify-center"><span className="loading loading-bars loading-xl"></span></div>;
};

export default Boday;

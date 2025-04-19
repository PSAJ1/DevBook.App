import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
const NavBar = () => {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogout() {
    await axios.post(
      BASE_URL + "/logout",
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(removeUser());
    navigate("/login");
  }
  return state && (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            🧑🏻‍💻 DevBook
          </Link>
        </div>
        <div className="flex mx-5 items-center gap-4">
          {state && <p className="xs:hidden">Welcome, {state?.firstName}</p>}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div class="avatar avatar-placeholder" title={state?.firstName}>
                <div class="bg-blue-400 text-neutral-content w-9 rounded-full">
                  <img
                    src={state?.photoUrl}
                    alt="avatar"
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

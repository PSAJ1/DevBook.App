import axios from "axios";
import React from "react";
import LoginNavBar from "./LoginNavBar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { updateUser } from "../utils/userSlice";

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  //const [error, setError] = React.useState("");
  const [email, setEmail] = React.useState("dhoni@dbdevbook.com");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setLoading(false);
      if (res && res.data && res.data.status) {
        dispatch(updateUser(res.data.data));
        navigate("/");
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  return (
    <div className="h-screen flex flex-col">
      <LoginNavBar />
      <div className="flex-1 flex justify-center items-center">
        <div className="card w-96 bg-base-300 card-xl shadow-sm">
          <div className="card-body">
            <h2 className="card-title">🧑🏻‍💻 DB Login</h2>
            <div>
              <legend className="fieldset-legend">Email</legend>
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  placeholder="mail@site.com"
                  value={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>
            <div>
              <legend className="fieldset-legend">Password</legend>
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  minLength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including :-
                <br />
                At least one number
                <br />
                At least one lowercase letter
                <br />
                At least one uppercase letter
              </p>
            </div>
            <div className="justify-between card-actions">
              <Link
                to="/signup"
                className="text-sm self-center cursor-pointer text-primary"
              >
                New user ? Sign up
              </Link>
              <button
                className="btn btn-primary"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading && <span className="loading loading-spinner"></span>}
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

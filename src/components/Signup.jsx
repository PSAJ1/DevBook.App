import React from "react";
import LoginNavBar from "./LoginNavBar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
function Signup() {
  //const user = useSelector((state) => state.user);
  //const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  // const [showAlert, setShowAlert] = React.useState({
  //   show: false,
  //   message: "",
  //   alertRef: null,
  // });
  const [lastName, setLastName] = React.useState("");
  const [gender, setGender] = React.useState(1);
  const [dob, setDob] = React.useState("");
  const [age] = React.useState(1);
  const [phone, setPhone] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          gender,
          dateOfBirth:dob,
          age,
          phoneNumber,
          photoUrl,
          country,
          bio,
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
      <div className="flex-1 flex justify-center items-center m">
        <div className="card  bg-base-300 card-xl shadow-sm">
          <div className="card-body">
            <h2 className="card-title">🧑🏻‍💻 DB Sign Up</h2>
            <div className="flex gap-2">
              <div>
                <legend className="fieldset-legend">First Name</legend>
                <input
                  disabled={loading}
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  className="input"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>

              <div>
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  disabled={loading}
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  className="input"
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>

              <div>
                <legend className="fieldset-legend">Gender</legend>
                <select
                  className="select"
                  disabled={loading}
                  value={gender}
                  required
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <option value={1}>Male</option>
                  <option value={2}>Female</option>
                  <option value={3}>Other</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <div>
                <legend className="fieldset-legend">Date Of Birth</legend>
                <input
                  required
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="input"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              </div>

              <div>
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="number"
                  value={age}
                  placeholder="Age"
                  className="input w-15"
                  //disabled
                />
              </div>

              <div>
                <legend className="fieldset-legend">Phone</legend>
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
                    type="text"
                    placeholder="91 8602957804"
                    value={phone}
                    required
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid email address
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-4/5">
                <legend className="fieldset-legend">Photo Url</legend>
                <label className="input validator w-full">
                  <input
                    disabled={loading}
                    type="text"
                    value={photoUrl}
                    onChange={(e) => {
                      setPhotoUrl(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div>
                <legend className="fieldset-legend">Country</legend>
                <input
                  required
                  disabled={loading}
                  type="text"
                  placeholder="Country name"
                  value={country}
                  className="input"
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-full">
                <legend className="fieldset-legend">Bio</legend>
                <textarea
                  disabled={loading}
                  value={bio}
                  className="textarea w-full"
                  placeholder="Bio"
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>

            {/* <div className="flex gap-2">
              <div className="w-full">
                <legend className="fieldset-legend">Skills</legend>
                <textarea
                  disabled={loading}
                  value={bio}
                  className="textarea w-full"
                  placeholder="Bio"
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                ></textarea>
              </div>
            </div> */}

            <div className="flex gap-2">
              <div className="w-1/2">
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

              <div className="w-1/2">
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
            </div>
            <div className="justify-between card-actions">
              <Link
                to="/login"
                className="text-sm self-center cursor-pointer text-primary"
              >
                Already user ? Login
              </Link>
              <button
                className="btn btn-primary"
                onClick={handleSignUp}
                disabled={loading}
              >
                {/* {loading && <span className="loading loading-spinner"></span>} */}
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;

import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { updateUser } from "../utils/userSlice";

function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [firstName, setFirstName] = React.useState(user?.firstName || "");
  const [showAlert, setShowAlert] = React.useState({
    show: false,
    message: "",
    alertRef: null,
  });
  const [lastName, setLastName] = React.useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = React.useState(user?.photoUrl || "");
  const [gender, setGender] = React.useState(user?.gender || 1);
  const [bio, setBio] = React.useState(user?.bio || "");
  React.useEffect(() => {
    if (!showAlert.show && showAlert.alertRef) {
      clearTimeout(showAlert.alertRef);
      setShowAlert({ show: false, message: "", alertRef: null });
    }
  }, [showAlert.show]);
  async function handleSaveProfile() {
    setLoading(true);
    try {
      let res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, gender, bio },
        {
          withCredentials: true,
        }
      );
      debugger;
      if (res && res.data) {
        let ref = setTimeout(() => {
          setShowAlert({ show: false, message: "" });
        }, 3000);
        setShowAlert({
          show: true,
          message: "Profile saved successfully",
          alertRef: ref,
        });
        dispatch(updateUser(res.data));
      }
    } catch (error) {
      setShowAlert({ show: true, message: "Profile saved successfully" });
      setTimeout(() => {
        setShowAlert({ ...showAlert, show: false, message: "" });
      }, 3000);
    }
    setLoading(false);
  }
  return (
    user && (
      <>
        <div className="card card-side bg-base-300 shadow-sm">
          <div className="card-body">
            <div className="flex gap-2">
              <div>
                <legend className="fieldset-legend">First Name</legend>
                <input
                  disabled={loading}
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  className="input"
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
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex gap-2">
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
                    value={user.email}
                    disabled
                    required
                    onChange={(e) => {}}
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid email address
                </div>
              </div>

              <div>
                <legend className="fieldset-legend">Gender</legend>
                <select
                  className="select"
                  disabled={loading}
                  value={gender}
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
                <legend className="fieldset-legend">
                  Date Of Birth (dd/mm/yyyy)
                </legend>
                <input
                  type="text"
                  placeholder="Date of birth (dd/mm/yyyy)"
                  className="input"
                  value={user.dateOfBirth}
                  disabled
                />
              </div>

              <div>
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="number"
                  value={user.age}
                  placeholder="Age"
                  className="input w-15"
                  disabled
                />
              </div>
            </div>

            <div>
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

            {/* save button */}
            <div className="card-actions justify-center mt-3">
              <button
                disabled={loading}
                className="btn btn-secondary"
                onClick={handleSaveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
          <figure>
            <div className="card bg-base-300 w-100 shadow-sm">
              <figure>
                <img src={photoUrl} alt="avatar" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {firstName + " " + lastName}
                  <div className="badge badge-error">{user.age}</div>
                </h2>
                <p>{user.bio}</p>
              </div>
            </div>
          </figure>
        </div>
        {showAlert.show && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <span>{showAlert.message}</span>
            </div>
          </div>
        )}
      </>
    )
  );
}

export default Profile;

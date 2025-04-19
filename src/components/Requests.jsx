import React from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { GetGender } from "../Enums/GetGender";

function Requests() {
  const [requests, setRequests] = React.useState();

  React.useEffect(() => {
    fetchRequests();
  }, []);
  //filter request when it accept or ignored
  function filterRequest(requestId) {
    let newRequestArray = requests.filter((r) => r._id !== requestId);
    setRequests(newRequestArray);
  }
  //handle accept and reject request
  async function handleRequest(status, requestId) {
    try {
      if (requestId) {
        var res = await axios.post(
          BASE_URL + `/request/review/${status}/${requestId}`,
          null,
          {
            withCredentials: true,
          }
        );
        if (res && res.data && res.data.status) {
          filterRequest(requestId);
        }
      }
    } catch (e) {}
  }

  // fetching all the requests
  async function fetchRequests() {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      if (res && res.data && res.data.data.length > 0) {
        setRequests(res.data.data);
      }
    } catch (e) {}
  }
  if (!requests)
    return <span className="loading loading-bars loading-xl"></span>;
  if (requests.length === 0) return <h3>No requests found</h3>;

  return (
    <div className="h-11/12 w-md p-3.5 rounded-md bg-base-300">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xl opacity-60 tracking-wide">Requests</li>
        {requests.map((conn) => {
          return (
            <li className="list-row">
              <div>
                <img
                  className="size-10 rounded-box"
                  src={conn.fromUserId.photoUrl}
                />
              </div>
              <div>
                <div>
                  {conn.fromUserId.firstName + " " + conn.fromUserId.lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {conn.fromUserId.age +
                    ", " +
                    GetGender(conn.fromUserId.gender)}
                </div>
              </div>
              <button
                className="btn btn-success"
                onClick={() => handleRequest(2, conn?._id)}
              >
                <svg
                  width="24px"
                  height="24px"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#000000"
                >
                  <path
                    d="M7 12.5L10 15.5L17 8.5"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
              <button
                className="btn btn-error"
                onClick={() => handleRequest(3, conn?._id)}
              >
                <svg
                  width="24px"
                  height="24px"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#000000"
                >
                  <path
                    d="M9.17218 14.8284L12.0006 12M14.829 9.17157L12.0006 12M12.0006 12L9.17218 9.17157M12.0006 12L14.829 14.8284"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Requests;

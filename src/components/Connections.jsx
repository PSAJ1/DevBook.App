import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { GetGender } from "../Enums/GetGender";

function Connections() {
  const [connections, setConnections] = React.useState();
  React.useEffect(() => {
    fetchConnections();
  }, []);

  // fetching all the connections
  async function fetchConnections() {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      if (res && res.data && res.data.data.length > 0) {
        setConnections(res.data.data);
      }
    } catch (e) {}
  }
  if (!connections) return <span className="loading loading-bars loading-xl"></span>;
  if (connections.length === 0) return <h3>No connections found</h3>;

  return (
    <div className="h-11/12 w-md p-3.5 rounded-md bg-base-300">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xl opacity-60 tracking-wide">
          Connections
        </li>
        {connections.map((conn) => {
          return (
            <li className="list-row">
              <div>
                <img
                  className="size-10 rounded-box"
                  src={conn.toUserId.photoUrl}
                />
              </div>
              <div>
                <div>
                  {conn.toUserId.firstName + " " + conn.toUserId.lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {conn.toUserId.age + ", " + GetGender(conn.toUserId.gender)}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Connections;

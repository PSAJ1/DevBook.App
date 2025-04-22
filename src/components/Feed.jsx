import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { updateFeed, removeUserFeed } from "../utils/feedSlice";
import axios from "axios";
const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const feed = useSelector((state) => state.feed);
  //handle interested and ignored feed
  async function handleRequest(status, userId) {
    debugger;
    try {
      if (userId) {
        var res = await axios.post(
          BASE_URL + `/request/send/${status}/${userId}`,
          null,
          {
            withCredentials: true,
          }
        );
        if (res && res.data && res.data.status) {
          dispatch(removeUserFeed(userId));
        }
      }
    } catch (e) {}
  }
  // getting feed
  async function getFeed() {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(updateFeed(res.data.data || []));
    } catch (e) {
      console.log(e);
    }
  }
  React.useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return <span className="loading loading-bars loading-xl"></span>;
  if (feed.length == 0) return <h3>No requests found</h3>;
  return (
    user &&
    feed[0] && (
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={feed[0].photoUrl} alt="avatar" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {feed[0].firstName + " " + feed[0].lastName}
            <div className="badge badge-error">{feed[0].age}</div>
          </h2>
          <p>{feed[0].bio}</p>
          <div className="card-actions justify-end mt-1">
            <button
              className="btn btn-primary"
              onClick={() => handleRequest(0, feed[0]._id)}
            >
              Interested
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleRequest(1, feed[0]._id)}
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Feed;

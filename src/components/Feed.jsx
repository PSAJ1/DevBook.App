import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { updateFeed } from "../utils/feedSlice";
import axios from "axios";
const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const feed = useSelector((state) => state.feed);
  async function getFeed() {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(updateFeed(res.data.data[0]));
    } catch (e) {
      console.log(e);
    }
  }
  React.useEffect(() => {
    getFeed();
  }, []);
  return (
    user &&
    feed && (
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={feed.photoUrl} alt="avatar" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {feed.firstName + " " + feed.lastName}
            <div className="badge badge-error">{feed.age}</div>
          </h2>
          <p>{feed.bio}</p>
          <div className="card-actions justify-end mt-1">
            <button className="btn btn-primary">Interested</button>
            <button className="btn btn-secondary">Ignore</button>
          </div>
        </div>
      </div>
    )
  );
};

export default Feed;

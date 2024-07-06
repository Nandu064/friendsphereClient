import React, { useEffect, useState } from "react";
import defaultPic from "../../assets/images/default.jpeg";
import { useParams } from "react-router-dom";
import { profile } from "../../helper/api";
const ProfileCard = () => {
  const { user_id } = useParams();
  const [profileDetails, setProfileDetails] = useState({});
  useEffect(() => {
    if (user_id) {
      profile(user_id).then((res) => {
        console.log("res: ", res.data);
        setProfileDetails(res.data);
      });
    }
    console.log("user_id", user_id);
  }, [user_id]);
  return (
    <div className="app-container">
      <div className="profile-card">
        <div className="profile-header">
          <img src={defaultPic} alt="Victor Crest" className="profile-pic" />
        </div>
        <div className="profile-details">
          <h1>{profileDetails.username}</h1>
          {/* <p>London</p> */}
          <div className="stats">
            <div>
              <h2>{profileDetails.followers}</h2>
              <p>Followers</p>
            </div>
            <div>
              <h2>{profileDetails.following}</h2>
              <p>Following</p>
            </div>
            <div>
              <h2>{profileDetails.totalPosts}</h2>
              <p>Photos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

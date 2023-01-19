import React, { useEffect, useState } from "react";
import "./User.css";
import github from "../../assets/github.svg";
import location from "../../assets/lokasi.svg";
import site from "../../assets/site.svg";
import user from "../../assets/user.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Repo from "../../components/ui/Repo";

const User = () => {
  const { login } = useParams();

  const [userInfo, setUserInfo] = useState({});
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await Promise.all([
          axios.get(`${process.env.REACT_APP_URL}/users/${login}`),
          axios.get(`${process.env.REACT_APP_URL}/users/${login}/repos`),
        ]);

        setUserInfo(response[0].data);
        setRepos(response[1].data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInformation();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <Link to="/" className="back">
        Back
      </Link>
      <div className="user-information">
        <div className="image">
          <img src={userInfo?.avatar_url} alt="...." />
        </div>
        <div className="user-content">
          <h1>{userInfo?.name}</h1>
          <p>{userInfo?.bio}</p>
          <div className="more-data">
            <p>
              <img src={user} alt="...." />
              {userInfo?.followers} Followers &emsp; Following{" "}
              {userInfo?.following}
            </p>
            {userInfo?.location && (
              <p>
                <img src={location} alt="...." />
                {userInfo?.location}
              </p>
            )}
            {userInfo?.blog && (
              <p>
                <img src={site} alt="...." />
                {userInfo?.blog}
              </p>
            )}
            <p>
              <img src={github} alt="...." />
              {/* eslint-disable-next-line */}
              <a href={userInfo?.html_url} target={"_blank"}>
                {" "}
                view github profile
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="user-repos">
        {repos ? (
          repos.map((repo) => {
            return <Repo repo={repo} key={repo.id} />;
          })
        ) : (
          <h2>No Repos </h2>
        )}
      </div>
    </div>
  );
};

export default User;

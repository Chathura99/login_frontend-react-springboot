import React, { useState } from "react";
import { fetchUserData } from "../../services/authenticationService";
import "./topbar.css";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const Topbar = () => {
  const [data, setData] = useState({});
  

  React.useEffect(() => {
    fetchUserData()
      .then((response) => {
        setData(response.data);

      })
      .catch((e) => {
        localStorage.clear();
      });
  }, []);

  //log out and clear local storage
  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
    // props.history.push('/');
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">System Name</span>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <Button />
            <span className="topIconBadge">5</span>
          </div> */}

          <div className="topbarIconContainer">
            <Button onClick={() => logOut()} style={{color:"white"}}>Log Out</Button>
          </div>
          {data && `${data.firstName} ${data.lastName}`}

          <Link to="/dashboard">
            <img src="" alt="" className="topAvatar" />
          </Link>
        </div>
      </div>
    </div>
    
  );
};

export default Topbar;

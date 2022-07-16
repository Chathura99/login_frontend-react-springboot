import React, { useState,useEffect } from "react";
import { fetchUserData } from "../../services/authenticationService";
import "./dashboard.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { SidebarDataAdmin, SidebarDataMember } from "../../data/Data";
import Topbar from "../../components/topbar/Topbar";
import User from "../otherpages/User";

const Dashboard = () => {
  const [userdata, setData] = useState([]);
  const [userrole, setUserRoles] = useState([]);

  useEffect(() => {    
    userData();
  }, []);

  const userData = async () => {
    const res = await fetchUserData();
    // console.log(res.data)
    // console.log(res.data.roles)
    setData(res.data);
    setUserRoles(res.data.roles);
  }

  const getSidebar = (role) => {
    if (role === "ADMIN") {
      return <Sidebar role={"Admin"} data={SidebarDataAdmin} />;
    } else if (role === "MEMBER") {
      return <Sidebar role={"Member"} data={SidebarDataMember} />;
    } else {
      return <Sidebar role={"Other"} data={SidebarDataMember} />;
    }
  };

  return (
    <>
      <Topbar />
      <div className="body">
        <div className="sidebar">
          {getSidebar("ADMIN")}
        </div>

        <div className="container">
          <div className="dashboard">
            {/* print in string */}
            <h3>Hello {userdata && `${userdata.firstName} ${userdata.lastName}`}</h3>
            
            

            {
            userrole.map((role, index) => (
              <div key={role.id}>
                <h6>User ID : </h6>
                {role.id}
                <h6>User Role : </h6>
                {role.roleDescription}
                <br />
              </div>
            ))
            }
            
            <User />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Dashboard;

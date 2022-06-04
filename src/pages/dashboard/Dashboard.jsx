import React, { useState } from "react";
import { fetchUserData } from "../../services/authenticationService";
import "./dashboard.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { SidebarDataAdmin, SidebarDataMember } from "../../data/Data";
import Topbar from "../../components/topbar/Topbar";

const Dashboard = (props) => {
  const [data, setData] = useState({});
  const [otherdata, setOther] = useState({});

  React.useEffect(() => {
    fetchUserData()
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setOther(response.data.roles[0]);
      })
      .catch((e) => {
        localStorage.clear();
        // props.history.push('/');
        window.location.href = "/";
      });
  }, []);

  const getSidebar = (role) => {
    if (role === "ADMIN") {
      return <Sidebar role={"Admin"} data={SidebarDataAdmin} />;
    } else if (role === "MEMBER") {
      return <Sidebar role={"Member"} data={SidebarDataMember} />;
    }
  };

  return (
    <>
      <Topbar />
      <div className="body">
        <div className="sidebar">{getSidebar(otherdata.roleCode)}</div>

        <div className="container">
          <div className="dashboard">
            <h4>Hello {data && `${data.firstName} ${data.lastName}`}</h4>
            <h6>User ID : {otherdata.id}</h6>
            <h6>User Role : {otherdata.roleCode}</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

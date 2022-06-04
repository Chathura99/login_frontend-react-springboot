import React, { useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import {
  SidebarDataAdmin,
  SidebarDataMember,
  SidebarDataTeacher,
} from "../../data/Data";

const Sidebar = (props) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menu-{props.role}</h3>

          <ul className="sidebarList">
            {props.data.map((item, index) => {
              return (
                <div key={index}>
                  <Link to={item.linkto} className="link">
                    <li
                      className={
                        selected === index
                          ? "sidebarListItem active"
                          : "sidebarListItem"
                      }
                      
                      onClick={() => {
                        setSelected(index);
                      }}
                    >
                      <item.icon className="sidebarIcon" />
                      {item.heading}
                    </li>
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

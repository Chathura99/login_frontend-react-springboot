import React, { useState, useEffect } from "react";
import { getUsers} from "../../services/userService";

export default function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      getUserDetails();
    }, []);

    const getUserDetails = async () => {
      await getUsers()
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
        })
        
    };


  return (
    <div>
    <hr/>
    <h3>User list from DB</h3>
    {
        users.map((user, index) => (
            <p key={user.id}>{user.firstName}-{user.lastName}
            <br/>
            {user.email}
            </p>
        ))
    }

    </div>

    
  )
}

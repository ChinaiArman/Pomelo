import { Dropdown } from "flowbite-react";
import { useState, useEffect } from 'react';
import axios from 'axios';

const NavBar = () => {

  const [isLeader, setIsLeader] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get('http://localhost:5000/getTeamSpaceByID', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
      .then(response => {
        if (response.data.data.teamSpaceLeaderUserID === window.localStorage.getItem("userID")) {
          setIsLeader(true);
        } else {
          setIsLeader(false);
        }
      }).catch(error => {
        console.log(error);
      });
  }

  const handleLogout = () => {
      window.localStorage.removeItem("userID")
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("teamSpaceID");
      window.location.replace('/login')
  }

  const navItems = [
    { id: 1, text: "Home", link: "/" },
    { id: 2, text: "Categories", link: "/categories" },
    { id: 3, text: "Transactions", link: "/transactions" },
    { id: 4, text: "Settings", link: "/signup" },
  ];

  return (
    <div className="bg-gray-100 flex justify-between items-center h-24 w-full mx-auto px-4 text-gray-800">
      <ul className="flex">
        {navItems.slice(0, -1).map((item) => {
          if (item.link === window.location.pathname) {
            return (
              <li
                key={item.id}
                className="p-4 hover:bg-gray-300 rounded-xl m-2 cursor-pointer duration-300 bg-gray-300"
              >
                <a href={item.link}>{item.text}</a>
              </li>
            )
          } else {
          return (
          <li
            key={item.id}
            className="p-4 hover:bg-gray-300 rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
          >
            <a href={item.link}>{item.text}</a>
          </li>
        )}
        })}
      </ul>

      <Dropdown label="Settings" inline>
        <Dropdown.Item onClick={() => handleLogout()}>Sign out</Dropdown.Item>
        {/* if is teamspace leader, show team space settings tab */}
        {isLeader && <Dropdown.Item href="/settings">Team Space Settings</Dropdown.Item>}
      </Dropdown>
    </div>
  );
};

export default NavBar;

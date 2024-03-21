import { Dropdown } from "flowbite-react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from "../assets/logo_full.png";

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
    { id: 3, text: "Transactions", link: "/transactions" },
    { id: 4, text: "Settings", link: "/signup" },
  ];

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="Pomelo Logo" className="mt-2 h-10" />
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navItems.slice(0, -1).map((item, index) => {
              if (item.link === window.location.pathname) {
                return (
                  <li key={index}>
                    <a href={item.link} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">{item.text}</a>
                  </li>
                )
              } else {
                return (
                  <li key={index}>
                    <a href={item.link} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{item.text}</a>
                  </li>
                )
              }
            })}
            <li>
              <Dropdown label="Settings" inline>
                <Dropdown.Item onClick={() => handleLogout()}>Sign out</Dropdown.Item>
                {isLeader && <Dropdown.Item href="/teamSpaceSettings">Team Space Settings</Dropdown.Item>}
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

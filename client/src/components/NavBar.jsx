import { Dropdown } from "flowbite-react";

const NavBar = () => {

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
    <div className="bg-gray-50 flex justify-between items-center h-24 max-w-[1280px] mx-auto px-4 text-gray-800">
      <ul className="flex">
        {navItems.slice(0, -1).map((item) => (
          <li
            key={item.id}
            className="p-4 hover:bg-gray-300 rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
          >
            <a href={item.link}>{item.text}</a>
          </li>
        ))}
      </ul>

      <Dropdown label="Settings" inline>
        <Dropdown.Item onClick={() => handleLogout()}>Sign out</Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default NavBar;

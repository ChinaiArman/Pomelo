import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import { useState } from 'react';

const RemoveUserModal = ({ onClose, userList }) => {
    const [userToRemove, setUserToRemove] = useState('');

  let removeUserFromTeamSpace = async function (event) {
        console.log(userToRemove)
        event.preventDefault();
        await axios.post('http://localhost:5000/removeUserFromTeamSpaceByID', {
            "teamSpaceID": window.localStorage.getItem("teamSpaceID"),
            "userID": userToRemove
        }).then(async response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }
  
    const handleSubmit = async function(event) {
      event.preventDefault();
      await removeUserFromTeamSpace(event);
      onClose();
      window.location.href = window.location.href
    }
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg mt-1 relative max-w-md w-full">
          <IoCloseSharp className="absolute top-0 right-0 mr-4 mt-4 cursor-pointer"size={35} onClick={onClose}/>
          <h1 className="mb-4 text-lg font-bold">Remove User</h1>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Select a user to remove</label>
              <select
                onChange={(e) => setUserToRemove(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                required
              >
                <option value="">Select a user</option>
                {userList.map((user, index) => 
                (
                  <option key={index} value={user.userID}>{user.username}</option>
                ))}
              </select>
            </div>
            <button className="bg-primary-500 hover:bg-primary-700 focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Remove User
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default RemoveUserModal;
  
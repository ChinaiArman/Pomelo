import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_SERVER_URL = "https://pomelo-server.vercel.app";

const Register = () => {
  const [teamSpaceName, setTeamSpaceName] = useState('');
  const [teamSpaceJoinCode, setTeamSpaceJoinCode] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  let handleCreateTeamSpace = async function (event) {
    event.preventDefault();
    await axios.post(`${BASE_SERVER_URL}/createTeamSpace`, { teamSpaceName, teamSpaceLeaderUserID: window.localStorage.getItem("userID"), teamSpaceLeaderUsername: window.localStorage.getItem("username") })
      .then(response => {
        window.localStorage.setItem("teamSpaceID", response.data.data.teamSpaceID)
        window.location.replace('/')
      })
      .catch(error => {
        console.log(error)
      });
  }

  let handleJoinTeamSpace = async function (event) {
    event.preventDefault();
    await axios.post(`${BASE_SERVER_URL}/addUserToTeamSpace`, { teamSpaceJoinCode, userID: window.localStorage.getItem("userID"), username: window.localStorage.getItem("username") })
      .then(response => {
        if (response.data.status == 201) {
          window.localStorage.setItem("teamSpaceID", response.data.data.teamSpaceID)
          window.location.replace('/')
        } else {
          setErrorMessage("Invalid Team Space Join Code.")
          setTeamSpaceJoinCode('')
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 blurred-background">
      <div className="columns-2 relative">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          ></a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 border-r">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create a team
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleCreateTeamSpace}
              >
                <div>
                  <label
                    htmlFor="teamName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Team Name
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-theme-mantis focus:ring-theme-mantisdark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter a Team Name"
                    required
                    onChange={(e) => setTeamSpaceName(e.target.value)}
                  />
                </div>
                <button className="w-full text-white bg-theme-mantis hover:bg-theme-mantisdark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Create Team
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2">
          <p
            className="font-bold text-gray-500 rounded-full bg-gray-100 flex items-center justify-center text-sm"
            style={{ height: "50px", width: "50px" }}
          >
            or
          </p>
        </div>

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          ></a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Join a team
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleJoinTeamSpace}
              >
                <div>
                  <label
                    htmlFor="joinCode"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Team Space Join Code
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-theme-mantis focus:ring-theme-mantisdark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your team space join code"
                    required
                    value={teamSpaceJoinCode}
                    onChange={(e) => setTeamSpaceJoinCode(e.target.value)}
                  />
                  {errorMessage && (
                    <div className="bg-red-200 bg-opacity-75 text-red-900 p-3 my-4 rounded-lg px-5 py-2.5">
                      <p className="text-sm">{errorMessage}</p>
                    </div>
                  )}
                </div>
                <button className="w-full text-white bg-theme-mantis hover:bg-theme-mantisdark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Join Team
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
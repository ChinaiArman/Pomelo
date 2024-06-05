import logo from "../assets/logo_full.png";

const Landing = () => {

    let handleLogin = () => {
        window.location.replace('/login')
    }

    let handleSignUp = () => {
        window.location.replace('/signup')
    }

    let handleDemo = () => {
        window.localStorage.setItem("username", "Demo")
        window.localStorage.setItem("userID", "0c8c2175-79a9-4029-bbfc-e5cc10350543")
        window.localStorage.setItem("teamSpaceID", "Tbeb68ee9")
        window.location.replace('/')
    }

    return (
        <div className="flex justify-center items-center flex-col h-screen w-screen mx-auto">
            <div>
                <h1 className="text-gray-900 dark:text-white text-8xl font-extrabold mb-2">Welcome to</h1>
            </div>
            <div>
                <img src={logo} className="inline" style={{ height: "350px" }}>
                </img>
            </div>
            <div className="flex space-x-8">
                <button
                    className="inline-flex justify-center items-center py-2.5 px-8 text-base font-medium text-center text-white rounded-lg bg-theme-mantis hover:bg-theme-mantisdark focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                    onClick={handleLogin}
                >
                    Login
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
                <button
                    className="inline-flex justify-center items-center py-2.5 px-8 text-base font-medium text-center text-white rounded-lg bg-theme-mantis hover:bg-theme-mantisdark focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                    onClick={handleSignUp}
                >
                    Sign Up
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
                <button
                    className="inline-flex justify-center items-center py-2.5 px-8 text-base font-medium text-center text-white rounded-lg bg-theme-mantis hover:bg-theme-mantisdark focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                    onClick={handleDemo}
                >
                    Demo
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Landing;
import logo from "../assets/logo_full.png";

const Landing = () => {

    return (
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 flex justify-center items-center flex-col h-screen">
            <div className="text-lg font-normal text-gray-500 dark:text-gray-400 mb">
                <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">Welcome to</h1>
            </div>
            <div>
            <img src={logo} className="inline h-200px" style={{height: "200px"}}>
                </img>
            </div>
            <div className="flex space-x-4">
                <button 
                    className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-theme-mantis hover:bg-theme-mantisdark focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                    // onClick={} // TODO: go to SignUp page
                >
                    Sign Up
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
                <button 
                    className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-theme-mantis hover:bg-theme-mantisdark focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                    // onClick={} // TODO: go to Login page
                >
                    Login
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Landing;
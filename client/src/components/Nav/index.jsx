import Auth from "../../utils/auth";
import { Link } from "react-router-dom";



function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <nav className="relative flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild  dark:bg-darkGray lg:py-4">
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <nav className="w-full rounded-md" aria-label="breadcrumb">
              <ol className="list-reset ms-2 flex">
                <li className="text-black/60 transition duration-200 hover:text-palePurple/80 hover:ease-in-out focus:text-black/80 active:text-palePurple/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80">
                  <Link to="/">Home</Link>
                </li>
                <span className="[&>svg]:w-3 mx-2 text-black/60 dark:text-white/60">
                  <svg
                    id="e7pG1fVXw0m1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 45 80"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                  >
                    <path
                      d="M204.877725,76.148758c-16.765401,18.619382,10.080839,23.8038-8.291615,42.563662"
                      transform="matrix(1.792301 0.668772-.62853 1.684454-276.034058-252.440264)"
                      fill="none"
                      stroke="#050505"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <li className="text-black/60 transition duration-200  hover:text-palePurple/80 hover:ease-in-out focus:text-black/80 active:text-palePurple/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80">
                  <Link to="/orderHistory">Order History</Link>
                </li>
                <span className="[&>svg]:w-3 mx-2 text-black/60 dark:text-white/60">
                  <svg
                    id="e7pG1fVXw0m1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 45 80"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                  >
                    <path
                      d="M204.877725,76.148758c-16.765401,18.619382,10.080839,23.8038-8.291615,42.563662"
                      transform="matrix(1.792301 0.668772-.62853 1.684454-276.034058-252.440264)"
                      fill="none"
                      stroke="#050505"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <li>
                  {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                  <a
                    className="text-black/60 transition duration-200  hover:text-palePurple/80 hover:ease-in-out focus:text-black/80 active:text-palePurple/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80"
                    href="/"
                    onClick={() => Auth.logout()}
                  >
                    Logout
                  </a>
                </li>
              </ol>
            </nav>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="relative flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild  dark:bg-darkGray lg:py-4">
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <nav className="w-full rounded-md" aria-label="breadcrumb">
              <ol className="list-reset ms-2 flex">
                <li className="text-black/60 transition duration-200  hover:text-palePurple/80 hover:ease-in-out focus:text-black/80 active:text-palePurple/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80">
                  <Link to="/">Home</Link>
                </li>
                <span className="[&>svg]:w-3 mx-2 text-black/60 dark:text-white/60">
                  <svg
                    id="e7pG1fVXw0m1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 45 80"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                  >
                    <path
                      d="M204.877725,76.148758c-16.765401,18.619382,10.080839,23.8038-8.291615,42.563662"
                      transform="matrix(1.792301 0.668772-.62853 1.684454-276.034058-252.440264)"
                      fill="none"
                      stroke="#050505"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <li className="text-black/60 transition duration-200  hover:text-palePurple/80 hover:ease-in-out focus:text-black/80 active:text-palePurple/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80">
                  <Link to="/signup">Signup</Link>
                </li>
                <span className="[&>svg]:w-3 mx-2 text-black/60 dark:text-white/60">
                  <svg
                    id="e7pG1fVXw0m1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 45 80"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                  >
                    <path
                      d="M204.877725,76.148758c-16.765401,18.619382,10.080839,23.8038-8.291615,42.563662"
                      transform="matrix(1.792301 0.668772-.62853 1.684454-276.034058-252.440264)"
                      fill="none"
                      stroke="#050505"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <li className="text-black/60 transition duration-200  hover:text-palePurple/80 hover:ease-in-out focus:text-black/80 active:text-palePurple/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80">
                  <Link to="/login">Login</Link>
                </li>
              </ol>
            </nav>
          </div>
        </nav>
      );
    }
  }

  return (
    <header>
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;



import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <nav className="relative flex w-full flex-wrap items-center justify-between bg-lightGray dark:bg-darkGray py-2 shadow-dark-mild lg:py-4">
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <nav className="w-full rounded-md" aria-label="breadcrumb">
              <ol className="list-reset ms-2 flex">
                <li>
                  <Link
                    className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80"
                    to="/orderHistory"
                  >
                    Order History
                  </Link>
                </li>
                <li>
                  {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                  <a
                    className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80"
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
        <nav className="relative flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:py-4">
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <nav className="w-full rounded-md" aria-label="breadcrumb">
              <ol className="list-reset ms-2 flex">
                <li className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80">
                  <Link to="/">Home</Link>
                </li>
                <span className="mx-2 text-black/60 dark:text-white/60">/</span>
                <li className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80">
                  <Link to="/signup">Signup</Link>
                </li>
                <span className="mx-2 text-black/60 dark:text-white/60">/</span>
                <li className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80">
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

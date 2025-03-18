import { useContext, useEffect, useRef } from "react";
import { HeaderContext } from "../../context/HeaderContext";
import { Link, useNavigate } from "react-router-dom";

const HeaderSidebar = () => {
  const { state, dispatch } = useContext(HeaderContext);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      setTimeout(() => {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target) &&
          !event.target.closest(".sidebar-button")
        ) {
          dispatch({ type: "TOGGLE_SIDEBAR", payload: false });
        }
      }, 100);
    };

    if (state.isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [state.isSidebarOpen, dispatch]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchQuery = event.target.q.value.trim();
    if (searchQuery) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      event.target.q.value = "";
    }
  };

  return (
    <section>
      <button
        onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
        className="lg:hidden"
      >
        <div
          className={`w-6 h-0.5 mb-1.5 bg-current transition-all duration-300 ${state.isSidebarOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <div
          className={`w-6 h-0.5 bg-current transition-opacity duration-300 ${state.isSidebarOpen ? "opacity-0" : ""}`}
        />
        <div
          className={`w-6 h-0.5 mt-1.5 bg-current transition-all duration-300 ${state.isSidebarOpen ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      <nav className="hidden lg:flex items-center space-x-6">
        <Link
          to="/shop"
          className="relative text-lg font-medium leading-6 group block"
        >
          Shop
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3b0001] transition-all duration-500 group-hover:w-full"></span>
        </Link>
        <Link
          to="/about"
          className="relative text-lg font-medium leading-6 group block"
        >
          About
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3b0001] transition-all duration-500 group-hover:w-full"></span>
        </Link>
        <Link
          to="/contact"
          className="relative text-lg font-medium leading-6 group block"
        >
          Contact
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3b0001] transition-all duration-500 group-hover:w-full"></span>
        </Link>
        {state.isLoggedIn && (
          <Link
            to="/admin"
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
            className="relative text-lg font-medium leading-6 group block"
          >
            Admin{" "}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3b0001] transition-all duration-500 group-hover:w-full"></span>
          </Link>
        )}
      </nav>

      {state.isSidebarOpen && (
        <nav
          ref={sidebarRef}
          className={`lg:hidden fixed top-14 left-0 h-full w-1/2 sm:w-1/3 text-black bg-white transform transition-transform duration-300 z-40 shadow-lg ${
            state.isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="mt-4 space-y-4 px-4">
            <li>
              <div className="search-container">
                <form onSubmit={handleSearchSubmit} className="search-input">
                  <input
                    type="text"
                    name="q"
                    placeholder="Search..."
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none text-black"
                  />
                </form>
              </div>
            </li>
            <li>
              <Link
                to="/shop"
                onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
                className="text-lg font-medium"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
                className="text-lg font-medium"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
                className="text-lg font-medium"
              >
                Contact
              </Link>
            </li>
            {state.isLoggedIn && (
              <li>
                <Link
                  to="/admin"
                  onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
                  className="text-lg font-medium"
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </section>
  );
};

export default HeaderSidebar;

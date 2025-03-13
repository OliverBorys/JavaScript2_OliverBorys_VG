import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HeaderContext } from "../../context/HeaderContext";
import logoWhite from "/images/logo-white.svg";
import logoBlack from "/images/logo.svg";
import HeaderCart from "./HeaderCart";
import HeaderLogin from "./HeaderLogin";
import HeaderSidebar from "./HeaderSidebar";

const Header = () => {
  const { state, dispatch } = useContext(HeaderContext);
  const location = useLocation();
  const isTransparentPage =
    location.pathname === "/" || location.pathname === "/about";

  useEffect(() => {
    const handleScroll = () => {
      dispatch({ type: "SET_SCROLLED", payload: window.scrollY > 50 });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  const isHeaderWhite =
    isTransparentPage !== true ||
    state.isScrolled ||
    state.isHovered ||
    state.isCartOpen ||
    state.isSidebarOpen;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isHeaderWhite ? "bg-white text-black" : "bg-transparent text-white"
      }`}
      onMouseEnter={() => dispatch({ type: "SET_HOVERED", payload: true })}
      onMouseLeave={() => dispatch({ type: "SET_HOVERED", payload: false })}
    >
      <section className="flex items-center justify-between px-10 py-4">
        <HeaderSidebar />
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/">
            <img
              src={isHeaderWhite ? logoBlack : logoWhite}
              alt="Logo"
              className="h-10"
            />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="search-container hidden lg:block">
            <form action="/search" method="GET" className="search-input">
              <input
                type="text"
                name="q"
                placeholder="Search..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none text-black"
              />
            </form>
          </div>
          {state.isLoggedIn ? (
            <div className="flex space-x-2">
            <p className="hidden sm:flex"> Welcome {state.user.username}</p>
            <HeaderLogin isHeaderWhite={isHeaderWhite} />
            </div>
          ) : (
            <HeaderLogin isHeaderWhite={isHeaderWhite} />
          )}
          <HeaderCart isHeaderWhite={isHeaderWhite} />
        </div>
      </section>
    </header>
  );
};

export default Header;

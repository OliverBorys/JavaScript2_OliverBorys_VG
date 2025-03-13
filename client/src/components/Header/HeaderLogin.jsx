import { useContext, useState, useRef, useEffect } from "react";
import { HeaderContext } from "../../context/HeaderContext";
import loginWhite from "/images/login-white.svg";
import loginBlack from "/images/login.svg";
import PropTypes from "prop-types";

const HeaderLogin = ({ isHeaderWhite }) => {
  const { state, dispatch } = useContext(HeaderContext);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const loginPopupRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isLoginPopupOpen &&
        loginPopupRef.current &&
        !loginPopupRef.current.contains(event.target)
      ) {
        setLoginPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLoginPopupOpen]);

  const toggleLoginPopup = () => setLoginPopupOpen(!isLoginPopupOpen);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      dispatch({ type: "SET_LOGGED_IN", payload: data.user });
      setLoginPopupOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section>
      <button
        onMouseDown={(e) => {
          e.stopPropagation();
          toggleLoginPopup();
        }}
      >
        <img
          src={isHeaderWhite ? loginBlack : loginWhite}
          alt="Login"
          className="h-6 transition-all duration-300"
        />
      </button>

      {isLoginPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div
            ref={loginPopupRef}
            className="bg-white p-8 rounded-lg shadow-lg text-center relative w-[90%] sm:w-[400px]"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-3xl"
              onClick={toggleLoginPopup}
            >
              &times;
            </button>

            {!state.isLoggedIn ? (
              <>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">
                  Please enter your login details below
                </h2>
                {error && <p className="text-red-500">{error}</p>}
                <form
                  onSubmit={handleLogin}
                  className="flex flex-col text-left"
                >
                  <label className="text-lg text-gray-900" htmlFor="username">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    autoComplete="username"
                    className="p-1 border border-black rounded focus:outline-none focus:border-blue-500"
                  />

                  <label
                    className="text-lg mt-2 text-gray-900"
                    htmlFor="password"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    autoComplete="current-password"
                    className="p-1 border border-black rounded focus:outline-none focus:border-blue-500"
                  />

                  <button
                    type="submit"
                    className="px-8 py-3 mt-4 border border-black text-black bg-white hover:bg-black hover:text-white transition-all text-center"
                  >
                    Sign In
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  You’re logged in as {state.user.username}
                </h2>{" "}
                <button
                  onClick={handleLogout}
                  className="px-8 py-3 border border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all text-center rounded"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

HeaderLogin.propTypes = {
  isHeaderWhite: PropTypes.bool.isRequired,
};

export default HeaderLogin;

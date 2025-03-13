import { createContext, useReducer  } from "react";
import PropTypes from "prop-types";

const ACTIONS = {
  SET_LOGGED_IN: "SET_LOGGED_IN",
  LOGOUT: "LOGOUT",
  SET_SCROLLED: "SET_SCROLLED",
  SET_HOVERED: "SET_HOVERED",
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
  TOGGLE_CART: "TOGGLE_CART",
};

const initialState = {
  isLoggedIn: localStorage.getItem("adminUser") ? true : false,
  user: JSON.parse(localStorage.getItem("adminUser")) || null,
  isScrolled: false,
  isHovered: false,
  isSidebarOpen: false,
  isCartOpen: false,
};


const headerReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOGGED_IN:
      localStorage.setItem("adminUser", JSON.stringify(action.payload));
      return { ...state, user: action.payload, isLoggedIn: true };
    
    case ACTIONS.LOGOUT:
      localStorage.removeItem("adminUser");
      return { ...state, user: null, isLoggedIn: false };
    case ACTIONS.SET_SCROLLED:
      return { ...state, isScrolled: action.payload };
    case ACTIONS.SET_HOVERED:
      return { ...state, isHovered: action.payload };
    case ACTIONS.TOGGLE_SIDEBAR:
      return { ...state, isSidebarOpen: action.payload ?? !state.isSidebarOpen };
    case ACTIONS.TOGGLE_CART:
      return { ...state, isCartOpen: action.payload ?? !state.isCartOpen };
    default:
      return state;
  }
};

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(headerReducer, initialState);

  return (
    <HeaderContext.Provider value={{ state, dispatch }}>
      {children}
    </HeaderContext.Provider>
  );
};

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;

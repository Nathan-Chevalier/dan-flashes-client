import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getMe } from "../services/fetchServices";

export const Navbar = () => {
  const navigate = useNavigate();
  const userObject = JSON.parse(localStorage.getItem("flashes_token"));
  const userId = userObject.user_id;
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getMe(userId).then((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <div className="h-[100%] w-[96px] fixed z-1 top-0 left-0 bg-[#55c3f0] overflow-x-hidden py-5 flex flex-col items-start rounded-r-3xl justify-between outline outline-white outline-8">
      {localStorage.getItem("flashes_token") !== null ? (
        <div className="navbar__item -translate-y-2">
          <button
            className="btn-delete"
            onClick={() => {
              localStorage.removeItem("flashes_token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <div className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/login"}
            >
              Login
            </NavLink>
          </div>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/register"}
            >
              Register
            </NavLink>
          </li>
        </>
      )}
      <div className="btn-navbar">
        <NavLink className="" to={"/favs"}>
          Favs
        </NavLink>
      </div>
      <div className="navbar__item">
        <NavLink className="btn-navbar" to={"/closet"}>
          Closet
        </NavLink>
      </div>
      <div className="navbar__item">
        <NavLink className="btn-navbar" to={"/create"}>
          Create
        </NavLink>
      </div>
      <div className="navbar__item">
        <NavLink className="btn-navbar" to={"/"}>
          FLASHES LOGO
        </NavLink>
      </div>
    </div>
  );
};

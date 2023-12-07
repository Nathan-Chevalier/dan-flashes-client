import { NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className="__navbar__">
          <div className="">
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
              DAN FLASHES LOGO HERE
            </NavLink>
          </div>
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
        </div>
      )
}
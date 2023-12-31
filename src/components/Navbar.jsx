import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getMe } from "../services/fetchServices";
import flashesLogo128 from "../assets/flashes_logo_128.png";

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
    <div className="font-paytone h-[100%] w-[124px] fixed z-1 top-0 left-0 bg-cyan-500 overflow-x-hidden py-5 flex flex-col items-center rounded-r-3xl justify-between outline outline-white outline-8">
      <NavLink className="" to={"/"}>
        <div className="bg-cyan-500 w-[118px] h-[118px] hover:bg-cyan-600 flex flex-col items-center justify-center rounded-full outline outline-8 border-orange-500 border-8 outline-white">
          <img
            src={flashesLogo128}
            alt="Dan Flashes Logo"
            className="scale-75"
          />
        </div>
      </NavLink>
      <NavLink className="flex flex-col" to={"/favs"}>
        <div className="bg-orange-500 w-[118px] h-[118px] hover:bg-orange-600 hover:text-cyan-400 flex flex-col text-white text-2xl items-center justify-center rounded-full outline outline-8 outline-white">
          <span className="translate-y-[6px]">YOUR</span>
          <span className="-translate-y-[6px]">FAVS</span>
        </div>
      </NavLink>

      <NavLink className="" to={"/closet"}>
        <div className="bg-orange-500 w-[118px] h-[118px] hover:bg-orange-600 hover:text-cyan-400 flex flex-col text-white text-2xl items-center justify-center rounded-full outline outline-8 outline-white">
          <span className="translate-y-[6px]">YOUR</span>
          <span className="-translate-y-[6px]">CLOSET</span>
        </div>
      </NavLink>

      <NavLink className="" to={"/create"}>
        <div className="bg-orange-500 w-[118px] h-[118px] hover:bg-orange-600 hover:text-cyan-400 flex flex-col text-white text-2xl items-center justify-center rounded-full outline outline-8 outline-white">
          <span className="translate-y-[6px]">CREATE</span>
          <span className="-translate-y-[6px]">SHIRT</span>
        </div>
      </NavLink>

      {localStorage.getItem("flashes_token") !== null ? (
        <div className="__profile-image-logout__ flex flex-col">
          <div className="overflow-hidden rounded-full outline outline-white outline-8 translate-y-4">
            <img src={currentUser.profile_image_url} alt="Profile Image" />
          </div>

          <button
            className=" text-white bg-orange-500 w-12 rounded-full outline outline-white outline-4 scale-[90%] hover:bg-orange-600 hover:ring hover:ring-white hover:ring-offset-4 hover:text-cyan-500 active:bg-orange-600"
            onClick={() => {
              localStorage.removeItem("flashes_token");
              navigate("/login");
            }}
          >
            <div className="flex flex-col">
              <span className="translate-y-[6px]">LOG</span>
              <span className="-translate-y-[6px]">OUT</span>
            </div>
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
  );
};

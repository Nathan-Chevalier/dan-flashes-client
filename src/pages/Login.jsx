/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import flashesLogo from "../assets/flashes_logo_512.png";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo.token) {
          localStorage.setItem("flashes_token", JSON.stringify(authInfo));
          navigate("/");
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {/* User Doesn't Exist Modal */}
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={(e) => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <form
        className="flex flex-col bg-cyan-500 w-[350px] items-center py-4 rounded-3xl outline outline-white"
        onSubmit={handleLogin}
      >
        <div className="__flashes-main-logo__ h-[226px] w-[226px] flex items-center justify-center rounded-full bg-slate-500/20">
          <img className=" h-[228px] w-[228px]" src={flashesLogo} />
        </div>
        <span className="text-4xl mt-6 text-white font-lobster">
          Dan Flashes
        </span>
        <span className="text-4xl mb-10 text-cyan-200 font-lobster self-center italic bg-white/20 px-2 rounded-xl">
          Welcomes you back
        </span>
        <fieldset className="mb-4 flex flex-col items-center">
          <span className="font-paytone bg-cyan-600 px-12 rounded-t-lg text-xl outline-white outline text-white py-2">
            EMAIL
          </span>
          <input
            type="text"
            id="inputEmail"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            className="input-text"
            placeholder="Enter Email..."
            required
            autoFocus
          />
        </fieldset>
        <fieldset className="mb-6 flex flex-col items-center">
          <span className="font-paytone bg-cyan-600 px-7 rounded-t-lg text-xl outline-white outline text-white py-2">
            {" "}
            PASSWORD{" "}
          </span>
          <input
            type="password"
            id="inputPassword"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            className="input-text"
            placeholder="Enter Your Password..."
          />
        </fieldset>
        <fieldset>
          <button
            type="submit"
            className="flex flex-col bg-orange-500 hover:bg-cyan-300 hover:text-orange-500 text-white font-bold py-1 px-2 border-white border-4 hover:border-white font-paytone text-xl items-center justify-center cursor-pointer hover:outline-offset-2 hover:outline hover:outline-white h-20 w-20 rounded-full mb-2"
          >
            <span className="translate-y-[6px]">SIGN</span>
            <span className="-translate-y-[6px]">IN</span>
          </button>
        </fieldset>
      </form>

      <div className="bg-cyan-500 mt-5 flex flex-col items-center w-[350px] py-4 rounded-3xl outline outline-white">
        <span className="font-lobster text-white text-3xl bg-white/20 px-6 rounded-xl">
          Not a member yet?
        </span>
        <NavLink
          className="flex flex-col bg-orange-500 hover:bg-cyan-300 hover:text-orange-500 text-white font-bold py-1 px-2 border-white border-4 hover:border-white font-paytone text-md items-center justify-center cursor-pointer hover:outline-offset-2 hover:outline hover:outline-white h-20 w-20 rounded-full mt-4"
          to="/register"
        >
          <span className="translate-y-[5px]">BECOME</span>
          <span className="-translate-y-[5px]">ONE</span>
        </NavLink>
      </div>
    </main>
  );
};

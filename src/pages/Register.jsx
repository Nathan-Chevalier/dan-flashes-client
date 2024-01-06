import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import flashesLogo from "../assets/flashes_logo_512.png"

export const Register = () => {
  const [email, setEmail] = useState("admina@straytor.com");
  const [password, setPassword] = useState("straytor");
  const [firstName, setFirstName] = useState("Admina");
  const [lastName, setLastName] = useState("Straytor");
  const [flashesName, setFlashesName] = useState("Flashes Name");
  const [profile_image_url, setProfileImg] = useState("Image URL");
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/register`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        flashes_name: flashesName,
        profile_image_url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo && authInfo.token) {
          localStorage.setItem("flashes_token", JSON.stringify(authInfo));
          navigate("/");
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={(e) => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <form className="flex flex-col bg-cyan-500 w-[350px] items-center py-4 rounded-3xl outline outline-white" onSubmit={handleRegister}>
        <div className="__flashes-main-logo__ h-[226px] w-[226px] flex items-center justify-center rounded-full bg-slate-500/20">
          <img className=" h-[228px] w-[228px]" src={flashesLogo} />
        </div>
        <span className="text-4xl mt-6 text-white font-lobster">
          New Account
        </span>
        <span className="text-4xl mb-10 text-cyan-200 font-lobster self-center italic bg-white/20 px-2 rounded-xl">
          Registration
        </span>
          <fieldset className="mb-4 flex flex-col items-center">
            <div> First name </div>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(evt) => setFirstName(evt.target.value)}
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="lastName"> Last name </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(evt) => setLastName(evt.target.value)}
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputEmail"> Email </label>
            <input
              type="text"
              id="inputEmail"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              className="form-control"
              placeholder="Email"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputPassword"> Password </label>
            <input
              type="password"
              id="inputPassword"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              className="form-control"
              placeholder="Password"
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputBio"> Username </label>
            <input
              type="text"
              id="inputBio"
              value={flashesName}
              onChange={(evt) => setFlashesName(evt.target.value)}
              className="form-control"
              placeholder="Bio"
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputProfileImg"> Profile Image </label>
            <input
              type="text"
              id="inputProfileImg"
              value={profile_image_url}
              onChange={(evt) => setProfileImg(evt.target.value)}
              className="form-control"
              placeholder="ImageUrl"
            />
          </fieldset>
          <fieldset>
            <button
              type="submit"
              className="button p-3 rounded-md bg-blue-800 text-blue-100"
            >
              Register
            </button>
          </fieldset>
        </form>
      </section>
      <div className="loginLinks">
        <section className="link--register">
          <Link
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            to="/login"
          >
            Already have an account?
          </Link>
        </section>
      </div>
    </main>
  );
};

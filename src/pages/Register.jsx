import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import flashesLogo from "../assets/flashes_logo_512.png";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flashesName, setFlashesName] = useState("");
  const [profile_image_url, setProfileImg] = useState("");
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/register`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
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
        <form
          className="flex flex-col bg-cyan-500 w-[550px] items-center py-4 rounded-3xl outline outline-white"
          onSubmit={handleRegister}
        >
          <div className="__flashes-main-logo__ h-[226px] w-[226px] flex items-center justify-center rounded-full bg-slate-500/20">
            <img className=" h-[228px] w-[228px]" src={flashesLogo} />
          </div>
          <span className="text-4xl mt-6 text-white font-lobster">
            New User
          </span>
          <span className="text-4xl mb-10 text-cyan-200 font-lobster self-center italic bg-white/20 px-2 rounded-xl">
            Creation
          </span>
          <div className="flex items-center justify-around w-full">
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
                placeholder="Enter your email..."
                required
                autoFocus
              />
            </fieldset>
            <fieldset className="mb-4 flex flex-col items-center">
              <span className="font-paytone bg-cyan-600 px-8 rounded-t-lg text-xl outline-white outline text-white py-2">
                Password
              </span>
              <input
                type="password"
                id="inputPassword"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                className="input-text"
                placeholder="Choose a password..."
              />
            </fieldset>
          </div>
          <div className="flex items-center justify-around w-full">
          <fieldset className="mb-4 flex flex-col items-center">
            <span className="font-paytone bg-cyan-600 px-7 rounded-t-lg text-xl outline-white outline text-white py-2">
              USERNAME
            </span>
            <input
              type="text"
              value={flashesName}
              onChange={(evt) => setFlashesName(evt.target.value)}
              className="input-text"
              placeholder="Create username..."
            />
          </fieldset>
          <fieldset className="mb-4 flex flex-col items-center">
            <div className="font-paytone bg-cyan-600 px-12 rounded-t-lg text-lg outline-white outline text-white flex flex-col items-center h-[44px]">
              <span className="">PROFILE</span>
              <span className="-translate-y-[12px]">IMAGE</span>
            </div>

            <input
              type="text"
              id="inputProfileImg"
              value={profile_image_url}
              onChange={(evt) => setProfileImg(evt.target.value)}
              className="input-text"
              placeholder="Enter URL"
            />
          </fieldset>
          </div>

          <fieldset>
            <button
              type="submit"
              className="flex flex-col bg-orange-500 hover:bg-cyan-300 hover:text-orange-500 text-white font-bold py-1 px-2 border-white border-4 hover:border-white font-paytone text-md items-center justify-center cursor-pointer hover:outline-offset-2 hover:outline hover:outline-white h-20 w-20 rounded-full mt-2"
            >
              <span className="translate-y-[5px]">CREATE</span>
              <span className="-translate-y-[5px]">USER</span>
            </button>
          </fieldset>
        </form>
      </section>
      <div className="bg-cyan-500 mt-5 flex flex-col items-center w-[350px] py-4 rounded-3xl outline outline-white">
        <span className="font-lobster text-white text-3xl bg-white/20 mx-6 rounded-xl text-center">
          Already have an account?
        </span>
        <NavLink
          className="flex flex-col bg-orange-500 hover:bg-cyan-300 hover:text-orange-500 text-white text-2xl font-bold py-1 px-2 border-white border-4 hover:border-white font-paytone text-md items-center justify-center cursor-pointer hover:outline-offset-2 hover:outline hover:outline-white h-20 w-20 rounded-full mt-4"
          to="/login"
        >
          <span className="translate-y-[6px]">LOG</span>
          <span className="-translate-y-[6px]">IN</span>
        </NavLink>
      </div>
    </main>
  );
};

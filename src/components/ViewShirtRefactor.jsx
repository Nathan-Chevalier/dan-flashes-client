import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import shirtButtons from "../assets/shirt_buttons.png";
import shirtMultiply from "../assets/shirt_multiply.png";
import shirtShadow from "../assets/shirt_shadow.png";
import shirtOverlay from "../assets/shirt_overlay.png";
import shirtDelete from "../assets/button_delete_shirt.png";
import shirtEdit from "../assets/button_edit_shirt.png";
import shirtFavorite from "../assets/button_favorite_shirt.png";
import shirtUnfavorite from "../assets/button_unfavorite_shirt.png";

export const ViewShirtRefactor = ({ shirts, updateShirts }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState(0);
  const length = shirts.length;
  const deleteModal = useRef();

  const handlePrevious = (event) => {
    event.preventDefault();
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? length - 1 : newIndex);
  };

  const handleNext = (event) => {
    event.preventDefault();
    const newIndex = index + 1;
    setIndex(newIndex >= length ? 0 : newIndex);
  };
  const getCurrentUser = JSON.parse(localStorage.getItem("flashes_token"));
  const currentUser = getCurrentUser.user_id;

  const handleFavorite = async (shirtId) => {
    const getToken = JSON.parse(localStorage.getItem("flashes_token"));
    const token = getToken.token;
    const finalValues = { shirt_id: shirtId };

    await fetch(`http://localhost:8000/favorites`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalValues),
    });
    updateShirts();
  };

  const handleUnfavorite = async (shirtId) => {
    const getToken = JSON.parse(localStorage.getItem("flashes_token"));
    const token = getToken.token;

    await fetch(`http://localhost:8000/favorites/${shirtId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    updateShirts();
  };

  const handleDeleteShirt = async (event) => {
    event.preventDefault();
    const getToken = JSON.parse(localStorage.getItem("flashes_token"));
    const token = getToken.token;

    await fetch(`http://localhost:8000/shirts/${deleteTarget}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    updateShirts();
    deleteModal.current.close();
    navigate("/");
  };

  return shirts.length === 0 ? (
    <div
      className="btn-circle scale-[200%]"
      onClick={() => {
        navigate("/create");
      }}
    >
      <span className="translate-y-[6px]">CREATE</span>
      <span className="-translate-y-[6px]">SHIRT</span>
    </div>
  ) : (
    <>
      {shirts.map((shirt, i) => {
        const isFavorite = shirt.shirt_favorite.some(
          (favorite) => favorite.flashes_user == currentUser
        );
        let favId = null;
        {
          /* Sets favId if the shirt has already been favorited, this is for DELETE request targeting*/
        }
        shirt.shirt_favorite.forEach((favorite) => {
          if (favorite.flashes_user == currentUser) {
            favId = favorite.id;
          }
        });
        return (
          <div
            key={`shirt-${shirt.id}`}
            className={`${
              // Creates the carousel functionality, hiding any object from the shirt array that doesn't match the current index
              i === index
                ? "flex justify-between h-full w-auto items-center"
                : "hidden"
            }`}
          >
            {/* Previous button */}            
            <button className="w-[6vw] h-[6vw]">
              <div
                onClick={handlePrevious}
                className="__shirt-pattern-nav__ h-full w-full bg-cover"
              />
            </button>
            {/* Main container */}
            <div className="__interaction-container__ flex flex-col bg-cyan-500 outline outline-white outline-8 rounded-[6vw] h-[100%] w-[76vw] mx-4">
              <div className="__user-identifier-container__ flex items-center h-[14%] -translate-y-4">
                <div className="__user-image__ h-[100%] z-10">
                  <img
                    className="h-[100%] w-auto rounded-full outline outline-8 outline-white border-orange-400 border-4"
                    src={`${shirt.flashes_user.profile_image_url}`}
                  />
                </div>
                <div className="__user-name__ pl-[2.5vw] pr-10 py-1 bg-orange-400 font-paytone text-white text-[calc(1em+3.5vw)] rounded-full -translate-x-4 outline-white outline-8 outline">
                  <h2 className="-translate-y-1">{`${shirt.flashes_user.flashes_name}'s`}</h2>
                </div>
              </div>
              <h2 className="__shirt-name__ text-[calc(2em+3.5vw)] font-lobster text-white font-bold pl-[2.5vw]">{`${shirt.label}`}</h2>
            </div>
            {/* Next Button */}
            <button className="w-[6vw] h-[6vw]">
              <div
                onClick={handleNext}
                className="__shirt-pattern-nav__ h-full w-full bg-cover -scale-100"
              />
            </button>
          </div>
        );
      })}
    </>
  );
};

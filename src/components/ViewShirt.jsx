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

export const ViewShirt = ({ shirts, updateShirts }) => {
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
            <div className="__main-container__ flex flex-col bg-cyan-500 outline outline-white outline-8 rounded-[6vw] h-[100%] w-[76vw] mx-4">
              {/* User Identifier */}
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
              <div className="__content-container__ flex justify-between">
                <div className="__information-container__ flex flex-col h-[100%] w-[45%] max-w-[45%]">
                  {/* Shirt Name */}
                  <h2 className="__shirt-name__ text-[calc(2em+3.5vw)] font-lobster text-white font-bold pl-[2.5vw] overflow-visible whitespace-nowrap z-[1000]">{`${shirt.label}`}</h2>
                  {/* Pattern Choices Container */}
                  <div className="__pattern-choice-container__ h-[40vh] flex flex-col flex-wrap pt-[3vh] ml-[2.5vw] pl-1">
                    {shirt?.shirt_pattern.map((pattern) => {
                      // Pattern Choices Displayed
                      return (
                        <div
                          key={`pattern-preview-${pattern.id}`}
                          className="__pattern-card__ flex gap-2 py-2 pt-8 w-max h-[9vh] items-center z-[300]"
                        >
                          <div
                            className="__preview-image__ w-[4vw] h-[4vw] rounded-full overflow-hidden z-10 outline-white outline"
                            style={{
                              backgroundColor: `${shirt.color.color}`,
                            }}
                          >
                            <img src={pattern.pattern.pattern_preview} />
                          </div>
                          <h3 className="__preview-label__ text-xl font-bold font-lobster text-white w-max h-auto bg-orange-400 outline-white outline pl-12 pr-4 -translate-x-12 py-2 drop-shadow-lg rounded-3xl">
                            {pattern.pattern.label}
                          </h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Shirt Container */}
                <div className="__shirt-container__ w-[50%] min-w-[70vh] h-auto overflow-visible relative bottom-[10vh]">
                  {/* Blending stack, adds texture to the shirt*/}
                  <img
                    alt="Shirt Overlay Layer"
                    src={shirtOverlay}
                    className="absolute z-[103] mix-blend-overlay dynamic-scaling"
                  />
                  <img
                    alt="Shirt Shadow Layer"
                    src={shirtShadow}
                    className="absolute z-[102] dynamic-scaling"
                  />
                  <img
                    alt="Shirt Button Layer"
                    src={shirtButtons}
                    className="absolute z-[101] dynamic-scaling"
                  />
                  <img
                    alt="Shirt Multiply Layer"
                    className="absolute z-[100] mix-blend-multiply opacity-[70%] dynamic-scaling"
                    src={shirtMultiply}
                  />
                  {/* Shirt SVG Base color layer */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute dynamic-scaling"
                    viewBox="0 0 637 715"
                  >
                    <path
                      fillRule="evenodd"
                      fill={`${shirt.color.color}`}
                      d="M305.0,709.999 C305.0,709.999 209.715,700.600 185.0,682.999 C185.0,682.999 126.715,664.600 120.0,636.999 C120.0,636.999 134.715,354.600 129.0,339.999 C129.0,339.999 113.615,353.856 107.0,354.999 C107.0,354.999 94.177,342.69 93.999,338.0 C93.999,338.0 57.511,300.736 52.999,292.999 C48.488,285.263 33.177,277.69 30.0,272.0 C26.822,266.930 0.0,241.0 0.0,241.0 L0.0,236.999 C0.0,236.999 16.844,223.69 20.0,217.0 C23.155,210.930 34.0,200.0 34.0,200.0 C34.0,200.0 46.844,173.736 65.0,158.0 C65.0,158.0 75.511,138.403 88.0,124.999 C88.0,124.999 100.511,103.69 107.0,97.999 C107.0,97.999 165.844,58.403 240.0,39.0 C240.0,39.0 246.177,11.736 268.0,4.0 C268.0,4.0 272.511,0.0 315.999,0.0 C359.488,0.0 376.999,7.999 376.999,7.999 C376.999,7.999 389.511,18.403 392.999,33.0 C392.999,33.0 397.844,32.736 398.0,35.0 C398.0,35.0 471.177,60.736 500.0,78.0 C513.488,85.263 524.999,90.0 524.999,90.0 C524.999,90.0 539.844,104.403 559.0,129.999 C578.155,155.596 609.844,211.69 636.999,243.0 C636.999,243.0 637.177,246.403 632.999,250.0 C628.822,253.596 610.177,278.69 585.999,294.0 C561.822,309.930 536.844,333.403 530.999,334.999 C527.488,335.930 524.999,339.999 524.999,339.999 C524.999,339.999 507.844,330.69 506.999,324.999 C506.999,324.999 517.294,615.500 523.999,634.0 C523.999,634.0 490.794,663.0 427.999,685.999 C365.205,708.999 355.999,708.999 355.999,708.999 L307.0,714.999 C307.0,714.999 305.0,713.199 305.0,709.999 Z"
                    />
                  </svg>
                  {shirt?.shirt_pattern.map((pattern, index) => {
                    // Calculate z-index for pattern_url_a and pattern_url_b for interleaving layers based on odd/even
                    const zIndexA = index % 2 === 0 ? index * 2 : index * 2 - 1;
                    const zIndexB =
                      index % 2 === 0
                        ? 2 * (shirt?.shirt_pattern.length / 2) + index * 2
                        : 2 * (shirt?.shirt_pattern.length / 2) + index * 2 - 1;

                    return (
                      <>
                        <img
                          className="absolute dynamic-scaling"
                          src={pattern?.pattern.pattern_url_a}
                          alt={`pattern_url_a_${index + 1}`}
                          style={{ zIndex: zIndexA }}
                        />
                        <img
                          className="absolute dynamic-scaling"
                          src={pattern?.pattern.pattern_url_b}
                          alt={`pattern_url_b_${index + 1}`}
                          style={{ zIndex: zIndexB }}
                        />
                      </>
                    );
                  })}
                </div>
              </div>
              {/* Ternary Chains if not owner will display Favorite/Unfavorite buttons.  If owner will display edit/delete */}
              <div className="__ternary-menu-container__ rounded-3xl bg-orange-400 w-max h-[12vh] outline outline-white outline-8 flex items-center justify-center self-start ml-[2.5vw] mt-[12vh] z-[100]">
                {!shirt.is_owner ? (
                  isFavorite ? (
                    <div className="__unfavorite-container__ pl-7 flex items-center mr-2 justify-start w-[11vw] h-full">
                      <div className="flex flex-col items-end text-[calc(1rem+1vi)] text-white font-paytone">
                        <span className="translate-y-[1vh]">
                          {shirt.shirt_favorite.length}
                        </span>
                        <span className="-translate-y-[1vh]">
                          {shirt.shirt_favorite.length === 1 ? "FAV" : "FAVS"}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          handleUnfavorite(favId);
                        }}
                      >
                        <img className="w-[4vw] h-auto" src={shirtUnfavorite} alt="Unfavorite Shirt" />
                      </button>
                    </div>
                  ) : (
                    <div className="__favorite-container__ flex items-center mr-2 pl-7 justify-start w-[11vw] h-full">
                      <div className="flex flex-col items-end text-[calc(1rem+1vi)] text-white font-paytone">
                        <span className="translate-y-[1vh]">
                          {shirt.shirt_favorite.length}
                        </span>
                        <span className="-translate-y-[1vh]">
                          {shirt.shirt_favorite.length === 1 ? "FAV" : "FAVS"}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          handleFavorite(shirt.id);
                        }}
                      >
                        <img className="w-[4vw] h-auto" src={shirtFavorite} alt="Favorite Shirt" />
                      </button>
                    </div>
                  )
                ) : (
                  <div className="__edit-delete-dock__ flex items-center justify-between px-7 mr-2 w-[40vw] h-full">
                    <div className="__favorites__ flex items-center">
                      <div className="flex flex-col items-end font-paytone text-[calc(1rem+1vi)] text-white cursor-default">
                        <span className="translate-y-[1vh]">
                          {shirt.shirt_favorite.length}
                        </span>
                        <span className="-translate-y-[1vh]">FAVS</span>
                      </div>

                      <img className="w-[4vw] h-auto"
                        src={shirtUnfavorite}
                        alt="Unfavorite Shirt Button"
                      />
                    </div>
                    <div className="__delete-button__ flex items-center">
                      <div className="flex flex-col items-end font-paytone text-[calc(1rem+1vi)] text-white cursor-default">
                        <span className="translate-y-[1vh]">DELETE</span>
                        <span className="-translate-y-[1vh]">SHIRT</span>
                      </div>
                      <button
                        className="w-[4vw] h-auto"
                        onClick={() => {
                          setDeleteTarget(shirt.id);
                          deleteModal.current.showModal();
                        }}
                      >
                        <img src={shirtDelete} alt="Delete Shirt Button" />
                      </button>
                    </div>
                    <div className="__edit-button__ flex items-center">
                      <div className="flex flex-col items-end font-paytone text-[calc(1rem+1vi)] text-white cursor-default">
                        <span className="translate-y-[1vh]">EDIT</span>
                        <span className="-translate-y-[1vh]">SHIRT</span>
                      </div>
                      <button
                        className="w-[4vw] h-auto"
                        onClick={() => {
                          navigate(`/edit/${shirt.id}`);
                        }}
                      >
                        <img src={shirtEdit} alt="Edit Shirt Button" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="__price-shape-container__ fixed bottom-[12%] right-[15%] flex justify-center z-[150]">
                <div className="__shirt-price__ text-[calc(1rem+3vi)] font-bold text-white absolute z-10 translate-x-[11vw] translate-y-[16vh]">
                  <span className="font-lobster">${shirt.price}</span>
                </div>
                <div className="__price-shape__">
                  {/* Price Starburst */}
                  <svg
                    className="translate-x-[11vw] translate-y-[12vh] w-[20vw]"
                    viewBox="0 0 415.5 215.5"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      stroke="#ffffff"
                      strokeWidth="4px"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      fillRule="evenodd"
                      fill="rgb(219, 125, 33)"
                      d="M248.78,1.499 L262.147,38.948 L323.56,17.637 L308.474,55.32 L380.442,47.455 L339.429,79.104 L411.500,86.415 L350.300,107.500 L411.500,128.584 L339.429,135.895 L380.442,167.544 L308.474,159.967 L323.56,197.362 L262.147,176.51 L248.78,213.500 L207.500,181.700 L166.921,213.500 L152.852,176.51 L91.943,197.362 L106.525,159.967 L34.557,167.544 L75.570,135.895 L3.499,128.584 L64.699,107.500 L3.499,86.415 L75.570,79.104 L34.557,47.455 L106.525,55.32 L91.943,17.637 L152.852,38.948 L166.921,1.499 L207.500,33.299 L248.78,1.499 Z"
                    />
                  </svg>
                </div>
              </div>
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
            {/* Delete Modal */}
            <dialog
        className="__delete-modal__ bg-cyan-500 p-10 rounded-3xl border-4 border-white outline outline-orange-500 outline-4 outline-offset-4 relative"
        ref={deleteModal}
      >
        <div className="font-lobster text-white text-3xl underline pb-6">
          Are you sure you want to delete this shirt?
        </div>
        <div className="__btn-container__ flex justify-around mt-6">
          <button
            className="bg-orange-500 w-[118px] h-[118px] hover:bg-orange-600 hover:text-cyan-400 flex flex-col text-white text-2xl items-center justify-center rounded-full outline outline-8 outline-white font-paytone"
            onClick={(event) => {
              handleDeleteShirt(event);
            }}
          >
            <span className="translate-y-[6px]">YES!</span>
            <span className="-translate-y-[6px]">DELETE!</span>
          </button>
          <button
            className="absolute top-2 right-0 font-lobster rounded-full text-white font-bold h-[24px] w-[24px] outline -translate-x-2 hover:bg-orange-600"
            onClick={() => deleteModal.current.close()}
          >
            X
          </button>
        </div>
      </dialog>
    </>
  );
};

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import shirtButtons from "../assets/shirt_buttons.png";
import shirtMultiply from "../assets/shirt_multiply.png";
import shirtShadow from "../assets/shirt_shadow.png";
import shirtOverlay from "../assets/shirt_overlay.png";
import shirtDelete from "../assets/button_delete_shirt.png"
import shirtEdit from "../assets/button_edit_shirt.png"
import shirtFavorite from "../assets/button_favorite_shirt.png"
import shirtUnfavorite from "../assets/button_unfavorite_shirt.png"

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
    <button
      className="btn-edit"
      onClick={() => {
        navigate("/create");
      }}
    >
      Create New Shirt
    </button>
  ) : (
    <>
      {/* Shirt Favorite Mechanics, checks if shirt has already been favorited by user */}
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
              i === index
                ? "flex justify-between h-[768px] w-[1645px] items-center"
                : "hidden"
            }`}
          >
            {/* ^^^ The above code creates the carousel functionality, hiding any object from the shirt array that doesn't match the current index*/}
            {/* vvv Previous arrow SVG */}
            <div className="__previous-arrow__ w-[126px]">
              <svg width="124px" height="104px" className="translate-x-10">
                <path
                  fillRule="evenodd"
                  fill="rgb(85, 195, 240)"
                  d="M101.56,86.361 L65.323,65.569 C55.191,59.673 55.191,45.13 65.323,39.117 L101.56,18.325 C111.234,12.403 123.990,19.759 123.990,31.551 L123.990,73.135 C123.990,84.926 111.234,92.283 101.56,86.361 ZM48.564,68.854 L92.475,94.253 C87.392,103.40 75.727,107.43 65.914,101.367 L9.703,68.854 C-3.249,61.361 -3.249,42.630 9.703,35.138 L65.914,2.624 C75.727,-3.51 87.392,0.951 92.475,9.739 L48.564,35.138 C35.611,42.630 35.611,61.361 48.564,68.854 Z"
                  onClick={handlePrevious}
                />
              </svg>
            </div>

            {/* Info Container, Username + User Image, Pattern Choices, Price, and isOwner menu (favorite/edit/delete)*/}
            <div className="__user-pattern-price-interaction__ flex flex-col items-center w-[740px] h-[768px]">
              <div className="__username-image__ flex justify-between self-start relative">
                <div className="h-[128px] w-[128px] z-10">
                  <img
                    className="rounded-full w-[100%] h-auto outline outline-8 border-orange-400 border-8 outline-white -translate-y-14 translate-x-8"
                    src={`${shirt.flashes_user.profile_image_url}`}
                  />
                </div>
                <div className="pl-10 flex items-center translate-x-3 -translate-y-8 bg-orange-400 h-max pr-10 outline-white outline outline-4 rounded-r-full">
                  <span className="text-white text-[56px] font-bold">{`${shirt.flashes_user.flashes_name}'s`}</span>
                </div>
              </div>
              <div className="__shirt-label-empty__ h-[96px]"></div>
              {/* Pattern Choices Display*/}
              <div className="__pattern-choice-container__ flex-col flex-wrap items-start justify-around h-[368px] w-[620px] ml-[122px]">
                {shirt?.shirt_pattern.map((pattern) => {
                  return (
                    <div
                      key={`pattern-preview-${pattern.id}`}
                      className="flex items-center gap-2 flex-1"
                    >
                      <div className="__preview-image__ w-[64px] h-[64px]">
                        <img src={pattern.pattern.pattern_preview} />
                      </div>
                      <span className="__preview-label__ text-lg font-bold text-white w-max">
                        {pattern.pattern.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="__price-shape-container__ relative w-[416px] flex justify-center translate-x-[700px] translate-y-12 z-[150]">
                <div className="__shirt-price__ text-[88px] font-bold text-white absolute z-10 translate-x-[198px] translate-y-9">
                  <span className="text-center">${shirt.price}</span>
                </div>
                <div className="__price-shape__">
                  {/* Price Starburst */}
                  <svg width="415.5px" height="215.5px" className="absolute">
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

              {/* Ternary Chains if not owner will display Favorite/Unfavorite buttons.  If owner will display edit/delete */}
              <div className="__ternary-menu-container__ rounded-3xl bg-orange-400 w-max h-[96px] outline outline-white outline-8 flex items-center justify-center translate-x-44 translate-y-32">
                {!shirt.is_owner ? (
                  isFavorite ? (
                    <div className="__unfavorite-container__ flex items-center justify-center gap-4 w-[220px]">
                      <button
                        className=""
                        onClick={() => {
                          handleUnfavorite(favId);
                        }}
                      >
                        <img src={shirtUnfavorite} alt="Unfavorite Shirt" />
                      </button>
                      <span>{shirt.shirt_favorite.length}</span>
                    </div>
                  ) : (
                    <div className="__favorite-container__ flex items-center justify-center gap-4 w-[220px]">
                      <button
                        className=""
                        onClick={() => {
                          handleFavorite(shirt.id);
                        }}
                      >
                        <img src={shirtFavorite} alt="Favorite Shirt" />
                      </button>
                      <span>{shirt.shirt_favorite.length}</span>
                    </div>
                  )
                ) : (
                  <div className="__edit-delete-dock__ flex items-center justify-around w-[440px]">
                    <button
                      className="w-[64px] h-[64px]"
                      onClick={() => {
                        navigate(`/edit/${shirt.id}`);
                      }}
                    >
                      <img src={shirtEdit} alt="Edit Shirt Button"/>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => {
                        setDeleteTarget(shirt.id);
                        deleteModal.current.showModal();
                      }}
                    >
                      <img src={shirtDelete} alt="Delete Shirt Button"/>
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Shirt Container, contains base SVG element matched with shirt object color and mapped pattern array */}
            <div className="__shirt-preview-label-container__ relative w-[640px] h-[718px]">
              <div className="text-3xl font-bold text-white pt-5 absolute z-[200] -translate-x-[630px] translate-y-16 text-[96px] w-max">
                {shirt.label}
              </div>
              {/* Blending stack, adds texture to the shirt*/}
              <img
                alt="Shirt Overlay Layer"
                src={shirtOverlay}
                className="absolute z-[103] mix-blend-overlay"
              />
              <img
                alt="Shirt Shadow Layer"
                src={shirtShadow}
                className="absolute z-[102]"
              />
              <img
                alt="Shirt Button Layer"
                src={shirtButtons}
                className="absolute z-[101]"
              />
              <img
                alt="Shirt Multiply Layer"
                className="absolute z-[100] mix-blend-multiply opacity-[70%]"
                src={shirtMultiply}
              />
              {/* Shirt SVG Base color layer */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="637px"
                height="715px"
                className="absolute"
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
                      className="absolute w-[640px] h-[718px]"
                      src={pattern?.pattern.pattern_url_a}
                      alt={`pattern_url_a_${index + 1}`}
                      style={{ zIndex: zIndexA }}
                    />
                    <img
                      className="absolute w-[640px] h-[718px]"
                      src={pattern?.pattern.pattern_url_b}
                      alt={`pattern_url_b_${index + 1}`}
                      style={{ zIndex: zIndexB }}
                    />
                  </>
                );
              })}
            </div>
            <div className="__next-arrow__ w-[124px]">
              <svg width="125px" height="104px">
                <path
                  fillRule="evenodd"
                  fill="rgb(85, 195, 240)"
                  onClick={handleNext}
                  d="M22.943,86.361 L58.676,65.569 C68.808,59.673 68.808,45.13 58.676,39.117 L22.943,18.325 C12.765,12.403 0.9,19.759 0.9,31.551 L0.9,73.135 C0.9,84.926 12.765,92.283 22.943,86.361 ZM75.435,68.854 L31.524,94.253 C36.607,103.40 48.272,107.43 58.85,101.367 L114.296,68.854 C127.249,61.361 127.249,42.630 114.296,35.138 L58.85,2.624 C48.272,-3.51 36.607,0.951 31.524,9.739 L75.435,35.138 C88.388,42.630 88.388,61.361 75.435,68.854 Z"
                />
              </svg>
            </div>
          </div>
        );
      })}
      {/* Delete Modal */}
      <dialog
        className="__delete-modal__ bg-red-400/90 p-10 font-bold rounded border border-white"
        ref={deleteModal}
      >
        <div>Are you sure you want to delete this shirt?</div>
        <div className="__btn-container__ flex justify-around mt-6">
          <button
            className="btn-edit px-6"
            onClick={(event) => {
              handleDeleteShirt(event);
            }}
          >
            Ok
          </button>
          <button
            className="btn-delete"
            onClick={() => deleteModal.current.close()}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </>
  );
};

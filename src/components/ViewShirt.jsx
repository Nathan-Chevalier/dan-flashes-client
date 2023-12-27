import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
            className={`${i === index ? "flex justify-between" : "hidden"}`}
          >
            {/* The above code creates the carousel functionality, hiding any object from the shirt array that doesn't match the current index*/}
            <button className="__previous-button__ btn-edit" onClick={handlePrevious}>
              Previous
            </button>
            {/* Info Container, Username + User Image, Pattern Choices, Price, and isOwner menu (favorite/edit/delete)*/}
            <div className="__user-pattern-price-interaction__ flex flex-col items-center">
              <div className="__username-image__ flex justify-between">
                <img
                  className="h-[96px]"
                  src={`${shirt.flashes_user.profile_image_url}`}
                />
                <div className="pl-10">
                  by {shirt.flashes_user.flashes_name}
                </div>
              </div>
              <div className="__pattern-choice-container__ flex flex-col flex-wrap"></div>
              <div>{shirt.price}</div>
              {/* Ternary Chains if not owner will display Favorite/Unfavorite buttons.  If owner will display edit/delete */}
              {!shirt.is_owner ? (
                isFavorite ? (
                  <div className="__unfavorite-container__ flex items-center">
                    <button
                      className="btn-delete"
                      onClick={() => {
                        handleUnfavorite(favId);
                      }}
                    >
                      Unfavorite
                    </button>
                    <span>{shirt.shirt_favorite.length}</span>
                  </div>
                ) : (
                  <div className="__favorite-container__ flex items-center">
                    <button
                      className="btn-edit"
                      onClick={() => {
                        handleFavorite(shirt.id);
                      }}
                    >
                      Favorite
                    </button>
                    <span>{shirt.shirt_favorite.length}</span>
                  </div>
                )
              ) : (
                <div className="__edit-delete-dock__">
                  <button
                    className="btn-edit"
                    onClick={() => {
                      navigate(`/edit/${shirt.id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => {
                      setDeleteTarget(shirt.id);
                      deleteModal.current.showModal();
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            {/* Shirt Container, contains base SVG element matched with shirt object color and mapped pattern array */}
            <div className="__shirt-preview-label-container__ relative w-[640px] h-[718px]">
              <div className="text-3xl font-bold text-white pt-5 absolute">
                {shirt.label}
              </div>
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
              {shirt?.shirt_pattern.map((pattern) => {
                return (
                  <>
                    {/* Shirt Preview Stack, Z-Index reliant */}
                    <img
                      className="absolute w-[640px] h-[718px]"
                      src={pattern?.pattern.pattern_url_a}
                      alt={`pattern_url_a_${pattern?.pattern_index}`}
                      style={{ zIndex: pattern?.pattern_index * 2 }}
                    />
                    <img
                      className="absolute w-[640px] h-[718px]"
                      src={pattern?.pattern.pattern_url_b}
                      alt={`pattern_url_b_${pattern?.pattern_index}`}
                      style={{ zIndex: pattern?.pattern_index * 2 + 1 }}
                    />
                  </>
                );
              })}
            </div>
            <button className="__next-button__ btn-edit" onClick={handleNext}>
              Next
            </button>
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

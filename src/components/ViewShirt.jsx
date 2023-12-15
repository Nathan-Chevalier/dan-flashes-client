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
    navigate("/")
  };

  return (
    shirts.length === 0 ? <button className="btn-edit" onClick={() => {navigate("/create")}}>Create New Shirt</button> :
    <div className="bg-cyan-500 h-full w-full">
      {shirts.map((shirt, i) => {
        const isFavorite = shirt.shirt_favorite.some(
          (favorite) => favorite.flashes_user == currentUser
        );
        let favId = null;
        shirt.shirt_favorite.forEach((favorite) => {
          if (favorite.flashes_user == currentUser) {
            favId = favorite.id;
          }
        });
        return (
          <div
            key={`shirt-${shirt.id}`}
            className={`${
              i === index ? "flex flex-col items-center" : "hidden"
            }`}
          >
            {" "}
            <div className="flex items-center">
              <div className="text-3xl font-bold text-white pt-5">
                {shirt.label}
              </div>
              <div className="pl-10">by {shirt.flashes_user.flashes_name}</div>
              <img className="h-[96px]" src={`${shirt.flashes_user.profile_image_url}`} />
            </div>
            <div className="relative h-96 w-96 bg-slate-950/10">
              {shirt?.shirt_pattern.map((pattern) => {
                return (
                  <>
                    <img
                      className="absolute top-[35%] left-[35%]"
                      src={pattern?.pattern.pattern_url_a}
                      alt={`pattern_url_a_${pattern?.pattern_index}`}
                      style={{ zIndex: pattern?.pattern_index * 2 }}
                    />
                    <img
                      className="absolute top-[35%] left-[35%]"
                      src={pattern?.pattern.pattern_url_b}
                      alt={`pattern_url_b_${pattern?.pattern_index}`}
                      style={{ zIndex: pattern?.pattern_index * 2 + 1 }}
                    />
                  </>
                );
              })}
            </div>
            <div>{shirt.price}</div>
            <div>Favorites: {shirt.shirt_favorite.length} </div>
            <div className="__button-container__ flex">
              <button
                className="btn-edit -translate-x-[400px] -translate-y-[200px]"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                className="btn-edit translate-x-[400px] -translate-y-[200px]"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
            {!shirt.is_owner ? (
              isFavorite ? (
                <button
                  className="btn-delete"
                  onClick={() => {
                    handleUnfavorite(favId);
                  }}
                >
                  Unfavorite
                </button>
              ) : (
                <button
                  className="btn-edit"
                  onClick={() => {
                    handleFavorite(shirt.id);
                  }}
                >
                  Favorite
                </button>
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
    </div>
  );
};

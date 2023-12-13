import { useState } from "react";

export const ViewShirt = ({ shirts }) => {
  const [index, setIndex] = useState(0);
  const length = shirts.length;

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

  return (
    <div className="bg-cyan-500 h-full w-full">
      {shirts.map((shirt, i) => {
        const isFavorite = shirt.shirt_favorite.some(
          (favorite) => favorite.flashes_user == currentUser
        );
        return (
          <div
            key={`shirt-${shirt.id}`}
            className={`${
              i === index ? "flex flex-col items-center" : "hidden"
            }`}
          >
            <div className="text-3xl font-bold text-white pt-5">
              {shirt.label}
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
                <button className="btn-unfavorite">Unfavorite</button>
              ) : (
                <button className="btn-favorite">Favorite</button>
              )
            ) : (
              <div className="__edit-delete-dock__">
                {/* Edit/Delete buttons */}
                <button>Edit</button>
                <button>Delete</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

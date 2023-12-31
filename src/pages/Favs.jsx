import { useEffect, useState } from "react";
import { getAllShirts } from "../services/fetchServices";
import { ViewShirt } from "../components/ViewShirt";

export const Favs = () => {
  const [shirts, setShirts] = useState([
    {
      id: 1,
      shirt_pattern: [
        {
          id: 1,
          pattern: {
            id: 1,
            pattern_url_a: "https://i.imgur.com/aLma1M9.png",
            pattern_url_b: "https://i.imgur.com/o0NP5ll.png",
            pattern_preview: "https://i.imgur.com/kOcN3A8.png",
            label: "Test Circular",
          },
          pattern_index: 1,
        },
        {
          id: 2,
          pattern: {
            id: 2,
            pattern_url_a: "https://i.imgur.com/iIVkTpl.png",
            pattern_url_b: "https://i.imgur.com/BvGK5Jq.png",
            pattern_preview: "https://i.imgur.com/LphEn95.png",
            label: "Test Pentagonal",
          },
          pattern_index: 2,
        },
      ],
      flashes_user: {
        id: 1,
        flashes_name: "Dan Flashes",
        profile_image_url:
          "https://pyxis.nymag.com/v1/imgs/87b/fe6/0a5b70ea95dfbf887c84c0f5890144ae7b-dan-flashes.jpg",
      },
      color: {
        id: 1,
        color: "#0b0b0b",
        label: "Black",
      },
      label: "Protoshirt",
      public: true,
      price: "1000.00",
      shirt_favorite: [],
      is_owner: false,
    },
  ]);
  const getCurrentUser = JSON.parse(localStorage.getItem("flashes_token"));
  const currentUser = getCurrentUser.user_id;

  useEffect(() => {
    getAllShirts().then((shirtsArray) => {
      const favShirts = shirtsArray.filter((shirt) => 
        !shirt.is_owner && shirt.shirt_favorite.some(
          (favorite) => favorite.flashes_user === currentUser
        )
      );
      setShirts(favShirts);
    });
  }, []);
  
  const updateShirts = async () => {
    const updatedShirts = await getAllShirts()
    setShirts(updatedShirts)
  }

  return (
    <div className="__closet-container__ flex flex-col items-center justify-center bg-cyan-500 h-[768px] w-[1212px] rounded-[36px] outline outline-white outline-8">
      <ViewShirt shirts={shirts} updateShirts={updateShirts} />
    </div>
  );
};

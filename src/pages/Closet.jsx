import { useEffect, useState } from "react";
import { getAllShirts } from "../services/fetchServices";
import { ViewShirt } from "../components/ViewShirt";

export const Closet = () => {
  const [shirts, setShirts] = useState([
    {
      id: 1,
      shirt_pattern: [
        {
          id: 1,
          pattern: {
            id: 1,
            pattern_url_a: "https://i.imgur.com/t2yTKxI.png",
            pattern_url_b: "https://i.imgur.com/JNI33XC.png",
            label: "Flashes Favorite",
          },
          pattern_index: 1,
        },
      ],
      flashes_user: {
        id: 1,
        flashes_name: "CerberusGFX",
        profile_image_url: "https://i.imgur.com/aYvUO3W.png",
      },
      color: {
        id: 1,
        color: "#7c0b0b",
        label: "Red",
      },
      label: '',
      public: true,
      price: "60.00",
      shirt_favorite: [],
      is_owner: true,
    },
  ]);

  useEffect(() => {
    getAllShirts().then((shirtsArray) => {
      const ownerShirts = shirtsArray.filter((shirt) => shirt.is_owner === true)
      setShirts(ownerShirts);
    });
  }, []);

  const updateShirts = async () => {
    const updatedShirts = await getAllShirts()
    setShirts(updatedShirts)
  }

  return (
    <div className="__closet-container__ h-[90%] w-[100%] ml-[4vw] mr-[1vw]">
      <ViewShirt shirts={shirts} updateShirts={updateShirts} />
    </div>
  );
};

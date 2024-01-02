import { useState, useEffect } from "react";
import { getAllShirts } from "../services/fetchServices";
import { ViewShirt } from "../components/ViewShirt";

export const Landing = () => {
  const [shirts, setShirts] = useState([
    {
      id: 1,
      shirt_pattern: [
        {
          id: 1,
          pattern: {
            id: 1,
            pattern_url_a: "http://www.networkdown.com/a",
            pattern_url_b: "http://www.networkdown.com/b",
            label: "Network not active",
          },
          pattern_index: 1,
        },
      ],
      flashes_user: {
        id: 1,
        flashes_name: "Net W. Down",
        profile_image_url: "http://www.networkdown.com/networkdown.jpg",
      },
      color: {
        id: 1,
        color: "#0b0b0b",
        label: "Black",
      },
      label: 'That "Network Down" Shirt',
      public: true,
      price: "6000.00",
      shirt_favorite: [],
      is_owner: true,
    },
  ]);

  useEffect(() => {
    getAllShirts().then((shirtsArray) => {
      const publicShirts = shirtsArray.filter((shirt) => shirt.public === true);
      setShirts(publicShirts);
    });
  }, []);
  const updateShirts = async () => {
    const updatedShirts = await getAllShirts();
    setShirts(updatedShirts);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-cyan-500 h-[768px] w-[1212px] rounded-[36px] outline outline-white outline-8">
      <ViewShirt shirts={shirts} updateShirts={updateShirts} />
    </div>
  );
};
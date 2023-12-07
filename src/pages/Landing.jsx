import { useState } from "react";

export const Landing = () => {
  const [shirts, setShirts] = useState([
    {
      id: 1,
      shirt_pattern: [
        {
          id:1,
          pattern: {
            id:1,
            pattern_url_a: "http://www.networkdown.com/a",
            pattern_url_b: "http://www.networkdown.com/b",
            label: "Network not active"
          },
          pattern_index: 1
        }
      ],
      flashes_user: {
        id:1,
        flashes_name: "Net W. Down",
        profile_image_url: "http://www.networkdown.com/networkdown.jpg"
      },
      color: {
        id:1,
        color: "#0b0b0b",
        label: "Black"
      },
      label: 'That "Network Down" Shirt',
      public: true,
      price: "6000.00",
      favorites: [1,2,3],
      is_owner: true
    }
  ])


    return <>YOU HAVE LANDED</>;
  };
  
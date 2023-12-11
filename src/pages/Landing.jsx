import { useState, useEffect } from "react";
import { getAllShirts } from "../services/fetchServices";
import { Carousel } from "../components/Carousel";

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

  useEffect(() => {
    getAllShirts().then((shirtsArray) => {
      setShirts(shirtsArray)
    })
  }, [])

  const cats = [
    {
      id: 1,
      label: "cat 1",
      pattern_preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_March_2010-1.jpg/2560px-Cat_March_2010-1.jpg",
    },
    {
      id: 2,
      label: "cat 2",
      pattern_preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Six_weeks_old_cat_%28aka%29.jpg/1200px-Six_weeks_old_cat_%28aka%29.jpg",
    },
    {
      id: 3,
      label: "cat 3",
      pattern_preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/800px-Felis_catus-cat_on_snow.jpg?20190920093216",
    },
  ]


    return <>Banana<Carousel cats={cats}/></>;
  };
  
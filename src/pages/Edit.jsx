import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneShirt } from "../services/fetchServices";
import { getAllColors } from "../services/fetchServices";
import { getAllPatterns } from "../services/fetchServices";

export const Edit = () => {
  const { shirtId } = useParams();
  const [shirt, setShirt] = useState({
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
  });

  const [patternA, setPatternA] = useState(null);
  const [patternB, setPatternB] = useState(null);
  const [patternC, setPatternC] = useState(null);
  const [patternD, setPatternD] = useState(null);
  const [patternE, setPatternE] = useState(null);
  const [patternF, setPatternF] = useState(null);

  const [patterns, setPatterns] = useState([
    {
      id: null,
      pattern_url_a: "NETWORK INACTIVE",
      pattern_url_b: "NETWORK INACTIVE",
      label: "NETWORK INACTIVE",
    },
  ]);

  const [colors, setColors] = useState([
    {
      id: null,
      color: "NETWORK INACTIVE",
      label: "NETWORK INACTIVE",
    },
  ]);

  useEffect(() => {
    getOneShirt(shirtId).then((shirtObject) => {
      setShirt(shirtObject);

      //? Loop through each pattern in the shirt_pattern array
      shirtObject.shirt_pattern.forEach((patternObj) => {
        const patternInfo = {
          pattern_id: patternObj.pattern.id,
          pattern_index: patternObj.pattern_index,
        };

        //? Assign the patternInfo to the correct state variable based on pattern_index
        switch (patternObj.pattern_index) {
          case 1:
            setPatternA(patternInfo);
            break;
          case 2:
            setPatternB(patternInfo);
            break;
          case 3:
            setPatternC(patternInfo);
            break;
          case 4:
            setPatternD(patternInfo);
            break;
          case 5:
            setPatternE(patternInfo);
            break;
          case 6:
            setPatternF(patternInfo);
            break;
          default:
            // Handle unexpected pattern_index values if necessary
            break;
        }
      });

    });
    getAllColors().then((colorsArray) => {
      setColors(colorsArray);
    });
    getAllPatterns().then((patternsArray) => {
      setPatterns(patternsArray);
    });
  }, []);

  return <>EDIT IT</>;
};

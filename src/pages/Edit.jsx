import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneShirt } from "../services/fetchServices";
import { getAllColors } from "../services/fetchServices";
import { getAllPatterns } from "../services/fetchServices";
import { PatternCarousel } from "../components/PatternCarousel";

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

  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    getOneShirt(shirtId).then((shirtObject) => {
      setShirt(shirtObject);
      setIsPublic(shirtObject.public)

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

  return (
    <div className="__shirt-form-container__ flex flex-col items-center">
      <form className="__shirt-form__ h-[794px] w-[1278px] rounded-xl flex">
        <div className="__label-preview-color-container__ flex flex-col">
          <fieldset>
            {/* Label input */}
            <input
              type="text"
              className="__label-input__ input-text"
              value={shirt.label}
              onChange={(event) => {
                const copy = { ...shirt };
                copy.label = event.target.value;
                setShirt(copy);
              }}
            />
          </fieldset>
          <div className="__image-preview__">
            THIS IS WHERE THE SHIRT PREVIEW MAGIC HAPPENS
          </div>
          {/* Color input */}
          <fieldset className="__color-choice-container flex items-center">
            {colors.map((color) => {
              return (
                <label key={color.id}>
                  <div
                    style={{ backgroundColor: `${color.color}` }}
                    className={
                      shirt.color.id === color.id
                        ? "w-[40px] h-[40px] border border-white rounded-lg"
                        : "w-[32px] h-[32px] rounded"
                    }
                    onClick={() => {
                      const copy = { ...shirt };
                      copy.color = parseInt(color.id);
                      setShirt(copy);
                    }}
                  >
                    {" "}
                  </div>
                </label>
              );
            })}
          </fieldset>
        </div>
        <div className="__pattern-public-save-container__ flex flex-col">
          <div className="__pattern-first-trio-container__ flex">
            <div className="__choice-a-container__ flex flex-col items-center">
              <PatternCarousel
                patterns={patterns}
                setPatternChoice={setPatternA}
                pIndex={1}
                currentId={patternA?.pattern_id}
              />
            </div>
            {patternA ? (
              <div className="__choice-b-container__ flex flex-col items-center">
                <PatternCarousel
                  patterns={patterns}
                  setPatternChoice={setPatternB}
                  pIndex={2}
                  currentId={patternB?.pattern_id}
                />
              </div>
            ) : (
              ""
            )}
            {patternB ? (
              <div className="__choice-C-container__ flex flex-col items-center">
                <PatternCarousel
                  patterns={patterns}
                  setPatternChoice={setPatternC}
                  pIndex={3}
                  currentId={patternC?.pattern_id}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="__pattern-second-trio-container__ flex">
            {patternC ? (
              <div className="__choice-D-container__ flex flex-col items-center">
                <PatternCarousel
                  patterns={patterns}
                  setPatternChoice={setPatternD}
                  pIndex={4}
                  currentId={patternD?.pattern_id}
                />
              </div>
            ) : (
              ""
            )}
            {patternD ? (
              <div className="__choice-E-container__ flex flex-col items-center">
                <PatternCarousel
                  patterns={patterns}
                  setPatternChoice={setPatternE}
                  pIndex={5}
                  currentId={patternE?.pattern_id}
                />
              </div>
            ) : (
              ""
            )}
            {patternE ? (
              <div className="__choice-F-container__ flex flex-col items-center">
                <PatternCarousel
                  patterns={patterns}
                  setPatternChoice={setPatternF}
                  pIndex={6}
                  currentId={patternF?.pattern_id}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="__public-toggle-save-container__ flex">
            <fieldset className="__public-toggle__">
              <label>
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={() => setIsPublic(!isPublic)}
                />
                Share this shirt?
              </label>
            </fieldset>
            <button
              className="btn-edit"
            >
              SAVE SHIRT
            </button>
          </div>
        </div>
      </form>
    </div>
  );;
};

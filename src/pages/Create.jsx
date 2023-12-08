import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllColors, getAllPatterns } from "../services/fetchServices";

export const Create = () => {
  const navigate = useNavigate();
  const [shirt, setShirt] = useState({
    color: 1,
    label: "useStateShirt",
    public: false,
    price: "",
    patterns: [],
  });

  const [patternChoices, setPatternChoices] = useState([
    {
      pattern_id: null,
      pattern_index: null,
    },
  ]);

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

  const basePrice = 60;

  useEffect(() => {
    getAllColors().then((colorsArray) => {
      setColors(colorsArray);
    });
    getAllPatterns().then((patternsArray) => {
      setPatterns(patternsArray);
    });
  }, []);

  // className={`bg-[${color.color}] w-[24px] h-[24px]`}

  return (
    <div className="__shirt-form-container__ flex flex-col items-center">
      <form className="__shirt-form__ h-[794px] w-[1278px] rounded-xl">
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
          <fieldset className="__color-choice-container flex">
            {colors.map((color) => {
              return (
                <label key={color.id}>
                  <div
                    style={{ "background-color": `${color.color}` }}
                    className="w-[32px] h-[32px]"
                  >
                    {" "}
                  </div>
                </label>
              );
            })}
          </fieldset>
        </div>
        <div className="__pattern-public-save-container__ flex flex-col"></div>
      </form>
    </div>
  );
};

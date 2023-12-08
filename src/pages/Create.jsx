import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllColors, getAllPatterns } from "../services/fetchServices";

export const Create = () => {
  const navigate = useNavigate();

  const [isPublic, setIsPublic] = useState(false);

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

  //? Modify to change the base price of shirts generated
  const basePrice = 60;

  useEffect(() => {
    getAllColors().then((colorsArray) => {
      setColors(colorsArray);
    });
    getAllPatterns().then((patternsArray) => {
      setPatterns(patternsArray);
    });
  }, []);
  // w-[32px] h-[32px]

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
                      shirt.color === color.id
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
            <div className="__choice-one-container__ flex flex-col items-center">
              <div className="__choice-one-image__ bg-orange-500 h-[96px] w-[96px]"></div>
              <div className="__choice-one-buttons__ flex">
                <button className="btn-edit">Left</button>
                <button className="btn-edit">Submit</button>
                <button className="btn-edit">Right</button>
              </div>
            </div>
            <div className="__choice-two-container__ flex flex-col items-center">
              <div className="__choice-one-image__ bg-orange-500 h-[96px] w-[96px]"></div>
              <div className="__choice-one-buttons__ flex">
                <button className="btn-edit">Left</button>
                <button className="btn-edit">Submit</button>
                <button className="btn-edit">Right</button>
              </div>
            </div>
            <div className="__choice-three-container__ flex flex-col items-center">
              <div className="__choice-one-image__ bg-orange-500 h-[96px] w-[96px]"></div>
              <div className="__choice-one-buttons__ flex">
                <button className="btn-edit">Left</button>
                <button className="btn-edit">Submit</button>
                <button className="btn-edit">Right</button>
              </div>
            </div>
          </div>
          <div className="__pattern-second-trio-container__ flex">
            <div className="__choice-four-container__ flex flex-col items-center">
              {" "}
              <div className="__choice-one-image__ bg-orange-500 h-[96px] w-[96px]"></div>
              <div className="__choice-one-buttons__ flex">
                <button className="btn-edit">Left</button>
                <button className="btn-edit">Submit</button>
                <button className="btn-edit">Right</button>
              </div>
            </div>
            <div className="__choice-five-container__ flex flex-col items-center">
              {" "}
              <div className="__choice-one-image__ bg-orange-500 h-[96px] w-[96px]"></div>
              <div className="__choice-one-buttons__ flex">
                <button className="btn-edit">Left</button>
                <button className="btn-edit">Submit</button>
                <button className="btn-edit">Right</button>
              </div>
            </div>
            <div className="__choice-six-container__ flex flex-col items-center">
              {" "}
              <div className="__choice-one-image__ bg-orange-500 h-[96px] w-[96px]"></div>
              <div className="__choice-one-buttons__ flex">
                <button className="btn-edit">Left</button>
                <button className="btn-edit">Submit</button>
                <button className="btn-edit">Right</button>
              </div>
            </div>
          </div>
          <div className="__public-toggle-save-container__ flex">
            <div className="__public-toggle__">
              <label>
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={() => setIsPublic(!isPublic)}
                />
                Share this shirt?
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

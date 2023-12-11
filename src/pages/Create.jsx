import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllColors, getAllPatterns } from "../services/fetchServices";
import { PatternCarousel } from "../components/PatternCarousel";

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

  const [patternChoices, setPatternChoices] = useState([]);

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

  const handleSaveShirt = async (event) => {
    event.preventDefault();
    const patternArray = [patternA];
    if (patternB) {
      patternArray.push(patternB);
    }
    if (patternC) {
      patternArray.push(patternC);
    }
    if (patternD) {
      patternArray.push(patternD);
    }
    if (patternE) {
      patternArray.push(patternE);
    }
    if (patternF) {
      patternArray.push(patternF);
    }

    const finalValues = {
      color: shirt.color,
      label: shirt.label,
      public: shirt.public,
      price: basePrice * patternArray.length,
      patterns: patternArray,
    };

    const getToken = JSON.parse(localStorage.getItem("flashes_token"));
    const token = getToken.token;

    await fetch(`http://localhost:8000/shirts`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalValues),
    });
    navigate("/closet");
  };

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
            <div className="__choice-a-container__ flex flex-col items-center">
              <PatternCarousel
                patterns={patterns}
                setPatternChoice={setPatternA}
                pIndex={1}
              />
            </div>
            <div className="__choice-b-container__ flex flex-col items-center">
              <PatternCarousel
                patterns={patterns}
                setPatternChoice={setPatternB}
                pIndex={2}
              />
            </div>
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
              onClick={(event) => {
                handleSaveShirt(event);
              }}
            >
              SAVE SHIRT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

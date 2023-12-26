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

  const [selectedPatterns, setSelectedPatterns] = useState([]);
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

  const updateSelectedPatterns = (newPattern) => {
    setSelectedPatterns((prevPatterns) => {
      const index = prevPatterns.findIndex(
        (p) => p.pattern_index === newPattern.pattern_index
      );
      if (index > -1) {
        // Replace existing pattern
        return [
          ...prevPatterns.slice(0, index),
          newPattern,
          ...prevPatterns.slice(index + 1),
        ];
      } else {
        // Add new pattern
        return [...prevPatterns, newPattern];
      }
    });
  };

  const removeSelectedPattern = (patternIndex) => {
    setSelectedPatterns((prevPatterns) => 
      prevPatterns.filter((p) => p.pattern_index !== patternIndex)
    );
  };

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
      color: shirt.color.id,
      label: shirt.label,
      public: isPublic,
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
    <div className="__shirt-form-container__ flex flex-col items-center justify-center bg-cyan-500 h-[768px] w-[1024px] ml-[96px] rounded-[36px]">
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
          <div className="__image-preview__ h-[256px] w-[256px] relative" style={{backgroundColor: `${shirt.color.color}`}}>
            {selectedPatterns.map((pattern) => {
                return (
                  <>
                    <img
                      className="absolute top-[35%] left-[35%]"
                      src={pattern.pattern_url_a}
                      alt={`pattern_url_a_${pattern?.pattern_index}`}
                      style={{ zIndex: pattern?.pattern_index * 2 }}
                    />
                    <img
                      className="absolute top-[35%] left-[35%]"
                      src={pattern.pattern_url_b}
                      alt={`pattern_url_b_${pattern?.pattern_index}`}
                      style={{ zIndex: pattern?.pattern_index * 2 + 1 }}
                    />
                  </>
                );
              })}
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
                      copy.color = color;
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
                updateSelectedPatterns={updateSelectedPatterns}
                removeSelectedPattern={removeSelectedPattern}
              />
            </div>
            {patternA ? (
              <div className="__choice-b-container__ flex flex-col items-center">
                <PatternCarousel
                  patterns={patterns}
                  setPatternChoice={setPatternB}
                  pIndex={2}
                  currentId={patternB?.pattern_id}
                  updateSelectedPatterns={updateSelectedPatterns}
                  removeSelectedPattern={removeSelectedPattern}
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
                  updateSelectedPatterns={updateSelectedPatterns}
                  removeSelectedPattern={removeSelectedPattern}
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
                  updateSelectedPatterns={updateSelectedPatterns}
                  removeSelectedPattern={removeSelectedPattern}
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
                  updateSelectedPatterns={updateSelectedPatterns}
                  removeSelectedPattern={removeSelectedPattern}
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
                  updateSelectedPatterns={updateSelectedPatterns}
                  removeSelectedPattern={removeSelectedPattern}
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

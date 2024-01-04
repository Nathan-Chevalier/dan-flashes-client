import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneShirt } from "../services/fetchServices";
import { getAllColors } from "../services/fetchServices";
import { getAllPatterns } from "../services/fetchServices";
import { PatternCarousel } from "../components/PatternCarousel";
import shirtButtons from "../assets/shirt_buttons.png";
import shirtMultiply from "../assets/shirt_multiply.png";
import shirtShadow from "../assets/shirt_shadow.png";
import shirtOverlay from "../assets/shirt_overlay.png";

export const Edit = () => {
  const navigate = useNavigate();
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

  const [isPublic, setIsPublic] = useState(false);

  const basePrice = 60;

  useEffect(() => {
    getOneShirt(shirtId).then((shirtObject) => {
      setShirt(shirtObject);
      setIsPublic(shirtObject.public);
      const shirtPatterns = shirtObject.shirt_pattern.map((pattern) => ({
        patternId: pattern.pattern.id,
        pattern_url_a: pattern.pattern.pattern_url_a,
        pattern_url_b: pattern.pattern.pattern_url_b,
        pattern_index: pattern.pattern_index,
      }));
      setSelectedPatterns(shirtPatterns);

      //? Loop through each pattern in the shirt_pattern array
      shirtPatterns.forEach((patternObj) => {
        const patternInfo = {
          pattern_id: patternObj.patternId,
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

  const handleEditShirt = async (event) => {
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

    await fetch(`http://localhost:8000/shirts/${shirtId}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalValues),
    });
    navigate("/closet");
  };

  return (
    <div className="__shirt-form-container__ flex flex-col items-center justify-center bg-cyan-500 h-[768px] w-[1212px] rounded-[36px] outline outline-white outline-8">
      <form className="__shirt-form__ h-full w-full rounded-xl flex">
        <div className="__label-preview-color-container__ flex flex-col h-full items-center justify-between pl-8">
          <fieldset className="__label-input__ w-full px-10 translate-y-8">
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
          {/* Shirt Preview */}
          <div className="__shirt-preview__ h-[571px] w-[509px] relative">
            {/* Shirt Texture blend stack */}
            <img
              alt="Shirt Overlay Layer"
              src={shirtOverlay}
              className="absolute z-[103] mix-blend-overlay"
            />
            <img
              alt="Shirt Shadow Layer"
              src={shirtShadow}
              className="absolute z-[102]"
            />
            <img
              alt="Shirt Button Layer"
              src={shirtButtons}
              className="absolute z-[101]"
            />
            <img
              alt="Shirt Multiply Layer"
              className="absolute z-[100] mix-blend-multiply opacity-[40%]"
              src={shirtMultiply}
            />
            {/* Shirt Color SVG*/}
            <svg width="509px" height="571px" className="absolute">
              <path
                fillRule="evenodd"
                fill={`${shirt.color.color}`}
                d="M243.733,566.618 C243.733,566.618 167.744,559.122 148.33,545.86 C148.33,545.86 101.552,530.412 96.196,508.401 C96.196,508.401 107.932,283.187 103.373,271.543 C103.373,271.543 91.104,282.594 85.828,283.506 C85.828,283.506 75.603,273.194 75.461,269.948 C75.461,269.948 46.361,240.231 42.763,234.61 C39.166,227.891 26.955,221.356 24.421,217.313 C21.886,213.270 0.496,192.591 0.496,192.591 L0.496,189.401 C0.496,189.401 13.929,178.291 16.446,173.451 C18.962,168.610 27.611,159.893 27.611,159.893 C27.611,159.893 37.854,138.948 52.333,126.398 C52.333,126.398 60.716,110.770 70.676,100.81 C70.676,100.81 80.653,82.591 85.828,78.548 C85.828,78.548 132.757,46.970 191.896,31.496 C191.896,31.496 196.823,9.753 214.226,3.583 C214.226,3.583 217.823,0.393 252.506,0.393 C287.188,0.393 301.153,6.773 301.153,6.773 C301.153,6.773 311.131,15.70 313.913,26.711 C313.913,26.711 317.777,26.501 317.901,28.306 C317.901,28.306 376.260,48.831 399.246,62.598 C410.3,68.391 419.183,72.168 419.183,72.168 C419.183,72.168 431.22,83.655 446.298,104.68 C461.575,124.482 486.847,168.721 508.503,194.186 C508.503,194.186 508.645,196.900 505.313,199.768 C501.981,202.637 487.113,222.154 467.831,234.858 C448.549,247.563 428.629,266.282 423.968,267.556 C421.168,268.298 419.183,271.543 419.183,271.543 C419.183,271.543 405.502,263.624 404.828,259.581 C404.828,259.581 413.38,491.255 418.386,506.8 C418.386,506.8 391.904,529.136 341.826,547.478 C291.747,565.820 284.406,565.821 284.406,565.821 L245.328,570.606 C245.328,570.606 243.733,569.170 243.733,566.618 Z"
              />
            </svg>
            {selectedPatterns.map((pattern, index) => {
              // Calculate z-index for pattern_url_a and pattern_url_b for interleaving layers based on odd/even
              const zIndexA = index % 2 === 0 ? index * 2 : index * 2 - 1;
              const zIndexB =
                index % 2 === 0
                  ? 2 * (selectedPatterns.length / 2) + index * 2
                  : 2 * (selectedPatterns.length / 2) + index * 2 - 1;

              return (
                <>
                  <img
                    className="absolute w-full h-full"
                    src={pattern.pattern_url_a}
                    alt={`pattern_url_a_${pattern?.pattern_index}`}
                    style={{ zIndex: zIndexA }}
                  />
                  <img
                    className="absolute w-full h-full"
                    src={pattern.pattern_url_b}
                    alt={`pattern_url_b_${pattern?.pattern_index}`}
                    style={{ zIndex: zIndexB }}
                  />
                </>
              );
            })}
          </div>
          {/* Color input */}
          <fieldset className="__color-choice-container flex items-center justify-evenly w-[90%] -translate-y-6">
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
        <div className="__pattern-public-save-container__ flex flex-col items-center justify-between w-[774px] -translate-x-3">
          <div className="__pattern-first-trio-container__ flex w-full px-8 pt-8 h-[248px]">
            <div
              className={`${"__choice-a-container__ flex flex-col items-center"}`}
            >
              <PatternCarousel
                patterns={patterns}
                setPatternChoice={setPatternA}
                pIndex={1}
                currentId={patternA?.pattern_id}
                updateSelectedPatterns={updateSelectedPatterns}
                removeSelectedPattern={removeSelectedPattern}
                shirtColor={shirt.color.color}
              />
            </div>
            <div className={`${
              patternA ?
              "__choice-b-container__ flex px-12 flex-col items-center" : "__choice-b-container__ flex px-12 flex-col items-center opacity-20 pointer-events-none"}`}>
              <PatternCarousel
                patterns={patterns}
                setPatternChoice={setPatternB}
                pIndex={2}
                currentId={patternB?.pattern_id}
                updateSelectedPatterns={updateSelectedPatterns}
                removeSelectedPattern={removeSelectedPattern}
                shirtColor={shirt.color.color}
              />
            </div>
            <div className={`${
              patternB ?
              "__choice-c-container__ flex flex-col items-center" : "__choice-c-container__ flex flex-col items-center opacity-20 pointer-events-none"}`}>
              <PatternCarousel
                patterns={patterns}
                setPatternChoice={setPatternC}
                pIndex={3}
                currentId={patternC?.pattern_id}
                updateSelectedPatterns={updateSelectedPatterns}
                removeSelectedPattern={removeSelectedPattern}
                shirtColor={shirt.color.color}
              />
            </div>
          </div>
          <div className="__pattern-second-trio-container__ mb-12 flex w-full px-8 pt-8 h-[248px]">
            <div className={`${
              patternC ?
              "__choice-d-container__ flex flex-col items-center" : "__choice-d-container__ flex flex-col items-center opacity-20 pointer-events-none"}`}>
              <PatternCarousel
                patterns={patterns}
                setPatternChoice={setPatternD}
                pIndex={4}
                currentId={patternD?.pattern_id}
                updateSelectedPatterns={updateSelectedPatterns}
                removeSelectedPattern={removeSelectedPattern}
                shirtColor={shirt.color.color}
              />
            </div>

            <div className={`${
              patternD ?
              "__choice-e-container__ flex px-12 flex-col items-center" : "__choice-e-container__ flex px-12 flex-col items-center opacity-20 pointer-events-none"}`}>
              <PatternCarousel
                patterns={patterns}
                setPatternChoice={setPatternE}
                pIndex={5}
                currentId={patternE?.pattern_id}
                updateSelectedPatterns={updateSelectedPatterns}
                removeSelectedPattern={removeSelectedPattern}
                shirtColor={shirt.color.color}
              />
            </div>
            <div className={`${
              patternE ?
              "__choice-d-container__ flex flex-col items-center" : "__choice-d-container__ flex flex-col items-center opacity-20 pointer-events-none"}`}>
              <PatternCarousel
                patterns={patterns}
                setPatternChoice={setPatternF}
                pIndex={6}
                currentId={patternF?.pattern_id}
                updateSelectedPatterns={updateSelectedPatterns}
                removeSelectedPattern={removeSelectedPattern}
                shirtColor={shirt.color.color}
              />
            </div>
          </div>
          <div className="__public-toggle-save-container__ flex self-end pr-8 mb-5 items-center justify-center gap-8">
            <fieldset className="__public-toggle__">
              <label className="flex items-center gap-2 bg-slate-900/30 rounded-3xl py-[2px] px-6 outline outline-white">
                <span className="mr-2 text-white text-3xl font-lobster">Check that box to share!</span>
                <input
                  type="checkbox"
                  checked={isPublic}
                  className="mr-2 scale-150"
                  onChange={() => setIsPublic(!isPublic)}
                />
              </label>
            </fieldset>
            <button
              className="btn-edit font-paytone text-lg"
              onClick={(event) => {
                handleEditShirt(event);
              }}
            >
              SAVE CHANGES
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

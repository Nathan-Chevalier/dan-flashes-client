import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllColors, getAllPatterns } from "../services/fetchServices";

export const Create = () => {
  const navigate = useNavigate();
  //! TODO(DRY): For loop to generate pattern index, pattern index = i
  const [patternChoices, setPatternChoices] = useState([
    {
      pattern_id: null,
      pattern_index: 1,
    },
    {
      pattern_id: null,
      pattern_index: 2,
    },
    {
      pattern_id: null,
      pattern_index: 3,
    },
    {
      pattern_id: null,
      pattern_index: 4,
    },
    {
      pattern_id: null,
      pattern_index: 5,
    },
    {
      pattern_id: null,
      pattern_index: 6,
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

  useEffect(() => {
    getAllColors().then((colorsArray) => {
      setColors(colorsArray);
    });
    getAllPatterns().then((patternsArray) => {
      setPatterns(patternsArray);
    });
  }, []);

  return (
    <div className="__shirt-form-container__ flex flex-col items-center">
      <form className="__shirt-form__ h-[794px] w-[1278px] bg-orange-600 rounded-xl">
        <div className="__label-preview-color-container__ flex flex-col"></div>
        <div className="__pattern-public-save-container__ flex flex-col"></div>
      </form>
    </div>
  );
};

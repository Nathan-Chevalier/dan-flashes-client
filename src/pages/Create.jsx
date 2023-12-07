import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const [patterns, setPatterns] = useState([{
    
  }])

  return <>CREATE IT</>;
};

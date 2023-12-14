import { useEffect, useState } from "react";

export const PatternCarousel = ({
  patterns,
  setPatternChoice,
  pIndex,
  currentId,
  updateSelectedPatterns,
  removeSelectedPattern
}) => {
  const [index, setIndex] = useState(0);
  const length = patterns.length;

  const handlePrevious = (event) => {
    event.preventDefault();
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? length - 1 : newIndex);
  };

  const handleNext = (event) => {
    event.preventDefault();
    const newIndex = index + 1;
    setIndex(newIndex >= length ? 0 : newIndex);
  };

  useEffect(() => {
    if (currentId) {
      setIndex(currentId)
    }
  }, []);

  return (
    <div>
      {patterns.map((pattern, i) => {
        return (
          <div
            key={pattern.id}
            className={`${i === index ? "flex flex-col" : "hidden"}`}
          >
            <span>{`Pattern ${i + 1}`}</span>
            <img src={pattern.pattern_preview} />
            <div className="__buttons-container__">
              <button className="btn-edit" onClick={handlePrevious}>
                Previous
              </button>
              <button
                className="btn-edit"
                onClick={(event) => {
                  event.preventDefault();
                  const patternId = parseInt(pattern.id);
                  setPatternChoice({
                    pattern_id: patternId,
                    pattern_index: pIndex,
                  });
                  updateSelectedPatterns({
                    patternId: pattern.id,
                    pattern_url_a: pattern.pattern_url_a,
                    pattern_url_b: pattern.pattern_url_b,
                    pattern_index: pIndex
                  })
                }}
              >
                Select
              </button>
              <button className="btn-edit" onClick={handleNext}>
                Next
              </button>
            </div>
            {pIndex > 1 ? (
              <button
                className="btn-edit"
                onClick={(event) => {
                  event.preventDefault();
                  setPatternChoice(null);
                  removeSelectedPattern(pIndex)
                }}
              >
                Remove
              </button>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

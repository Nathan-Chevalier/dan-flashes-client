import { useEffect, useState } from "react";

export const PatternCarousel = ({
  patterns,
  setPatternChoice,
  pIndex,
  currentId,
  updateSelectedPatterns,
  removeSelectedPattern,
  shirtColor,
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
      setIndex(currentId - 1);
    }
  }, [currentId]);

  return (
    <>
      {patterns.map((pattern, i) => {
        return (
          <div
            key={pattern.id}
            className={`${
              // Carousel mechanics for the currently displayed pattern
              i === index
                ? "flex flex-col items-center w-[170px] h-[max]"
                : "hidden"
            }`}
          >
            <button
              className={`${
                // Hides the remove pattern button if no pattern is selected
                currentId
                  ? "__button-remove-pattern__ font-lobster self-end rounded-full text-white font-bold h-[24px] w-[24px] translate-y-14 outline bg-slate-800/20 hover:bg-red-300"
                  : "opacity-0"
              }`}
              onClick={(event) => {
                event.preventDefault();
                setPatternChoice(null);
                removeSelectedPattern(pIndex);
              }}
            >
              X
            </button>
            <span className="bg-orange-600 font-lobster text-xl px-4 py-[2px] w-max rounded-full text-white outline outline-white outline-2 z-30">
              {pattern.label}
            </span>
            <div
              className="__pattern-preview)__ w-[170px] h-[170px] flex flex-col rounded-full overflow-hidden outline outline-white outline-4 z-20"
              style={{ backgroundColor: `${shirtColor}` }}
            >
              <img src={pattern.pattern_preview} />
            </div>

            <div className="__buttons-container__ flex items-end w-[180px] h-[120px] pb-[6px] py-[2px] outline outline-white  rounded-[36px] justify-self-end -translate-y-12 bg-slate-800/20">
              <button
                className="__button-pattern-nav__ h-[64px] w-[64px]"
                onClick={handlePrevious}
              />
              <button
                className={`${
                  // Checks an offset currentId against the index to render the checked/unchecked button
                  index === currentId -1 ?
                  "__button-pattern-checked__ h-[64px] w-[64px]": "__button-pattern-unchecked__ h-[64px] w-[64px]"}`}
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
                    pattern_index: pIndex,
                  });
                }}
              />

              <button
                className={"__button-pattern-nav__ h-[64px] w-[64px] -scale-100 translate-x-2 mr-2"}
                onClick={handleNext}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

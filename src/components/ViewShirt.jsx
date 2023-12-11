import { useState } from "react";

export const ViewShirt = ({ shirts }) => {
  const [index, setIndex] = useState(0);
  const length = shirts.length;

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

  return (
    <div>
      {shirts.map((shirt) => {
        return (
          <div key={`shirt-${shirt.id}`}>
            {shirt?.shirt_pattern.map((pattern) => {
              return (
                <div key={`pattern-${pattern.id}`} className="absolute">
                  <img
                    className="relative top-0 left-0"
                    src={pattern?.pattern.pattern_url_a}
                    alt={`pattern_url_a_${pattern?.pattern_index}`}
                    style={{ zIndex: pattern?.pattern_index * 2 }}
                  />
                  <img
                    className="relative top-0 left-0"
                    src={pattern?.pattern.pattern_url_b}
                    alt={`pattern_url_b_${pattern?.pattern_index}`}
                    style={{ zIndex: pattern?.pattern_index * 2 + 1 }}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

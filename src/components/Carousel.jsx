import { useState } from "react";

export const Carousel = ({ cats }) => {
  const [index, setIndex] = useState(0);
  const length = cats.length;

  const handlePrevious = () => {
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? length - 1 : newIndex);
  };

  const handleNext = () => {
    const newIndex = index + 1;
    setIndex(newIndex >= length ? 0 : newIndex);
  };

  return (
    <div className="w-[40%] m-auto flex">
      <button className="btn-edit" onClick={handlePrevious}>
        Previous
      </button>
      {cats.map((cat, i) => {
        return (
          <div
            key={cat.id}
            className={`${
              i === index ? "flex flex-col items-center" : "hidden"
            }`}
          >
            <span>{cat.label}</span>
            <img src={`${cat.url}`} />
          </div>
        );
      })}

      <button className="btn-edit" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceRangeFilter = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const onSliderChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div className="my-4">
      <div className="flex justify-between mt-2">
        <span>{priceRange[0]}₫</span>
        <span>{priceRange[1]}₫</span>
      </div>
      <Slider
        range
        min={0}
        max={1000}
        value={priceRange}
        onChange={onSliderChange}
        trackStyle={[{ backgroundColor: "#333" }]}
        handleStyle={[{ borderColor: "#333" }, { borderColor: "#333" }]}
      />
    </div>
  );
};

export default PriceRangeFilter;

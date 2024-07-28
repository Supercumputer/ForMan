import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { formatNumber } from "../../utils/helper";

const PriceRangeFilter = ({ onPriceRangeChange }) => {
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  const onSliderChange = (value) => {
    setPriceRange(value);
    onPriceRangeChange(value);
  };

  return (
    <div className="my-4">
      <div className="flex justify-between mt-2">
        <span>{formatNumber(priceRange[0])}₫</span>
        <span>{formatNumber(priceRange[1])}₫</span>
      </div>
      <Slider
        range
        min={0}
        max={10000000}
        value={priceRange}
        onChange={onSliderChange}
        trackStyle={[{ backgroundColor: "#333" }]}
        handleStyle={[{ borderColor: "#333" }, { borderColor: "#333" }]}
      />
    </div>
  );
};

export default PriceRangeFilter;

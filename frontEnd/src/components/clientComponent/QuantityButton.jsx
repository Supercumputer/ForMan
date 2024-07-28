import { useEffect, useState } from "react";

const sizes = {
  sm: {
    btn: 'py-0 px-1',
    input: 'py-0 px-2 min-w-10'
  },
  md: {
    btn: 'py-1 px-2',
    input: 'py-1 px-2 min-w-14'
  },
  lg: {
    btn: 'py-2 px-3',
    input: 'py-2 px-3 min-w-20'
  },
}

const QuantityButton = ({ initialQuantity, onQuantityChange, maxQuantity, item = null, size = 'sm' }) => {

  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity, item);
    }
  };

  const handleIncrement = () => {
    if (quantity >= maxQuantity) return;
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity, item);
  };

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  return (
    <div className="flex items-center">
      <span className={`${sizes[size].btn} border`} onClick={handleDecrement}>
        <i class="fa-solid fa-minus"></i>
      </span>
      <span className={`${sizes[size].input} border text-center`}>{quantity}</span>
      <span className={`${sizes[size].btn} border`} onClick={handleIncrement}>
        <i class="fa-solid fa-plus"></i>
      </span>
    </div>
  );
};

export default QuantityButton;

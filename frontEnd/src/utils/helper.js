function start(start) {
  const arrStart = [];
  for (let i = 0; i < start; i++) {
    arrStart.push(<i class="fa-solid fa-star"></i>);
  }
  for (let j = 5; j > start; j--) {
    arrStart.push(<i class="fa-regular fa-star"></i>);
  }
  return arrStart;
}

function checkAdminOrUser(str) {
  return /^admin/i.test(str);
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function calculateSalePrice(originalPrice, discountPercentage) {
  let discountAmount = (originalPrice * discountPercentage) / 100;
  let salePrice = originalPrice - discountAmount;
  return salePrice;
}

const getRandomColor = () => {
  const colors = [
    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export { start, checkAdminOrUser, getRandomColor, formatNumber, calculateSalePrice };

import { format } from 'date-fns';

const formatDate = (date, dateFormat = 'dd/MM/yyyy') => {
  return format(new Date(date), dateFormat);
};

// Hàm tạo mảng star
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

// Hàm định dạng số
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Hàm tính giá sale
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

// Che thông tin nhạy cảm
const maskHalfInfo = (str = "", visibleStart = 2, visibleEnd = 2) => {
  const len = str.length;
  if (len <= visibleStart + visibleEnd) {
    return '*'.repeat(len);
  }

  const start = str.slice(0, visibleStart);
  const end = str.slice(len - visibleEnd);
  const maskedPart = '*'.repeat(len - visibleStart - visibleEnd);

  return start + maskedPart + end;
};

// Xem mốc thời gian Giẵ ngày tạo và ngày hiện tại có lơn hơn 1 số nào đó ko
function calculateDaysFrom(createdAt, dateNumber) {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate - createdDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= dateNumber;
}

export {
  start,
  checkAdminOrUser,
  getRandomColor,
  formatNumber,
  calculateSalePrice,
  calculateDaysFrom,
  maskHalfInfo,
  formatDate
};

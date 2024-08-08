import { format } from 'date-fns';

const formatDate = (date, dateFormat = 'dd/MM/yyyy') => {
  return format(new Date(date), dateFormat);
};

// Hàm tạo mảng star
function start(start) {
  const arrStart = [];
  for (let i = 0; i < start; i++) {
    arrStart.push(<i className="fa-solid fa-star"></i>);
  }
  for (let j = 5; j > start; j--) {
    arrStart.push(<i className="fa-regular fa-star"></i>);
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
  formatNumber,
  calculateSalePrice,
  calculateDaysFrom,
  maskHalfInfo,
  formatDate
};

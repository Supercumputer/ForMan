// components/OrderRevenueChart.js
import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { apiQuantityOrdersByDay, apiRevenuesOrdersByDay } from '../../../apis/axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderRevenueChart = () => {

  const [revenueOrder, setRevenueOrder] = React.useState([]);
  const [quantityOrder, setQuantityOrder] = React.useState([]);

  useEffect(() => {
    (async () => {

      const [revenue, quantity] = await Promise.all([apiRevenuesOrdersByDay(), apiQuantityOrdersByDay()])
      
      setRevenueOrder(revenue)
      setQuantityOrder(quantity)

    })()
  }, []);
  // Tạo danh sách ngày trong tháng hiện tại
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const orderChartData = {
    labels: days,
    datasets: [
      {
        label: 'Số lượng đơn hàng',
        data: quantityOrder,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const revenueChartData = {
    labels: days,
    datasets: [
      {
        label: 'Doanh thu',
        data: revenueOrder,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê đơn hàng và doanh thu theo ngày trong tháng hiện tại',
      },
    },
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <div className='bg-[#fff] dark:bg-slate-800 p-5 rounded-md h-full'>
        <Bar data={orderChartData} options={options} />
      </div>
      
      <div className='bg-[#fff] dark:bg-slate-800 p-5 rounded-md h-full'>
        <Bar data={revenueChartData} options={options} />
      </div>
    </div>
  );
};

export default OrderRevenueChart;

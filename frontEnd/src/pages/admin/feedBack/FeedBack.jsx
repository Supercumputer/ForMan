import { useEffect, useState } from 'react';
import { Img, InputField } from '../../../components/common';
import { toast } from 'react-toastify';
import useDebounce from '../../../hooks/useDebounce';
import { Button, Checkbox, Label, Textarea } from 'flowbite-react'
import { getUserByEmail, sendUserFeedback } from '../../../apis/userApi';

const FeedbackPage = () => {
  const [users, setUser] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [dataCheck, setDataCheck] = useState([]);
  const [feedbackPage, setFeedbackPage] = useState("");
  const [loading, setLoading] = useState(false);
  let email = useDebounce(search, 800);

  const handleCheckbox = (user) => {
    setDataCheck((prev) => {
      if (prev.map((item) => item.email).includes(user.email)) {
        return prev.filter((item) => item.email !== user.email);
      } else {
        const newDataCheck = [...prev, user];
        return newDataCheck;
      }
    });
  };

  const handlerSendFeedback = async () => {
    setLoading(true);
    try {
      const data = {
        template: selectedTemplate,
        feedBack: feedbackPage,
        emails: dataCheck.map((item) => item.email),
      }

      let res = await sendUserFeedback(data);
      if (res && res.status) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const callApiGetUserByEmail = async (email) => {
    try {
      const res = await getUserByEmail(`?email=${email}`);
      if (res && res.status) {
        setUser(res.users);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error('Lỗi khi gửi phân hồi:', error);
    }
  };

  useEffect(() => {
    if (!email) {
      setUser([]);
      return;
    }
    callApiGetUserByEmail(email);
  }, [email]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gửi Phản Hồi</h1>
      <form className="mb-8">
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tìm Người Nhận</label>
          <InputField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Nhập vào email người cần gửi phản hồi...'
          />
          <div className={`absolute z-30 flex flex-col gap-3 right-0 top-20 left-0 bg-[#fff] dark:bg-slate-800 rounded-sm p-3 ${users.length === 0 ? 'hidden' : ''}`}>
            {users.map((user) => (
              <div key={user.id} className="flex gap-2 items-center w-full hover:bg-[#F8FAFC] dark:hover:bg-[#2A303D] p-2 rounded-md">
                <div className="flex-shrink-0">
                  <Img className="w-10 h-10 rounded-full object-cover" src={user.avatar} alt="Neil image" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                    {user.lastName} {user.firstName}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
                <Checkbox id="accept" defaultChecked checked={dataCheck.map((item) => item.email).includes(user.email)} onClick={() => handleCheckbox(user)} />
              </div>
            ))}
          </div>

        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Chọn Template</label>

          <div className="flex space-x-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg ${selectedTemplate === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setSelectedTemplate(1)}
            >
              Dành cho việc gửi vouchel ưu đãi
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-lg ${selectedTemplate === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setSelectedTemplate(2)}
            >
              Đanh cho việc thông báo các sự kiện
            </button>
          </div>
        </div>

        <div className="mb-2 block">
          <Label htmlFor="comment" value="Nội dung phản hồi" />
        </div>

        <Textarea id="comment" placeholder="Leave a comment..." value={feedbackPage} onChange={(e) => setFeedbackPage(e.target.value)} required rows={4} />

        <Button isProcessing={loading} onClick={handlerSendFeedback} className="mt-4" color="dark">Send Mail</Button>

      </form>

      <div>
        <h2 className="text-xl font-bold mb-2">Danh Sách Phản Hồi</h2>
        <ul className="bg-[#fff] p-2 flex flex-col gap-2">
          {dataCheck.length > 0 ? dataCheck.map((user, index) => (
            <div key={index} className="flex gap-2 items-center w-full hover:bg-[#F8FAFC] dark:hover:bg-[#2A303D] p-2 rounded-md">
              <div className="flex-shrink-0">
                <Img className="w-10 h-10 rounded-full object-cover" src={user.avatar} alt="Neil image" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                  {user.lastName} {user.firstName}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {user.email}
                </p>
              </div>
              <div onClick={() => handleCheckbox(user)} className='text-blue-500 text-lg'><i className="fa-solid fa-rectangle-xmark"></i></div>
            </div>
          )) : <span className="text-center">Danh sách phản hồi trống.</span>}
        </ul>
      </div>
    </div>
  );
};

export default FeedbackPage;

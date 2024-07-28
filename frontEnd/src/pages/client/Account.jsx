import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiGetDetailUser, apiLogout } from "../../apis/axios";
import { AddressDelivery, BtnOption, HistoryOrder, InforAccount, ResetPassword } from "../../components/clientComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth";

function Account() {
  const [active, setActive] = useState(1);

  const dispatch = useDispatch();
  const {account} = useSelector((state) => state.auth);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const handlerLogout = async () => {
    try {
      const res = await apiLogout();

      if (res && res.status) {
        navigate("/");
        dispatch(logout());
        toast.success(res.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    async function callApiGetUserInfo() {
      try {
        const res = await apiGetDetailUser(account.id);
        if (res && res.status) {
          setUser(res.user);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }

    callApiGetUserInfo();
  }, [account.id]);

  return (
    <div className="flex lg:flex-row flex-col lg:px-[8%] px-2 lg:my-10 my-5 gap-5">
      <div className="flex lg:flex-col flex-row flex-wrap gap-3 lg:w-80 flex-shrink-0">
        <BtnOption
          active={active === 1}
          name={"Thông tin cá nhân"}
          setActive={() => setActive(1)}
          icon={<i class="fa-solid fa-user"></i>}
        />
        <BtnOption
          active={active === 2}
          name={"Lịch sử đơn hàng"}
          setActive={() => setActive(2)}
          icon={<i class="fa-brands fa-jedi-order"></i>}
        />
        <BtnOption
          active={active === 3}
          name={"Đặt lại mật khẩu"}
          setActive={() => setActive(3)}
          icon={<i class="fa-solid fa-user-pen"></i>}
        />
        <BtnOption
          active={active === 4}
          name={"Địa chỉ giao hàng"}
          setActive={() => setActive(4)}
          icon={<i class="fa-solid fa-location-dot"></i>}
        />
        <BtnOption
          active={false}
          name={"Đăng xuất"}
          setActive={handlerLogout}
          icon={<i class="fa-solid fa-right-from-bracket"></i>}
        />
      </div>

      <div className="flex-1 bg-white shadow-md rounded-lg p-6">

        {active === 1 &&
          <InforAccount data={user} account={account} />
        }

        {active === 2 &&
          <HistoryOrder />
        }

        {active === 3 &&
          <ResetPassword />
        }

        {active === 4 &&
          <AddressDelivery  />
        }
      </div>
    </div>
  );
}

export default Account;

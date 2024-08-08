import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { RatingParent } from "./Rating";
import DOMPurify from "dompurify";

function ProductTabs({ defaultVariant, ratings }) {
  const [tab, setTab] = useState(1);
  
  const cleanDescription = DOMPurify.sanitize(
    defaultVariant?.product_id?.description
  );

  return (
    <>
      <SectionHeader
        title={
          <ul className="flex text-sm font-medium text-center items-center ">
            <li className="me-2">
              <button
                className={`inline-block p-4 rounded-t-lg ${
                  tab === 2 && "font-bold text-xl"
                }`}
                onClick={() => setTab(2)}
              >
                ĐÁNH GIÁ SẢN PHẨM
              </button>
            </li>

            <li className="me-2">
              <button
                className={`inline-block p-4 rounded-t-lg ${
                  tab === 1 && "font-bold text-xl"
                }`}
                onClick={() => setTab(1)}
              >
                THÔNG TIN SẢN PHẨM
              </button>
            </li>

            <li className="me-2">
              <button
                className={`inline-block p-4 rounded-t-lg ${
                  tab === 3 && "font-bold text-xl"
                }`}
                onClick={() => setTab(3)}
              >
                CHÍNH SÁCH ĐỔI TRẢ
              </button>
            </li>
          </ul>
        }
      />
      {tab === 1 && (
        <div dangerouslySetInnerHTML={{ __html: cleanDescription }}></div>
      )}
      {tab === 2 && (
        <RatingParent variantId={defaultVariant?._id} ratings={ratings} />
      )}
      {tab === 3 && (
        <div
          id="alert-additional-content-5"
          className="p-4 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              className="flex-shrink-0 w-4 h-4 me-2 dark:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">
              Chính Sách Đổi Trả
            </h3>
          </div>
          <div className="mt-2 mb-4 text-sm text-gray-800 dark:text-gray-300">
            <p>
              Chúng tôi luôn mong muốn mang đến cho khách hàng trải nghiệm mua
              sắm tốt nhất. Nếu bạn không hoàn toàn hài lòng với sản phẩm đã
              mua, chúng tôi sẵn lòng hỗ trợ đổi trả theo các điều kiện sau đây:
            </p>

            <h2>Điều kiện đổi trả</h2>
            <ul>
              <li>Sản phẩm còn nguyên vẹn, chưa qua sử dụng, chưa giặt giũ.</li>
              <li>
                Sản phẩm còn đầy đủ nhãn mác, hộp đựng và phụ kiện đi kèm (nếu
                có).
              </li>
              <li>
                Yêu cầu đổi trả được thực hiện trong vòng 7 ngày kể từ ngày nhận
                hàng.
              </li>
              <li>
                Hóa đơn mua hàng hoặc thông tin đơn hàng phải được cung cấp.
              </li>
            </ul>

            <h2>Quy trình đổi trả</h2>
            <ul>
              <li>
                Liên hệ với bộ phận chăm sóc khách hàng qua hotline:{" "}
                <strong>0123-456-789</strong> hoặc email:{" "}
                <strong>cskh@shopquanao.com</strong>.
              </li>
              <li>Cung cấp thông tin đơn hàng và lý do đổi trả.</li>
              <li>
                Gửi sản phẩm cần đổi trả về địa chỉ:{" "}
                <strong>123 Đường ABC, Quận XYZ, Thành phố Hồ Chí Minh</strong>.
              </li>
              <li>
                Chúng tôi sẽ kiểm tra sản phẩm và thông báo kết quả trong vòng 3
                ngày làm việc kể từ khi nhận được sản phẩm.
              </li>
            </ul>

            <h2>Chi phí đổi trả</h2>
            <p>
              - Chi phí vận chuyển khi đổi trả sản phẩm sẽ do khách hàng chi
              trả. Trong trường hợp sản phẩm bị lỗi do nhà sản xuất hoặc sai sót
              từ phía chúng tôi, chi phí vận chuyển sẽ được hoàn lại cho khách
              hàng.
            </p>

            <h2>Hoàn tiền</h2>
            <p>
              - Nếu yêu cầu hoàn tiền được chấp nhận, số tiền sẽ được hoàn vào
              tài khoản của khách hàng trong vòng 7-10 ngày làm việc, tùy thuộc
              vào phương thức thanh toán ban đầu.
            </p>

            <h2>Liên hệ</h2>
            <p>
              Nếu có bất kỳ thắc mắc hoặc yêu cầu nào liên quan đến chính sách
              đổi trả, vui lòng liên hệ với chúng tôi qua thông tin dưới đây:
            </p>
            <ul>
              <li>
                Hotline: <strong>0123-456-789</strong>
              </li>
              <li>
                Email: <strong>cskh@shopquanao.com</strong>
              </li>
              <li>
                Địa chỉ:{" "}
                <strong>123 Đường ABC, Quận XYZ, Thành phố Hồ Chí Minh</strong>
              </li>
            </ul>
          </div>
          <div className="flex">
            <button
              type="button"
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-800"
            >
              <svg
                className="me-2 h-3 w-3 dark:text-gray-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
              >
                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
              View more
            </button>
            <button
              type="button"
              className="text-gray-800 bg-transparent border border-gray-700 hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-800 dark:text-gray-300 dark:hover:text-white"
              data-dismiss-target="#alert-additional-content-5"
              aria-label="Close"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductTabs;

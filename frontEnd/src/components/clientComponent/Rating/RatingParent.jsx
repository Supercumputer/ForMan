import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Rating } from "flowbite-react";
import { apiGetRatings, apiGetRatingsByStar } from "../../../apis/axios";
import ReactPaginate from "react-paginate";
import RatingItem from "./RatingItem";
import { Img } from "../../common";
import { noRating } from "../../../assets/images";
import Rating from "react-star-ratings";

const RatingParent = ({ variantId, ratings }) => {
  const [listRatings, setListRatings] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [star, setStar] = useState(0);
  
  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    (async () => {
      const res = await (!star
        ? apiGetRatings(variantId, currentPage)
        : apiGetRatingsByStar(variantId, star, currentPage));

      if (res && res.status === true) {
        setListRatings(res.comments || []);
        setTotalPages(res.totalPages);
      }
    })();
  }, [variantId, currentPage, star]);

  return (
    <div className="px-10">
      <div className="flex md:flex-row flex-col items-center gap-10 border-b pb-5">
        <div class="flex flex-col items-center mb-2">
          <span className="text-6xl font-bold p-10">{ratings.averageRatings}</span>

          <Rating
            rating={Number(ratings.averageRatings)}
            starRatedColor="#E3A008"
            starHoverColor="#E3A008"
            // changeRating={(newRating) => setRating(newRating)}
            starDimension="30px"
            starSpacing="5px"
            numberOfStars={5}
            name="rating"
          />
         
        </div>
        
        <div className="flex flex-col w-full">
          {ratings.percentageRatings
            .map((item, index) => (
              <div
                class="flex items-center mt-4"
                onClick={() => {
                  setCurrentPage(1);
                  setStar(item.star);
                }}
              >
                <Link
                  to={""}
                  class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline text-nowrap"
                >
                  {item.star} star
                </Link>
                <div class="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div
                    class="h-5 bg-yellow-400 rounded"
                    style={{ width: `${item.percentage}` }}
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.percentage}
                </span>
              </div>
            ))
            .reverse()}
        </div>
      </div>
      {listRatings?.comments?.length || listRatings?.length ? (
        (listRatings.comments || listRatings).map((rating) => (
          <RatingItem rating={rating} />
        ))
      ) : (
        <div className="flex justify-center flex-col items-center">
          <p className="text-2xl font-bold mt-5 ">Chưa có đánh giá nào.</p>
          <Img src={noRating} />
        </div>
      )}

      <div className="flex justify-center mt-10">
        {totalPages > 1 && (
          <ReactPaginate
            nextLabel={<i class="fa-solid fa-chevron-right"></i>}
            previousLabel={<i class="fa-solid fa-chevron-left"></i>}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1}
          />
        )}
      </div>
    </div>
  );
};

export default RatingParent;

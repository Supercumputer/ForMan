import React from "react";
import { start } from "../../../utils/helper";

function RatingItem({rating}) {
  return (
    <div className="flex flex-col gap-5 mt-3 p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-start gap-5">
        <img
          src={rating?.user_id?.avatar}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-gray-200"
          alt={`${rating?.user_id?.firstName} ${rating?.user_id?.lastName}`}
        />
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="font-bold text-xl text-gray-800">{`${rating?.user_id?.lastName} ${rating?.user_id?.firstName}`}</h2>
          <div className="flex items-center gap-2 text-yellow-400">
            {start(rating?.rating)}
          </div>
          <span className="text-sm text-gray-500">
            {new Date(rating?.createdAt).toLocaleDateString()}
          </span>
          <p className="text-gray-700 mt-2">{rating?.content}</p>
        </div>
      </div>
      {rating?.reply && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg border-l-4 border-yellow-400">
          <h3 className="font-semibold text-base text-gray-800">
            Phản hồi từ nhà bán hàng:
          </h3>
          <p className="text-gray-700 mt-2">{rating.reply}</p>
        </div>
      )}
    </div>
  );
}

export default RatingItem;

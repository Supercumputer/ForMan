import React, { useState } from "react";
import { Link } from "react-router-dom";

const RecursiveList = ({ item, isChild }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <div
        className={`cursor-pointer justify-between items-center text-sm flex mt-3 ${
          isChild && "font-medium"
        }`}
        onClick={toggleOpen}
      >
        <Link to="#">{item.categoryName}</Link>
        {!isChild ? (
          !isOpen ? (
            <i class="fa-solid fa-plus"></i>
          ) : (
            <i class="fa-solid fa-minus"></i>
          )
        ) : item.children?.length > 0 ? (
          !isOpen ? (
            <i class="fa-solid fa-angle-down"></i>
          ) : (
            <i class="fa-solid fa-angle-up"></i>
          )
        ) : null}
      </div>
      {item.children && isOpen && (
        <ul className="pl-5">
          {item.children.map((child, index) => (
            <RecursiveList key={index} item={child} isChild={true} />
          ))}
        </ul>
      )}
    </li>
  );
};

const NestedList = ({ data }) => {
  return (
    <ul className="flex flex-col gap-2 text-[#333333]">
      {data.map((item, index) => (
        <RecursiveList key={index} item={item} isChild={false} />
      ))}
    </ul>
  );
};

export default NestedList;

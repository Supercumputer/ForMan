import React, { useEffect, useState } from "react";
import { apiGetCategorys } from "../../apis/axios";
import NestedList from "./NestedList";
import PriceRangeFilter from "./PriceRangeFilter";
import AccordionItem from "./AccordionItem";
import { Drawer } from "flowbite-react";
import OptionButton from "./OptionButton";

function FilterSideBar({ isOpen, setIsOpen }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await apiGetCategorys();

      if (res && res.status) {
        setCategories(res.categories);
      }
    })();
  }, []);

  return (
    <>
      <div className="w-80 pr-10 hidden lg:block text-[#333333]">
        <h1 className="text-2xl font-semibold mb-5">Bộ lọc</h1>

        <div className="flex flex-col gap-2 text-[#333333]">
          <AccordionItem title={"Danh mục sản phẩm"}>
            <NestedList data={categories} />
          </AccordionItem>

          <AccordionItem title={"Khoảng giá"} open={true}>
            <PriceRangeFilter />
          </AccordionItem>

          <AccordionItem title={"Màu sắc"} open={true}>
            <div className="flex gap-2 items-center flex-wrap my-3">
              <OptionButton title={"Red"} active={true} />
              <OptionButton title={"Blue"} active={false} />
              <OptionButton title={"Gray"} active={false} />
              <OptionButton title={"Yellow"} active={false} />
              <OptionButton title={"Black"} active={false} />
              <OptionButton title={"Pink"} active={false} />
            </div>
          </AccordionItem>

          <AccordionItem title={"Kích thước"} open={true}>
            <div className="flex gap-2 items-center flex-wrap my-3">
              <OptionButton title={"S"} active={true} />
              <OptionButton title={"M"} active={false} />
              <OptionButton title={"XL"} active={false} />
            </div>
          </AccordionItem>
        </div>
      </div>

      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <Drawer.Header title="BỘ LỌC" titleIcon={() => <></>} />
        <Drawer.Items>
          <div className="flex flex-col gap-2 text-[#333333]">
            <div className="flex flex-col gap-2 text-[#333333]">
              <AccordionItem title={"Danh mục sản phẩm"}>
                <NestedList data={categories} />
              </AccordionItem>

              <AccordionItem title={"Khoảng giá"} open={true}>
                <PriceRangeFilter />
              </AccordionItem>

              <AccordionItem title={"Màu sắc"} open={true}>
                <div className="flex gap-2 items-center flex-wrap my-3">
                  <OptionButton title={"Red"} active={true} />
                  <OptionButton title={"Blue"} active={false} />
                  <OptionButton title={"Gray"} active={false} />
                  <OptionButton title={"Yellow"} active={false} />
                  <OptionButton title={"Black"} active={false} />
                  <OptionButton title={"Pink"} active={false} />
                </div>
              </AccordionItem>

              <AccordionItem title={"Kích thước"} open={true}>
                <div className="flex gap-2 items-center flex-wrap my-3">
                  <OptionButton title={"S"} active={true} />
                  <OptionButton title={"M"} active={false} />
                  <OptionButton title={"XL"} active={false} />
                </div>
              </AccordionItem>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
}

export default FilterSideBar;

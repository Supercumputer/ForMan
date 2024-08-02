import React, { useEffect, useState } from "react";
import {
  apiGetAllColor,
  apiGetAllSize,
  apiGetCategorys,
} from "../../apis/axios";
import NestedList from "./NestedList";
import PriceRangeFilter from "./PriceRangeFilter";
import AccordionItem from "./AccordionItem";
import { Drawer } from "flowbite-react";
import OptionButton from "./OptionButton";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch } from "react-redux";
import { filter } from "../../redux/filter";

function FilterSideBar({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [priceRange, setPriceRange] = useState({
    minPrice: 0,
    maxPrice: 10000000,
  });
  
  const [variant, setVariant] = useState({
    colors: [],
    sizes: [],
  });

  const debouncedPrice = useDebounce(priceRange, 1000);
  const debouncedColor = useDebounce(colors, 1000);
  const debouncedSize = useDebounce(sizes, 1000);

  const handlerFilerPrice = (value) => {
    setPriceRange({ minPrice: value[0], maxPrice: value[1] });
  };
  const handlerFilerColor = (item) => {
    setColors((prev) => {
      const checkColor = prev.includes(item);

      if (checkColor) {
        return prev.filter((color) => color !== item);
      } else {
        return [...prev, item];
      }
    });
  };
  const handlerFilerSize = (item) => {
    setSizes((prev) => {
      const checksize = prev.includes(item);

      if (checksize) {
        return prev.filter((size) => size !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const fetchData = async () => {
    try {
      const [categoriesData, colorsData, sizesData] = await Promise.all([
        apiGetCategorys(),
        apiGetAllColor(),
        apiGetAllSize(),
      ]);
      setCategories(categoriesData.categories);
      setVariant({ colors: colorsData, sizes: sizesData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  useEffect(() => {
    dispatch(
      filter({
        price: debouncedPrice,
        colors: debouncedColor.map((item) => item._id),
        sizes: debouncedSize.map((item) => item._id),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedColor, debouncedPrice, debouncedSize]);

  return (
    <>
      <div className="w-80 pr-10 hidden lg:block text-[#333333]">
        <h1 className="text-2xl font-semibold mb-5">Bộ lọc</h1>

        <div className="flex flex-col gap-2 text-[#333333]">
          <AccordionItem title={"Danh mục sản phẩm"}>
            <NestedList data={categories} />
          </AccordionItem>

          <AccordionItem title={"Khoảng giá"} open={true}>
            <PriceRangeFilter onPriceRangeChange={handlerFilerPrice} />
          </AccordionItem>

          <AccordionItem title={"Màu sắc"} open={true}>
            <div className="flex gap-2 items-center flex-wrap my-3">
              {variant.colors.map((color) => (
                <OptionButton
                  key={color._id}
                  onClick={() => handlerFilerColor(color)}
                  title={color.colorName}
                  active={colors.includes(color)}
                />
              ))}
            </div>
          </AccordionItem>

          <AccordionItem title={"Kích thước"} open={true}>
            <div className="flex gap-2 items-center flex-wrap my-3">
              {variant.sizes.map((size) => (
                <OptionButton
                  key={size._id}
                  onClick={() => handlerFilerSize(size)}
                  title={size.sizeName}
                  active={sizes.includes(size)}
                />
              ))}
            </div>
          </AccordionItem>
        </div>
      </div>

      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <Drawer.Header title="BỘ LỌC" titleIcon={() => <></>} />
        <Drawer.Items>
          <div className="flex flex-col gap-2 text-[#333333]">

            <AccordionItem title={"Danh mục sản phẩm"}>
              <NestedList data={categories} />
            </AccordionItem>

            <AccordionItem title={"Khoảng giá"} open={true}>
              <PriceRangeFilter onPriceRangeChange={handlerFilerPrice} />
            </AccordionItem>

            <AccordionItem title={"Màu sắc"} open={true}>
              <div className="flex gap-2 items-center flex-wrap my-3">
                {variant.colors.map((color) => (
                  <OptionButton
                    key={color._id}
                    onClick={() => handlerFilerColor(color)}
                    title={color.colorName}
                    active={colors.includes(color)}
                  />
                ))}
              </div>
            </AccordionItem>

            <AccordionItem title={"Kích thước"} open={true}>
              <div className="flex gap-2 items-center flex-wrap my-3">
                {variant.sizes.map((size) => (
                  <OptionButton
                    key={size._id}
                    onClick={() => handlerFilerSize(size)}
                    title={size.sizeName}
                    active={sizes.includes(size)}
                  />
                ))}
              </div>
            </AccordionItem>

          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
}

export default FilterSideBar;

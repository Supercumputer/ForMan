import {
    BtnAddToCart,
    BtnVariant,
    QuantityButton,
} from "../../components/client";
import SlideImgPro from "../../components/client/Slide/SlideImgPro";
import Rating from "react-star-ratings";
import { calculateSalePrice, formatNumber } from "../../utils/helper";
import { useState } from "react";

const ProductInfo = ({
    setDefaultVariant,
    defaultVariant,
    variants,
    ratings,
    onClose
}) => {

    // const [initialQuantity, setInitialQuantity] = useState(1);
    const [quantity, setQuantity] = useState(1);

    const listColor = () => {
        return Array.from(
            new Set(variants.map((variant) => variant.color._id))
        ).map((id) => variants.find((variant) => variant.color._id === id));
    };

    const listSize = () => {
        return Array.from(new Set(variants.map((variant) => variant.size._id))).map(
            (id) => variants.find((variant) => variant.size._id === id)
        );
    };

    const handleColorChange = (colorId) => {
        const listSizeByColor = variants.filter(
            (item) => item.color._id === colorId
        );
        setDefaultVariant(listSizeByColor[0]);
    };

    const handleSizeChange = (sizeId) => {
        const variantBySize = variants.find(
            (item) =>
                item.size._id === sizeId && item.color._id === defaultVariant.color._id
        );
        if (!variantBySize) return;
        setDefaultVariant(variantBySize);
    };

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-[500px] md:pr-3 mb-3 md:mb-0">
                <SlideImgPro data={defaultVariant?.images} />
            </div>
            <div className="flex-1 flex flex-col gap-5 md:pl-3">
                <div>
                    <h1 className="text-2xl font-bold text-[#333333] mb-1">
                        {defaultVariant?.product_id?.name}
                    </h1>
                    <div className="flex items-center text-[#ACB2B0]">
                        <span className="flex items-center gap-1">
                            <Rating
                                rating={Number(ratings?.averageRatings)}
                                starRatedColor="#E3A008"
                                starHoverColor="#E3A008"
                                starDimension="20px"
                                starSpacing="5px"
                                numberOfStars={5}
                                name="rating"
                            />
                        </span>
                        <span className="px-3 border-l border-r mx-3">
                            {ratings?.totalReviews} Đánh giá
                        </span>
                        <span>25.5k Đã bán</span>
                    </div>
                </div>

                {defaultVariant?.sale > 0 ? (
                    <div className="flex items-center gap-3 bg-[#FAFAFA] p-4 rounded">
                        {defaultVariant?.sale > 0 && (
                            <>
                                <s className="text-[#ACB2B0]">
                                    ₫{formatNumber(defaultVariant?.price)}
                                </s>
                                <span className="font-bold text-[#ACB2B0] text-xl"> - </span>
                            </>
                        )}
                        <span className="font-bold text-[#E70505] text-2xl">
                            {formatNumber(
                                calculateSalePrice(defaultVariant.price, defaultVariant.sale) ??
                                defaultVariant.price
                            )}
                        </span>
                        <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                            - {defaultVariant?.sale}%
                        </span>
                    </div>
                ) : (
                    <div className="bg-[#FAFAFA] p-4 rounded">
                        <span className="font-bold text-[#E70505] text-2xl">
                            ₫{formatNumber(+defaultVariant.price)}
                        </span>
                    </div>
                )}

                <div className="flex items-center">
                    <p className="font-semibold text-sm text-[#333333] min-w-28">
                        Color:
                    </p>
                    <div className="flex gap-2 items-center flex-wrap">
                        {listColor().map((variant) => (
                            <BtnVariant
                                key={variant?._id}
                                onClick={() => handleColorChange(variant?.color?._id)}
                                title={variant?.color?.colorName}
                                active={defaultVariant?.color?._id === variant?.color?._id}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center">
                    <p className="font-semibold text-sm text-[#333333] min-w-28">Size:</p>
                    <div className="flex gap-2 items-center flex-wrap">
                        {listSize().map((variant) => (
                            <BtnVariant
                                key={variant?._id}
                                onClick={() => handleSizeChange(variant?.size?._id)}
                                title={variant?.size?.sizeName}
                                active={defaultVariant?.size?._id === variant?.size?._id}
                                check={variants
                                    .filter(
                                        (item) => item?.color?._id === defaultVariant?.color?._id
                                    )
                                    .map((item) => item?.size?._id)
                                    .includes(variant.size._id)}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center">
                    <p className="font-semibold text-sm text-[#333333] min-w-28">
                        Quantity:
                    </p>

                    <QuantityButton
                        initialQuantity={1}
                        maxQuantity={defaultVariant?.quantity}
                        onQuantityChange={handleQuantityChange}
                        size="lg"
                    />

                    <span
                        className={`ml-5 ${defaultVariant?.quantity === 0
                            ? "text-red-500 font-semibold"
                            : "text-[#7f7f7f]"
                            }`}
                    >
                        {defaultVariant?.quantity === 0
                            ? "Sản phẩm hết hàng"
                            : `${defaultVariant?.quantity} Sản phẩm có sẵn`}
                    </span>
                </div>

                <div className="flex items-center gap-3 font-semibold">
                    <BtnAddToCart
                        className="border min-w-44 p-4 text-[#E70505] hover:text-[#fff] border-[#E70505]"
                        quantity={quantity}
                        variant={defaultVariant}
                        onClose={onClose} />

                    <div className="min-w-44 p-4 text-center items-center gap-2 rounded text-[#fff] bg-[#E70505] cursor-pointer">
                        <span>MUA NGAY</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;

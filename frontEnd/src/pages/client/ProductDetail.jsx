import { ProductInfo, ProductTabs, SectionHeader } from "../../components/client";
import { SlideProduct } from "../../components/client/Slide";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "../../components/common";
import { getAllProductVariants, getAverageVariantRating } from "../../apis/variantApi";
import { getProductBySlug } from "../../apis/productApi";

function ProductDetail() {
  const { slug: productSlug } = useParams();
  const [defaultVariant, setDefaultVariant] = useState({});
  const [variants, setVariants] = useState([]);
  const [proCategory, setProCategory] = useState([]);
  const [ratings, setRatings] = useState({
    averageRatings: 0,
    percentageRatings: [],
    totalReviews: 0,
  });

  const callApiGetProductsByCategory = async (category) => {
    try {
      const res = await getAllProductVariants(
        `?category=${category.map((item) => item.slug).join(",")}&limit=10`
      );

      if (res && res.status === true) {
        setProCategory(res.listProducts);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const callApiGetAverageRating = async (variantId) => {
    try {
      const rating = await getAverageVariantRating(variantId);

      if (rating && rating.status === true) {
        setRatings({
          averageRatings: rating.averageRatings || 0,
          percentageRatings: rating.percentageRatings || [],
          totalReviews: rating.totalReviews || 0,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    (async () => {
      await getProductBySlug(productSlug)
        .then((variant) => {
          setVariants(variant.variants);
          setDefaultVariant(variant.defaultVariant);
          callApiGetProductsByCategory(
            variant.defaultVariant.product_id.category
          );
        })
        .catch((err) => console.log(err))
    })();
  }, [productSlug]);

  useEffect(() => {
    if (defaultVariant._id) {
      callApiGetAverageRating(defaultVariant._id);
    }
  }, [defaultVariant]);
  
  const handlerSetDefaultVariant = (variant) => {
    setDefaultVariant(variant);
  };

  return (
    <>
      <Breadcrumb productName={defaultVariant?.product_id?.name} />

      <div className="lg:px-[8%] px-2 my-5 font-roboto">
        <ProductInfo
          variants={variants}
          defaultVariant={defaultVariant}
          setDefaultVariant={handlerSetDefaultVariant}
          ratings={ratings}
        />

        <ProductTabs defaultVariant={defaultVariant} ratings={ratings} />

        <div className="mb-10">
          <SectionHeader title={"SẢN PHẨM CÙNG DANH MỤC"} />
          <SlideProduct data={proCategory} />
        </div>
      </div>
    </>
  );
}

export default ProductDetail;

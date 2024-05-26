import React from "react";
import { useState, useEffect } from "react";
import { noImage } from "../../assets/images";
function Img({ src, alt, ...props }) {
  const [image, setImage] = useState("");
  const handlerError = (e) => {
    setImage(noImage);
  };
  useEffect(() => {
    setImage(src);
  }, [src]);

  return <img src={image} alt={alt} onError={handlerError} {...props} />;
}

export default Img;

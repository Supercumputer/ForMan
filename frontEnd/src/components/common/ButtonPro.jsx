import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function ButtonPro({ type, to, href, name, ...props }) {
  const handlerdelete = () => {
    
    if (type === "button") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          props.actionDelete(props.dataId);
        }
      });
    }
  };

  let Component = "button";
  if (to) Component = Link;
  else if (href) Component = "a";

  const componentProps = { ...props };
  if (Component === "button") {
    componentProps.type = type;
  } else if (Component === Link) {
    componentProps.to = to;
  } else if (Component === "a") {
    componentProps.href = href;
  }

  return (
    <Component onClick={handlerdelete} {...componentProps}>
      {name}
    </Component>
  );
}

export default ButtonPro;

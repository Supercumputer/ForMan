import React, { useState } from "react";

function AccordionItem({title, children, open = false }) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <div>
      <div
        className="flex items-center justify-between gap-2 text-[#333333] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="font-semibold text-lg">{title}</p>
        {isOpen ? (
          <i class="fa-solid fa-minus"></i>
        ) : (
          <i class="fa-solid fa-plus"></i>
        )}
      </div>
      {isOpen && children}
    </div>
  );
}

export default AccordionItem;

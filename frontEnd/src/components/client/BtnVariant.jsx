

function BtnVariant({ title, active = false, check = true, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative border min-w-[70px] p-2 text-center text-[12px] inline-block rounded border-[#bdbfbe] overflow-hidden after:content-[''] cursor-pointer ${
        active &&
        "after:absolute after:border-t-[14px] after:border-l-[14px] after:border-l-transparent after:top-0 after:right-0 after:border-t-black border-[#000]"
      } ${!check && "opacity-50"}`}
    >
      {title}
    </div>
  );
}

export default BtnVariant;

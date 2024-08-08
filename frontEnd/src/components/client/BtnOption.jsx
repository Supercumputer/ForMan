

function BtnOption({ active, name, setActive, icon }) {
  return (
    <div
      onClick={setActive}
      className={`flex items-center gap-2 font-semibold p-3 cursor-pointer ${
        active && "bg-[#f5f5f5]"
      } rounded-md hover:bg-[#f5f5f5]`}
    >
      {icon}
      <span>{name}</span>
    </div>
  );
}

export default BtnOption;

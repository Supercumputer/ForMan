
function OptionButton({ title, active, onClick }) {
  return (
    <div
      className={`text-[#333] px-3 py-2 border rounded min-w-11 text-center cursor-pointer hover:bg-[#333333] hover:text-[#fff] ${
        active && "bg-[#333333] text-[#fff]"
      }`}
      onClick={onClick}
    >
      {title}
    </div>
  );
}

export default OptionButton;

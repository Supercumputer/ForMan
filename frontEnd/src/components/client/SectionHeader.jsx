
const SectionHeader = ({ title }) => {
  return (
    <div className="flex items-center gap-3 mt-14 mb-6">
      <span className="flex-1 bg-[#ebebeb] h-[0.5px]"></span>
      <span className="font-bold text-xl font-roboto text-[#333]">{title}</span>
      <span className="flex-1 bg-[#ebebeb] h-[0.5px]"></span>
    </div>
  );
};

export default SectionHeader;

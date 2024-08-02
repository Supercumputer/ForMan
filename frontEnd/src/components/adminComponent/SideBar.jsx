import ButtonBar from "./ButtonBar";
import { useTranslation } from "react-i18next";
import { menu } from "../../utils/adminSideBar";

function SideBar({ hidden, darkMode, setHidden }) {
  const { t } = useTranslation("admin");

  return (
    <div
      className={`lg:sticky absolute top-0 bottom-0 left-0 z-30 bg-[#fff] dark:bg-slate-800 flex-shrink-0 dark:text-[#fff] h-full text-nowrap transition-all overflow-hidden overflow-y-scroll custom-scroll ${
        hidden ? "w-0" : "w-64"
      }`}
    >
      <div className="h-14 flex items-center justify-between px-5">
        <span className="text-xl font-bold">Admin</span>
        <i className="fa-solid fa-xmark lg:hidden block" onClick={setHidden}></i>
      </div>
      <div className="p-2">
        {menu.map((item, index) => (
          <ButtonBar
            key={index}
            to={item.path}
            icon={item.icon}
            title={t(item.title)}
            darkMode={darkMode}
            menuChildren={item.children}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBar;

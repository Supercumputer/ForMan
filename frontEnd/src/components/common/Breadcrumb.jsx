import { Link, useLocation } from "react-router-dom";

const BreadcrumbComponent = ({ className }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className={className} aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-2 md:space-x-3 rtl:space-x-reverse">
        <li class="inline-flex items-center">
          <Link
            to="/"
            class="flex gap-2 items-center text-sm font-normal text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            Home
          </Link>
        </li>

        {pathnames.map((name, index) => (
          <li>
            <div class="flex items-center">
              <i class="fa-solid fa-angle-right text-sm text-gray-400"></i>
              <Link
                to={`/${pathnames.slice(0, index + 1).join("/")}/`}
                class="ms-1 text-sm font-normal text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                {name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbComponent;

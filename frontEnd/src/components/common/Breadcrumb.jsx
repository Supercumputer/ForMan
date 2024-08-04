import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { pathClient } from "../../utils/path";

const BreadcrumbComponent = ({ categoryName, productName }) => {
  const routes = [
    { path: pathClient.product, breadcrumb: categoryName },
    { path: pathClient.productDetail, breadcrumb: productName },
    { path: "/", breadcrumb: "Home" },
  ];

  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className="lg:px-[8%] px-2 bg-gray-50 py-3 flex items-center gap-2 text-sm" aria-label="Breadcrumb">
      {breadcrumbs.filter(el => !el.match.route === false).map(({ match, breadcrumb}, index, breadcrumbs) => (
        <Link className="flex gap-2 items-center hover:text-blue-500" key={match.pathname} to={match.pathname}>
          <span className="capitalize">{breadcrumb}</span>
          {index !== breadcrumbs.length - 1 && <i class="fa-solid fa-chevron-right text-gray-700"></i>}
        </Link>
      ))}
    </div>
  );
};

export default BreadcrumbComponent;

